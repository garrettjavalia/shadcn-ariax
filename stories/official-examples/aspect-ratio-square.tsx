import { demoProps, demoStyle } from '@official-demo-customizations';
import Image from "../../reference/framework/image"

import { AspectRatio } from "@aspect-ratio"

export function AspectRatioSquare() {
  return (
    <AspectRatio
      ratio={1 / 1}
      {...demoStyle('square')}
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
