'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type FaqItem = { question: string; answer: string }

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={item.question}
            className="rounded-2xl overflow-hidden"
            style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors"
            >
              <span className="font-semibold text-sm" style={{ color: 'var(--color-brand-primary)' }}>
                {item.question}
              </span>
              <ChevronDown
                size={18}
                className="shrink-0 transition-transform"
                style={{
                  color: 'var(--color-text-secondary)',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transitionDuration: 'var(--duration-base)',
                }}
                aria-hidden="true"
              />
            </button>
            <div
              id={`faq-panel-${i}`}
              role="region"
              className="grid transition-all overflow-hidden"
              style={{
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                transitionDuration: 'var(--duration-base)',
              }}
            >
              <div className="min-h-0 overflow-hidden">
                <p
                  className="px-5 pb-5 text-sm leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
