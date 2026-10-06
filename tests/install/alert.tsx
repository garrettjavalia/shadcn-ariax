import { Alert, AlertTitle, AlertDescription, AlertAction } from "@alert";
import * as stylex from "@stylexjs/stylex";
const styles = stylex.create({ dynamic: (width: number) => ({ width }) });
export default function AlertInstallFixture() {
  return (
    <Alert style={{ maxWidth: 400 }} xstyle={styles.dynamic(300)}>
      <AlertTitle>Installed alert</AlertTitle>
      <AlertDescription>Description</AlertDescription>
      <AlertAction>Action</AlertAction>
    </Alert>
  );
}
