'use client';

import type { ReactElement } from "react";
import { Reveal } from "@/components/motion/Reveal";

export function QuoteSection(): ReactElement {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "var(--color-brand-primary)" }}>
      {/* Background radial highlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle 500px at 50% 50%, rgba(219,81,0,0.06) 0%, transparent 80%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Quote Icon representation */}
          <Reveal>
            <span 
              className="inline-flex items-center justify-center text-5xl font-serif text-accent mb-6 leading-none select-none"
              style={{ color: "var(--color-brand-accent)", fontFamily: "Georgia, serif" }}
            >
              “
            </span>
          </Reveal>

          {/* Quote Text */}
          <Reveal delay={100}>
            <blockquote 
              className="text-2xl sm:text-3xl md:text-4xl italic font-medium tracking-wide mb-6 px-4"
              style={{ 
                color: "var(--color-bg-base)", 
                fontFamily: "Georgia, serif", 
                lineHeight: "1.4" 
              }}
            >
              Let food be thy medicine and medicine be thy food.
            </blockquote>
          </Reveal>

          {/* Author */}
          <Reveal delay={200}>
            <cite 
              className="block text-sm sm:text-base font-semibold uppercase tracking-widest not-italic mb-10"
              style={{ color: "var(--color-brand-accent)" }}
            >
              — Hippocrates
            </cite>
          </Reveal>

          {/* Divider */}
          <Reveal delay={250}>
            <div 
              className="w-12 h-[1px] mx-auto mb-10"
              style={{ background: "rgba(247, 236, 217, 0.25)" }}
            />
          </Reveal>

          {/* Supportive text */}
          <Reveal delay={300}>
            <p 
              className="text-base sm:text-lg max-w-xl mx-auto font-medium"
              style={{ color: "rgba(247, 236, 217, 0.85)", lineHeight: "1.75" }}
            >
              True vitality begins from within. By choosing clean superfoods, functional grains, and adaptogenic herbs, we fuel our bodies, strengthen our minds, and align with nature&apos;s innate intelligence.
            </p>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
