import * as stylex from '@stylexjs/stylex';
import {InputOTP,InputOTPGroup,InputOTPSeparator,InputOTPSlot} from '@input-otp';
const styles=stylex.create({gap:(gap:number)=>({gap}),slot:{height:40}});
export default function Fixture(){return <InputOTP maxLength={2} containerXstyle={styles.gap(12)} style={{fontSize:18}}><InputOTPGroup><InputOTPSlot index={0} xstyle={styles.slot}/></InputOTPGroup><InputOTPSeparator/><InputOTPGroup><InputOTPSlot index={1}/></InputOTPGroup></InputOTP>;}
