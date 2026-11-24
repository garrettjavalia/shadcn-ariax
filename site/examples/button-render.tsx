import { buttonProps } from "@button";

export default function ButtonRender() {
  return (
    <a
      href="https://github.com/login"
      {...buttonProps({ variant: "secondary", size: "sm" })}
    >
      Login
    </a>
  );
}
