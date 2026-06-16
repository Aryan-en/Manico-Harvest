import Link from "next/link";
import type { ReactElement } from "react";
import { BrandLogo } from "./BrandLogo";
import { NavbarMobileMenu } from "./NavbarMobileMenu";
import { AuthNavButton } from "@/components/auth/AuthNavButton";
import { NavbarCartButton } from "./NavbarCartButton";

const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Our Story", href: "/about" },
  { label: "Benefits", href: "/benefits" },
  { label: "Contact", href: "/contact" },
];

export function Navbar(): ReactElement {
  return (
    <>
      {/* Announcement Bar */}
      <div className="text-center text-xs font-medium py-2 px-4 bg-accent text-inverse">
        🌿 Free shipping on orders above ₹499&nbsp;&nbsp;|&nbsp;&nbsp;Use code{" "}
        <strong>HARVEST10</strong> for 10% off your first order
      </div>

      {/* Sticky Nav */}
      <header
        className="sticky top-0 bg-primary"
        style={{
          borderBottom: "1px solid var(--color-brand-muted)",
          zIndex: "var(--z-sticky)",
        }}
      >
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" aria-label="Manico Harvest home" className="flex items-center shrink-0">
              <BrandLogo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-nav-link hover:text-inverse transition-colors"
                  style={{ transitionDuration: "var(--duration-fast)" }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                aria-label="Search products"
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg text-nav-link hover:text-inverse transition-colors"
                style={{ transitionDuration: "var(--duration-fast)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>

              <NavbarCartButton />

              <a
                href="/shop"
                className="hidden lg:flex items-center gap-1.5 ml-2 rounded-lg text-sm font-semibold transition-all active:scale-[0.98] bg-accent hover:bg-accent-hover text-inverse"
                style={{ padding: "8px 18px", transitionDuration: "var(--duration-fast)" }}
              >
                Shop Now
              </a>

              <AuthNavButton />
              <NavbarMobileMenu />
            </div>

          </div>
        </div>
      </header>
    </>
  );
}
