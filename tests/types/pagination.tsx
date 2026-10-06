import { Pagination, PaginationLink, PaginationPrevious } from "@pagination";
<PaginationLink
  href="#"
  isActive
  isDisabled
  style={({ isHovered }) => ({ opacity: isHovered ? 0.5 : 1 })}
/>;
<PaginationPrevious href="#" text="Back" size={null} />;
// @ts-expect-error external className is unsupported
<Pagination className="w-full" />;
// @ts-expect-error variant is determined by isActive
<PaginationLink href="#" variant="secondary" />;
