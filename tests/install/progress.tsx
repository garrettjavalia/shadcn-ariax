import * as stylex from "@stylexjs/stylex";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
  ProgressTrack,
  ProgressIndicator,
} from "@progress";
const styles = stylex.create({
  dynamic: (width: number) => ({
    width,
  }),
  indicator: {
    width: 80,
  },
});
export default function Fixture() {
  return (
    <Progress
      aria-label="Installing progress"
      value={40}
      xstyle={[styles.dynamic(240)]}
      style={({ percentage, isIndeterminate }) => ({
        width: 244,
        opacity: isIndeterminate ? 0.5 : percentage! / 100,
      })}
    >
      <ProgressLabel
        style={{
          fontSize: 20,
        }}
      >
        Upload
      </ProgressLabel>
      <ProgressValue>{(value) => <strong>{value}</strong>}</ProgressValue>
      <ProgressTrack
        style={{
          height: 8,
        }}
      >
        <ProgressIndicator
          xstyle={styles.indicator}
          style={{
            width: 90,
          }}
        />
      </ProgressTrack>
    </Progress>
  );
}
