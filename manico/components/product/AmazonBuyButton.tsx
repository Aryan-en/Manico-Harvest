'use client'

import { ExternalLink } from 'lucide-react'
import type { ReactElement, MouseEvent } from 'react'
import { getAmazonUrl } from '@/lib/data/amazon-links'
import posthog from 'posthog-js'

export function AmazonIcon({ className = 'w-4 h-4' }: { className?: string }): ReactElement {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.84 9.172c-.85 0-1.63.14-2.34.42l-.57-.75c.9-.38 1.94-.58 3.1-.58 1.83 0 3.23.53 4.19 1.6.96 1.06 1.44 2.57 1.44 4.54v6.86h-2.31v-2.12c-.75.76-1.57 1.34-2.46 1.74-.89.4-1.89.6-3 .6-1.74 0-3.13-.53-4.16-1.58-1.03-1.06-1.55-2.42-1.55-4.09 0-1.74.56-3.13 1.68-4.17 1.12-1.04 2.6-1.56 4.45-1.56.55 0 1.06.05 1.53.15v-.86c0-1.2-.33-2.13-.98-2.79-.66-.66-1.58-.99-2.76-.99zm-1.04 10.36c.86 0 1.62-.27 2.27-.81.65-.54.98-1.25.98-2.12v-1.12c-.41-.09-.89-.13-1.44-.13-1.24 0-2.22.31-2.94.94-.72.63-1.08 1.48-1.08 2.55 0 .84.25 1.48.75 1.93.5.45 1.18.67 2.05.67zM21.512 16.17c-.23-.298-.758-.14-1.176-.055-.142.029-.189-.086-.076-.167.805-.576 1.91-.348 2.098-.109.189.24-.06 1.398-.756 2.073-.108.105-.199.049-.143-.087.182-.443.283-1.36.053-1.655zM.045 18.024c.068.106.195.148.307.09 3.013-1.637 6.643-2.522 10.428-2.522 3.666 0 7.202.83 10.155 2.378.118.062.25.016.312-.094.137-.246.402-.756.529-1.025.056-.12-.003-.257-.123-.32-3.178-1.666-6.985-2.56-10.923-2.56-4.068 0-7.986.953-11.238 2.748-.112.062-.162.196-.107.314.124.267.369.75.56 1z" />
    </svg>
  )
}

type Props = {
  product: {
    id?: string
    name: string
    slug: string
  }
  url?: string | null
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function AmazonBuyButton({
  product,
  url,
  size = 'sm',
  className = '',
}: Props): ReactElement | null {
  const amazonUrl = url || getAmazonUrl(product.slug) || getAmazonUrl(product.id)

  if (!amazonUrl) return null

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    e.stopPropagation()
    try {
      posthog.capture('buy_on_amazon_clicked', {
        product_id: product.id,
        product_name: product.name,
        product_slug: product.slug,
        amazon_url: amazonUrl,
      })
    } catch {
      // ignore
    }
  }

  if (size === 'lg') {
    return (
      <a
        href={amazonUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`flex items-center justify-center gap-2.5 w-full py-4 px-6 rounded-xl font-bold text-base text-white transition-all active:scale-[0.98] hover:opacity-95 hover:shadow-lg ${className}`}
        style={{
          background: 'var(--color-brand-accent)',
          boxShadow: '0 4px 14px rgba(219, 81, 0, 0.3)',
          transitionDuration: 'var(--duration-fast)',
        }}
        title={`Buy ${product.name} on Amazon`}
      >
        <AmazonIcon className="w-5 h-5 fill-current shrink-0" />
        <span>Buy on Amazon</span>
        <ExternalLink size={16} className="opacity-80 shrink-0" />
      </a>
    )
  }

  return (
    <a
      href={amazonUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-1.5 rounded-xl font-bold text-xs sm:text-sm text-white transition-all active:scale-[0.98] hover:opacity-95 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none ${className}`}
      style={{
        background: 'var(--color-brand-accent)',
        padding: '9px 15px',
        boxShadow: '0 2px 8px rgba(219, 81, 0, 0.25)',
        transitionDuration: 'var(--duration-fast)',
        flexShrink: 0,
      }}
      title={`Buy ${product.name} on Amazon`}
    >
      <AmazonIcon className="w-3.5 h-3.5 fill-current shrink-0" />
      <span>Buy on Amazon</span>
      <ExternalLink size={12} className="opacity-75 shrink-0 hidden xs:inline" />
    </a>
  )
}
