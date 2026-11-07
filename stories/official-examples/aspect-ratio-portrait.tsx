import { demoProps, demoStyle } from '@official-demo-customizations';
import Image from "../../reference/framework/image"

import { AspectRatio } from "@aspect-ratio"

export function AspectRatioPortrait() {
  return (
    <AspectRatio
      ratio={9 / 16}
      {...demoStyle('portrait')}
    >
      <Image
        src="https://avatar.vercel.sh/shadcn1"
        alt="Photo"
        fill
        {...demoProps('photo')}
      />
    </AspectRatio>
  )
}
