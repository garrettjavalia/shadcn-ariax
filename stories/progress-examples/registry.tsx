import * as React from 'react';
import { FileIcon } from 'lucide-react';
import { Progress, ProgressLabel, ProgressValue } from '@progress';
import { Slider } from '@slider';
import { Item, ItemActions, ItemContent, ItemGroup, ItemMedia, ItemTitle } from '@item';
import { progressCustom, progressNative } from '@progress-customizations';
import { nativeItem } from '../item-examples/native';
export function ProgressValues() {
  return <>
      <div {...progressNative("column")}>
        <Progress value={0} />
        <Progress value={25} {...progressCustom("full")} />
        <Progress value={50} />
        <Progress value={75} />
        <Progress value={100} />
      </div>
    </>;
}
export function ProgressWithLabel() {
  return <>
      <Progress value={56}>
        <ProgressLabel>Upload progress</ProgressLabel>
        <ProgressValue />
      </Progress>
    </>;
}
export function ProgressControlled() {
  const [value, setValue] = React.useState(50);
  return <>
      <div {...progressNative("column")}>
        <Progress value={value} {...progressCustom("full")} />
        <Slider aria-label="Progress" value={value} onChange={setValue} minValue={0} maxValue={100} step={1} />
      </div>
    </>;
}
export function FileUploadList() {
  const files = React.useMemo(() => [{
    id: "1",
    name: "document.pdf",
    progress: 45,
    timeRemaining: "2m 30s"
  }, {
    id: "2",
    name: "presentation.pptx",
    progress: 78,
    timeRemaining: "45s"
  }, {
    id: "3",
    name: "spreadsheet.xlsx",
    progress: 12,
    timeRemaining: "5m 12s"
  }, {
    id: "4",
    name: "image.jpg",
    progress: 100,
    timeRemaining: "Complete"
  }], []);
  return <>
      <ItemGroup>
        {files.map(file => <Item key={file.id} size="xs" {...progressCustom("px0")}>
            <ItemMedia variant="icon">
              <FileIcon {...nativeItem("size-5")} />
            </ItemMedia>
            <ItemContent {...progressCustom("truncate")}>
              <ItemTitle {...progressCustom("inline")}>{file.name}</ItemTitle>
            </ItemContent>
            <ItemContent>
              <Progress value={file.progress} {...progressCustom("width32")} />
            </ItemContent>
            <ItemActions {...progressCustom("actions")}>
              <span {...progressNative("muted")}>
                {file.timeRemaining}
              </span>
            </ItemActions>
          </Item>)}
      </ItemGroup>
    </>;
}
