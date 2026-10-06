import {width,content} from "@tabs-customizations";
import { Tabs, TabsList, TabsTrigger } from "@tabs"

export function TabsDisabled() {
  return (
    <Tabs defaultSelectedKey="home">
      <TabsList>
        <TabsTrigger id="home">Home</TabsTrigger>
        <TabsTrigger id="settings" isDisabled>
          Disabled
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
