import Link from "next/link";
import { type Product, priceLabel } from "@/lib/products";
import PhotoSlot from "@/components/ui/PhotoSlot";
import { cn } from "@/lib/cn";

export default function ProductCard({
  product,
  dark,
  sizes = "(min-width: 1024px) 22vw, (min-width: 640px) 44vw, 90vw",
}: {
  product: Product;
  dark?: boolean;
  sizes?: string;
}) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className={cn(
        "card-hover group flex h-full flex-col overflow-hidden rounded-panel border",
        dark ? "border-white/12 bg-white/[0.04]" : "border-ink/12 bg-paper",
      )}
    >
      <PhotoSlot
        src={product.image}
        alt={`${product.name} — ${product.blurb}.`}
        brief={product.image ? undefined : product.photoBrief}
        ratio="1/1"
        sizes={sizes}
        dark={dark}
        className="rounded-none"
      />

      <div className="flex flex-1 flex-col p-6">
        {product.badge && (
          <span
            className={cn(
              "badge self-start",
              product.available
                ? dark
                  ? "border-white/28 text-cream-dim"
                  : "border-ink/20 text-ink-soft"
                : dark
                  ? "border-gilt/60 text-gilt"
                  : "border-bronze-ink/50 text-bronze-ink",
            )}
          >
            {product.badge}
          </span>
        )}

        <h3
          className={cn(
            "mt-4 font-display text-d4 transition-colors duration-base ease-brand",
            dark ? "text-paper group-hover:text-gilt" : "text-ink group-hover:text-bronze-ink",
          )}
        >
          {product.name}
        </h3>

        <p className={cn("mt-2 flex-1 text-sm2", dark ? "text-cream-dim" : "text-ink-soft")}>
          {product.blurb}
        </p>

        <p className="mt-5 flex items-baseline justify-between gap-3">
          <span
            className={cn(
              "font-display text-d4 italic tabular-nums",
              dark ? "text-gold" : "text-bronze-ink",
            )}
          >
            {priceLabel(product)}
          </span>
          {product.size && (
            <span className={cn("text-xs2", dark ? "text-cream-dim" : "text-ink-soft")}>
              {product.size}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}
