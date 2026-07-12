import Link from "next/link";
import type { ReactElement } from "react";
import { BrandLogo } from "./BrandLogo";
import { NavbarMobileMenu } from "./NavbarMobileMenu";
import { AuthNavButton } from "@/components/auth/AuthNavButton";
import { NavbarCartButton } from "./NavbarCartButton";
import { NavbarSearch } from "./NavbarSearch";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Recipes", href: "/recipes" },
  { label: "Our Story", href: "/about" },
  { label: "Benefits", href: "/benefits" },
  { label: "Contact", href: "/contact" },
];

export function Navbar(): ReactElement {
  return (
    <>
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
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-nav-link hover:text-inverse transition-colors"
                  style={{ transitionDuration: "var(--duration-fast)" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <NavbarSearch />

              <NavbarCartButton />

              <Link
                href="/shop"
                className="hidden lg:flex items-center gap-1.5 ml-2 rounded-lg text-sm font-semibold transition-all active:scale-[0.98] bg-accent hover:bg-accent-hover text-inverse"
                style={{ padding: "8px 18px", transitionDuration: "var(--duration-fast)" }}
              >
                Shop Now
              </Link>

              <AuthNavButton />
              <NavbarMobileMenu />
            </div>

          </div>
        </div>
      </header>
    </>
  );
}
