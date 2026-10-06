"use client"
import {chartAnimationEvents} from "../chart-animation"

import {demoCard,demoHeader,demoIntro,flex,demoButton,mutedTiny,demoTotal,demoContent,demoChart,demoTooltip,exampleChart,previewRoot,previewLabel,arrowOne,previewEnd,previewSecondLabel,arrowTwo,previewHidden,previewStart,previewThirdLabel,arrowThree,medium,grid,muted,value,labelWidth,privateTooltipRoot,privateTooltipItem,privateIndicator,privateTooltipRow} from "@chart-customizations"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { ChartContainer, type ChartConfig } from "@chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export function ChartBarDemoAxis() {
  return (
    <ChartContainer config={chartConfig} {...exampleChart}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Bar {...chartAnimationEvents} dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar {...chartAnimationEvents} dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
