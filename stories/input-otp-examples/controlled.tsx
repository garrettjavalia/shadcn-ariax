import './fixtures.css';
import {otpField,otpRtlField,otpCard,otpLargeGroup,otpRegistryGroup,otpLargeSlot,otpSeparator,otpButton,otpFooter} from '@input-otp-customizations';
"use client"

import * as React from "react"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@input-otp"

export default function InputOTPControlled() {
  const [value, setValue] = React.useState("")

  return (
    <div className="fixture-otp-controlled">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div style={{textAlign:'center',fontSize:'.875rem',lineHeight:'calc(1.25 / .875)'}}>
        {value === "" ? (
          <>Enter your one-time password.</>
        ) : (
          <>You entered: {value}</>
        )}
      </div>
    </div>
  )
}
