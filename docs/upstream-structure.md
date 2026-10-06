# 업스트림 자동 준비

원본과 CLI 설치 결과는 Git에 넣지 않는다. 필요한 명령의 최초 실행 시 고정 커밋을 다운로드하고 `generated/`에 준비한다.

```text
upstream/source.json              # 저장소·40자리 커밋·선택 경로·필수 파일
upstream/reference.json           # 설치할 컴포넌트 이름 목록
scripts/upstream/
  ensure.ts                       # 원본 캐시 확인 및 다운로드
  reference.ts                    # 공식 변환 API → CLI build → CLI add
  prepare.ts                      # 설치 캐시 확인·교체
  sync.ts                         # 원본 재다운로드 및 설치 캐시 초기화
  check.ts                        # 원본 캐시 준비 및 필수 파일 확인
  cache.test.ts                   # 실제 CLI·동시 실행·오프라인·복구 검증
reference/                        # 비교 환경 어댑터와 Tailwind 설정
registry/ariax/                   # 배포하는 StyleX 구현
generated/                        # 전체 Git 제외
  upstream/shadcn/                # 고정 커밋의 원본·문서·예제
    .download-complete.json       # 다운로드 완료 및 소스 설정
  reference/aria-nova/            # 격리된 CLI 설치 프로젝트
    ui/                          # Storybook이 직접 렌더링하는 CLI 설치 결과
    lib/, hooks/, components/    # 원본 메타데이터가 요구하는 로컬 의존 항목
    registry/                    # 공식 CLI build로 만든 로컬 JSON
    source/                      # 공식 변환 API의 입력 준비 결과
    cli.css                      # CLI가 설치한 css/cssVars; harness와 분리
    tailwind.css                 # 로컬 비교 harness; cli.css를 import
    .install-complete.json       # CLI 성공 후에만 기록
```

`pnpm test`, `pnpm typecheck`, Storybook 실행·빌드는 먼저 `upstream:prepare`를 실행한다. 원본은 고정 커밋으로 받고, 설치할 항목과 `registryDependencies`는 원본의 `*/_registry.ts`에서 읽는다. 필요한 항목만 고정한 `shadcn` 패키지의 공개 `createStyleMap`·`transformStyle` API로 처리한 뒤 공식 CLI `build`와 `add`를 실행한다. 자체 `cn-*` 클래스 치환은 없다. import namespace 이동은 원본의 공식 빌드 단계와 같은 경로 이동이다.

이는 필요한 항목에 공식 API를 재사용하는 경량 파이프라인이며 업스트림 웹앱 전체 빌드를 재현한 것은 아니다. CLI가 추가로 요청하는 Neutral 색상 JSON도 같은 원본 커밋에서 받는다. 설치 동안 loopback 레지스트리가 이 파일만 제공하며 다른 경로는 404로 실패시킨다. 라이브 공식 레지스트리 응답을 설치 기준으로 삼지 않는다. 원본 커밋과 `package.json`/`pnpm-lock.yaml`의 CLI·의존성 고정이 재현 기준이다. 공식 구현 근거는 고정 커밋의 `apps/v4/scripts/build-registry.mts`다.

CLI의 `components.json`에는 `rtl: true`를 지정한다. 공식 방향 변환이 물리 방향 유틸리티를 논리 방향 유틸리티로 바꾸므로 동일한 설치 결과로 LTR·RTL을 비교한다. 일반 원본에 `dir="rtl"`만 붙이는 비교와 구분한다.

다운로드 캐시는 소스 설정·필수 경로를 확인한다. 설치 캐시는 소스 설정·선택한 컴포넌트·RTL 설정·CLI 버전·프로젝트 의존성과 설치된 파일과 JSX 설정·패키지 설정·CLI CSS의 존재 여부를 확인한다. 둘 다 완료 기록이 일치하면 오프라인으로 재사용하며 CLI도 다시 실행하지 않는다. 설치 파일이 누락되면 원본 캐시에서 공식 CLI로 재생성한다. CLI 소유 CSS는 로컬 harness 설정 갱신으로 덮어쓰지 않는다. 파일별 내용 해시는 저장하거나 검사하지 않는다. 임의 수정·손상이 의심되면 `pnpm upstream:sync`로 원본과 설치 결과를 다시 준비한다.

새 레퍼런스 항목은 `reference.json`의 `components`에 이름을 추가한다. 파일 목록과 로컬 항목 의존성은 원본 메타데이터를 따른다. 새로운 npm 의존성이 필요한 항목은 먼저 이 프로젝트에 정확한 버전을 설치해야 한다. 자동 준비가 임의 패키지 설치나 버전 갱신을 일으키지 않도록 누락·버전 불일치를 실패시킨다. 별칭 `@reference/*`는 설치 프로젝트를 가리킨다. 실제 이식본·스토리·공식 예제 대응 추가는 별도 구현 작업이다.

동시 명령은 원본 다운로드와 CLI 준비 잠금을 공유한다. 임시 폴더에서 성공한 결과만 기존 캐시와 교체한다. CLI는 `generated/`의 격리된 프로젝트만 수정한다. 배포 레지스트리의 CLI 소비 앱 테스트는 이 준비 작업과 별도로 실행한다.

`pnpm test:upstream`은 원본 HTTP 응답만 로컬 아카이브로 바꾸고 공식 CLI는 실제로 실행한다. 자식 CLI 프로세스에도 외부 HTTP(S) 차단을 적용해 오프라인 설치 복구를 검증한다. 클래스 변환 결과, 로컬 의존 항목과 import 이동, 동시 단일 다운로드, 설치 캐시의 오프라인 재사용·누락 복구, 소스 설정 변경, 실패한 다운로드의 기존 캐시 보존을 검사한다.
