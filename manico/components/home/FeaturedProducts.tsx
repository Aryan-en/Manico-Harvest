'use client';

import Image from "next/image";
import type { ReactElement } from "react";

type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  weight: string;
  badge: string;
  badgeVariant: "accent" | "muted" | "green";
  tags: string[];
  image: string;
  slug: string;
};

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Moringa Sattu",
    tagline: "Indian protein drink — Chana, Jowar, Moringa & Basil Seeds",
    price: 299,
    weight: "500g",
    badge: "BESTSELLER",
    badgeVariant: "green",
    tags: ["Plant Based Protein", "High Fiber", "No Added Sugar"],
    image: "/images/products/moringa-sattu.jpg",
    slug: "moringa-sattu",
  },
  {
    id: "2",
    name: "Mushroom Coffee",
    tagline: "Chicory coffee substitute — caffeine-free, gentle on the stomach",
    price: 349,
    weight: "100g",
    badge: "NEW",
    badgeVariant: "accent",
    tags: ["Caffeine Free", "Sustained Energy", "Supports Focus"],
    image: "/images/products/mushroom-coffee.jpg",
    slug: "mushroom-coffee",
  },
  {
    id: "3",
    name: "Multi Millet Chilla",
    tagline: "Functional breakfast with Oyster Mushroom & whole grains",
    price: 249,
    weight: "250g",
    badge: "POPULAR",
    badgeVariant: "muted",
    tags: ["High Protein", "High Fiber", "Ready in Minutes"],
    image: "/images/products/mushroom-chilla.jpg",
    slug: "multi-millet-chilla",
  },
  {
    id: "4",
    name: "Mushroom Moringa Infusion",
    tagline: "Himalayan herbal drink with Sea Buckthorn — nourish & restore",
    price: 349,
    weight: "100g",
    badge: "NEW",
    badgeVariant: "accent",
    tags: ["Immunity Support", "Caffeine Free", "Stress Relief"],
    image: "/images/products/mushroom-moringa-infusion.jpg",
    slug: "mushroom-moringa-infusion",
  },
  {
    id: "5",
    name: "Mushroom Quinoa Dosa Mix",
    tagline: "Plant protein blend — Quinoa, Oats, Millets & Oyster Mushroom",
    price: 299,
    weight: "500g",
    badge: "POPULAR",
    badgeVariant: "muted",
    tags: ["Complete Protein", "No Added Sugar", "Diabetic Friendly"],
    image: "/images/products/mushroom-quinoa-dosa.jpg",
    slug: "mushroom-quinoa-dosa",
  },
];

const BADGE_STYLES: Record<Product["badgeVariant"], React.CSSProperties> = {
  accent: {
    background: "var(--color-brand-accent)",
    color: "var(--color-bg-base)",
  },
  muted: {
    background: "var(--color-bg-base)",
    color: "var(--color-brand-primary)",
    border: "1px solid var(--color-border)",
  },
  green: {
    background: "var(--color-brand-primary)",
    color: "var(--color-bg-base)",
  },
};

function ProductCard({
  product,
  featured = false,
}: {
  product: Product;
  featured?: boolean;
}): ReactElement {
  return (
    <article
      className="group flex flex-col rounded-2xl overflow-hidden transition-all"
      style={{
        background: "var(--color-bg-surface)",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-sm)",
        transitionDuration: "var(--duration-base)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: featured ? "16/9" : "4/3",
          background: "linear-gradient(145deg, #f5ead6 0%, var(--color-bg-base) 100%)",
        }}
      >
        <span
          className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider"
          style={BADGE_STYLES[product.badgeVariant]}
        >
          {product.badge}
        </span>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain transition-transform"
          style={{
            padding: featured ? "20px" : "16px",
            transitionDuration: "var(--duration-slow)",
          }}
          sizes={
            featured
              ? "(max-width: 640px) 100vw, 50vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
          }
        />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3
          className="font-bold text-lg mb-1 leading-tight"
          style={{ color: "var(--color-brand-primary)" }}
        >
          {product.name}
        </h3>
        <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
          {product.tagline}
        </p>

        <ul className="flex flex-col gap-1.5 mb-5">
          {product.tags.map((tag) => (
            <li key={tag} className="flex items-center gap-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                style={{ color: "var(--color-brand-accent)", flexShrink: 0 }}
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {tag}
            </li>
          ))}
        </ul>

        <div
          className="flex items-center justify-between mt-auto pt-4"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <div>
            <p className="text-xs font-medium mb-0.5" style={{ color: "var(--color-text-secondary)" }}>
              {product.weight}
            </p>
            <p className="text-2xl font-bold" style={{ color: "var(--color-brand-primary)" }}>
              ₹{product.price}
            </p>
          </div>
          <a
            href={`/shop/${product.slug}`}
            className="flex items-center gap-2 rounded-xl font-semibold text-sm text-inverse transition-all active:scale-[0.98] hover:bg-accent-hover"
            style={{
              background: "var(--color-brand-accent)",
              padding: "10px 18px",
              transitionDuration: "var(--duration-fast)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Add to Cart
          </a>
        </div>
      </div>
    </article>
  );
}

export function FeaturedProducts(): ReactElement {
  return (
    <section className="py-20" style={{ background: "var(--color-bg-base)" }}>
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-12">
          <p
            className="text-xs font-bold tracking-[0.2em] mb-3"
            style={{ color: "var(--color-brand-accent)" }}
          >
            OUR PRODUCTS
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "var(--color-brand-primary)" }}
          >
            Functional Foods for
            <br className="hidden sm:block" /> Real Nourishment
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: "var(--color-text-secondary)" }}>
            Thoughtfully crafted with wholesome, clean ingredients — no fillers, no compromises.
          </p>
        </div>

        {/* Top row — 2 featured products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {PRODUCTS.slice(0, 2).map((product) => (
            <ProductCard key={product.id} product={product} featured />
          ))}
        </div>

        {/* Bottom row — 3 standard products */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {PRODUCTS.slice(2).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/shop"
            className="inline-flex items-center gap-2 font-semibold rounded-xl transition-all active:scale-[0.98] text-inverse bg-primary hover:opacity-90"
            style={{ padding: "13px 28px", transitionDuration: "var(--duration-fast)" }}
          >
            View Full Shop
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
