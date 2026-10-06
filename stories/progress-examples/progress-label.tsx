import { progressCustom, progressNative } from "@progress-customizations";
import { Progress, ProgressLabel, ProgressValue } from "@progress";
export function ProgressWithLabel() {
  return <Progress value={56} {...progressCustom("bounded")}>
      <ProgressLabel>Upload progress</ProgressLabel>
      <ProgressValue />
    </Progress>;
}
