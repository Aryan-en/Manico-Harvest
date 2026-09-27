'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { ReactElement } from 'react'
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react'

type GalleryItem = {
  id: string
  label: string
  src: string
  alt: string
  badge?: string
}

type Props = {
  productName: string
  productSlug: string
  primaryImageUrl: string | null
  badge?: string | null
  badgeVariant?: 'accent' | 'muted' | 'green' | null
}

export function ProductImageGallery({
  productName,
  productSlug,
  primaryImageUrl,
  badge,
  badgeVariant,
}: Props): ReactElement {
  // Normalize slug to match crop asset naming
  const assetSlug = productSlug === 'multi-millet-chilla' ? 'mushroom-chilla' : productSlug

  const galleryItems: GalleryItem[] = [
    {
      id: 'front',
      label: 'Front Pack',
      src: `/images/products/${assetSlug}-front.jpg`,
      alt: `${productName} front package design`,
    },
    {
      id: 'back',
      label: 'Nutrition & Back',
      src: `/images/products/${assetSlug}-back.jpg`,
      alt: `${productName} back package with nutrition facts and directions`,
    },
    {
      id: 'label',
      label: 'Full Label',
      src: `/images/products/${assetSlug}-label.jpg`,
      alt: `${productName} unfolded label artwork`,
    },
  ]

  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false)

  const activeItem = galleryItems[activeIndex] ?? galleryItems[0]

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1))
  }

  const nextImage = () => {
    setActiveIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Image Container */}
      <div
        className="group relative w-full rounded-2xl overflow-hidden animate-scale-in"
        style={{
          aspectRatio: '1/1',
          background: 'linear-gradient(145deg, #f5ead6 0%, var(--color-bg-base) 100%)',
          border: '1px solid var(--color-border)',
        }}
      >
        {/* Badge */}
        {badge && (
          <span
            className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold tracking-wider shadow-sm"
            style={{
              background:
                badgeVariant === 'green'
                  ? 'var(--color-brand-primary)'
                  : 'var(--color-brand-accent)',
              color: 'var(--color-text-inverse)',
            }}
          >
            {badge}
          </span>
        )}

        {/* View Mode Tag */}
        <span
          className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-lg text-[11px] font-semibold backdrop-blur-md"
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            color: 'var(--color-brand-primary)',
            border: '1px solid var(--color-border)',
          }}
        >
          {activeItem?.label}
        </span>

        {/* Main Image */}
        {activeItem ? (
          <button
            type="button"
            onClick={() => setIsZoomOpen(true)}
            className="w-full h-full relative block cursor-zoom-in text-left focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-accent)] rounded-2xl"
            aria-label={`Zoom in on ${activeItem.label}`}
          >
            <Image
              src={activeItem.src}
              alt={activeItem.alt}
              fill
              priority
              className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white text-[var(--color-brand-primary)] p-2 rounded-xl shadow-md border border-[var(--color-border)] flex items-center gap-1.5 text-xs font-semibold">
              <ZoomIn className="w-4 h-4" />
              <span>Inspect</span>
            </div>
          </button>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              style={{ color: 'var(--color-border-strong)' }}
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}

        {/* Prev / Next controls for quick switching */}
        {galleryItems.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[var(--color-brand-primary)] shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all active:scale-95 focus:opacity-100 focus:outline-none"
              aria-label="Previous view"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[var(--color-brand-primary)] shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all active:scale-95 focus:opacity-100 focus:outline-none"
              aria-label="Next view"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {galleryItems.length > 1 && (
        <div className="grid grid-cols-4 gap-3 w-full">
          {galleryItems.map((item, index) => {
            const isSelected = index === activeIndex
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`group flex flex-col items-center gap-1.5 p-1 rounded-xl transition-all ${
                  isSelected
                    ? 'ring-2 ring-[var(--color-brand-accent)] bg-white shadow-sm'
                    : 'opacity-70 hover:opacity-100 hover:bg-white/50'
                }`}
                aria-label={`Select ${item.label}`}
                aria-current={isSelected}
              >
                <div
                  className="relative w-full rounded-lg overflow-hidden"
                  style={{
                    aspectRatio: '1/1',
                    background: 'var(--color-bg-base)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-contain p-1.5 transition-transform group-hover:scale-105"
                    sizes="(max-width: 640px) 25vw, 120px"
                  />
                </div>
                <span
                  className="text-[11px] font-semibold text-center truncate w-full"
                  style={{
                    color: isSelected
                      ? 'var(--color-brand-primary)'
                      : 'var(--color-text-secondary)',
                  }}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {/* Lightbox / High-Res Zoom Modal */}
      {isZoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged image of ${activeItem.label}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-8 animate-fade-in"
          onClick={() => setIsZoomOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Close button */}
            <div className="w-full flex items-center justify-between text-white pb-3">
              <span className="text-sm font-semibold tracking-wide">
                {productName} — {activeItem.label}
              </span>
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close high-res view"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal image */}
            <div
              className="relative w-full rounded-2xl overflow-hidden bg-neutral-900"
              style={{ height: '75vh' }}
            >
              <Image
                src={activeItem.src}
                alt={activeItem.alt}
                fill
                className="object-contain p-2"
                sizes="(max-width: 1280px) 90vw, 1200px"
              />
            </div>

            {/* Thumbnail switcher inside modal */}
            <div className="flex items-center gap-2 mt-4 overflow-x-auto py-1">
              {galleryItems.map((item, idx) => (
                <button
                  key={`modal-${item.id}`}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    idx === activeIndex
                      ? 'bg-[var(--color-brand-accent)] text-white'
                      : 'bg-white/15 text-white/80 hover:bg-white/25 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
