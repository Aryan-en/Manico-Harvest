'use client';

import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import posthog from "posthog-js";

export function HeroSection(): ReactElement {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--color-bg-base)", minHeight: "calc(100vh - 104px)" }}
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(42,70,16,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 20% 80%, rgba(219,81,0,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* ── Left: Text ── */}
          <div className="flex-1 min-w-0 text-center lg:text-left order-2 lg:order-1">

            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] mb-6 animate-fade-in"
              style={{
                background: "rgba(42,70,16,0.08)",
                color: "var(--color-brand-accent)",
                border: "1px solid rgba(42,70,16,0.15)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--color-brand-accent)" }}
              />
              NOURISHING TRADITIONS
            </div>

            <h1
              className="font-bold tracking-tight mb-5 text-primary animate-fade-in"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)", lineHeight: "1.08", animationDelay: "80ms" }}
            >
              Ancient Wisdom.
              <br />
              <em className="not-italic text-accent">Modern Nutrition.</em>
            </h1>

            <p
              className="text-lg mb-8 max-w-md mx-auto lg:mx-0 text-secondary animate-fade-in"
              style={{ lineHeight: "1.75", animationDelay: "160ms" }}
            >
              Premium functional foods crafted from nature&apos;s finest ingredients.
              No artificial preservatives. No added sugar. Just real nutrition.
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-10 animate-fade-in"
              style={{ animationDelay: "240ms" }}
            >
              <Link
                href="/shop"
                className="flex items-center justify-center gap-2 w-full sm:w-auto font-semibold text-inverse rounded-xl transition-all active:scale-[0.98] bg-accent hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-lg"
                style={{ padding: "14px 28px", transitionDuration: "var(--duration-base)", fontSize: "15px" }}
                onClick={() => posthog.capture('shop_all_products_clicked', { source: 'hero' })}
              >
                Shop All Products
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="flex items-center justify-center gap-2 w-full sm:w-auto font-semibold rounded-xl transition-all active:scale-[0.98] hover:-translate-y-0.5 hover:bg-[rgba(42,70,16,0.06)]"
                style={{
                  padding: "13px 28px",
                  fontSize: "15px",
                  border: "1.5px solid var(--color-brand-primary)",
                  color: "var(--color-brand-primary)",
                  transitionDuration: "var(--duration-base)",
                }}
              >
                Our Story
              </Link>
            </div>

            {/* Trust badges */}
            <div
              className="flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 animate-fade-in"
              style={{ animationDelay: "320ms" }}
            >
              {["100% Natural", "No Preservatives", "Plant Based Protein"].map((tag) => (
                <span key={tag} className="flex items-center gap-1.5 text-sm font-medium text-primary">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: Product Visual ── */}
          <div className="w-full lg:w-[460px] shrink-0 order-1 lg:order-2">
            <div className="relative">

              {/* Main hero product */}
              <div
                className="relative rounded-3xl overflow-hidden mx-auto animate-scale-in"
                style={{
                  aspectRatio: "4/5",
                  maxWidth: "420px",
                  background: "linear-gradient(145deg, #f0e4cc 0%, var(--color-bg-base) 60%)",
                  boxShadow: "0 32px 64px rgba(42,70,16,0.14), 0 8px 24px rgba(42,70,16,0.08)",
                  animationDelay: "100ms",
                }}
              >
                <Image
                  src="/images/products/moringa-sattu.jpg"
                  alt="Moringa Sattu — 250g plant-based protein"
                  fill
                  className="object-contain p-6"
                  priority
                  sizes="(max-width: 1024px) 90vw, 420px"
                />
              </div>

              {/* Floating badge — Mushroom Coffee */}
              <div
                className="absolute -bottom-4 -left-2 sm:-left-6 flex items-center gap-3 rounded-2xl p-3 bg-surface animate-float"
                style={{
                  boxShadow: "var(--shadow-xl)",
                  border: "1px solid var(--color-border)",
                  maxWidth: "190px",
                  animationDelay: "0.2s",
                }}
              >
                <div
                  className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0"
                  style={{ background: "var(--color-bg-base)" }}
                >
                  <Image
                    src="/images/products/mushroom-coffee.jpg"
                    alt="Mushroom Coffee"
                    fill
                    className="object-contain p-1"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-primary leading-tight">Mushroom Coffee</p>
                  <p className="text-xs text-secondary mt-0.5">₹399 · 100g</p>
                </div>
              </div>

              {/* Floating badge — Millet Chilla */}
              <div
                className="absolute -top-4 -right-2 sm:-right-6 flex items-center gap-3 rounded-2xl p-3 bg-surface animate-float"
                style={{
                  boxShadow: "var(--shadow-xl)",
                  border: "1px solid var(--color-border)",
                  maxWidth: "190px",
                  animationDelay: "1.1s",
                }}
              >
                <div
                  className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0"
                  style={{ background: "var(--color-bg-base)" }}
                >
                  <Image
                    src="/images/products/mushroom-chilla.jpg"
                    alt="Millet Mushroom Chilla"
                    fill
                    className="object-contain p-1"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-primary leading-tight">Millet Chilla</p>
                  <p className="text-xs text-secondary mt-0.5">₹249 · 250g</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
