export type StoryEntry = {
  id: string;
  title: string;
  name: string;
  type: string;
  tags?: string[];
};
export const environments: {
  theme: string;
  width: number;
  requiredTag?: string;
}[] = [
  { theme: "light", width: 1000 },
  { theme: "dark", width: 1000 },
  { theme: "light", width: 390, requiredTag: "viewport-390" },
  { theme: "dark", width: 390, requiredTag: "viewport-390" },
];
