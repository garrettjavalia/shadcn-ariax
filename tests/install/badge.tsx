import { Badge } from '@badge';
import { Spinner } from '@spinner';
export default function BadgeInstallFixture() {
  return <><Badge style={{ opacity: 0.8 }}>Badge</Badge><Badge variant="destructive"><Spinner data-icon="inline-start"/>Deleting</Badge></>;
}
