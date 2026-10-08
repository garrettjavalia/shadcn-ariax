import { demoProps, demoStyle } from '@official-demo-customizations';
import Image from "../../reference/framework/image"

import { AspectRatio } from "@aspect-ratio"

export default function AspectRatioDemo() {
  return (
    <AspectRatio ratio={16 / 9} {...demoStyle('landscape')}>
      <Image
        src="https://avatar.vercel.sh/shadcn1"
        alt="Photo"
        fill
        {...demoProps('photo')}
      />
    </AspectRatio>
  )
}
