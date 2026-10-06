import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@accordion";
// @ts-expect-error className unsupported
<Accordion className="test" />;
// @ts-expect-error className unsupported
<AccordionItem className="test" />;
// @ts-expect-error className unsupported
<AccordionTrigger className="test">Trigger</AccordionTrigger>;
// @ts-expect-error className unsupported
<AccordionContent className="test" />;
// @ts-expect-error raw style is not xstyle
<Accordion xstyle={{ width: 200 }} />;
