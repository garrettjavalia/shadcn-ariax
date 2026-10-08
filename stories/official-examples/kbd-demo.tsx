import { demoProps, demoStyle } from '@official-demo-customizations';
import { Kbd, KbdGroup } from "@kbd"

export default function KbdDemo() {
  return (
    <div {...demoProps('keys')}>
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⌃</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>B</Kbd>
      </KbdGroup>
    </div>
  )
}
