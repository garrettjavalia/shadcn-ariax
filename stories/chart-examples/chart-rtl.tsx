"use client"
import {chartAnimationEvents} from "../chart-animation"

import {demoCard,demoHeader,demoIntro,flex,demoButton,mutedTiny,demoTotal,demoContent,demoChart,demoTooltip,exampleChart,previewRoot,previewLabel,arrowOne,previewEnd,previewSecondLabel,arrowTwo,previewHidden,previewStart,previewThirdLabel,arrowThree,medium,grid,muted,value,labelWidth,privateTooltipRoot,privateTooltipItem,privateIndicator,privateTooltipRow} from "@chart-customizations"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  useTranslation,
  type Translations,
} from "../dropdown-menu-examples/language-selector"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@chart"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      january: "January",
      february: "February",
      march: "March",
      april: "April",
      may: "May",
      june: "June",
      desktop: "Desktop",
      mobile: "Mobile",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      january: "يناير",
      february: "فبراير",
      march: "مارس",
      april: "أبريل",
      may: "مايو",
      june: "يونيو",
      desktop: "سطح المكتب",
      mobile: "الجوال",
    },
  },
  he: {
    dir: "rtl",
    values: {
      january: "ינואר",
      february: "פברואר",
      march: "מרץ",
      april: "אפריל",
      may: "מאי",
      june: "יוני",
      desktop: "מחשב",
      mobile: "נייד",
    },
  },
}

const chartData = [
  { month: "january", desktop: 186, mobile: 80 },
  { month: "february", desktop: 305, mobile: 200 },
  { month: "march", desktop: 237, mobile: 120 },
  { month: "april", desktop: 73, mobile: 190 },
  { month: "may", desktop: 209, mobile: 130 },
  { month: "june", desktop: 214, mobile: 140 },
]

export function ChartRtl() {
  const { t, dir } = useTranslation(translations, "ar")

  const chartConfig = {
    desktop: {
      label: t.desktop,
      color: "var(--chart-2)",
    },
    mobile: {
      label: t.mobile,
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig} {...exampleChart}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid
          vertical={false}
          orientation={dir === "rtl" ? "right" : "left"}
        />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) =>
            (t[value as keyof typeof t] as string).slice(0, 3)
          }
          reversed={dir === "rtl"}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              {...labelWidth}
              labelFormatter={(value) => t[value as keyof typeof t] as string}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar {...chartAnimationEvents} dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar {...chartAnimationEvents} dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
