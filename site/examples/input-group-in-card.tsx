import { useState } from "react";
import { ExternalLinkIcon, MailIcon } from "lucide-react";

import { Button } from "@button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@card";
import { Field, FieldGroup, FieldLabel } from "@field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@input-group";

export default function InputGroupInCard() {
  const [feedback, setFeedback] = useState("");
  return (
    <Card style={{ width: "100%" }}>
      <CardHeader>
        <CardTitle>Card with Input Group</CardTitle>
        <CardDescription>This is a card with an input group.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email-input">Email Address</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="email-input"
                type="email"
                placeholder="you@example.com"
              />
              <InputGroupAddon align="inline-end">
                <MailIcon />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="website-input">Website URL</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>https://</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput id="website-input" placeholder="example.com" />
              <InputGroupAddon align="inline-end">
                <ExternalLinkIcon />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="feedback-textarea">
              Feedback & Comments
            </FieldLabel>
            <InputGroup>
              <InputGroupTextarea
                id="feedback-textarea"
                maxLength={500}
                value={feedback}
                onChange={(e) => setFeedback(e.currentTarget.value)}
                placeholder="Share your thoughts..."
                style={{ minHeight: 100 }}
              />
              <InputGroupAddon align="block-end">
                <InputGroupText>
                  {feedback.length}/500 characters
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter style={{ justifyContent: "flex-end", gap: ".5rem" }}>
        <Button variant="outline">Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
}
