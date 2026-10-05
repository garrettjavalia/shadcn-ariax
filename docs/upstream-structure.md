# 업스트림 자동 준비

원본과 처리된 레퍼런스는 Git에 넣지 않는다. 필요한 명령의 최초 실행 시 고정 커밋에서 다운로드하고 `generated/`에 준비한다.

```text
upstream/source.json              # 저장소·40자리 커밋·선택 경로·필수 파일
scripts/upstream/
  ensure.ts                       # 캐시 확인 및 다운로드
  prepare.ts                      # 원본 → 비교용 코드
  sync.ts                         # 고정 커밋을 강제로 다시 다운로드
  check.ts                        # 캐시 준비 및 필수 파일 확인
  cache.test.ts                   # 동시 실행·오프라인·누락 복구 검증
reference/                        # 비교 환경 어댑터와 설정
registry/ariax/                   # 배포하는 StyleX 구현
licenses/                         # 배포 라이선스 고지
generated/                        # 전체 Git 제외
  upstream/shadcn/                # 원본 경로와 파일 내용 유지
    .download-complete.json       # 다운로드 완료 및 소스 설정 기록
  reference/aria-nova/            # 변환된 Button과 Tailwind 진입점
```

`pnpm test`, `pnpm typecheck`, Storybook 실행·빌드는 먼저 `upstream:prepare`를 실행한다. 다운로드 완료 기록의 소스 설정이 현재 설정과 같고 선택 경로 및 필수 파일이 존재하면 네트워크 없이 재사용한다. 기록이 없거나 설정이 달라지거나 필요한 파일이 누락되면 다시 다운로드한다. 컴포넌트를 추가할 때 디렉터리 안에서 실제로 사용하는 원본 파일은 `source.json`의 `requiredFiles`에도 추가한다.

파일별 해시 목록은 저장하지 않으며 전체 원본을 매번 읽어 검사하지 않는다. 따라서 로컬 캐시의 내용 수정·손상은 자동 탐지하지 않는다. 의심스러우면 `pnpm upstream:sync`로 다시 받거나 `generated/`를 삭제한 뒤 필요한 명령을 실행한다.

여러 명령이 동시에 시작돼도 하나의 다운로드를 공유한다. 종료된 프로세스의 잠금은 회수한다. 다운로드·압축 해제·필수 경로 확인을 임시 폴더에서 완료한 뒤 기존 캐시를 교체한다. 실패한 다운로드로 기존 캐시를 덮어쓰지 않는다. TypeScript/Node와 시스템 `tar`를 사용한다.

레퍼런스는 원본을 수정하지 않고 생성한다. 기본 API 비교는 같은 stories를 공유한다. 커스터마이징은 원본 어댑터의 실제 Tailwind 클래스와 StyleX 어댑터의 `xstyle`을 각각 적용한다. 헬퍼 비교 기준은 원본 Button의 최종 `cn(buttonVariants(...))` 스타일이며, 병합 전 Tailwind 문자열 동작은 호환 범위에서 제외한다.

현재 선택 범위는 Aria 베이스·예제·문서 및 Nova/theme/globals/라이선스다. 원본 확보 범위와 이식 완료 범위는 다르며 현재 변환·검증 범위는 **Button / Nova / Neutral**이다.

기준 갱신은 `source.json`의 커밋·선택 경로를 수정하고 `pnpm upstream:prepare`를 실행한 뒤 `pnpm verify`로 검증한다. 최초 실행·캐시 복구에는 네트워크가 필요하다.

`pnpm test:upstream`은 HTTP 응답만 로컬 아카이브로 대체한다. 실제 처리 코드로 동시 최초 실행의 단일 다운로드, 오프라인 재사용, 필수 파일 누락 복구, 캐시 커밋 불일치, 완료 기록 누락, 잘못된 아카이브 거부를 검사한다.
