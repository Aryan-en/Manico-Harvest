"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandLogo } from "./BrandLogo";

const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Our Story", href: "/about" },
  { label: "Benefits", href: "/benefits" },
  { label: "Contact", href: "/contact" },
];

export function NavbarMobileMenu(): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
        className="lg:hidden flex items-center justify-center w-11 h-11 rounded-lg text-inverse transition-colors"
        style={{ background: isOpen ? "var(--color-brand-muted)" : "transparent" }}
      >
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 flex lg:hidden"
          style={{ zIndex: "var(--z-drawer)" }}
        >
          <button
            aria-label="Close menu"
            className="absolute inset-0 w-full h-full cursor-default"
            style={{ background: "var(--color-bg-overlay)" }}
            onClick={() => setIsOpen(false)}
          />
          <nav
            className="relative flex flex-col w-72 h-full bg-primary shadow-xl"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: "var(--color-brand-muted)" }}>
              <Link href="/" aria-label="Manico Harvest home" onClick={() => setIsOpen(false)}>
                <BrandLogo size="sm" />
              </Link>
              <button
                aria-label="Close menu"
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-inverse"
                style={{ background: "var(--color-brand-muted)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <ul className="flex flex-col px-4 py-6 gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center px-4 py-3 rounded-lg text-inverse font-medium text-md transition-colors"
                    style={{ transitionDuration: "var(--duration-fast)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-brand-muted)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-auto px-4 pb-8">
              <a
                href="/shop"
                className="flex items-center justify-center w-full py-3 rounded-lg font-semibold text-inverse text-md"
                style={{ background: "var(--color-brand-accent)" }}
                onClick={() => setIsOpen(false)}
              >
                Shop Now
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
