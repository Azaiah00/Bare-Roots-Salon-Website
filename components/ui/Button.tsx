import Link from "next/link";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

type Variant = "gold" | "dark" | "outline" | "ghost";

const VARIANT: Record<Variant, string> = {
  gold: "btn-gold",
  dark: "btn-dark",
  outline: "btn-outline",
  ghost: "btn-ghost",
};

type Shared = {
  variant?: Variant;
  size?: "sm" | "md";
  icon?: IconName;
  iconBefore?: IconName;
  className?: string;
  children: React.ReactNode;
};

function classes({ variant = "gold", size = "md", className }: Shared) {
  return cn("btn", VARIANT[variant], size === "sm" && "btn-sm", className);
}

export function Button({
  onClick,
  type = "button",
  disabled,
  ...rest
}: Shared & {
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes(rest)}>
      {rest.iconBefore && <Icon name={rest.iconBefore} className="size-4" />}
      {rest.children}
      {rest.icon && <Icon name={rest.icon} className="size-4" />}
    </button>
  );
}

export function ButtonLink({
  href,
  external,
  ...rest
}: Shared & { href: string; external?: boolean }) {
  const body = (
    <>
      {rest.iconBefore && <Icon name={rest.iconBefore} className="size-4" />}
      {rest.children}
      {rest.icon && <Icon name={rest.icon} className="size-4" />}
      {external && !rest.icon && <Icon name="external" className="size-4" />}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes(rest)}>
        {body}
      </a>
    );
  }
  return (
    <Link href={href} className={classes(rest)}>
      {body}
    </Link>
  );
}
