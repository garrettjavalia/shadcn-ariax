import {custom13,custom14,custom15,custom16,custom17,custom9,custom18,custom19,custom20,custom21,custom22,custom0,custom23,custom24,custom25,custom26,custom27} from '@drawer-customizations';
"use client"

import { Button } from "@button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@drawer"

const PARAGRAPHS = [
  "Your changes are saved automatically as you type.",
  "Delivery usually takes three to five business days, depending on your location and the shipping method you selected at checkout.",
  "We use your email address for account notifications and order updates. You can change this anytime from your profile settings.",
  "Two-factor authentication adds an extra layer of security to your account. When enabled, you'll need to enter a code from your authenticator app in addition to your password. We recommend enabling it if you store payment methods or sensitive information.",
  "By continuing, you agree to our Terms of Service and Privacy Policy. We collect usage data to improve the product, personalize your experience, and troubleshoot issues. You can export or delete your data at any time from the account settings page. Third-party integrations may have their own policies, and you should review them before connecting external services.",
  "Refunds are processed within five to ten business days after we receive your return. Items must be unused and in their original packaging to qualify. Shipping costs are non-refundable unless the return is due to our error or a defective product. Once approved, the refund is issued to your original payment method; credit card refunds may take an additional billing cycle to appear on your statement. If you paid with store credit, the balance is restored to your account immediately. Contact support if you haven't received your refund after two weeks.",
  "Last updated March 12, 2026.",
  "Upgrade to Pro for unlimited projects, priority support, and advanced analytics. Cancel anytime from billing settings.",
  "You haven't verified your email yet. Check your inbox for a confirmation link—we sent it when you signed up. The link expires after 24 hours, but you can request a new one below.",
  "API requests are rate-limited to 1,000 calls per hour on the free plan. Exceeding the limit returns a 429 response with a Retry-After header. Upgrade to a paid plan for higher limits and dedicated support. Webhook deliveries are retried up to three times with exponential backoff if your endpoint returns a non-2xx status.",
  "No payment method on file.",
  "Our design team rebuilt the checkout flow last quarter after interviews with forty-two customers. The biggest friction point was surprise fees at the final step, so we moved shipping and tax estimates earlier in the process. Early tests show a twelve percent drop in cart abandonment. We're still rolling out the update region by region, and you may see the old flow until your account is migrated.",
]

export default function DrawerExample() {
  return (
    <>
      <DrawerDemo />
      <DrawerSwipeHandleExample />
      <DrawerPosition />
      <DrawerCustomWidthAndHeight />
      <DrawerScrollable />
      <DrawerSnapPoints />
      <DrawerNested />
      <DrawerNonModal />
    </>
  )
}

export function DrawerDemo() {
  return (
    <>
      <div {...custom13}>
        <Drawer>
          <DrawerTrigger render={<Button variant="outline" />}>
            Open Drawer
          </DrawerTrigger>
          <DrawerContent>
            <div {...custom14}>
              <div {...custom15} />
            </div>
          </DrawerContent>
        </Drawer>
        <Drawer>
          <DrawerTrigger render={<Button variant="outline" />}>
            Header
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Edit profile</DrawerTitle>
              <DrawerDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DrawerDescription>
            </DrawerHeader>
            <div {...custom14}>
              <div {...custom15} />
            </div>
          </DrawerContent>
        </Drawer>
        <Drawer>
          <DrawerTrigger render={<Button variant="outline" />}>
            Footer
          </DrawerTrigger>
          <DrawerContent>
            <div {...custom14}>
              <div {...custom15} />
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose render={<Button variant="outline" />}>
                Cancel
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Drawer>
          <DrawerTrigger render={<Button variant="outline" />}>
            Header and Footer
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Edit profile</DrawerTitle>
              <DrawerDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DrawerDescription>
            </DrawerHeader>
            <div {...custom14}>
              <div {...custom15} />
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose render={<Button variant="outline" />}>
                Cancel
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Drawer>
          <DrawerTrigger render={<Button variant="outline" />}>
            Edge to Edge
          </DrawerTrigger>
          <DrawerContent>
            <div {...custom16} />
          </DrawerContent>
        </Drawer>
      </div>
    </>
  )
}

export function DrawerSwipeHandleExample() {
  return (
    <>
      <div {...custom13}>
        {DRAWER_SIDES.map((side) => (
          <Drawer key={side} swipeDirection={side} showSwipeHandle>
            <DrawerTrigger
              render={<Button variant="outline" {...custom17} />}
            >
              {side}
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle {...custom17}>Drawer</DrawerTitle>
                <DrawerDescription>
                  Drawer with a swipe handle.
                </DrawerDescription>
              </DrawerHeader>
              <div {...custom9}>
                <div {...custom18} />
              </div>
            </DrawerContent>
          </Drawer>
        ))}
      </div>
    </>
  )
}

export function DrawerCustomWidthAndHeight() {
  return (
    <>
      <div {...custom13}>
        <Drawer swipeDirection="down">
          <DrawerTrigger render={<Button variant="outline" />}>
            Down
          </DrawerTrigger>
          <DrawerContent {...custom19}>
            <DrawerHeader>
              <DrawerTitle>Down drawer</DrawerTitle>
              <DrawerDescription>
                Drawer with a custom height.
              </DrawerDescription>
            </DrawerHeader>
            <div {...custom20}>
              {Array.from({ length: 10 }).map((_, index) => (
                <p
                  key={index}
                  {...custom21}
                >
                  {PARAGRAPHS[index % PARAGRAPHS.length]}
                </p>
              ))}
            </div>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline" />}>
                Close
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Drawer swipeDirection="up">
          <DrawerTrigger render={<Button variant="outline" />}>
            Up
          </DrawerTrigger>
          <DrawerContent {...custom22}>
            <DrawerHeader>
              <DrawerTitle>Up drawer</DrawerTitle>
              <DrawerDescription>
                Drawer with a custom height.
              </DrawerDescription>
            </DrawerHeader>
            <div {...custom0}>
              {Array.from({ length: 10 }).map((_, index) => (
                <p
                  key={index}
                  {...custom21}
                >
                  {PARAGRAPHS[index % PARAGRAPHS.length]}
                </p>
              ))}
            </div>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline" />}>
                Close
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Drawer swipeDirection="left">
          <DrawerTrigger render={<Button variant="outline" />}>
            Left
          </DrawerTrigger>
          <DrawerContent {...custom23}>
            <DrawerHeader>
              <DrawerTitle>Left drawer</DrawerTitle>
              <DrawerDescription>Drawer with a custom width.</DrawerDescription>
            </DrawerHeader>
            <div {...custom0}>
              {Array.from({ length: 10 }).map((_, index) => (
                <p
                  key={index}
                  {...custom21}
                >
                  {PARAGRAPHS[index % PARAGRAPHS.length]}
                </p>
              ))}
            </div>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline" />}>
                Close
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Drawer swipeDirection="right">
          <DrawerTrigger render={<Button variant="outline" />}>
            Right
          </DrawerTrigger>
          <DrawerContent {...custom24}>
            <DrawerHeader>
              <DrawerTitle>Right drawer</DrawerTitle>
              <DrawerDescription>Drawer with a custom width.</DrawerDescription>
            </DrawerHeader>
            <div {...custom0}>
              {Array.from({ length: 10 }).map((_, index) => (
                <p
                  key={index}
                  {...custom21}
                >
                  {PARAGRAPHS[index % PARAGRAPHS.length]}
                </p>
              ))}
            </div>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline" />}>
                Close
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  )
}

const DRAWER_SIDES = ["up", "right", "down", "left"] as const

export function DrawerPosition() {
  return (
    <>
      <div {...custom13}>
        {DRAWER_SIDES.map((side) => (
          <Drawer key={side} swipeDirection={side}>
            <DrawerTrigger
              render={<Button variant="outline" {...custom17} />}
            >
              {side}
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Move Goal</DrawerTitle>
                <DrawerDescription>
                  Set your daily activity goal.
                </DrawerDescription>
              </DrawerHeader>
              <div {...custom9}>
                <div {...custom18} />
              </div>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose render={<Button variant="outline" />}>
                  Cancel
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ))}
      </div>
    </>
  )
}

export function DrawerScrollable() {
  return (
    <>
      <div {...custom13}>
        {DRAWER_SIDES.map((side) => (
          <Drawer key={side} swipeDirection={side}>
            <DrawerTrigger
              render={<Button variant="outline" {...custom17} />}
            >
              {side}
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Move Goal</DrawerTitle>
                <DrawerDescription>
                  Set your daily activity goal.
                </DrawerDescription>
              </DrawerHeader>
              <div {...custom0}>
                {Array.from({ length: 20 }).map((_, index) => (
                  <p
                    key={index}
                    {...custom21}
                  >
                    {PARAGRAPHS[index % PARAGRAPHS.length]}
                  </p>
                ))}
              </div>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose render={<Button variant="outline" />}>
                  Cancel
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ))}
      </div>
    </>
  )
}

const SNAP_POINTS = ["31rem", 1]

export function DrawerSnapPoints() {
  return (
    <>
      <Drawer snapPoints={SNAP_POINTS} showSwipeHandle>
        <DrawerTrigger render={<Button variant="outline" />}>
          Open Snap Drawer
        </DrawerTrigger>
        <DrawerContent {...custom25}>
          <DrawerHeader>
            <DrawerTitle>Snap points</DrawerTitle>
            <DrawerDescription>
              Drag the drawer to snap between a compact peek and a near
              full-height view.
            </DrawerDescription>
          </DrawerHeader>
          <div {...custom26}>
            {Array.from({ length: 16 }).map((_, index) => (
              <div key={index} {...custom27} />
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export function DrawerNested() {
  return (
    <>
      <div {...custom13}>
        {DRAWER_SIDES.map((side) => (
          <Drawer key={side} swipeDirection={side} showSwipeHandle>
            <DrawerTrigger
              render={<Button variant="outline" {...custom17} />}
            >
              {side}
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle {...custom17}>{side} drawer</DrawerTitle>
                <DrawerDescription>
                  Open another drawer from the same direction.
                </DrawerDescription>
              </DrawerHeader>
              <div {...custom9}>
                <div {...custom18} />
              </div>
              <DrawerFooter>
                <Drawer swipeDirection={side}>
                  <DrawerTrigger render={<Button />}>
                    Open nested drawer
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Nested drawer</DrawerTitle>
                      <DrawerDescription>
                        The parent drawer stays mounted behind this one.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div {...custom9}>
                      <div {...custom18} />
                    </div>
                    <DrawerFooter>
                      <Drawer swipeDirection={side}>
                        <DrawerTrigger render={<Button />}>
                          Open third drawer
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>Third drawer</DrawerTitle>
                            <DrawerDescription>
                              This is the frontmost drawer in the stack.
                            </DrawerDescription>
                          </DrawerHeader>
                          <div {...custom9}>
                            <div {...custom18} />
                          </div>
                          <DrawerFooter>
                            <DrawerClose render={<Button variant="outline" />}>
                              Close
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                      <DrawerClose render={<Button variant="outline" />}>
                        Close
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
                <DrawerClose render={<Button variant="outline" />}>
                  Close
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ))}
      </div>
    </>
  )
}

export function DrawerNonModal() {
  return (
    <>
      <Drawer modal={false} disablePointerDismissal swipeDirection="right">
        <DrawerTrigger render={<Button variant="outline" />}>
          Non Modal
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Non Modal Drawer</DrawerTitle>
          </DrawerHeader>
          <div {...custom9}>
            <div {...custom18} />
          </div>
          <DrawerFooter>
            <DrawerClose render={<Button variant="outline" />}>
              Close
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
