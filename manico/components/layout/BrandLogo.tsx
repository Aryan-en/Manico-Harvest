import Image from "next/image";
import type { ReactElement } from "react";
import logoImage from "../../app/fav.jpeg";

type BrandLogoProps = {
  size?: "sm" | "md" | "lg";
};

const MARK_SIZE_CLASSES = {
  sm: "h-9 w-9",
  md: "h-10 w-10",
  lg: "h-12 w-12",
} satisfies Record<NonNullable<BrandLogoProps["size"]>, string>;

const TEXT_SIZE_CLASSES = {
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
} satisfies Record<NonNullable<BrandLogoProps["size"]>, string>;

export function BrandLogo({ size = "md" }: BrandLogoProps): ReactElement {
  return (
    <span className="inline-flex shrink-0 items-center gap-2.5" aria-hidden="true">
      <span
        className={`relative block shrink-0 overflow-hidden rounded-full bg-base shadow-sm ${MARK_SIZE_CLASSES[size]}`}
      >
        <Image
          src={logoImage}
          alt=""
          fill
          sizes={size === "sm" ? "36px" : size === "lg" ? "48px" : "40px"}
          className="object-cover"
          priority={size === "md"}
          style={{
            objectPosition: "50% 30%",
            transform: "scale(1.68)",
          }}
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-bold tracking-wide text-inverse ${TEXT_SIZE_CLASSES[size]}`}>
          Manico
        </span>
        <span className="text-xs font-semibold tracking-wide text-accent">Harvest</span>
      </span>
    </span>
  );
}
