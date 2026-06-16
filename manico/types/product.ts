export type Category = {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  sort_order: number
  created_at: string
  updated_at: string
}

export type ProductTag = {
  tag: string
}

export type Product = {
  id: string
  name: string
  slug: string
  tagline: string | null
  description: string | null
  price: number
  weight: string | null
  stock: number
  badge: string | null
  badge_variant: 'accent' | 'muted' | 'green' | null
  image_url: string | null
  category_id: string | null
  featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string
  product_tags?: ProductTag[]
  categories?: Pick<Category, 'id' | 'name' | 'slug'> | null
}

export type CartItemLocal = {
  productId: string
  name: string
  slug: string
  price: number
  image_url: string | null
  weight: string | null
  quantity: number
}
