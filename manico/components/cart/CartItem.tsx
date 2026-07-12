'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/cart-store'
import { useAuthStore } from '@/store/auth-store'
import type { CartItemLocal } from '@/types/product'

type Props = {
  item: CartItemLocal & { dbItemId?: string }
}

export function CartItemRow({ item }: Props) {
  const { updateQuantity, removeItem } = useCartStore()
  const { status, accessToken } = useAuthStore()

  async function syncUpdate(productId: string, quantity: number) {
    if (status !== 'authenticated' || !accessToken || !item.dbItemId) return
    await fetch(`/api/v1/cart/items/${item.dbItemId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({ quantity }),
    }).catch(() => {})
  }

  async function syncRemove() {
    if (status !== 'authenticated' || !accessToken || !item.dbItemId) return
    await fetch(`/api/v1/cart/items/${item.dbItemId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${accessToken}` },
    }).catch(() => {})
  }

  function handleIncrease() {
    const newQty = item.quantity + 1
    updateQuantity(item.productId, newQty)
    void syncUpdate(item.productId, newQty)
  }

  function handleDecrease() {
    const newQty = item.quantity - 1
    if (newQty <= 0) {
      removeItem(item.productId)
      void syncRemove()
    } else {
      updateQuantity(item.productId, newQty)
      void syncUpdate(item.productId, newQty)
    }
  }

  function handleRemove() {
    removeItem(item.productId)
    void syncRemove()
  }

  return (
    <div className="flex gap-4 py-4 animate-fade-in" style={{ borderBottom: '1px solid var(--color-border)' }}>
      {/* Image */}
      <Link
        href={`/shop/${item.slug}`}
        className="relative shrink-0 rounded-xl overflow-hidden"
        style={{ width: 72, height: 72, background: 'linear-gradient(145deg, #f5ead6 0%, var(--color-bg-base) 100%)' }}
      >
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-contain p-2"
            sizes="72px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ color: 'var(--color-border-strong)' }} aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
      </Link>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/shop/${item.slug}`} className="font-semibold text-sm leading-tight hover:underline truncate" style={{ color: 'var(--color-brand-primary)' }}>
            {item.name}
          </Link>
          <button
            onClick={handleRemove}
            aria-label={`Remove ${item.name} from cart`}
            className="shrink-0 transition-colors hover:text-red-500"
            style={{ color: 'var(--color-text-secondary)', transitionDuration: 'var(--duration-fast)' }}
          >
            <Trash2 size={14} />
          </button>
        </div>

        {item.weight && (
          <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.weight}</p>
        )}

        <div className="flex items-center justify-between mt-2">
          {/* Qty controls */}
          <div className="flex items-center rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
            <button onClick={handleDecrease} aria-label="Decrease" className="flex items-center justify-center w-7 h-7 transition-colors hover:bg-subtle" style={{ color: 'var(--color-text-secondary)' }}>
              <Minus size={12} />
            </button>
            <span className="w-7 text-center text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              {item.quantity}
            </span>
            <button onClick={handleIncrease} aria-label="Increase" className="flex items-center justify-center w-7 h-7 transition-colors hover:bg-subtle" style={{ color: 'var(--color-text-secondary)' }}>
              <Plus size={12} />
            </button>
          </div>

          <p className="font-bold text-sm" style={{ color: 'var(--color-brand-primary)' }}>
            ₹{(item.price * item.quantity).toFixed(0)}
          </p>
        </div>
      </div>
    </div>
  )
}
