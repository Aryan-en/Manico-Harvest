'use client'

import React, { useState, useEffect, useRef } from 'react'
import { WhatsAppIcon, WhatsAppCheckmarks, WhatsAppWallpaper } from './WhatsAppIcon'
import { useCartStore } from '@/store/cart-store'

export const BOT_PHONE_NUMBER = '919259740521'
export const BOT_DISPLAY_PHONE = '+91 9259740521'
export const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/manico.harvest?stkn=NDd0ODQ0Z3U3OGhu'
export const FACEBOOK_PROFILE_URL = 'https://www.facebook.com/share/1LjFiWGGdR/'

type ProductItem = {
  id: string
  name: string
  slug: string
  price: number
  weight?: string | null
  image_url?: string | null
  tagline?: string | null
  whatsappUrl?: string
}

type Message = {
  id: string
  sender: 'bot' | 'user'
  text: string
  timestamp: string
  products?: ProductItem[]
  whatsappUrl?: string
  quickChips?: string[]
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg_welcome_1',
    sender: 'bot',
    text: `Hello! 👋 Welcome to *Manico Harvest* support.\n\nI am your assistant. How can I help you today? You can ask me about our functional foods, track an order, or buy directly on WhatsApp!`,
    timestamp: '10:00 AM',
    whatsappUrl: `https://wa.me/${BOT_PHONE_NUMBER}?text=${encodeURIComponent("Hi Manico Harvest! I have a question about your products.")}`,
    quickChips: [
      '🌿 View Products & Buy',
      '📦 Track My Order',
      '🍵 Preparation Guide',
      '🎁 Discount Offers',
      '👤 Talk to Human Agent',
    ],
  },
]

export function WhatsAppChatbot() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [inputValue, setInputValue] = useState<string>('')
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [unreadCount, setUnreadCount] = useState<number>(1)
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true)
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const addItemToCart = useCartStore((s) => s.addItem)
  const openCartDrawer = useCartStore((s) => s.openDrawer)

  // Load saved session on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('manico_whatsapp_chat')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTimeout(() => {
            setMessages(parsed)
            setUnreadCount(0)
          }, 0)
        }
      }
    } catch {
      // ignore
    }
  }, [])

  // Save session when messages update
  useEffect(() => {
    try {
      localStorage.setItem('manico_whatsapp_chat', JSON.stringify(messages))
    } catch {
      // ignore
    }
  }, [messages])

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => setUnreadCount(0), 0)
    }
  }, [messages, isOpen, isTyping])

  // Web Audio API pop sound on incoming message
  const playNotificationSound = () => {
    if (!soundEnabled) return
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(587.33, ctx.currentTime) // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15) // A5

      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.2)
    } catch {
      // ignore audio errors
    }
  }

  const getTimeString = (): string => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputValue).trim()
    if (!textToSend) return

    if (!customText) setInputValue('')
    setShowEmojiPicker(false)

    const userMsg: Message = {
      id: `user_${crypto.randomUUID()}`,
      sender: 'user',
      text: textToSend,
      timestamp: getTimeString(),
    }

    setMessages((prev) => [...prev, userMsg])
    setIsTyping(true)

    try {
      const res = await fetch('/api/v1/chatbot/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      })

      const data = await res.json()
      setIsTyping(false)

      const botMsg: Message = {
        id: `bot_${crypto.randomUUID()}`,
        sender: 'bot',
        text: data.reply || `Thank you! You can also chat directly with us on WhatsApp at ${BOT_DISPLAY_PHONE}.`,
        timestamp: getTimeString(),
        products: data.products,
        whatsappUrl: data.whatsappUrl,
        quickChips: data.quickChips,
      }

      setMessages((prev) => [...prev, botMsg])
      playNotificationSound()

      if (!isOpen) {
        setUnreadCount((c) => c + 1)
      }
    } catch {
      setIsTyping(false)
      const botMsg: Message = {
        id: `bot_err_${crypto.randomUUID()}`,
        sender: 'bot',
        text: `Thanks for your message! For instant answers or to place your order, you can also chat with us directly on WhatsApp.`,
        timestamp: getTimeString(),
        whatsappUrl: `https://wa.me/${BOT_PHONE_NUMBER}?text=${encodeURIComponent(textToSend)}`,
        quickChips: ['🌿 View Products', '👤 Chat on WhatsApp'],
      }
      setMessages((prev) => [...prev, botMsg])
    }
  }

  const handleQuickChipClick = (chipText: string) => {
    handleSendMessage(chipText)
  }

  const handleAddToCart = (product: ProductItem) => {
    addItemToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      weight: product.weight || null,
      image_url: product.image_url || null,
    })
    openCartDrawer()
  }

  const insertEmoji = (emoji: string) => {
    setInputValue((prev) => prev + emoji)
    inputRef.current?.focus()
  }

  return (
    <aside aria-label="Social and Chat Assistant" className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end pointer-events-none">
      
      {/* ── CHAT MODAL WINDOW ── */}
      {isOpen && (
        <div
          className="pointer-events-auto fixed right-3 sm:right-24 bottom-4 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-50 w-[92vw] sm:w-[380px] h-[520px] max-h-[85vh] bg-[#efeae2] dark:bg-[#0b141a] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-black/10 transition-all transform animate-scale-in"
          style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.25)' }}
        >
          {/* Header */}
          <div className="bg-[#008069] dark:bg-[#202c33] text-white px-4 py-3 flex items-center justify-between shrink-0 shadow-md z-10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center text-white font-bold text-lg overflow-hidden border-2 border-white/30">
                  <span className="bg-gradient-to-tr from-[#128C7E] to-[#25D366] w-full h-full flex items-center justify-center">
                    🌿
                  </span>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#008069] rounded-full" />
              </div>

              <div className="leading-tight">
                <div className="flex items-center gap-1.5 font-semibold text-sm">
                  <span>Manico Support</span>
                  <svg className="w-4 h-4 text-[#25D366] inline" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <div className="text-[11px] text-emerald-100/90 flex items-center gap-1">
                  {isTyping ? (
                    <span className="text-emerald-200 font-medium animate-pulse">typing...</span>
                  ) : (
                    <span>Online • {BOT_DISPLAY_PHONE}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                title={soundEnabled ? 'Mute sound' : 'Unmute sound'}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/90 transition-colors"
              >
                {soundEnabled ? '🔔' : '🔕'}
              </button>

              <a
                href={FACEBOOK_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="Follow us on Facebook"
                className="p-1.5 rounded-full hover:bg-white/10 text-white/90 transition-colors flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href={INSTAGRAM_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="Follow us on Instagram (@manico.harvest)"
                className="p-1.5 rounded-full hover:bg-white/10 text-white/90 transition-colors flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>

              <a
                href={`https://wa.me/${BOT_PHONE_NUMBER}?text=${encodeURIComponent("Hi Manico Harvest! I am chatting from your website.")}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Open directly in WhatsApp Web/App"
                className="p-1.5 rounded-full hover:bg-white/10 text-white/90 transition-colors flex items-center justify-center"
              >
                <WhatsAppIcon className="w-5 h-5" fill="#ffffff" />
              </a>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/90 transition-colors"
                aria-label="Close WhatsApp chat"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat Messages Container */}
          <div className="relative flex-1 p-4 overflow-y-auto space-y-3.5 select-text">
            <WhatsAppWallpaper />

            {/* Date Tag */}
            <div className="flex justify-center my-1 relative z-10">
              <span className="bg-white/80 dark:bg-[#111b21]/80 backdrop-blur-sm text-[10.5px] font-semibold tracking-wider text-stone-600 dark:text-stone-300 px-3 py-0.5 rounded-full uppercase shadow-xs">
                Today
              </span>
            </div>

            {/* Messages */}
            {messages.map((msg) => {
              const isUser = msg.sender === 'user'
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col relative z-10 ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-sm text-sm relative leading-relaxed ${
                      isUser
                        ? 'bg-[#d9fdd3] dark:bg-[#005c4b] text-stone-900 dark:text-stone-100 rounded-tr-xs'
                        : 'bg-white dark:bg-[#202c33] text-stone-900 dark:text-stone-100 rounded-tl-xs'
                    }`}
                  >
                    {/* Message Text with simple bold/line-break formatting */}
                    <div className="whitespace-pre-line text-[13.5px]">
                      {msg.text}
                    </div>

                    {/* Rich Products Card inside Chat */}
                    {msg.products && msg.products.length > 0 && (
                      <div className="mt-3 space-y-2.5">
                        {msg.products.map((prod) => (
                          <div
                            key={prod.id}
                            className="bg-stone-50 dark:bg-[#111b21] border border-stone-200 dark:border-stone-700/60 rounded-xl p-2.5 flex flex-col gap-2"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center font-bold text-emerald-800 dark:text-emerald-300 shrink-0 text-base">
                                🌿
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-xs text-stone-900 dark:text-stone-100 truncate">
                                  {prod.name}
                                </p>
                                <div className="flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400">
                                  <span className="font-bold text-emerald-700 dark:text-emerald-400">₹{prod.price}</span>
                                  {prod.weight && <span>• {prod.weight}</span>}
                                </div>
                              </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center gap-1.5 pt-1">
                              <a
                                href={prod.whatsappUrl || `https://wa.me/${BOT_PHONE_NUMBER}?text=${encodeURIComponent(`Hi Manico Harvest, I would like to buy ${prod.name} (₹${prod.price})!`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-[11.5px] font-bold py-1.5 px-2 rounded-lg transition-colors shadow-xs"
                              >
                                <WhatsAppIcon className="w-3.5 h-3.5" fill="#ffffff" />
                                Buy on WhatsApp
                              </a>

                              <button
                                type="button"
                                onClick={() => handleAddToCart(prod)}
                                className="inline-flex items-center justify-center gap-1 bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-800 dark:text-stone-100 text-[11.5px] font-semibold py-1.5 px-2.5 rounded-lg transition-colors"
                              >
                                🛒 Add to Cart
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Direct WhatsApp Callout Button if provided */}
                    {msg.whatsappUrl && !msg.products && (
                      <div className="mt-2.5 pt-2 border-t border-black/5 dark:border-white/10">
                        <a
                          href={msg.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs py-2 px-3 rounded-lg w-full justify-center transition-all shadow-xs"
                        >
                          <WhatsAppIcon className="w-4 h-4" fill="#ffffff" />
                          Chat directly on WhatsApp
                        </a>
                      </div>
                    )}

                    {/* Timestamp & Read Receipt */}
                    <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-stone-400 dark:text-stone-400 select-none">
                      <span>{msg.timestamp}</span>
                      {isUser && <WhatsAppCheckmarks read />}
                    </div>
                  </div>

                  {/* Quick Action Chips */}
                  {msg.quickChips && msg.quickChips.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5 max-w-[95%]">
                      {msg.quickChips.map((chip, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleQuickChipClick(chip)}
                          className="bg-white dark:bg-[#202c33] hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-600/20 text-[11.5px] font-medium px-2.5 py-1 rounded-full transition-all shadow-2xs active:scale-95 text-left"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1 bg-white dark:bg-[#202c33] px-3.5 py-2.5 rounded-2xl rounded-tl-xs shadow-sm w-fit relative z-10">
                <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Emoji Bar (Togglable) */}
          {showEmojiPicker && (
            <div className="bg-stone-100 dark:bg-[#111b21] px-3 py-1.5 border-t border-stone-200 dark:border-stone-800 flex gap-2 overflow-x-auto text-lg">
              {['🌿', '🍵', '☕', '📦', '🎁', '👍', '❤️', '🔥', '✅'].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => insertEmoji(emoji)}
                  className="hover:scale-125 transition-transform"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="p-2.5 bg-[#f0f2f5] dark:bg-[#202c33] flex items-center gap-2 border-t border-stone-200 dark:border-stone-800 z-10"
          >
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-1.5 text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 transition-colors"
              title="Insert Emoji"
            >
              😊
            </button>

            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question or request to buy..."
              className="flex-1 bg-white dark:bg-[#2a3942] text-stone-900 dark:text-stone-100 text-xs sm:text-sm px-3.5 py-2 rounded-full outline-none border-none placeholder-stone-400"
            />

            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="w-9 h-9 bg-[#008069] hover:bg-[#006e5a] disabled:opacity-40 text-white rounded-full flex items-center justify-center transition-all shadow-xs shrink-0"
              title="Send message"
            >
              <svg className="w-4 h-4 translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l7-7-7-7M5 12h14" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* ── FLOATING BUTTONS STACK (CENTERED IN THE MIDDLE) ── */}
      <div className="flex flex-col items-center">
        {/* Floating Facebook Button (Above Instagram) */}
        {!isOpen && (
          <div className="pointer-events-auto relative group mb-3">
            {/* Subtle Facebook blue glow ring */}
            <span className="absolute -inset-1 rounded-full bg-[#1877F2] opacity-35 blur-md group-hover:opacity-80 transition duration-500" />

            <a
              href={FACEBOOK_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-14 h-14 bg-gradient-to-tr from-[#1877F2] to-[#0A58CA] hover:from-[#166fe5] hover:to-[#094bac] text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform active:scale-95 group-hover:scale-105"
              aria-label="Follow Manico Harvest on Facebook"
            >
              <svg
                className="w-7 h-7 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* Hover Tooltip */}
            <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center whitespace-nowrap bg-stone-900/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl border border-white/10 pointer-events-none">
              Follow on Facebook
            </div>
          </div>
        )}

        {/* Floating Instagram Button (Above WhatsApp) */}
        {!isOpen && (
          <div className="pointer-events-auto relative group mb-3">
            {/* Subtle Instagram gradient glow ring */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] opacity-35 blur-md group-hover:opacity-80 transition duration-500" />

            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-14 h-14 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:from-[#e28728] hover:via-[#c91f3a] hover:to-[#a81479] text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform active:scale-95 group-hover:scale-105"
              aria-label="Follow Manico Harvest on Instagram"
            >
              <svg
                className="w-7 h-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>

            {/* Hover Tooltip */}
            <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center whitespace-nowrap bg-stone-900/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl border border-white/10 pointer-events-none">
              Follow on Instagram (@manico.harvest)
            </div>
          </div>
        )}

        {/* Floating WhatsApp Trigger Button */}
        <div className="pointer-events-auto relative group">
          {/* Pulse glow animation background ring */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 blur-md group-hover:opacity-75 transition duration-500 animate-pulse" />

          {/* Unread Counter Badge */}
          {unreadCount > 0 && !isOpen && (
            <span className="absolute -top-1 -right-1 z-20 bg-red-600 text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-bounce">
              {unreadCount}
            </span>
          )}

          {/* Main WhatsApp Button */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(!isOpen)
              setUnreadCount(0)
            }}
            className="relative w-14 h-14 bg-gradient-to-tr from-[#128C7E] to-[#25D366] hover:from-[#0e7065] hover:to-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform active:scale-95 group-hover:scale-105"
            aria-label="Open WhatsApp Chatbot Assistant"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <WhatsAppIcon className="w-7 h-7" fill="#ffffff" />
            )}

            {/* Online green dot */}
            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
          </button>

          {/* Hover Tooltip */}
          {!isOpen && (
            <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center whitespace-nowrap bg-stone-900/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl border border-white/10 pointer-events-none">
              Chat on WhatsApp ({BOT_DISPLAY_PHONE})
            </div>
          )}
        </div>
      </div>

    </aside>
  )
}
