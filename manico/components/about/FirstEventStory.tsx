import Image from 'next/image'
import type { ReactElement } from 'react'
import { Reveal } from '@/components/motion/Reveal'

const IMG = '/images/events/rain-run-2026'

/** Editorial photo grid — spans add to 12 per row on large screens. */
const GALLERY = [
  {
    src: `${IMG}/stall-athletes.jpg`,
    alt: 'The Manico Harvest team with runners and athletes at the stall',
    caption: 'Runners, athletes and curious first-timers at the stall',
    span: 'lg:col-span-8',
    ratio: '16 / 10',
  },
  {
    src: `${IMG}/moringa-sattu.jpg`,
    alt: 'Founder holding a pack of Moringa Sattu at the event stall',
    caption: 'Moringa Sattu, meeting its first customers',
    span: 'lg:col-span-4',
    ratio: '3 / 4',
  },
  {
    src: `${IMG}/founder-backdrop.jpg`,
    alt: 'Founder at the 23 Tri Club event backdrop',
    caption: 'Before the gates opened',
    span: 'lg:col-span-4',
    ratio: '3 / 4',
  },
  {
    src: `${IMG}/young-runner.jpg`,
    alt: 'Founder with a young medal-winning runner',
    caption: 'The next generation of runners',
    span: 'lg:col-span-4',
    ratio: '3 / 4',
  },
  {
    src: `${IMG}/finish-arch.jpg`,
    alt: 'Founder at the Rain Run Haldwani finish arch',
    caption: 'The finish arch, in the rain',
    span: 'lg:col-span-4',
    ratio: '3 / 4',
  },
  {
    src: `${IMG}/hamper-group.jpg`,
    alt: 'Presenting a Manico Harvest Healthy Hamper to athletes on stage',
    caption: 'Healthy Hampers, handed over with one request — honest feedback',
    span: 'lg:col-span-7',
    ratio: '16 / 10',
  },
  {
    src: `${IMG}/product-lineup.jpg`,
    alt: 'The full Manico Harvest product range displayed at the event',
    caption: 'Five products. One dream, finally on a table.',
    span: 'lg:col-span-5',
    ratio: '16 / 10',
  },
] as const

const EVENT_META = [
  { label: 'Date', value: '19 July 2026' },
  { label: 'Event', value: 'Rain Run Haldwani' },
  { label: 'Edition', value: '4th · Half Marathon' },
  { label: 'Our role', value: 'Hydration Partner' },
]

export function FirstEventStory(): ReactElement {
  return (
    <section className="py-16 sm:py-24" style={{ background: 'var(--color-bg-base)' }}>
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <Reveal className="text-center mb-14">
          <p className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: 'var(--color-brand-accent)' }}>
            THE FIRST CHAPTER · 19 JULY 2026
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--color-brand-primary)' }}>
            The Story of Our First Event
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.75' }}>
            Every journey has a &ldquo;first.&rdquo; For Manico Harvest, that first chapter was written at the
            Rain Run Haldwani Half Marathon.
          </p>
        </Reveal>

        {/* ── Hero: poster + opening narrative ── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center mb-20">
          <Reveal variant="scale" className="w-full lg:w-[42%] shrink-0">
            <div
              className="relative w-full rounded-3xl overflow-hidden"
              style={{
                aspectRatio: '3 / 4',
                background: 'var(--color-bg-subtle)',
                boxShadow: '0 24px 48px rgba(42,70,16,0.14)',
                border: '1px solid var(--color-border)',
              }}
            >
              <Image
                src={`${IMG}/announcement-poster.jpg`}
                alt="Manico Harvest announcement poster for the Rain Run Haldwani Half Marathon"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
          </Reveal>

          <Reveal className="flex-1 min-w-0">
            <p className="text-lg sm:text-xl font-semibold mb-5" style={{ color: 'var(--color-brand-primary)', lineHeight: '1.6' }}>
              Months of planning. Countless product trials. Packaging revisions. Sleepless nights.
              Self&#8209;doubt. Learning. And believing.
            </p>
            <p className="text-base mb-5" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.85' }}>
              All of it came together in a single day. When <strong style={{ color: 'var(--color-text-primary)' }}>23TriClub</strong> and{' '}
              <strong style={{ color: 'var(--color-text-primary)' }}>Reformation Nutrition</strong> gave us the
              opportunity to exhibit our products at the Rain Run Haldwani Half Marathon, we knew this
              wasn&apos;t just another event.
            </p>
            <p className="text-base mb-8" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.85' }}>
              It was Manico Harvest&apos;s first step into the real world.
            </p>

            {/* Event meta */}
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden" style={{ background: 'var(--color-border)' }}>
              {EVENT_META.map((meta) => (
                <div key={meta.label} className="p-4" style={{ background: 'var(--color-bg-surface)' }}>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                    {meta.label}
                  </dt>
                  <dd className="text-sm font-bold" style={{ color: 'var(--color-brand-primary)' }}>
                    {meta.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* ── The night before ── */}
        <Reveal
          className="relative rounded-3xl px-6 py-10 sm:px-12 sm:py-14 mb-20 text-center"
          style={{ background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)' }}
        >
          <p className="text-xs font-bold tracking-[0.2em] mb-4" style={{ color: 'var(--color-brand-accent)' }}>
            THE NIGHT BEFORE
          </p>
          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto"
            style={{ color: 'var(--color-text-primary)', lineHeight: '1.8' }}
          >
            The night before the event wasn&apos;t about sleeping. It was about carefully arranging every
            product, preparing the stall, checking every label, packing every hamper — and hoping that
            people would connect with what we had created with so much love.
          </p>
        </Reveal>

        {/* ── The day, in frames ── */}
        <Reveal className="text-center mb-10">
          <p className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: 'var(--color-brand-accent)' }}>
            THE DAY, IN FRAMES
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--color-brand-primary)' }}>
            As the Sun Rose, So Did We
          </h3>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 mb-16">
          {GALLERY.map((photo, i) => (
            <Reveal
              key={photo.src}
              delay={Math.min(i, 6) * 70}
              className={`group relative overflow-hidden rounded-2xl ${photo.span}`}
              style={{
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div className="relative w-full" style={{ aspectRatio: photo.ratio }}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform group-hover:scale-[1.04]"
                  style={{ transitionDuration: 'var(--duration-slow)' }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Caption overlay */}
                <div
                  className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-y-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(26,26,26,0.82) 0%, transparent 100%)',
                    transitionDuration: 'var(--duration-base)',
                  }}
                >
                  <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--color-text-inverse)' }}>
                    {photo.caption}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── The realisation ── */}
        <Reveal className="max-w-3xl mx-auto text-center mb-20">
          <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.85' }}>
            People stopped by our stall. Some were curious about mushrooms. Some had never heard of
            mushroom coffee. Some tasted our products for the very first time. Some asked thoughtful
            questions. And many left with smiles, appreciation, and curiosity to know more.
          </p>
          <p
            className="text-xl sm:text-2xl font-bold"
            style={{ color: 'var(--color-brand-primary)', lineHeight: '1.6' }}
          >
            That was the moment we realised — people are genuinely looking for healthier, cleaner,
            and more convenient food choices.
          </p>
        </Reveal>

        {/* ── Honest feedback ── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center mb-20">
          <Reveal className="flex-1 min-w-0 order-2 lg:order-1">
            <p className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: 'var(--color-brand-accent)' }}>
              HEALTHY HAMPERS
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold mb-5" style={{ color: 'var(--color-brand-primary)' }}>
              We Asked for Only One Thing in Return
            </h3>
            <p className="text-base mb-5" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.85' }}>
              One of the most memorable parts of the day was meeting inspiring athletes, runners,
              fitness enthusiasts, and passionate individuals who believe in healthy living just as
              much as we do.
            </p>
            <blockquote
              className="pl-5 py-1 my-6"
              style={{ borderLeft: '3px solid var(--color-brand-accent)' }}
            >
              <p className="text-lg sm:text-xl font-semibold italic" style={{ color: 'var(--color-brand-primary)', lineHeight: '1.6' }}>
                &ldquo;Taste them honestly. Tell us what you truly think.&rdquo;
              </p>
            </blockquote>
            <p className="text-base" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.85' }}>
              Because genuine feedback builds better products.
            </p>
          </Reveal>

          <Reveal variant="scale" className="w-full lg:w-[46%] shrink-0 order-1 lg:order-2">
            <div
              className="relative w-full rounded-3xl overflow-hidden"
              style={{
                aspectRatio: '4 / 3',
                background: 'var(--color-bg-subtle)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--color-border)',
              }}
            >
              <Image
                src={`${IMG}/hamper-stage.jpg`}
                alt="Presenting a Manico Harvest Healthy Hamper on stage at the Rain Run Haldwani"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
            </div>
          </Reveal>
        </div>

        {/* ── The family behind the stall ── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center mb-20">
          <Reveal variant="scale" className="w-full lg:w-[46%] shrink-0">
            <div
              className="relative w-full rounded-3xl overflow-hidden"
              style={{
                aspectRatio: '4 / 3',
                background: 'var(--color-bg-subtle)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--color-border)',
              }}
            >
              <Image
                src={`${IMG}/family-stall.jpg`}
                alt="The founder with her father and uncle at the Manico Harvest stall"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
            </div>
          </Reveal>

          <Reveal className="flex-1 min-w-0">
            <p className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: 'var(--color-brand-accent)' }}>
              THE BACKBONE
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold mb-5" style={{ color: 'var(--color-brand-primary)' }}>
              No Event Is Successful Alone
            </h3>
            <p className="text-base mb-5" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.85' }}>
              Behind the stall stood my biggest strength — my father, my uncle, and my younger brother.
            </p>
            <p className="text-base mb-5" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.85' }}>
              From carrying cartons and arranging products to welcoming visitors and standing beside me
              throughout the day, they quietly became the backbone of our very first exhibition.
            </p>
            <p className="text-base font-semibold" style={{ color: 'var(--color-brand-primary)', lineHeight: '1.85' }}>
              Their belief in my dream made this milestone possible.
            </p>
          </Reveal>
        </div>

        {/* ── Thank you ── */}
        <Reveal
          className="rounded-3xl px-6 py-10 sm:px-12 sm:py-14 mb-16 text-center"
          style={{ background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)' }}
        >
          <p className="text-xs font-bold tracking-[0.2em] mb-5" style={{ color: 'var(--color-brand-accent)' }}>
            WITH GRATITUDE
          </p>
          <p className="text-base max-w-2xl mx-auto mb-6" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.85' }}>
            A heartfelt thank you to <strong style={{ color: 'var(--color-text-primary)' }}>23TriClub</strong>,{' '}
            <strong style={{ color: 'var(--color-text-primary)' }}>Reformation Nutrition</strong>, and{' '}
            <strong style={{ color: 'var(--color-text-primary)' }}>Hemant Joshi</strong> for believing in a young
            homegrown brand and giving us this incredible platform.
          </p>
          <p className="text-base max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.85' }}>
            And thank you to every single person who visited our stall. Whether you purchased a product,
            sampled one, asked a question, or simply wished us well — you became a part of Manico
            Harvest&apos;s story.
          </p>
        </Reveal>

        {/* ── Closing statement ── */}
        <Reveal variant="scale" className="max-w-3xl mx-auto text-center">
          <div className="flex flex-col gap-3 mb-8">
            <p className="text-lg sm:text-xl font-semibold" style={{ color: 'var(--color-brand-primary)' }}>
              This wasn&apos;t about selling products. It was about introducing a dream.
            </p>
            <p className="text-base" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.85' }}>
              A dream that started with a small mushroom cultivation hut at home — and has now taken its
              first public step.
            </p>
          </div>

          <div
            className="rounded-3xl px-6 py-10 sm:px-12"
            style={{ background: 'var(--color-brand-primary)' }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mx-auto mb-5"
              style={{ color: 'var(--color-brand-accent)' }}
              aria-hidden="true"
            >
              <path d="M9.5 4C6.5 4 4 6.5 4 9.5c0 2.8 2.2 5.1 5 5.5-.3 2.4-2.2 4.3-4.6 4.7l.5 2.3c4-.7 7.1-4.2 7.1-8.5V9.5C12 6.5 9.5 4 9.5 4zm10 0C16.5 4 14 6.5 14 9.5c0 2.8 2.2 5.1 5 5.5-.3 2.4-2.2 4.3-4.6 4.7l.5 2.3c4-.7 7.1-4.2 7.1-8.5V9.5C22 6.5 19.5 4 19.5 4z" />
            </svg>
            <p
              className="text-xl sm:text-2xl font-bold mb-6"
              style={{ color: 'var(--color-text-inverse)', lineHeight: '1.6' }}
            >
              Our first event wasn&apos;t just an exhibition. It was the first step of a dream that began
              in a small mushroom hut — and is only just beginning.
            </p>
            <p className="text-sm font-semibold tracking-wide" style={{ color: 'var(--color-brand-accent)' }}>
              MANICO HARVEST
            </p>
            <p className="text-xs mt-1" style={{ color: 'rgba(247,236,217,0.65)' }}>
              Nourishing Traditions. Empowering Health.
            </p>
          </div>

          <p className="text-base font-semibold mt-8" style={{ color: 'var(--color-brand-primary)' }}>
            This is not the destination. It&apos;s only the beginning.
          </p>
        </Reveal>

      </div>
    </section>
  )
}
