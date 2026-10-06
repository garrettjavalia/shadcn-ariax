import * as stylex from '@stylexjs/stylex';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@collapsible';
const styles = stylex.create({
  dynamic: (width: number) => ({
    width
  })
});
<Collapsible xstyle={[styles.dynamic(200)]} style={({
  isExpanded
}) => ({
  opacity: isExpanded ? 1 : .5
})} />;
<CollapsibleTrigger style={({
  isPressed
}) => ({
  opacity: isPressed ? .5 : 1
})}>{({
    isPressed
  }) => String(isPressed)}</CollapsibleTrigger>;
<CollapsibleContent style={({
  isFocusVisibleWithin
}) => ({
  opacity: isFocusVisibleWithin ? 1 : .5
})}>Panel</CollapsibleContent>;
// @ts-expect-error external className unsupported
<Collapsible className="external" />;
// @ts-expect-error external className unsupported
<CollapsibleTrigger className="external" />;
// @ts-expect-error external className unsupported
<CollapsibleContent className="external">Panel</CollapsibleContent>;
// @ts-expect-error xstyle requires compiled StyleX
<Collapsible xstyle={{
  width: 200
}} />;
