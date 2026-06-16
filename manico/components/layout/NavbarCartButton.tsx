'use client'

import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cart-store'

export function NavbarCartButton() {
  const { openDrawer, itemCount } = useCartStore()
  const count = itemCount()

  return (
    <button
      onClick={openDrawer}
      aria-label={`Shopping cart — ${count} item${count !== 1 ? 's' : ''}`}
      className="relative flex items-center justify-center w-10 h-10 rounded-lg text-nav-link hover:text-inverse transition-colors"
      style={{ transitionDuration: 'var(--duration-fast)' }}
    >
      <ShoppingBag size={18} aria-hidden="true" />
      {count > 0 && (
        <span
          className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold"
          style={{
            background: 'var(--color-brand-accent)',
            color: 'var(--color-text-inverse)',
          }}
          aria-hidden="true"
        >
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  )
}
