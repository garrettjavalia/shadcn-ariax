import { demoStyle, demoProps } from '@official-demo-customizations';
import { Kbd, KbdGroup } from "@kbd"

export default function KbdGroupExample() {
  return (
    <div {...demoProps('keys')}>
      <p style={{fontSize:14,lineHeight:'calc(1.25 / .875)',color:'var(--muted-foreground)'}}>
        Use{" "}
        <KbdGroup>
          <Kbd>Ctrl + B</Kbd>
          <Kbd>Ctrl + K</Kbd>
        </KbdGroup>{" "}
        to open the command palette
      </p>
    </div>
  )
}
