import './fixtures.css';
import {otpField,otpRtlField,otpCard,otpLargeGroup,otpRegistryGroup,otpLargeSlot,otpSeparator,otpButton,otpFooter} from '@input-otp-customizations';
import { RefreshCwIcon } from "lucide-react"

import { Button } from "@button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@card"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@input-otp"

export function InputOTPForm() {
  return (
    <Card {...otpCard}>
      <CardHeader>
        <CardTitle>Verify your login</CardTitle>
        <CardDescription>
          Enter the verification code we sent to your email address:{" "}
          <span style={{fontWeight:500}}>m@example.com</span>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <FieldLabel htmlFor="otp-verification">
              Verification code
            </FieldLabel>
            <Button variant="outline" size="xs">
              <RefreshCwIcon />
              Resend Code
            </Button>
          </div>
          <InputOTP maxLength={6} id="otp-verification" required>
            <InputOTPGroup {...otpLargeGroup}>
              <InputOTPSlot {...otpLargeSlot} index={0} />
              <InputOTPSlot {...otpLargeSlot} index={1} />
              <InputOTPSlot {...otpLargeSlot} index={2} />
            </InputOTPGroup>
            <InputOTPSeparator {...otpSeparator} />
            <InputOTPGroup {...otpLargeGroup}>
              <InputOTPSlot {...otpLargeSlot} index={3} />
              <InputOTPSlot {...otpLargeSlot} index={4} />
              <InputOTPSlot {...otpLargeSlot} index={5} />
            </InputOTPGroup>
          </InputOTP>
          <FieldDescription>
            <a href="#">I no longer have access to this email address.</a>
          </FieldDescription>
        </Field>
      </CardContent>
      <CardFooter>
        <Field>
          <Button type="submit" {...otpButton}>
            Verify
          </Button>
          <div style={{fontSize:'.875rem',lineHeight:'calc(1.25 / .875)',color:'var(--muted-foreground)'}}>
            Having trouble signing in?{" "}
            <a
              href="#"
              className="fixture-otp-support"
            >
              Contact support
            </a>
          </div>
        </Field>
      </CardFooter>
    </Card>
  )
}
