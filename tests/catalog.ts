export type StoryEntry = { id: string; title: string; name: string; type: string; tags?: string[] };
export const environments: { theme: string; width: number; requiredTag?: string }[] = [
  { theme: 'light', width: 1000 }, { theme: 'dark', width: 1000 },
  { theme: 'light', width: 390, requiredTag: 'viewport-390' },
  { theme: 'dark', width: 390, requiredTag: 'viewport-390' },
];
// The official MDX is the example-intent coverage floor. Helper examples use
// Button's final styles (cn applied), not upstream's raw class-string semantics.
export const buttonDocumentation: Record<string, string> = {
  'button-demo': 'interaction-default', 'button-size': 'matrix', 'button-default': 'matrix',
  'button-outline': 'matrix', 'button-secondary': 'matrix', 'button-ghost': 'matrix',
  'button-destructive': 'matrix', 'button-link': 'matrix', 'button-icon': 'matrix',
  'button-with-icon': 'right-icons', 'button-rounded': 'rounded', 'button-spinner': 'loading',
  'button-group-demo': 'group', 'button-render': 'as-link', 'button-rtl': 'rtl',
};
