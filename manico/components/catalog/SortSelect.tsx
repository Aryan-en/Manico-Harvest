'use client'

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'featured', label: 'Featured First' },
]

type Props = {
  activeSort: string
  currentCategory?: string
  currentQ?: string
}

export function SortSelect({ activeSort, currentCategory, currentQ }: Props) {
  function toUrl(sort: string) {
    const qs = new URLSearchParams()
    if (currentCategory) qs.set('category', currentCategory)
    if (currentQ) qs.set('q', currentQ)
    if (sort && sort !== 'newest') qs.set('sort', sort)
    const str = qs.toString()
    return str ? `/shop?${str}` : '/shop'
  }

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="sort-select"
        className="text-sm font-medium shrink-0"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        Sort:
      </label>
      <select
        id="sort-select"
        defaultValue={activeSort}
        onChange={(e) => { window.location.href = toUrl(e.target.value) }}
        className="text-sm rounded-lg px-3 py-2 outline-none"
        style={{
          background: 'var(--color-bg-surface)',
          border: '1.5px solid var(--color-border)',
          color: 'var(--color-text-primary)',
        }}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}
