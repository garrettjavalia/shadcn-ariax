import {CardSpacing} from './card-examples/spacing';
import type { Meta, StoryObj } from '@storybook/react-vite';
import './card-fixtures.css';
import { useState } from 'react';
import type { CSSProperties } from 'react';
import { ChevronRightIcon } from 'lucide-react';
import { Button } from '@button';
import { Input } from '@input';
import { Label } from '@label';
import { Badge } from '@badge';
import { fullWidthButton, customCard, customPart, dynamicCard, cardSpacingNativeStyle } from '@card-customizations';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@card';
const meta = {title:'Components/Card',component:Card,tags:['parity'],decorators:[Story=><main id="parity-root"><Story /></main>]} satisfies Meta<typeof Card>;
export default meta;
type Story=StoryObj<typeof meta>;
function CardDemo({spacing}:{spacing?:string}={}) {
  return (
    <Card style={{"width":"100%","maxWidth":"24rem",...(spacing ? {"--card-spacing":spacing} : {})} as CSSProperties}>
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
          <div style={{"display":"flex","flexDirection":"column","gap":"1.5rem"}}>
            <div style={{"display":"grid","gap":".5rem"}}>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div style={{"display":"grid","gap":".5rem"}}>
              <div style={{"display":"flex","alignItems":"center"}}>
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  {...cardSpacingNativeStyle("ml-auto inline-block text-sm underline-offset-4 hover:underline")}
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter style={{"flexDirection":"column","gap":".5rem"}}>
        <Button type="submit" {...fullWidthButton}>
          Login
        </Button>
        <Button variant="outline" {...fullWidthButton}>
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  )
}

function CardSmall() {
  const featureName = "Scheduled reports"

  return (
    <Card size="sm" style={{"marginInline":"auto","width":"100%","maxWidth":"20rem"}}>
      <CardHeader>
        <CardTitle>{featureName}</CardTitle>
        <CardDescription>
          Weekly snapshots. No more manual exports.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul style={{"display":"grid","gap":".5rem","paddingBlock":".5rem","fontSize":".875rem"}}>
          <li style={{"display":"flex","gap":".5rem"}}>
            <ChevronRightIcon style={{"marginTop":".125rem","width":"1rem","height":"1rem","flexShrink":0,"color":"var(--muted-foreground)"}} />
            <span>Choose a schedule (daily, or weekly).</span>
          </li>
          <li style={{"display":"flex","gap":".5rem"}}>
            <ChevronRightIcon style={{"marginTop":".125rem","width":"1rem","height":"1rem","flexShrink":0,"color":"var(--muted-foreground)"}} />
            <span>Send to channels or specific teammates.</span>
          </li>
          <li style={{"display":"flex","gap":".5rem"}}>
            <ChevronRightIcon style={{"marginTop":".125rem","width":"1rem","height":"1rem","flexShrink":0,"color":"var(--muted-foreground)"}} />
            <span>Include charts, tables, and key metrics.</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter style={{"flexDirection":"column","gap":".5rem"}}>
        <Button size="sm" {...fullWidthButton}>
          Set up scheduled reports
        </Button>
        <Button variant="outline" size="sm" {...fullWidthButton}>
          See what&apos;s new
        </Button>
      </CardFooter>
    </Card>
  )
}

function CardEdgeToEdge() {
  return (
    <Card style={{"marginInline":"auto","width":"100%","maxWidth":"24rem"}}>
      <CardHeader>
        <CardTitle>Terms of Service</CardTitle>
        <CardDescription>
          Review the terms before accepting the agreement.
        </CardDescription>
      </CardHeader>
      <CardContent style={{"marginBottom":"calc(var(--card-spacing) * -1)"}}>
        <div className="card-fixture-terms" style={{"marginInline":"calc(var(--card-spacing) * -1)","maxHeight":"12rem","overflowY":"scroll","borderTopWidth":1,"backgroundColor":"color-mix(in oklab,var(--muted) 50%,transparent)","paddingInline":"var(--card-spacing)","paddingBlock":"1rem","fontSize":".875rem","lineHeight":1.625}}>
          <p>
            These terms govern your use of the workspace, including access to
            shared documents, project files, and collaboration tools.
          </p>
          <p>
            You are responsible for the content you upload and for ensuring that
            your team has the appropriate permissions to view or edit it.
          </p>
          <p>
            We may update features or limits as the service evolves. When those
            changes materially affect your workflow, we will notify your
            workspace administrators.
          </p>
          <p>
            By continuing, you agree to keep your account credentials secure and
            to follow your organization&apos;s acceptable use policies.
          </p>
        </div>
      </CardContent>
      <CardFooter style={{"justifyContent":"flex-end","gap":".5rem"}}>
        <Button variant="outline">Decline</Button>
        <Button>Accept</Button>
      </CardFooter>
    </Card>
  )
}

function CardImage() {
  return (
    <Card style={{"position":"relative","marginInline":"auto","width":"100%","maxWidth":"24rem","paddingTop":0}}>
      <div style={{"position":"absolute","inset":0,"zIndex":30,"aspectRatio":"16/9","background":"rgb(0 0 0 / .35)"}} />
      <img
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='360'%3E%3Crect width='640' height='360' fill='%23688'/%3E%3C/svg%3E"
        alt="Event cover"
        className="card-fixture-cover" style={{"position":"relative","zIndex":20,"aspectRatio":"16/9","width":"100%","objectFit":"cover"}}
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Featured</Badge>
        </CardAction>
        <CardTitle>Design systems meetup</CardTitle>
        <CardDescription>
          A practical talk on component APIs, accessibility, and shipping
          faster.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button {...fullWidthButton}>View Event</Button>
      </CardFooter>
    </Card>
  )
}


export const Demo:Story={render:()=> <CardDemo/>};
export const Small:Story={render:()=> <CardSmall/>};
export const EdgeToEdge:Story={render:()=> <CardEdgeToEdge/>};
export const Image:Story={render:()=> <CardImage/>};
export const Rtl:Story={render:()=> <div dir="rtl"><CardRtlDemo/></div>};
export const Spacing:Story={render:()=> <CardSpacing/>};
export const Structure:Story={render:()=> <div style={{display:'grid',gap:'2rem'}}>{(['default','sm'] as const).map(size=><Card key={size} size={size}><CardHeader><CardTitle>Title only</CardTitle></CardHeader><CardHeader><CardTitle>Title</CardTitle><CardDescription>Description</CardDescription></CardHeader><CardHeader><CardTitle>Title</CardTitle><CardAction>Action</CardAction></CardHeader><CardContent>Content, without footer</CardContent></Card>)}<Card><img alt="First" width="160" height="90" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='90'/%3E"/><CardHeader><CardTitle>Image first child</CardTitle></CardHeader><img alt="Last" width="160" height="90" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='90'/%3E"/></Card><Card size="sm"><Card><CardHeader><CardTitle>Nested title inside a small card</CardTitle></CardHeader></Card></Card><CardTitle>Standalone title</CardTitle></div>};
export const Customized:Story={render:()=> <Card {...customCard} style={{width:350}}><CardHeader {...customPart}><CardTitle {...customPart}>Custom title</CardTitle><CardDescription {...customPart}>Custom description</CardDescription><CardAction {...customPart}>Action</CardAction></CardHeader><CardContent {...customPart}>Content</CardContent><CardFooter {...customPart}>Footer</CardFooter></Card>};

function ReactPropsDemo(){const [count,setCount]=useState(0);const dynamic=dynamicCard(200+count*40);return <Card {...dynamic} style={{...dynamic.style,width:310+count*40}} id="interactive-card" aria-label="Card region" data-clicks={count} ref={node=>{if(node)node.dataset.ref='attached'}} onClick={()=>setCount(count+1)}><CardContent>Click to resize</CardContent></Card>;}
export const ReactProps:Story={render:()=> <ReactPropsDemo/>};
function CardRtlDemo({spacing}:{spacing?:string}={}) {
  return (
    <Card style={{"width":"100%","maxWidth":"24rem"}}>
      <CardHeader>
        <CardTitle>تسجيل الدخول إلى حسابك</CardTitle>
        <CardDescription>
          أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك
        </CardDescription>
        <CardAction>
          <Button variant="link">إنشاء حساب</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div style={{"display":"flex","flexDirection":"column","gap":"1.5rem"}}>
            <div style={{"display":"grid","gap":".5rem"}}>
              <Label htmlFor="email-rtl">البريد الإلكتروني</Label>
              <Input
                id="email-rtl"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div style={{"display":"grid","gap":".5rem"}}>
              <div style={{"display":"flex","alignItems":"center"}}>
                <Label htmlFor="password-rtl">كلمة المرور</Label>
                <a
                  href="#"
                  style={{"marginInlineStart":"auto","display":"inline-block","fontSize":".875rem","textUnderlineOffset":".25rem"}}
                >
                  نسيت كلمة المرور؟
                </a>
              </div>
              <Input id="password-rtl" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter style={{"flexDirection":"column","gap":".5rem"}}>
        <Button type="submit" {...fullWidthButton}>
          تسجيل الدخول
        </Button>
        <Button variant="outline" {...fullWidthButton}>
          تسجيل الدخول باستخدام Google
        </Button>
      </CardFooter>
    </Card>
  )
}
