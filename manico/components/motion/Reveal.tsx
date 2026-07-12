'use client'

import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useInView } from '@/hooks/use-in-view'

type Props = {
  children: ReactNode
  as?: ElementType
  variant?: 'up' | 'fade' | 'scale'
  delay?: number
  className?: string
  style?: CSSProperties
}

export function Reveal({ children, as: Tag = 'div', variant = 'up', delay = 0, className, style }: Props) {
  const { ref, isInView } = useInView<HTMLDivElement>()
  const revealValue = variant === 'up' ? '' : variant

  return (
    <Tag
      ref={ref}
      data-reveal={revealValue}
      data-reveal-visible={isInView ? '' : undefined}
      style={{ ...style, ...(isInView && delay ? { transitionDelay: `${delay}ms` } : {}) }}
      className={className}
    >
      {children}
    </Tag>
  )
}
