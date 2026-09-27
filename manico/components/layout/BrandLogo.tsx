import Image from "next/image";
import type { ReactElement } from "react";
import logoImage from "../../app/fav.jpeg";

type BrandLogoProps = {
  size?: "sm" | "md" | "lg";
  boxed?: boolean;
};

const MARK_SIZE_CLASSES = {
  sm: "h-10 w-10",
  md: "h-11 w-11 sm:h-12 sm:w-12",
  lg: "h-14 w-14 sm:h-16 sm:w-16",
} satisfies Record<NonNullable<BrandLogoProps["size"]>, string>;

const TITLE_SIZE_CLASSES = {
  sm: "text-base font-bold",
  md: "text-lg sm:text-xl font-extrabold",
  lg: "text-2xl sm:text-3xl font-extrabold",
} satisfies Record<NonNullable<BrandLogoProps["size"]>, string>;

const SUBTITLE_SIZE_CLASSES = {
  sm: "text-[11px] font-semibold tracking-wider",
  md: "text-xs font-bold tracking-widest",
  lg: "text-sm font-bold tracking-widest",
} satisfies Record<NonNullable<BrandLogoProps["size"]>, string>;

export function BrandLogo({ size = "md", boxed = false }: BrandLogoProps): ReactElement {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-2.5 sm:gap-3 transition-transform duration-200 ${
        boxed
          ? "rounded-2xl px-3 py-1.5"
          : ""
      }`}
      aria-hidden="true"
    >
      <span
        className={`relative block shrink-0 overflow-hidden rounded-full bg-base shadow-sm ring-2 ring-white/20 ${MARK_SIZE_CLASSES[size]}`}
      >
        <Image
          src={logoImage}
          alt=""
          fill
          sizes={size === "sm" ? "40px" : size === "lg" ? "64px" : "48px"}
          className="object-contain p-0.5"
          priority={size === "md"}
        />
      </span>
      <span className="flex flex-col leading-none gap-0.5">
        <span className={`tracking-wide text-inverse ${TITLE_SIZE_CLASSES[size]}`}>
          Manico
        </span>
        <span className={`text-accent uppercase ${SUBTITLE_SIZE_CLASSES[size]}`}>
          Harvest
        </span>
      </span>
    </span>
  );
}
