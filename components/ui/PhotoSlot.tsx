import Image from "next/image";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

/**
 * The honest-gap marker.
 *
 * When `src` is null there is no photograph yet, and rather than reaching for
 * stock or quietly shrinking the layout, the slot renders at the right size and
 * prints the shooting brief inside it. The gap becomes a task with an owner.
 *
 * `concept` marks an image that exists but is a render standing in for real
 * work — it shows and looks finished, with a small corner flag so nobody in the
 * room mistakes it for the salon's portfolio.
 */
export default function PhotoSlot({
  src,
  alt,
  brief,
  ratio = "4/5",
  sizes = "(min-width: 1024px) 30vw, 90vw",
  priority,
  concept,
  className,
  imgClassName,
  dark,
}: {
  src: string | null;
  alt: string;
  brief?: string;
  ratio?: "4/5" | "1/1" | "3/2" | "16/9" | "3/4";
  sizes?: string;
  priority?: boolean;
  concept?: boolean;
  className?: string;
  imgClassName?: string;
  dark?: boolean;
}) {
  const RATIO: Record<string, string> = {
    "4/5": "aspect-[4/5]",
    "1/1": "aspect-square",
    "3/2": "aspect-[3/2]",
    "16/9": "aspect-video",
    "3/4": "aspect-[3/4]",
  };

  if (!src) {
    return (
      <div
        className={cn(
          RATIO[ratio],
          "marker relative flex flex-col items-center justify-center gap-3 p-6 text-center",
          dark && "marker-dark",
          className,
        )}
      >
        <Icon name="camera" className="size-7" strokeWidth={1.2} />
        <p className="eyebrow">Needs real photo</p>
        {brief && (
          <p className="max-w-[34ch] text-xs2 font-normal leading-relaxed opacity-90">
            {brief}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={cn(RATIO[ratio], "relative overflow-hidden rounded-xs2", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", imgClassName)}
      />
      {concept && (
        <span className="badge absolute bottom-3 left-3 border-gilt/70 bg-ink/90 text-gilt backdrop-blur-sm">
          Concept image
        </span>
      )}
    </div>
  );
}
