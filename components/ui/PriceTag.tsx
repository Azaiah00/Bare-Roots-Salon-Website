import { cn } from "@/lib/cn";
import { formatPrice, type Service } from "@/lib/services";
import { Icon } from "./Icon";

/**
 * A price set in italic display type turns a number into a jewel — and the
 * `priceStatus` flag turns an unconfirmed number into an honest one.
 *
 * DO NOT remove the marker to make a screenshot look cleaner. The whole point
 * is that Iisha and Sabrina can scan the menu and see exactly which figures
 * they still owe us.
 */
export default function PriceTag({
  service,
  dark,
  size = "md",
}: {
  service: Service;
  dark?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const pending = service.priceStatus === "needs-confirmation" && service.price > 0;
  const SIZE = {
    sm: "text-base2",
    md: "text-d4",
    lg: "text-d3",
  } as const;

  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span
        className={cn(
          "font-display italic tabular-nums",
          SIZE[size],
          dark ? "text-gold" : size === "lg" ? "text-bronze" : "text-bronze-ink",
          service.price === 0 && "not-italic",
        )}
      >
        {formatPrice(service)}
      </span>
      {pending && (
        <span
          className={cn("badge border-0 px-0 text-[0.625rem]", dark ? "text-gilt" : "text-bronze-ink")}
          title="This price has not been confirmed by the artist yet."
        >
          <Icon name="info" className="size-3" />
          To confirm
        </span>
      )}
    </span>
  );
}
