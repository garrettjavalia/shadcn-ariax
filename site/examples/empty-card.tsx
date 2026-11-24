import { Card, CardContent } from "@card";
import { ArrowUpRightIcon, FolderIcon } from "lucide-react";

import { Button, LinkButton } from "@button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@empty";

export default function EmptyInCard() {
  return (
    <Card>
      <CardContent>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderIcon />
            </EmptyMedia>
            <EmptyTitle>No projects yet</EmptyTitle>
            <EmptyDescription>
              You haven&apos;t created any projects yet. Get started by creating
              your first project.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <LinkButton href="#">Create project</LinkButton>
              <Button variant="outline">Import project</Button>
            </div>
            <LinkButton
              href="#"
              variant="link"
              style={{ color: "var(--muted-foreground)" }}
            >
              Learn more <ArrowUpRightIcon />
            </LinkButton>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  );
}
