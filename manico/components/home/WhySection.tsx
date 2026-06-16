import Image from "next/image";
import type { ReactElement } from "react";

type Feature = {
  icon: ReactElement;
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22c0 0-8-4-8-10a8 8 0 0116 0c0 6-8 10-8 10z" />
      </svg>
    ),
    title: "Made with Wholesome Herbs",
    description:
      "Every product is crafted with time-tested Ayurvedic herbs and superfoods — moringa, basil seeds, functional mushrooms — sourced with care.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Ready in Minutes",
    description:
      "Busy schedule? Our products fit seamlessly into your routine. Quick to prepare, nutrient-dense, and genuinely delicious.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    title: "Highly Recommended for Gym Enthusiasts",
    description:
      "High in plant-based protein and fiber. Fuel your workouts and recovery with clean, functional nutrition without synthetic additives.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "Clean Label. Zero Compromise.",
    description:
      "No artificial colours, flavours, or preservatives. No added salt or sugar. What you see on the label is exactly what&apos;s in the pack.",
  },
];

export function WhySection(): ReactElement {
  return (
    <section className="py-20 overflow-hidden" style={{ background: "var(--color-bg-subtle)" }}>
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

          {/* Left — Image stack */}
          <div className="relative w-full lg:w-[380px] shrink-0 flex justify-center">
            <div className="relative w-64 h-80 sm:w-72 sm:h-96">
              {/* Back card */}
              <div
                className="absolute bottom-0 right-0 w-52 h-64 rounded-2xl overflow-hidden"
                style={{
                  background: "linear-gradient(145deg, #f5ead6 0%, var(--color-bg-base) 100%)",
                  boxShadow: "var(--shadow-md)",
                  transform: "rotate(6deg) translateX(12px)",
                }}
              >
                <Image
                  src="/images/products/mushroom-moringa-infusion.jpg"
                  alt="Mushroom Moringa Infusion"
                  fill
                  className="object-contain p-4"
                  sizes="208px"
                />
              </div>
              {/* Front card */}
              <div
                className="absolute top-0 left-0 w-52 h-64 rounded-2xl overflow-hidden"
                style={{
                  background: "linear-gradient(145deg, #f5ead6 0%, var(--color-bg-base) 100%)",
                  boxShadow: "var(--shadow-xl)",
                  transform: "rotate(-3deg)",
                }}
              >
                <Image
                  src="/images/products/mushroom-quinoa-dosa.jpg"
                  alt="Mushroom Quinoa Dosa Mix"
                  fill
                  className="object-contain p-4"
                  sizes="208px"
                />
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div className="flex-1 min-w-0">
            <p
              className="text-xs font-bold tracking-[0.2em] mb-3"
              style={{ color: "var(--color-brand-accent)" }}
            >
              WHY MANICO HARVEST
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ color: "var(--color-brand-primary)" }}
            >
              Food That Works as Hard as You Do
            </h2>
            <p
              className="text-base mb-10 max-w-lg"
              style={{ color: "var(--color-text-secondary)", lineHeight: "1.75" }}
            >
              We believe nutrition shouldn&apos;t be complicated. Our products bring
              the wisdom of ancient grains and herbs into your modern day —
              simple, clean, and effective.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="flex gap-4 rounded-xl p-5"
                  style={{
                    background: "var(--color-bg-surface)",
                    border: "1px solid var(--color-border)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "rgba(42,70,16,0.08)", color: "var(--color-brand-primary)" }}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-sm mb-1.5 leading-snug"
                      style={{ color: "var(--color-brand-primary)" }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)", lineHeight: "1.65" }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="/about"
              className="inline-flex items-center gap-2 font-semibold text-inverse rounded-xl transition-all active:scale-[0.98]"
              style={{
                background: "var(--color-brand-primary)",
                padding: "13px 24px",
                transitionDuration: "var(--duration-fast)",
              }}
            >
              Learn Our Story
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
