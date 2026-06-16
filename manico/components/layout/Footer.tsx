import Link from "next/link";
import type { ReactElement } from "react";
import { BrandLogo } from "./BrandLogo";

const FOOTER_LINKS = {
  Shop: [
    { label: "Moringa Sattu", href: "/shop/moringa-sattu" },
    { label: "Mushroom Coffee", href: "/shop/mushroom-coffee" },
    { label: "Multi Millet Chilla", href: "/shop/multi-millet-chilla" },
    { label: "All Products", href: "/shop" },
  ],
  Company: [
    { label: "Our Story", href: "/about" },
    { label: "Benefits", href: "/benefits" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Help: [
    { label: "Shipping Policy", href: "/shipping" },
    { label: "Returns & Refunds", href: "/returns" },
    { label: "Track Order", href: "/track" },
    { label: "FAQ", href: "/faq" },
  ],
};

export function Footer(): ReactElement {
  return (
    <footer style={{ background: "var(--color-brand-primary)" }}>
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="Manico Harvest home" className="mb-4 inline-flex">
              <BrandLogo size="lg" />
            </Link>
            <p
              className="text-sm leading-relaxed mb-6 max-w-xs"
              style={{ color: "rgba(247,236,217,0.6)" }}
            >
              Nourishing traditions. Premium functional foods crafted from nature&apos;s finest ingredients, rooted in Ayurvedic wisdom.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                {
                  label: "Instagram",
                  href: "https://instagram.com",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                    </svg>
                  ),
                },
                {
                  label: "Facebook",
                  href: "https://facebook.com",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  ),
                },
                {
                  label: "YouTube",
                  href: "https://youtube.com",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                  style={{
                    background: "var(--color-brand-muted)",
                    color: "rgba(247,236,217,0.7)",
                    transitionDuration: "var(--duration-fast)",
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3
                className="font-semibold text-sm mb-4 tracking-wider"
                style={{ color: "var(--color-inverse)" }}
              >
                {heading.toUpperCase()}
              </h3>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors"
                      style={{
                        color: "rgba(247,236,217,0.6)",
                        transitionDuration: "var(--duration-fast)",
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="h-px mb-8"
          style={{ background: "rgba(247,236,217,0.12)" }}
          aria-hidden="true"
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "rgba(247,236,217,0.4)" }}>
            © {new Date().getFullYear()} Manico Harvest. All rights reserved. Made with ❤️ in India.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service"].map((label) => (
              <a
                key={label}
                href={`/${label.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-xs transition-colors"
                style={{
                  color: "rgba(247,236,217,0.4)",
                  transitionDuration: "var(--duration-fast)",
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
