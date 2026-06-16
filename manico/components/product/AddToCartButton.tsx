'use client'

import { useState } from 'react'
import { ShoppingBag, Check, Loader2, Minus, Plus } from 'lucide-react'
import { useCartStore } from '@/store/cart-store'
import { useAuthStore } from '@/store/auth-store'
import type { CartItemLocal } from '@/types/product'
import posthog from 'posthog-js'

type Props = {
  product: Omit<CartItemLocal, 'quantity'>
  showQuantityPicker?: boolean
}

export function AddToCartButton({ product, showQuantityPicker = false }: Props) {
  const { addItem, openDrawer } = useCartStore()
  const { status, accessToken } = useAuthStore()
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleAdd() {
    setLoading(true)
    addItem(product, qty)

    posthog.capture('add_to_cart', {
      product_id: product.productId,
      product_name: product.name,
      product_slug: product.slug,
      price: product.price,
      quantity: qty,
    })

    // Persist to DB if authenticated
    if (status === 'authenticated' && accessToken) {
      await fetch('/api/v1/cart/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ product_id: product.productId, quantity: qty }),
      }).catch(() => {/* silent - local store is source of truth */})
    }

    setLoading(false)
    setSuccess(true)
    openDrawer()
    setTimeout(() => setSuccess(false), 2000)
  }

  return (
    <div className="flex items-center gap-3">
      {showQuantityPicker && (
        <div
          className="flex items-center rounded-xl overflow-hidden"
          style={{ border: '1.5px solid var(--color-border)' }}
        >
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="flex items-center justify-center w-9 h-10 transition-colors"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <Minus size={14} />
          </button>
          <span
            className="w-8 text-center text-sm font-semibold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase quantity"
            className="flex items-center justify-center w-9 h-10 transition-colors"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <Plus size={14} />
          </button>
        </div>
      )}

      <button
        onClick={handleAdd}
        disabled={loading || success}
        className="flex items-center gap-2 rounded-xl font-semibold text-sm transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          background: success ? 'var(--color-success)' : 'var(--color-brand-accent)',
          color: 'var(--color-text-inverse)',
          padding: '10px 18px',
          transitionDuration: 'var(--duration-fast)',
          flexShrink: 0,
        }}
      >
        {loading ? (
          <Loader2 size={15} className="animate-spin" />
        ) : success ? (
          <Check size={15} />
        ) : (
          <ShoppingBag size={15} />
        )}
        {loading ? 'Adding…' : success ? 'Added!' : 'Add to Cart'}
      </button>
    </div>
  )
}
