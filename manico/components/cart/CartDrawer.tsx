'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { X, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cart-store'
import { CartItemRow } from './CartItem'

export function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, clearCart, total, itemCount } = useCartStore()
  const drawerRef = useRef<HTMLDivElement>(null)

  // Trap focus and handle Escape
  useEffect(() => {
    if (!isDrawerOpen) return
    const previousFocus = document.activeElement as HTMLElement | null
    drawerRef.current?.focus()

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeDrawer()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      previousFocus?.focus()
    }
  }, [isDrawerOpen, closeDrawer])

  const count = itemCount()
  const subtotal = total()

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 transition-opacity"
        style={{
          background: 'var(--color-bg-overlay)',
          zIndex: 'var(--z-drawer)',
          opacity: isDrawerOpen ? 1 : 0,
          pointerEvents: isDrawerOpen ? 'auto' : 'none',
          transitionDuration: 'var(--duration-slow)',
        }}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        tabIndex={-1}
        className="fixed top-0 right-0 h-full flex flex-col outline-none transition-transform"
        style={{
          width: 'min(420px, 100vw)',
          background: 'var(--color-bg-surface)',
          boxShadow: 'var(--shadow-xl)',
          zIndex: 'calc(var(--z-drawer) + 1)',
          transform: isDrawerOpen ? 'translateX(0)' : 'translateX(100%)',
          transitionDuration: 'var(--duration-slow)',
          transitionTimingFunction: 'var(--ease-out)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 shrink-0"
          style={{ borderBottom: '1px solid var(--color-border)' }}
        >
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} style={{ color: 'var(--color-brand-primary)' }} aria-hidden="true" />
            <h2 className="text-lg font-bold" style={{ color: 'var(--color-brand-primary)' }}>
              Your Cart
            </h2>
            {count > 0 && (
              <span
                className="flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold"
                style={{ background: 'var(--color-brand-accent)', color: 'var(--color-text-inverse)' }}
              >
                {count}
              </span>
            )}
          </div>
          <button
            onClick={closeDrawer}
            aria-label="Close cart"
            className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors hover:bg-subtle"
            style={{ color: 'var(--color-text-secondary)', transitionDuration: 'var(--duration-fast)' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-16 animate-fade-in">
              <div
                className="flex items-center justify-center w-16 h-16 rounded-2xl"
                style={{ background: 'var(--color-bg-subtle)' }}
              >
                <ShoppingBag size={28} style={{ color: 'var(--color-text-secondary)' }} aria-hidden="true" />
              </div>
              <p className="text-base font-semibold" style={{ color: 'var(--color-brand-primary)' }}>
                Your cart is empty
              </p>
              <p className="text-sm text-center" style={{ color: 'var(--color-text-secondary)' }}>
                Add some products to get started
              </p>
              <Link
                href="/shop"
                onClick={closeDrawer}
                className="font-semibold text-sm rounded-xl transition-all active:scale-[0.98] hover:opacity-90"
                style={{
                  background: 'var(--color-brand-accent)',
                  color: 'var(--color-text-inverse)',
                  padding: '10px 20px',
                  transitionDuration: 'var(--duration-fast)',
                }}
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <CartItemRow key={item.productId} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            className="shrink-0 px-6 py-5"
            style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-surface)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                Subtotal ({count} item{count !== 1 ? 's' : ''})
              </span>
              <span className="text-xl font-bold" style={{ color: 'var(--color-brand-primary)' }}>
                ₹{subtotal.toFixed(0)}
              </span>
            </div>

            <p className="text-xs mb-4 text-center" style={{ color: 'var(--color-text-secondary)' }}>
              Shipping calculated at checkout
            </p>

            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="block w-full text-center font-semibold rounded-xl transition-all active:scale-[0.98] hover:opacity-90 mb-3"
              style={{
                background: 'var(--color-brand-accent)',
                color: 'var(--color-text-inverse)',
                padding: '14px',
                transitionDuration: 'var(--duration-fast)',
              }}
            >
              Proceed to Checkout →
            </Link>

            <button
              onClick={() => { clearCart(); closeDrawer() }}
              className="block w-full text-center text-sm font-medium rounded-xl transition-colors hover:bg-subtle"
              style={{
                color: 'var(--color-text-secondary)',
                padding: '10px',
                transitionDuration: 'var(--duration-fast)',
              }}
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  )
}
