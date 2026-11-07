import { demoProps, demoStyle } from '@official-demo-customizations';
import { Badge } from "@badge"

export function BadgeVariants() {
  return (
    <div {...demoProps('badgeRow')}>
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
    </div>
  )
}
