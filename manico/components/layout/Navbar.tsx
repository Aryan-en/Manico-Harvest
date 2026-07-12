"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  return (
    <>
      {/* Sticky Premium Nav */}
      <header
        className="sticky top-0 transition-all duration-300"
        style={{
          background: "rgba(42, 70, 16, 0.92)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(247, 236, 217, 0.12)",
          zIndex: "var(--z-sticky)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.03)",
        }}
      >
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Logo */}
            <Link 
              href="/" 
              aria-label="Manico Harvest home" 
              className="flex items-center shrink-0 transition-transform duration-200 hover:scale-[1.02]"
            >
              <BrandLogo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main navigation">
              {NAV_LINKS.map((link) => {
                const isActive = link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative text-sm font-semibold transition-all duration-200 py-2 px-4 rounded-full hover:bg-[rgba(247,236,217,0.06)] hover:text-inverse"
                    style={{
                      color: isActive ? "var(--color-base)" : "var(--color-nav-link)",
                      background: isActive ? "rgba(247, 236, 217, 0.08)" : "transparent",
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full animate-pulse-subtle"
                        style={{ background: "var(--color-brand-accent)" }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <NavbarSearch />

              <NavbarCartButton />

              <Link
                href="/shop"
                className="hidden lg:flex items-center gap-1.5 ml-2 rounded-full text-sm font-bold transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] bg-accent hover:bg-accent-hover text-inverse shadow-sm"
                style={{
                  padding: "9px 22px",
                  boxShadow: "0 4px 14px rgba(219, 81, 0, 0.25)",
                }}
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

