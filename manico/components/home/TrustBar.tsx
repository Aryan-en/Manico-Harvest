import type { ReactElement } from "react";

type TrustItem = {
  label: string;
  icon: ReactElement;
};

const TRUST_ITEMS: TrustItem[] = [
  {
    label: "Plant Based",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c0 0-8-4-8-10a8 8 0 0116 0c0 6-8 10-8 10z" />
      </svg>
    ),
  },
  {
    label: "High Fiber",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    label: "No Added Sugar",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
  },
  {
    label: "100% Natural",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    label: "No Preservatives",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
];

export function TrustBar(): ReactElement {
  return (
    <section
      className="py-5"
      style={{ background: "var(--color-brand-primary)" }}
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-12">
          {TRUST_ITEMS.map((item, i) => (
            <li
              key={item.label}
              className="flex items-center gap-2.5"
            >
              <span style={{ color: "var(--color-brand-accent)" }}>{item.icon}</span>
              <span
                className="text-sm font-semibold tracking-wide"
                style={{ color: "var(--color-bg-base)" }}
              >
                {item.label}
              </span>
              {i < TRUST_ITEMS.length - 1 && (
                <span
                  className="hidden lg:block ml-8 h-4 w-px"
                  style={{ background: "rgba(247,236,217,0.2)" }}
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
