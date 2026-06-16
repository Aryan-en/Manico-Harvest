"use client";

import type { ReactElement } from "react";
import { useState } from "react";

export function Newsletter(): ReactElement {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="py-20 bg-primary">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">

          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest mb-6"
            style={{
              background: "rgba(219,81,0,0.2)",
              color: "var(--color-brand-accent)",
              border: "1px solid rgba(219,81,0,0.35)",
            }}
          >
            EXCLUSIVE OFFER
          </div>

          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "var(--color-bg-base)" }}
          >
            Get 10% Off Your First Order
          </h2>
          <p
            className="text-base mb-10"
            style={{ color: "rgba(247,236,217,0.7)", lineHeight: "1.7" }}
          >
            Join our community of health-conscious food lovers. Get recipes,
            nutrition tips, and early access to new products.
          </p>

          {submitted ? (
            <div
              className="flex items-center justify-center gap-3 rounded-xl px-6 py-4 mx-auto max-w-md"
              style={{ background: "rgba(22,163,74,0.15)", border: "1px solid rgba(22,163,74,0.3)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <p className="font-semibold" style={{ color: "var(--color-bg-base)" }}>
                You&apos;re in! Check your inbox for your discount code.
              </p>
            </div>
          ) : (
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={handleSubmit}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                inputMode="email"
                placeholder="Your email address"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-lg text-foreground placeholder:text-disabled outline-none bg-surface border"
                style={{
                  padding: "var(--space-input)",
                  borderColor: "var(--color-border)",
                  fontSize: "var(--text-base)",
                }}
              />
              <button
                type="submit"
                className="shrink-0 rounded-lg font-semibold text-inverse transition-all active:scale-[0.98] bg-accent hover:bg-accent-hover"
                style={{ padding: "var(--space-button-md)", transitionDuration: "var(--duration-fast)" }}
              >
                Subscribe
              </button>
            </form>
          )}

          <p
            className="text-xs mt-4"
            style={{ color: "rgba(247,236,217,0.45)" }}
          >
            No spam. Unsubscribe anytime. Your email is safe with us.
          </p>

        </div>
      </div>
    </section>
  );
}
