'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'

export function NavbarSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/shop?q=${encodeURIComponent(query.trim())}`)
    setIsOpen(false)
    setQuery('')
  }

  return (
    <>
      <button
        aria-label="Search products"
        onClick={() => setIsOpen(true)}
        className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full text-nav-link hover:text-inverse hover:bg-[rgba(247,236,217,0.06)] transition-all duration-200 active:scale-95"
      >
        <Search size={18} aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
          className="fixed inset-0 flex items-start justify-center pt-24 px-4 animate-fade-in"
          style={{ background: 'var(--color-bg-overlay)', zIndex: 'var(--z-modal)' }}
        >
          <button
            aria-label="Close search"
            className="absolute inset-0 w-full h-full cursor-default"
            onClick={() => setIsOpen(false)}
          />
          <form
            onSubmit={handleSubmit}
            className="relative w-full max-w-lg rounded-2xl p-2 flex items-center gap-2 animate-scale-in"
            style={{ background: 'var(--color-bg-surface)', boxShadow: 'var(--shadow-xl)' }}
          >
            <Search size={18} className="ml-3 shrink-0" style={{ color: 'var(--color-text-secondary)' }} aria-hidden="true" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products…"
              className="flex-1 py-3 text-sm outline-none bg-transparent"
              style={{ color: 'var(--color-text-primary)' }}
            />
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close search"
              className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0 transition-colors hover:bg-subtle"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <X size={16} aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
