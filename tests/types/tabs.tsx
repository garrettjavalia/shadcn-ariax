import { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsListProps } from '@tabs';
// @ts-expect-error external className unsupported
<Tabs className="test" />;
// @ts-expect-error external className unsupported
<TabsList className="test" />;
// @ts-expect-error external className unsupported
<TabsTrigger className="test" />;
// @ts-expect-error external className unsupported
<TabsContent className="test" />;
// @ts-expect-error variant unsupported
<TabsList variant="invalid" />;
<TabsList xstyle={tabsListVariants({
  variant: 'line'
})} />;

// @ts-expect-error xstyle requires compiled StyleX styles
<Tabs xstyle={{
  width: 200
}} />;
<Tabs style={({
  orientation
}) => ({
  width: orientation === 'horizontal' ? 200 : 300
})} />;
<TabsTrigger style={({
  isSelected
}) => ({
  opacity: isSelected ? 1 : .5
})}>{({
    isSelected
  }) => String(isSelected)}</TabsTrigger>;
<TabsContent style={({
  isFocusVisible
}) => ({
  opacity: isFocusVisible ? 1 : .5
})} />;
tabsListProps({
  variant: 'line',
  xstyle: tabsListVariants(),
  style: {
    width: 320
  }
});
