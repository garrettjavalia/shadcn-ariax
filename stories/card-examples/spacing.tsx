import {cardSpacingExampleStyle,cardSpacingNativeStyle} from '@card-customizations';
"use client"

import * as React from "react"

import { Button } from "@button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@card"
import { Input } from "@input"
import { Label } from "@label"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@toggle-group"

const spacingOptions = [
  {
    className: "4",
    label: "16px",
    value: "4",
  },
  {
    className: "5",
    label: "20px",
    value: "5",
  },
  {
    className: "6",
    label: "24px",
    value: "6",
  },
  {
    className: "8",
    label: "32px",
    value: "8",
  },
]

export function CardSpacing() {
  const [spacing, setSpacing] = React.useState("4")
  const selectedSpacing = spacingOptions.find(
    (option) => option.value === spacing
  )

  return (
    <div {...cardSpacingNativeStyle("mx-auto grid w-full max-w-sm gap-4")}>
      <ToggleGroup
        selectedKeys={[spacing]}
        onSelectionChange={(keys) => {
          const key = Array.from(keys)[0]
          if (key) {
            setSpacing(String(key))
          }
        }}
        variant="outline"
        size="sm"
        {...cardSpacingExampleStyle("justify-center")}
      >
        {spacingOptions.map((option) => (
          <ToggleGroupItem key={option.value} id={option.value}>
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <Card style={{"--card-spacing":`calc(var(--spacing, .25rem) * ${selectedSpacing?.value ?? "4"})`} as React.CSSProperties}>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div {...cardSpacingNativeStyle("flex flex-col gap-6")}>
              <div {...cardSpacingNativeStyle("grid gap-2")}>
                <Label htmlFor="email-spacing">Email</Label>
                <Input
                  id="email-spacing"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div {...cardSpacingNativeStyle("grid gap-2")}>
                <div {...cardSpacingNativeStyle("flex items-center")}>
                  <Label htmlFor="password-spacing">Password</Label>
                  <a
                    href="#"
                    {...cardSpacingNativeStyle("ml-auto inline-block text-sm underline-offset-4 hover:underline")}
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password-spacing" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter {...cardSpacingExampleStyle("flex-col gap-2")}>
          <Button type="submit" {...cardSpacingExampleStyle("w-full")}>
            Login
          </Button>
          <Button variant="outline" {...cardSpacingExampleStyle("w-full")}>
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
