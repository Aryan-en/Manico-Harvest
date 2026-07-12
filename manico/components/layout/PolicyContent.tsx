import type { ReactElement, ReactNode } from 'react'
import { Reveal } from '@/components/motion/Reveal'

export function PolicySection({ title, children }: { title: string; children: ReactNode }): ReactElement {
  return (
    <Reveal>
      <h2 className="font-bold text-xl mb-3" style={{ color: 'var(--color-brand-primary)' }}>
        {title}
      </h2>
      <div className="text-sm leading-relaxed space-y-3" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.75' }}>
        {children}
      </div>
    </Reveal>
  )
}

export function PolicyLayout({ children, updatedAt }: { children: ReactNode; updatedAt?: string }): ReactElement {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[760px] px-4 sm:px-6 lg:px-8">
        {updatedAt && (
          <p className="text-xs font-medium mb-10 animate-fade-in" style={{ color: 'var(--color-text-secondary)' }}>
            Last updated: {updatedAt}
          </p>
        )}
        <div className="flex flex-col gap-10">{children}</div>
      </div>
    </section>
  )
}
