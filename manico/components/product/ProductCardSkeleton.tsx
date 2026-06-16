export function ProductCardSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden animate-pulse"
      style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}
    >
      <div
        style={{
          aspectRatio: featured ? '16/9' : '4/3',
          background: 'var(--color-bg-subtle)',
        }}
      />
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="h-5 rounded-lg w-3/4" style={{ background: 'var(--color-bg-subtle)' }} />
        <div className="h-4 rounded-lg w-full" style={{ background: 'var(--color-bg-subtle)' }} />
        <div className="h-4 rounded-lg w-2/3" style={{ background: 'var(--color-bg-subtle)' }} />
        <div className="flex gap-2 mt-1">
          <div className="h-3 rounded w-1/3" style={{ background: 'var(--color-bg-subtle)' }} />
          <div className="h-3 rounded w-1/3" style={{ background: 'var(--color-bg-subtle)' }} />
        </div>
        <div
          className="flex items-center justify-between mt-auto pt-4"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <div className="h-7 w-16 rounded-lg" style={{ background: 'var(--color-bg-subtle)' }} />
          <div className="h-10 w-28 rounded-xl" style={{ background: 'var(--color-bg-subtle)' }} />
        </div>
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 5, featured = false }: { count?: number; featured?: boolean }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} featured={featured} />
      ))}
    </div>
  )
}
