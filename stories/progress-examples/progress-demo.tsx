import { progressCustom, progressNative } from "@progress-customizations";
"use client";
import * as React from "react";
import { Progress } from "@progress";
export default function ProgressDemo() {
  const [progress, setProgress] = React.useState(13);
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  return <Progress aria-label="Loading" value={progress} {...progressCustom("demo")} />;
}
