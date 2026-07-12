import type { ReactElement, ReactNode } from 'react'

type Props = {
  eyebrow: string
  title: string
  description?: string
  children?: ReactNode
}

export function PageHeader({ eyebrow, title, description, children }: Props): ReactElement {
  return (
    <div
      className="relative overflow-hidden py-16 sm:py-20"
      style={{ background: 'var(--color-brand-primary)', color: 'var(--color-text-inverse)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 80% 20%, rgba(219,81,0,0.14) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 10% 90%, rgba(247,236,217,0.06) 0%, transparent 60%)',
        }}
      />
      <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 text-center">
        <p
          className="text-xs font-bold tracking-[0.2em] mb-3"
          style={{ color: 'var(--color-brand-accent)' }}
        >
          {eyebrow}
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{title}</h1>
        {description && (
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: 'rgba(247,236,217,0.75)', lineHeight: '1.7' }}
          >
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  )
}
