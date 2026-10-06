"use client"

import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import * as RechartsPrimitive from "recharts"
import type { TooltipValueType } from "recharts"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

const INITIAL_DIMENSION = { width: 320, height: 200 } as const
type TooltipNameType = number | string

type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

function ChartContainer({
  id,
  className: _className,
  style,
  xstyle,
  children,
  config,
  initialDimension = INITIAL_DIMENSION,
  ...props
}: Styled<React.ComponentProps<"div">> & {
  config: ChartConfig
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"]
  initialDimension?: {
    width: number
    height: number
  }
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        {...applied(styles.container,xstyle,style,"ariax-chart")}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer
          initialDimension={initialDimension}
        >
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme ?? config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ??
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

// Preserve Recharts component identity: chart internals recognize these primitives.
const ChartTooltip = RechartsPrimitive.Tooltip as (
  props: Omit<React.ComponentProps<typeof RechartsPrimitive.Tooltip>, "wrapperClassName" | "labelClassName"> & {
    wrapperClassName?: never
    labelClassName?: never
  }
) => ReturnType<typeof RechartsPrimitive.Tooltip>

function ChartTooltipContent({
  active,
  payload,
  className: _className,
  style,
  xstyle,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName: _labelClassName,
  labelXstyle,
  labelStyle,
  formatter,
  color,
  nameKey,
  labelKey,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  Styled<React.ComponentProps<"div">> & {
    labelClassName?: never
    labelXstyle?: stylex.StyleXStyles
    labelStyle?: React.CSSProperties
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: "line" | "dot" | "dashed"
    nameKey?: string
    labelKey?: string
  } & Omit<
    RechartsPrimitive.DefaultTooltipContentProps<
      TooltipValueType,
      TooltipNameType
    >,
    "accessibilityLayer"
  >) {
  const { config } = useChart()

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null
    }

    const [item] = payload
    const key = `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`
    const itemConfig = getPayloadConfigFromPayload(config, item, key)
    const value =
      !labelKey && typeof label === "string"
        ? (config[label]?.label ?? label)
        : itemConfig?.label

    if (labelFormatter) {
      return (
        <div {...applied(styles.label,labelXstyle,labelStyle)}>
          {labelFormatter(value, payload)}
        </div>
      )
    }

    if (!value) {
      return null
    }

    return <div {...applied(styles.label,labelXstyle,labelStyle)}>{value}</div>
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelXstyle,
    labelStyle,
    config,
    labelKey,
  ])

  if (!active || !payload?.length) {
    return null
  }

  const nestLabel = payload.length === 1 && indicator !== "dot"

  return (
    <div
      {...applied(styles.tooltip,xstyle,style,"ariax-chart-tooltip")}
    >
      {!nestLabel ? tooltipLabel : null}
      <div {...applied(styles.grid)}>
        {payload
          .filter((item) => item.type !== "none")
          .map((item, index) => {
            const key = `${nameKey ?? item.name ?? item.dataKey ?? "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color ?? item.payload?.fill ?? item.color

            return (
              <div
                key={index}
                {...applied([styles.item,indicator === "dot" && styles.center],undefined,undefined,"ariax-chart-tooltip-item")}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          {...applied([styles.indicator,indicator === "dot" && styles.dot,indicator === "line" && styles.line,indicator === "dashed" && styles.dashed,nestLabel && indicator === "dashed" && styles.nestedDashed],undefined,{"--ariax-indicator-color":indicatorColor} as React.CSSProperties)}
                        />
                      )
                    )}
                    <div
                      {...applied([styles.valueRow,nestLabel?styles.end:styles.center])}
                    >
                      <div {...applied(styles.grid)}>
                        {nestLabel ? tooltipLabel : null}
                        <span {...applied(styles.muted)}>
                          {itemConfig?.label ?? item.name}
                        </span>
                      </div>
                      {item.value != null && (
                        <span {...applied(styles.value)}>
                          {typeof item.value === "number"
                            ? item.value.toLocaleString()
                            : String(item.value)}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}

const ChartLegend = RechartsPrimitive.Legend as React.MemoExoticComponent<(
  props: Omit<React.ComponentProps<typeof RechartsPrimitive.Legend>, "className"> & { className?: never }
) => ReturnType<typeof RechartsPrimitive.Legend>>

function ChartLegendContent({
  className: _className,
  xstyle,
  style,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: Styled<React.ComponentProps<"div">> & {
  hideIcon?: boolean
  nameKey?: string
} & RechartsPrimitive.DefaultLegendContentProps) {
  const { config } = useChart()

  if (!payload?.length) {
    return null
  }

  return (
    <div
      {...applied([styles.legend,verticalAlign === "top" ? styles.legendTop:styles.legendBottom],xstyle,style,"ariax-chart-legend")}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item, index) => {
          const key = `${nameKey ?? item.dataKey ?? "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              key={index}
              {...applied(styles.legendItem,undefined,undefined,"ariax-chart-legend-item")}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  {...applied(styles.legendIndicator)}
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          )
        })}
    </div>
  )
}

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config ? config[configLabelKey] : config[key]
}

export {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}

type Styled<Props> = Omit<Props,"className"|"style"> & {className?:never;style?:React.CSSProperties;xstyle?:stylex.StyleXStyles};
function applied(xstyle:stylex.StyleXStyles,user?:stylex.StyleXStyles,style?:React.CSSProperties,marker?:string){const props=stylex.props(xstyle,user);return {className:[marker,props.className].filter(Boolean).join(" "),style:{...props.style,...style}};}
const styles=stylex.create({container:{display:'flex',aspectRatio:'16 / 9',justifyContent:'center',fontSize:'.75rem',lineHeight:'calc(1 / .75)'},label:{fontWeight:500},tooltip:{display:'grid',minWidth:'8rem',alignItems:'flex-start',gap:'.375rem',borderRadius:'var(--radius)',borderWidth:1,borderStyle:'solid',borderColor:'color-mix(in oklab,var(--border) 50%,transparent)',backgroundColor:'var(--background)',paddingInline:'.625rem',paddingBlock:'.375rem',fontSize:'.75rem',lineHeight:'calc(1 / .75)',boxShadow:'0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 20px 25px -5px rgb(0 0 0 / .1), 0 8px 10px -6px rgb(0 0 0 / .1)'},grid:{display:'grid',gap:'.375rem'},item:{display:'flex',width:'100%',flexWrap:'wrap',alignItems:'stretch',gap:'.5rem'},center:{alignItems:'center'},end:{alignItems:'flex-end'},indicator:{flexShrink:0,borderRadius:2,borderColor:'var(--ariax-indicator-color)',backgroundColor:'var(--ariax-indicator-color)'},dot:{height:'.625rem',width:'.625rem'},line:{width:'.25rem'},dashed:{width:0,borderWidth:'1.5px',borderStyle:'dashed',backgroundColor:'transparent'},nestedDashed:{marginBlock:'.125rem'},valueRow:{display:'flex',flex:'1 1 0%',justifyContent:'space-between',lineHeight:1},muted:{color:'var(--muted-foreground)'},value:{fontFamily:'var(--font-mono)',fontWeight:500,color:'var(--foreground)',fontVariantNumeric:'tabular-nums'},legend:{display:'flex',alignItems:'center',justifyContent:'center',gap:'1rem'},legendTop:{paddingBottom:'.75rem'},legendBottom:{paddingTop:'.75rem'},legendItem:{display:'flex',alignItems:'center',gap:'.375rem'},legendIndicator:{height:'.5rem',width:'.5rem',flexShrink:0,borderRadius:2}});
