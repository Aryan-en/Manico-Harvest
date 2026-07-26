import { NextRequest, NextResponse } from 'next/server'
import { insforge } from '@/lib/insforge'

export const PHONE_NUMBER = '919259740521'
export const DISPLAY_PHONE = '+91 9259740521'

type ProductItem = {
  id: string
  name: string
  slug: string
  price: number
  weight?: string | null
  image_url?: string | null
  tagline?: string | null
}

const FALLBACK_PRODUCTS: ProductItem[] = [
  {
    id: 'prod_coffee_01',
    name: 'Functional Mushroom Coffee Mix',
    slug: 'functional-mushroom-coffee-mix',
    price: 699,
    weight: '250g',
    tagline: 'Clean energy & focus with Lion’s Mane & Reishi mushrooms.',
    image_url: '/images/products/mushroom-coffee.jpg',
  },
  {
    id: 'prod_protein_01',
    name: 'Plant Protein & Superfoods Blend',
    slug: 'plant-protein-superfoods-blend',
    price: 1299,
    weight: '500g',
    tagline: '22g pure pea & brown rice protein per serving.',
    image_url: '/images/products/plant-protein.jpg',
  },
  {
    id: 'prod_millet_01',
    name: 'Wholesome Millet Chilla Mix',
    slug: 'wholesome-millet-chilla-mix',
    price: 349,
    weight: '400g',
    tagline: 'High-fiber, gluten-free traditional breakfast mix.',
    image_url: '/images/products/millet-mix.jpg',
  },
]

export function buildWhatsAppLink(productName?: string, customMessage?: string): string {
  let text = customMessage
  if (!text) {
    if (productName) {
      text = `Hi Manico Harvest! I would like to buy *${productName}*. Please assist me with my order.`
    } else {
      text = `Hi Manico Harvest team! I need assistance with your products and orders.`
    }
  }
  return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const rawMessage = (body.message || '').toString().trim()
    const query = rawMessage.toLowerCase()

    if (!query) {
      return NextResponse.json({
        reply: "Hello! 👋 Welcome to **Manico Harvest**. How can I help you today?",
        quickChips: [
          '🌿 View Products & Buy',
          '📦 Track My Order',
          '🍵 Preparation Guide',
          '🎁 Discount Offers',
          '👤 Talk to Human Agent',
        ],
      })
    }

    // Try querying live products from database
    let productsList: ProductItem[] = []
    try {
      const { data } = await insforge.database
        .from('products')
        .select('id, name, slug, price, weight, image_url, tagline')
        .eq('is_active', true)
        .limit(6)

      if (data && data.length > 0) {
        productsList = data as ProductItem[]
      } else {
        productsList = FALLBACK_PRODUCTS
      }
    } catch {
      productsList = FALLBACK_PRODUCTS
    }

    // 1. BUY / PRODUCT CATALOG QUERIES
    if (
      query.includes('buy') ||
      query.includes('product') ||
      query.includes('shop') ||
      query.includes('coffee') ||
      query.includes('protein') ||
      query.includes('millet') ||
      query.includes('chilla') ||
      query.includes('price') ||
      query.includes('item') ||
      query.includes('order product')
    ) {
      const matchedProducts = productsList.filter((p) =>
        query.includes(p.name.toLowerCase()) ||
        (p.slug && query.includes(p.slug)) ||
        (query.includes('coffee') && p.name.toLowerCase().includes('coffee')) ||
        (query.includes('protein') && p.name.toLowerCase().includes('protein')) ||
        (query.includes('millet') && p.name.toLowerCase().includes('millet'))
      )

      const displayList = matchedProducts.length > 0 ? matchedProducts : productsList.slice(0, 3)

      return NextResponse.json({
        reply: "Here are our best-selling functional products! You can click **Buy on WhatsApp** to complete your order directly with our team on WhatsApp, or click **Add to Cart** to shop on the site:",
        products: displayList.map((p) => ({
          ...p,
          whatsappUrl: buildWhatsAppLink(p.name),
        })),
        quickChips: ['📦 Track My Order', '🎁 Discount Offers', '👤 Contact WhatsApp Support'],
      })
    }

    // 2. ORDER TRACKING
    if (query.includes('track') || query.includes('order') || query.includes('status') || query.includes('mh-')) {
      const orderMatch = query.match(/mh-?\d+/i)
      const orderId = orderMatch ? orderMatch[0].toUpperCase() : 'MH-1092'

      return NextResponse.json({
        reply: `📦 **Order Status for ${orderId}**\n\n• **Status:** In Transit 🚚\n• **Carrier:** Express Courier\n• **Estimated Delivery:** Within 2 business days\n• **Items:** Functional Nourishment Pack\n\nNeed urgent changes to your shipping address? Click below to chat directly with our shipping team on WhatsApp!`,
        whatsappUrl: buildWhatsAppLink(undefined, `Hi Manico Harvest, I would like to check the shipping status for order *${orderId}*.`),
        quickChips: ['🌿 View Products & Buy', '🎁 View Offers', '👤 Talk to Agent'],
      })
    }

    // 3. PREPARATION & USAGE
    if (query.includes('how') || query.includes('make') || query.includes('prepare') || query.includes('use') || query.includes('recipe') || query.includes('dose')) {
      return NextResponse.json({
        reply: `🍵 **How to Enjoy Manico Harvest Products:**\n\n1. **Mushroom Coffee**: Mix 1 tsp (5g) with 150ml warm water or milk. Stir & enjoy clean focus without jitters!\n2. **Plant Protein**: Blend 1 scoop (30g) with cold plant milk or smoothie after workout.\n3. **Millet Chilla**: Mix with water & spices, pour on hot pan, cook till golden brown! 🥞`,
        quickChips: ['🌿 Buy Coffee Mix', '🌿 Buy Protein Blend', '👤 Ask Support on WhatsApp'],
      })
    }

    // 4. OFFERS & DISCOUNTS
    if (query.includes('offer') || query.includes('discount') || query.includes('code') || query.includes('coupon') || query.includes('deal') || query.includes('sale')) {
      return NextResponse.json({
        reply: `🎉 **Special WhatsApp Offer!**\n\nUse coupon code **HARVEST10** for **10% OFF** on your entire purchase today!\n\nOr buy directly on WhatsApp to claim free shipping on orders above ₹499!`,
        whatsappUrl: buildWhatsAppLink(undefined, `Hi Manico Harvest! I want to claim the 10% OFF discount with code HARVEST10.`),
        quickChips: ['🌿 View Products & Buy', '👤 Chat on WhatsApp'],
      })
    }

    // 5. HUMAN / CUSTOMER AGENT
    if (query.includes('human') || query.includes('agent') || query.includes('talk') || query.includes('contact') || query.includes('call') || query.includes('number') || query.includes('support')) {
      return NextResponse.json({
        reply: `👤 You can speak directly with our team member on WhatsApp at **${DISPLAY_PHONE}**!\n\nClick the button below to start a direct chat with a human representative:`,
        whatsappUrl: buildWhatsAppLink(undefined, `Hi Manico Harvest, I would like to talk to a customer support executive.`),
        quickChips: ['🌿 Browse Products', '📦 Track Order'],
      })
    }

    // DEFAULT FALLBACK RESPONSE
    return NextResponse.json({
      reply: `Thanks for reaching out! I can help you explore products, check order status, or connect you directly with our WhatsApp team at **${DISPLAY_PHONE}**. What would you like to do?`,
      whatsappUrl: buildWhatsAppLink(undefined, `Hi Manico Harvest! ${rawMessage}`),
      quickChips: [
        '🌿 View Products & Buy',
        '📦 Track My Order',
        '🍵 How to prepare',
        '🎁 Active Discounts',
        '👤 Chat on WhatsApp',
      ],
    })
  } catch (err) {
    return NextResponse.json(
      {
        reply: `Hello! You can chat directly with our WhatsApp team at **${DISPLAY_PHONE}** for instant assistance.`,
        whatsappUrl: buildWhatsAppLink(),
      },
      { status: 200 }
    )
  }
}
