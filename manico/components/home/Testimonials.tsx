import type { ReactElement } from "react";
import { Reveal } from "@/components/motion/Reveal";

type Testimonial = {
  name: string;
  role: string;
  rating: number;
  text: string;
  initials: string;
  avatarBg: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Priya Sharma",
    role: "Fitness Enthusiast, Mumbai",
    rating: 5,
    text: "The Moringa Sattu is absolutely amazing. I mix it with water every morning and it keeps me full for hours. The taste is mild and pleasant — nothing like the artificial protein powders I used to buy.",
    initials: "PS",
    avatarBg: "var(--color-brand-primary)",
  },
  {
    name: "Rahul Mehta",
    role: "Gym Trainer, Bengaluru",
    rating: 5,
    text: "Switched to Mushroom Coffee after my doctor advised cutting caffeine. Honestly, the taste is better than regular coffee and I get sustained energy without the afternoon crash. Highly recommend!",
    initials: "RM",
    avatarBg: "var(--color-product-coffee)",
  },
  {
    name: "Ananya Krishnan",
    role: "Nutritionist, Chennai",
    rating: 5,
    text: "As a nutritionist, I'm very particular about what I recommend. Manico Harvest ticks every box — clean label, no hidden additives, genuinely high-quality ingredients. The Multi Millet Chilla is a staple in my household.",
    initials: "AK",
    avatarBg: "var(--color-product-chilla)",
  },
];

function Stars({ count }: { count: number }): ReactElement {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < count ? "var(--color-brand-accent)" : "none"}
          stroke={i < count ? "var(--color-brand-accent)" : "var(--color-border)"}
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials(): ReactElement {
  return (
    <section className="py-20" style={{ background: "var(--color-bg-base)" }}>
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <Reveal className="text-center mb-12">
          <p className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: "var(--color-brand-accent)" }}>
            REAL REVIEWS
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "var(--color-brand-primary)" }}>
            What Our Community Says
          </h2>
          <p className="text-sm text-secondary">Join 10,000+ customers who made the switch to clean nutrition.</p>
        </Reveal>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.name}
              as="article"
              delay={i * 100}
              className="flex flex-col rounded-2xl p-6 transition-all hover:-translate-y-1"
              style={{
                background: "var(--color-bg-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-md)",
                transitionDuration: "var(--duration-base)",
              }}
            >
              <Stars count={t.rating} />

              <p
                className="text-sm leading-relaxed mt-4 mb-6 flex-1"
                style={{ color: "var(--color-text-secondary)", lineHeight: "1.75" }}
              >
                &ldquo;{t.text}&rdquo;
              </p>

              <div
                className="flex items-center gap-3 pt-4"
                style={{ borderTop: "1px solid var(--color-border)" }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-inverse shrink-0"
                  style={{ background: t.avatarBg }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "var(--color-brand-primary)" }}>
                    {t.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Stats bar */}
        <Reveal
          variant="scale"
          className="rounded-2xl px-8 py-8 flex flex-wrap items-center justify-around gap-8"
          style={{
            background: "var(--color-brand-primary)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          {[
            { value: "10,000+", label: "Happy Customers" },
            { value: "4.9 ★", label: "Average Rating" },
            { value: "100%", label: "Natural Ingredients" },
            { value: "5", label: "Premium Products" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-3xl font-bold mb-1"
                style={{ color: "var(--color-bg-base)" }}
              >
                {stat.value}
              </p>
              <p className="text-sm font-medium" style={{ color: "rgba(247,236,217,0.65)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </Reveal>

      </div>
    </section>
  );
}
