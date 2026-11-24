import { Calendar } from "@calendar";
import { Card, CardContent } from "@card";

export default function CalendarMultiple() {
  return (
    <Card style={{ marginInline: "auto", width: "fit-content", padding: 0 }}>
      <CardContent style={{ padding: 0 }}>
        <Calendar selectionMode="multiple" />
      </CardContent>
    </Card>
  );
}
