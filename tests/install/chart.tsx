import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  type ChartConfig,
} from "@chart";
import * as stylex from "@stylexjs/stylex";
const styles = stylex.create({
  chart: (height: number) => ({ height, width: 320 }),
  content: { fontWeight: 600 },
  label: { color: "var(--primary)" },
  legend: { gap: "1.25rem" },
});
const config = {
  desktop: { label: "Desktop", theme: { light: "#2563eb", dark: "#60a5fa" } },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig;
export default function ChartInstallFixture() {
  return (
    <>
      <ChartContainer
        id="installed"
        config={config}
        xstyle={styles.chart(200)}
        style={{ height: 240, lineHeight: 1.75 }}
        initialDimension={{ width: 320, height: 200 }}
      >
        <BarChart
          data={[{ month: "Jan", desktop: 25, mobile: 10 }]}
          accessibilityLayer
        >
          <CartesianGrid />
          <XAxis dataKey="month" />
          <ChartTooltip
            wrapperStyle={{ outline: "none" }}
            content={
              <ChartTooltipContent
                indicator="dashed"
                labelKey="desktop"
                nameKey="desktop"
                xstyle={styles.content}
                style={{ fontWeight: 400 }}
                labelXstyle={styles.label}
                labelStyle={{ color: "var(--foreground)" }}
                formatter={(value) => String(value)}
              />
            }
          />
          <ChartLegend
            content={
              <ChartLegendContent
                nameKey="desktop"
                hideIcon
                xstyle={styles.legend}
                style={{ gap: 8 }}
              />
            }
          />
          <Bar dataKey="desktop" fill="var(--color-desktop)" />
          <Bar dataKey="mobile" fill="var(--color-mobile)" />
        </BarChart>
      </ChartContainer>
      <ChartStyle id="standalone" config={config} />
    </>
  );
}
