import { progressCustom, progressNative } from "@progress-customizations";
"use client";
import * as React from "react";
import { useTranslation, type Translations } from "../dropdown-menu-examples/language-selector";
import { Progress, ProgressLabel, ProgressValue } from "@progress";
const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      label: "Upload progress"
    }
  },
  ar: {
    dir: "rtl",
    values: {
      label: "تقدم الرفع"
    }
  },
  he: {
    dir: "rtl",
    values: {
      label: "התקדמות העלאה"
    }
  }
};
function toArabicNumerals(num: number): string {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return num.toString().split("").map(digit => arabicNumerals[parseInt(digit, 10)]).join("");
}
export function ProgressRtl() {
  const {
    dir,
    t,
    language
  } = useTranslation(translations, "ar");
  const formatNumber = (num: number): string => {
    if (language === "ar") {
      return toArabicNumerals(num);
    }
    return num.toString();
  };
  return <Progress value={56} {...progressCustom("bounded")} dir={dir}>
      <ProgressLabel>{t.label}</ProgressLabel>
      <ProgressValue>
        {value => <span {...progressNative("auto")}>
            {formatNumber(parseFloat(value ?? "0"))}%
          </span>}
      </ProgressValue>
    </Progress>;
}
