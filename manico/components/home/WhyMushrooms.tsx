'use client';

import type { ReactElement } from "react";
import { Brain, Zap, Shield, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

type MushroomBenefit = {
  icon: ReactElement;
  title: string;
  subtitle: string;
  description: string;
  colorClass: string;
};

const BENEFITS: MushroomBenefit[] = [
  {
    icon: <Brain className="w-5 h-5" />,
    title: "Lion's Mane",
    subtitle: "Focus & Neural Clarity",
    description: "Stimulates Nerve Growth Factor (NGF) production to support focus, cognitive function, memory, and long-term brain health.",
    colorClass: "rgba(61, 36, 9, 0.08)", // Warm brown tone matching coffee
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Cordyceps",
    subtitle: "Cellular Energy & Vitality",
    description: "Enhances oxygen absorption and cellular ATP production, providing natural, jitter-free endurance and stamina.",
    colorClass: "rgba(219, 81, 0, 0.08)", // Accent orange tone
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "Reishi",
    subtitle: "Calm & Adaptogenic Balance",
    description: "Known as the 'Mushroom of Immortality,' it calms the nervous system, supports sleep, and helps the body adapt to daily stress.",
    colorClass: "rgba(42, 70, 16, 0.08)", // Primary green tone
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Chaga",
    subtitle: "Antioxidant & Immune Defense",
    description: "One of the richest sources of antioxidants in nature. Rich in beta-glucans to support, modulate, and strengthen your immune system.",
    colorClass: "rgba(28, 48, 9, 0.08)", // Muted deep green
  },
];

export function WhyMushrooms(): ReactElement {
  return (
    <section className="py-20" style={{ background: "var(--color-bg-base)" }}>
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        
        {/* Upper Title & Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16">
          <div className="lg:col-span-5">
            <Reveal>
              <span 
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider mb-4"
                style={{ background: "rgba(42,70,16,0.08)", color: "var(--color-brand-primary)" }}
              >
                🌿 BIOLOGICAL SUPERPOWERS
              </span>
              <h2 
                className="text-3xl sm:text-4xl font-bold tracking-tight"
                style={{ color: "var(--color-brand-primary)", lineHeight: "1.2" }}
              >
                Why Functional Mushrooms?
              </h2>
            </Reveal>
          </div>
          
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <p 
                className="text-base sm:text-lg text-secondary leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                For millennia, ancient wellness traditions have revered functional mushrooms as nature’s primary adaptogens. Unlike typical store-bought varieties, these forest powerhouses contain specialized bioactive compounds like <strong>beta-glucans</strong> and <strong>triterpenes</strong>. They work in synergy with your body&apos;s natural systems to modulate stress responses, unlock clean cellular energy, restore cognitive clarity, and reinforce immune resilience. At Manico Harvest, we blend these pure, concentrated mushroom extracts into your daily diet so you can perform, recover, and thrive without compromise.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((benefit, idx) => (
            <Reveal 
              key={benefit.title} 
              delay={idx * 100}
              className="flex flex-col h-full rounded-2xl p-6 bg-surface border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ 
                borderColor: "var(--color-border)",
                background: "var(--color-bg-surface)"
              }}
            >
              {/* Icon Container */}
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ 
                  background: benefit.colorClass, 
                  color: "var(--color-brand-primary)" 
                }}
              >
                {benefit.icon}
              </div>

              {/* Title & Subtitle */}
              <h3 
                className="text-lg font-bold mb-1"
                style={{ color: "var(--color-brand-primary)" }}
              >
                {benefit.title}
              </h3>
              <p 
                className="text-xs font-semibold uppercase tracking-wider mb-4"
                style={{ color: "var(--color-brand-accent)" }}
              >
                {benefit.subtitle}
              </p>

              {/* Description */}
              <p 
                className="text-sm leading-relaxed text-secondary mt-auto"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {benefit.description}
              </p>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
