import Link from 'next/link'
import type { ReactNode } from 'react'
import { BrandLogo } from '@/components/layout/BrandLogo'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <Link href="/" aria-label="Back to Manico Harvest home" className="mb-8 animate-fade-in">
        <BrandLogo />
      </Link>
      <div className="w-full flex justify-center animate-scale-in" style={{ animationDelay: '60ms' }}>
        {children}
      </div>
    </div>
  )
}
