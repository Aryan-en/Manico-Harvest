import Image from 'next/image'
import Link from 'next/link'
import type { ReactElement } from 'react'
import type { Product } from '@/types/product'
import { AddToCartButton } from './AddToCartButton'
import { AmazonBuyButton } from './AmazonBuyButton'
import { getAmazonUrl } from '@/lib/data/amazon-links'

const BADGE_STYLES: Record<string, React.CSSProperties> = {
  accent: {
    background: 'var(--color-brand-accent)',
    color: 'var(--color-text-inverse)',
  },
  muted: {
    background: 'var(--color-bg-base)',
    color: 'var(--color-brand-primary)',
    border: '1px solid var(--color-border)',
  },
  green: {
    background: 'var(--color-brand-primary)',
    color: 'var(--color-text-inverse)',
  },
}

const PRODUCT_IMAGE_OVERRIDE: Record<string, string> = {
  'moringa-sattu': '/images/products/moringa-sattu-front.jpg',
  'multi-millet-chilla': '/images/products/mushroom-chilla-front.jpg',
  'mushroom-chilla': '/images/products/mushroom-chilla-front.jpg',
  'mushroom-quinoa-dosa': '/images/products/mushroom-quinoa-dosa-front.jpg',
  'mushroom-moringa-infusion': '/images/products/mushroom-moringa-infusion-front.jpg',
  'mushroom-coffee': '/images/products/mushroom-coffee-front.jpg',
}

type Props = {
  product: Product
  featured?: boolean
}

export function ProductCard({ product, featured = false }: Props): ReactElement {
  const badgeStyle = product.badge_variant ? BADGE_STYLES[product.badge_variant] : BADGE_STYLES.muted
  const amazonUrl = getAmazonUrl(product.slug) || getAmazonUrl(product.id)
  const imageUrl = PRODUCT_IMAGE_OVERRIDE[product.slug] || product.image_url

  return (
    <article
      className="group flex flex-col rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg"
      style={{
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        transitionDuration: 'var(--duration-base)',
        transitionTimingFunction: 'var(--ease-out)',
      }}
    >
      {/* Image */}
      <Link
        href={`/shop/${product.slug}`}
        className="relative block overflow-hidden group/img"
        style={{
          aspectRatio: featured ? '16/9' : '4/3',
          background: 'linear-gradient(145deg, #f5ead6 0%, var(--color-bg-base) 100%)',
        }}
        tabIndex={-1}
        aria-hidden="true"
      >
        {product.badge && (
          <span
            className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider"
            style={badgeStyle}
          >
            {product.badge}
          </span>
        )}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-contain transition-transform group-hover/img:scale-105"
            style={{ padding: featured ? '20px' : '16px', transitionDuration: 'var(--duration-slow)' }}
            sizes={
              featured
                ? '(max-width: 640px) 100vw, 50vw'
                : '(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw'
            }
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              style={{ color: 'var(--color-border-strong)' }}
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <Link href={`/shop/${product.slug}`} className="group/title">
          <h3
            className="font-bold text-lg mb-1 leading-tight group-hover/title:underline"
            style={{ color: 'var(--color-brand-primary)' }}
          >
            {product.name}
          </h3>
        </Link>

        {product.tagline && (
          <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            {product.tagline}
          </p>
        )}

        {product.product_tags && product.product_tags.length > 0 && (
          <ul className="flex flex-col gap-1.5 mb-5">
            {product.product_tags.slice(0, 3).map(({ tag }) => (
              <li key={tag} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: 'var(--color-brand-accent)', flexShrink: 0 }}
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div
          className="flex items-center justify-between gap-2 mt-auto pt-4"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <div>
            {product.weight && (
              <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                {product.weight}
              </p>
            )}
            <p className="text-2xl font-bold" style={{ color: 'var(--color-brand-primary)' }}>
              ₹{product.price}
            </p>
          </div>
          {amazonUrl ? (
            <AmazonBuyButton
              product={{
                id: product.id,
                name: product.name,
                slug: product.slug,
              }}
              url={amazonUrl}
            />
          ) : (
            <AddToCartButton
              product={{
                productId: product.id,
                name: product.name,
                slug: product.slug,
                price: Number(product.price),
                image_url: product.image_url,
                weight: product.weight,
              }}
            />
          )}
        </div>
      </div>
    </article>
  )
}
