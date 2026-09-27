export const PRODUCT_AMAZON_LINKS: Record<string, string> = {
  // Mushroom Coffee
  'mushroom-coffee': 'https://amzn.in/d/0hMNDCuo',
  'b1b2c3d4-0000-0000-0000-000000000002': 'https://amzn.in/d/0hMNDCuo',

  // Mushroom Moringa Infusion
  'mushroom-moringa-infusion': 'https://amzn.in/d/09gmHK4J',
  'b1b2c3d4-0000-0000-0000-000000000004': 'https://amzn.in/d/09gmHK4J',

  // Moringa Sattu
  'moringa-sattu': 'https://amzn.in/d/01MVPZO1',
  'b1b2c3d4-0000-0000-0000-000000000001': 'https://amzn.in/d/01MVPZO1',

  // Multi Millet Chilla Mix
  'multi-millet-chilla': 'https://amzn.in/d/08qsVjz8',
  'mushroom-chilla': 'https://amzn.in/d/08qsVjz8',
  'wholesome-millet-chilla-mix': 'https://amzn.in/d/08qsVjz8',
  'b1b2c3d4-0000-0000-0000-000000000003': 'https://amzn.in/d/08qsVjz8',

  // Mushroom Quinoa Dosa Mix
  'mushroom-quinoa-dosa': 'https://amzn.in/d/0cIj5s00',
  'b1b2c3d4-0000-0000-0000-000000000005': 'https://amzn.in/d/0cIj5s00',
}

export const AMAZON_STORE_URL = 'https://www.amazon.in/s?k=Manico+Harvest'

export function getAmazonUrl(slugOrId?: string | null): string | null {
  if (!slugOrId) return null
  return PRODUCT_AMAZON_LINKS[slugOrId] ?? null
}
