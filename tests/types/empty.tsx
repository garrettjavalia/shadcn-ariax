import { Empty, EmptyMedia } from "@empty";
<Empty style={{ width: 320 }} />;
<EmptyMedia variant={null} />;
// @ts-expect-error Tailwind className is not part of the StyleX API
<Empty className="w-80" />;
// @ts-expect-error unknown media variant
<EmptyMedia variant="badge" />;
