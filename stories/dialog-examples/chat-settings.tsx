import {dialog,column,navigation,tabs,panel,normal,nickname,tooltip,responsive,textarea} from '@chat-settings-customizations';
"use client"

import * as React from "react"

import { Button } from "@button"
import { Checkbox } from "@checkbox"
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dialog"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@field"
import { Input } from "@input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@input-group"
import { Kbd } from "@kbd"
import {
  NativeSelect,
  NativeSelectOption,
} from "@native-select"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@select"
import { Switch } from "@switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@tabs"
import { Textarea } from "@textarea"
import { Tooltip, TooltipTrigger } from "@tooltip"
import { InfoIcon } from "lucide-react"

const spokenLanguages = [
  { label: "Auto", value: "auto" },
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Italian", value: "it" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Chinese", value: "zh" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Arabic", value: "ar" },
  { label: "Hindi", value: "hi" },
  { label: "Bengali", value: "bn" },
  { label: "Telugu", value: "te" },
  { label: "Marathi", value: "mr" },
  { label: "Kannada", value: "kn" },
  { label: "Malayalam", value: "ml" },
]

const voices = [
  { label: "Samantha", value: "samantha" },
  { label: "Alex", value: "alex" },
  { label: "Fred", value: "fred" },
  { label: "Victoria", value: "victoria" },
  { label: "Tom", value: "tom" },
  { label: "Karen", value: "karen" },
  { label: "Sam", value: "sam" },
  { label: "Daniel", value: "daniel" },
]

const themes = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
]

const accents = [
  { label: "Default", value: "default" },
  { label: "Red", value: "red" },
  { label: "Blue", value: "blue" },
  { label: "Green", value: "green" },
  { label: "Purple", value: "purple" },
  { label: "Pink", value: "pink" },
]

export function DialogChatSettings() {
  React.useLayoutEffect(()=>{document.documentElement.classList.add("style-nova");return()=>document.documentElement.classList.remove("style-nova");},[]);
  const [tab, setTab] = React.useState("general")
  const [theme, setTheme] = React.useState("system")
  const [accentColor, setAccentColor] = React.useState("default")
  const [spokenLanguage, setSpokenLanguage] = React.useState("en")
  const [voice, setVoice] = React.useState("samantha")

  return (
    <>
      <DialogTrigger>
        <Button variant="outline">Chat Settings</Button>
        <Dialog data-parity-portal {...dialog}>
          <DialogHeader>
            <DialogTitle>Chat Settings</DialogTitle>
            <DialogDescription>
              Customize your chat settings: theme, accent color, spoken
              language, voice, personality, and custom instructions.
            </DialogDescription>
          </DialogHeader>
          <div {...column}>
            <NativeSelect
              value={tab}
              onChange={(e) => setTab(e.target.value)}
              {...navigation}
            >
              <NativeSelectOption value="general">General</NativeSelectOption>
              <NativeSelectOption value="notifications">
                Notifications
              </NativeSelectOption>
              <NativeSelectOption value="personalization">
                Personalization
              </NativeSelectOption>
              <NativeSelectOption value="security">Security</NativeSelectOption>
            </NativeSelect>
            <Tabs
              selectedKey={tab}
              onSelectionChange={(key) => setTab(String(key))}
            >
              <TabsList {...tabs}>
                <TabsTrigger id="general">General</TabsTrigger>
                <TabsTrigger id="notifications">Notifications</TabsTrigger>
                <TabsTrigger id="personalization">Personalization</TabsTrigger>
                <TabsTrigger id="security">Security</TabsTrigger>
              </TabsList>
              <div {...panel}>
                <TabsContent id="general">
                  <FieldSet>
                    <FieldGroup>
                      <Field orientation="horizontal">
                        <FieldLabel htmlFor="theme">Theme</FieldLabel>
                        <Select
                          value={theme}
                          onChange={(value) => setTheme(String(value))}
                        >
                          <SelectTrigger id="theme">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent placement="bottom end">
                            <SelectGroup>
                              {themes.map((theme) => (
                                <SelectItem key={theme.value} id={theme.value}>
                                  {theme.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </Field>
                      <FieldSeparator />
                      <Field orientation="horizontal">
                        <FieldLabel htmlFor="accent-color">
                          Accent Color
                        </FieldLabel>
                        <Select
                          value={accentColor}
                          onChange={(value) => setAccentColor(String(value))}
                        >
                          <SelectTrigger id="accent-color">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent placement="bottom end">
                            <SelectGroup>
                              {accents.map((accent) => (
                                <SelectItem
                                  key={accent.value}
                                  id={accent.value}
                                >
                                  {accent.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </Field>
                      <FieldSeparator />
                      <Field orientation="responsive">
                        <FieldContent>
                          <FieldLabel htmlFor="spoken-language">
                            Spoken Language
                          </FieldLabel>
                          <FieldDescription>
                            For best results, select the language you mainly
                            speak. If it&apos;s not listed, it may still be
                            supported via auto-detection.
                          </FieldDescription>
                        </FieldContent>
                        <Select
                          value={spokenLanguage}
                          onChange={(value) => setSpokenLanguage(String(value))}
                        >
                          <SelectTrigger id="spoken-language">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent placement="bottom end">
                            <SelectGroup>
                              {spokenLanguages.map((language) => (
                                <SelectItem
                                  key={language.value}
                                  id={language.value}
                                >
                                  {language.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </Field>
                      <FieldSeparator />
                      <Field orientation="horizontal">
                        <FieldLabel htmlFor="voice">Voice</FieldLabel>
                        <Select
                          value={voice}
                          onChange={(value) => setVoice(String(value))}
                        >
                          <SelectTrigger id="voice">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent placement="bottom end">
                            <SelectGroup>
                              {voices.map((voice) => (
                                <SelectItem key={voice.value} id={voice.value}>
                                  {voice.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </Field>
                    </FieldGroup>
                  </FieldSet>
                </TabsContent>
                <TabsContent id="notifications">
                  <FieldGroup>
                    <FieldSet>
                      <FieldLabel>Responses</FieldLabel>
                      <FieldDescription>
                        Get notified when ChatGPT responds to requests that take
                        time, like research or image generation.
                      </FieldDescription>
                      <FieldGroup data-slot="checkbox-group">
                        <Field orientation="horizontal">
                          <Checkbox id="push" defaultSelected isDisabled />
                          <FieldLabel htmlFor="push" {...normal}>
                            Push notifications
                          </FieldLabel>
                        </Field>
                      </FieldGroup>
                    </FieldSet>
                    <FieldSeparator />
                    <FieldSet>
                      <FieldLabel>Tasks</FieldLabel>
                      <FieldDescription>
                        Get notified when tasks you&apos;ve created have
                        updates. <a href="#">Manage tasks</a>
                      </FieldDescription>
                      <FieldGroup data-slot="checkbox-group">
                        <Field orientation="horizontal">
                          <Checkbox id="push-tasks" />
                          <FieldLabel
                            htmlFor="push-tasks"
                            {...normal}
                          >
                            Push notifications
                          </FieldLabel>
                        </Field>
                        <Field orientation="horizontal">
                          <Checkbox id="email-tasks" />
                          <FieldLabel
                            htmlFor="email-tasks"
                            {...normal}
                          >
                            Email notifications
                          </FieldLabel>
                        </Field>
                      </FieldGroup>
                    </FieldSet>
                  </FieldGroup>
                </TabsContent>
                <TabsContent id="personalization">
                  <FieldGroup>
                    <Field orientation="responsive">
                      <FieldLabel htmlFor="nickname">Nickname</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          id="nickname"
                          placeholder="Broski"
                          {...nickname}
                        />
                        <InputGroupAddon align="inline-end">
                          <TooltipTrigger>
                            <InputGroupButton size="icon-xs">
                              <InfoIcon/>
                            </InputGroupButton>
                            <Tooltip {...tooltip}>
                              Used to identify you in the chat. <Kbd>N</Kbd>
                            </Tooltip>
                          </TooltipTrigger>
                        </InputGroupAddon>
                      </InputGroup>
                    </Field>
                    <FieldSeparator />
                    <Field
                      orientation="responsive"
                      {...responsive}
                    >
                      <FieldContent>
                        <FieldLabel htmlFor="about">More about you</FieldLabel>
                        <FieldDescription>
                          Tell us more about yourself. This will be used to help
                          us personalize your experience.
                        </FieldDescription>
                      </FieldContent>
                      <Textarea
                        id="about"
                        placeholder="I'm a software engineer..."
                        {...textarea}
                      />
                    </Field>
                    <FieldSeparator />
                    <FieldLabel>
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldLabel htmlFor="customization">
                            Enable customizations
                          </FieldLabel>
                          <FieldDescription>
                            Enable customizations to make ChatGPT more
                            personalized.
                          </FieldDescription>
                        </FieldContent>
                        <Switch id="customization" defaultSelected />
                      </Field>
                    </FieldLabel>
                  </FieldGroup>
                </TabsContent>
                <TabsContent id="security">
                  <FieldGroup>
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldLabel htmlFor="2fa">
                          Multi-factor authentication
                        </FieldLabel>
                        <FieldDescription>
                          Enable multi-factor authentication to secure your
                          account. If you do not have a two-factor
                          authentication device, you can use a one-time code
                          sent to your email.
                        </FieldDescription>
                      </FieldContent>
                      <Switch id="2fa" />
                    </Field>
                    <FieldSeparator />
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle>Log out</FieldTitle>
                        <FieldDescription>
                          Log out of your account on this device.
                        </FieldDescription>
                      </FieldContent>
                      <Button variant="outline" size="sm">
                        Log Out
                      </Button>
                    </Field>
                    <FieldSeparator />
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle>Log out of all devices</FieldTitle>
                        <FieldDescription>
                          This will log you out of all devices, including the
                          current session. It may take up to 30 minutes for the
                          changes to take effect.
                        </FieldDescription>
                      </FieldContent>
                      <Button variant="outline" size="sm">
                        Log Out All
                      </Button>
                    </Field>
                  </FieldGroup>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </Dialog>
      </DialogTrigger>
    </>
  )
}
