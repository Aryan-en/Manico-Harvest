'use client'

import React from 'react'

export function WhatsAppIcon({ className = 'w-6 h-6', fill = 'currentColor' }: { className?: string; fill?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.403 5.638A8.955 8.955 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.2 4.488L3 21l4.646-1.218a8.964 8.964 0 0 0 4.405 1.157h.004c4.947 0 8.975-4.027 8.977-8.977a8.932 8.932 0 0 0-2.632-6.324zM12.058 19.38h-.003a7.465 7.465 0 0 1-3.805-1.042l-.272-.162-2.83.743.755-2.759-.177-.282a7.46 7.46 0 0 1-1.144-3.901c0-4.12 3.351-7.47 7.474-7.47a7.432 7.432 0 0 1 5.284 2.188 7.435 7.435 0 0 1 2.185 5.285c-.002 4.12-3.352 7.47-7.467 7.47zm4.098-5.591c-.225-.113-1.327-.655-1.533-.73-.205-.075-.355-.112-.504.113-.15.224-.58.73-.711.879-.13.15-.262.168-.486.056-.225-.113-.949-.35-1.808-1.116-.668-.596-1.12-1.33-1.25-1.556-.132-.225-.014-.347.098-.459.102-.101.225-.262.338-.393.112-.131.15-.225.225-.375.075-.15.037-.281-.019-.393-.056-.113-.505-1.217-.692-1.668-.182-.439-.367-.38-.504-.388-.13-.007-.281-.008-.431-.008s-.394.056-.6.281c-.206.225-.786.768-.786 1.872s.804 2.172.916 2.322c.112.15 1.582 2.415 3.832 3.387.535.23 1.002.368 1.345.477.538.17 1.027.146 1.413.089.431-.064 1.327-.543 1.514-1.067.187-.525.187-.974.131-1.067-.056-.094-.206-.15-.431-.263z"
      />
    </svg>
  )
}

export function WhatsAppCheckmarks({ read = true }: { read?: boolean }) {
  return (
    <svg
      className="w-3.5 h-3.5 inline-block ml-1"
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M15.01 3.316l-7.78 8.9-3.9-3.77.72-.75 3.1 3 7.08-8.1.78.72z"
        fill={read ? '#53bdeb' : '#8696a0'}
      />
      <path
        d="M11.01 3.316l-7.78 8.9-3.9-3.77.72-.75 3.1 3 7.08-8.1.78.72z"
        fill={read ? '#53bdeb' : '#8696a0'}
      />
    </svg>
  )
}

export function WhatsAppWallpaper() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.06]"
      style={{
        backgroundImage: `radial-gradient(#128C7E 0.75px, transparent 0.75px), radial-gradient(#128C7E 0.75px, #f0e6d2 0.75px)`,
        backgroundSize: '30px 30px',
        backgroundPosition: '0 0, 15px 15px',
      }}
    />
  )
}
