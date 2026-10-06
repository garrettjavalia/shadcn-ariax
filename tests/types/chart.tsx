import{ChartContainer,ChartTooltipContent,ChartLegendContent,type ChartConfig}from'../../registry/ariax/ui/chart';
import{BarChart}from'recharts';
const config={desktop:{label:'Desktop',theme:{light:'#2563eb',dark:'#60a5fa'}}}satisfies ChartConfig;
<ChartContainer config={config} style={{height:200}}><BarChart/></ChartContainer>;
// @ts-expect-error external classes are not a Chart customization API
<ChartContainer config={config} className="h-40"><BarChart/></ChartContainer>;
// @ts-expect-error external classes are not a Chart customization API
<ChartTooltipContent className="p-4"/>;
// @ts-expect-error label classes are replaced by labelXstyle / labelStyle
<ChartTooltipContent labelClassName="font-bold"/>;
// @ts-expect-error external classes are not a Chart customization API
<ChartLegendContent className="p-4"/>;
// @ts-expect-error a series cannot declare both fixed color and themed colors
const invalid:ChartConfig={desktop:{color:'red',theme:{light:'red',dark:'blue'}}};
void invalid;
