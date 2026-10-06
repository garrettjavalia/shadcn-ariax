import { createRef } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@input-otp";
const ref = createRef<HTMLInputElement>();
<InputOTP
  maxLength={2}
  ref={ref}
  onChange={(value) => value.toUpperCase()}
  render={({ slots }) =>
    slots.map((slot, index) => <span key={index}>{slot.char}</span>)
  }
/>;
<InputOTP maxLength={1}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
  </InputOTPGroup>
</InputOTP>;
// @ts-expect-error external className is unsupported
<InputOTP maxLength={1} className="w-full">
  slot
</InputOTP>;
// @ts-expect-error container styling is also StyleX
<InputOTP maxLength={1} containerClassName="gap-2">
  slot
</InputOTP>;
