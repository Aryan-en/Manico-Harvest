"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, User } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { useAuthStore } from "@/store/auth-store";
import { useAuth } from "@/hooks/use-auth";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Recipes", href: "/recipes" },
  { label: "Our Story", href: "/about" },
  { label: "Benefits", href: "/benefits" },
  { label: "Contact", href: "/contact" },
];

export function NavbarMobileMenu(): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const { status, user } = useAuthStore();
  const { logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    setIsOpen(false);
    await logout();
    router.push("/");
  }

  const displayName = user ? ((user.profile?.name as string | undefined) ?? user.email.split("@")[0]) : null;

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
            className="relative flex flex-col w-72 h-full bg-primary shadow-xl ml-auto"
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

            {/* Auth status */}
            {status === "authenticated" && user ? (
              <div
                className="flex items-center justify-between px-6 py-4 border-b"
                style={{ borderColor: "var(--color-brand-muted)" }}
              >
                <span className="flex items-center gap-2 text-sm font-medium text-inverse">
                  <User size={15} aria-hidden="true" />
                  {displayName}
                </span>
                <button
                  onClick={handleLogout}
                  aria-label="Sign out"
                  className="flex items-center gap-1.5 rounded-lg text-xs font-semibold text-inverse"
                  style={{ padding: "6px 10px", border: "1px solid rgba(247,236,217,0.25)" }}
                >
                  <LogOut size={13} aria-hidden="true" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div
                className="flex items-center gap-2 px-6 py-4 border-b"
                style={{ borderColor: "var(--color-brand-muted)" }}
              >
                <Link
                  href="/sign-in"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center rounded-lg text-sm font-semibold text-inverse py-2.5"
                  style={{ border: "1px solid rgba(247,236,217,0.25)" }}
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center rounded-lg text-sm font-semibold text-inverse py-2.5"
                  style={{ background: "var(--color-brand-accent)" }}
                >
                  Sign Up
                </Link>
              </div>
            )}

            <ul className="flex flex-col px-4 py-6 gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center px-4 py-3 rounded-lg text-inverse font-medium text-md transition-colors hover:bg-[var(--color-brand-muted)]"
                    style={{ transitionDuration: "var(--duration-fast)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto px-4 pb-8">
              <Link
                href="/shop"
                className="flex items-center justify-center w-full py-3 rounded-lg font-semibold text-inverse text-md"
                style={{ background: "var(--color-brand-accent)" }}
                onClick={() => setIsOpen(false)}
              >
                Shop Now
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
