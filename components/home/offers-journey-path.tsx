"use client"

import { Children, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { EASE } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

/**
 * Parcours des offres : les cartes en quinconce (grand écran) ou en colonne (mobile),
 * reliées par un tracé qui se dessine quand il entre à l'écran.
 * Le tracé est calculé à partir de la position réelle des cartes : il suit le contenu, quelle que soit sa hauteur.
 */

type Pt = { x: number; y: number }
type Seg = { d: string; from: Pt; to: Pt; label: Pt; wide: boolean }
type Geo = { w: number; h: number; segs: Seg[] }

/** Place de chaque carte en grand écran : quinconce, les cartes de droite remontent le long de celles de gauche. */
const SLOT = [
  "lg:w-[41%]",
  "lg:ml-auto lg:w-[41%] lg:-mt-[clamp(104px,9vw,140px)]",
  "lg:mx-auto lg:w-[41%] lg:mt-[clamp(92px,8vw,124px)]",
]

/** Rail vertical du mobile : abscisse du tracé, en px depuis le bord gauche. */
const RAIL = 11

function measure(root: HTMLElement, cards: HTMLElement[], wide: boolean): Geo {
  const r = cards.map((c) => ({ x: c.offsetLeft, y: c.offsetTop, w: c.offsetWidth, h: c.offsetHeight }))
  const segs: Seg[] = []
  for (let i = 0; i < r.length - 1; i++) {
    const a = r[i], b = r[i + 1]
    if (!wide) {
      const from = { x: RAIL, y: a.y + 34 }, to = { x: RAIL, y: b.y + 34 }
      segs.push({ d: `M${from.x} ${from.y}V${to.y}`, from, to, label: { x: b.x + 36, y: (a.y + a.h + b.y) / 2 }, wide })
      continue
    }
    if (b.y >= a.y + a.h - 1) {
      // Virage : du bas d'une carte au haut de la suivante, placée plus bas.
      const from = { x: a.x + a.w * 0.5, y: a.y + a.h }, to = { x: b.x + b.w * 0.5, y: b.y }
      const k = (to.y - from.y) * 0.95
      const d = `M${from.x} ${from.y}C${from.x} ${from.y + k} ${to.x} ${to.y - k} ${to.x} ${to.y}`
      segs.push({ d, from, to, label: { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 }, wide })
      continue
    }
    // Courbe en S dans la gouttière : du flanc droit au flanc gauche (ou l'inverse).
    const leftToRight = b.x > a.x
    const from = { x: leftToRight ? a.x + a.w : a.x, y: a.y + a.h * 0.5 }
    const to = { x: leftToRight ? b.x : b.x + b.w, y: b.y + b.h * 0.5 }
    const k = (to.x - from.x) * 0.62
    const d = `M${from.x} ${from.y}C${from.x + k} ${from.y} ${to.x - k} ${to.y} ${to.x} ${to.y}`
    segs.push({ d, from, to, label: { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 }, wide })
  }
  return { w: root.offsetWidth, h: root.offsetHeight, segs }
}

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect

export function OffersJourneyPath({ labels, children }: { labels: string[]; children: React.ReactNode }) {
  const items = Children.toArray(children)
  const root = useRef<HTMLDivElement>(null)
  const cards = useRef<(HTMLLIElement | null)[]>([])
  const [geo, setGeo] = useState<Geo | null>(null)
  const reduce = useReducedMotion()

  const update = useCallback(() => {
    const el = root.current
    const list = cards.current.filter(Boolean) as HTMLLIElement[]
    if (!el || list.length < 2) return
    setGeo(measure(el, list, window.matchMedia("(min-width: 1024px)").matches))
  }, [])

  useIsoLayoutEffect(() => {
    update()
    const ro = new ResizeObserver(update)
    if (root.current) ro.observe(root.current)
    cards.current.forEach((c) => c && ro.observe(c))
    return () => ro.disconnect()
  }, [update])

  return (
    <div ref={root} className="relative">
      {geo ? (
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 overflow-visible" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} fill="none">
          <defs>
            {geo.segs.map((s, i) => (
              <linearGradient key={i} id={`journey-g${i}`} gradientUnits="userSpaceOnUse" x1={s.from.x} y1={s.from.y} x2={s.to.x} y2={s.to.y}>
                <stop offset="0" style={{ stopColor: "var(--brand)" }} />
                <stop offset="1" style={{ stopColor: "var(--brand-2)" }} />
              </linearGradient>
            ))}
          </defs>
          {geo.segs.map((s, i) => (
            <g key={`${i}-${s.d}`}>
              {/* Tracé de fond, en pointillés : le parcours complet est lisible avant même l'animation. */}
              <path d={s.d} stroke="var(--line-strong)" strokeWidth={1.5} strokeLinecap="round" strokeDasharray="0.5 7" />
              <motion.path
                d={s.d}
                stroke={`url(#journey-g${i})`}
                strokeWidth={1.75}
                strokeLinecap="round"
                initial={reduce ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "0px 0px -22% 0px" }}
                transition={{ duration: 0.95, ease: EASE }}
              />
              <Socket at={s.from} reduce={!!reduce} delay={0} />
              <Socket at={s.to} reduce={!!reduce} delay={0.85} />
            </g>
          ))}
        </svg>
      ) : null}

      <ol className="relative flex flex-col gap-16 lg:gap-0">
        {items.map((child, i) => (
          <li key={i} ref={(el) => { cards.current[i] = el }} className={cn("relative pl-9 lg:pl-0", SLOT[i])}>
            <motion.div
              className="h-full"
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {i > 0 ? <span className="sr-only">{labels[i - 1]} : </span> : null}
              {child}
            </motion.div>
          </li>
        ))}
      </ol>

      {geo
        ? geo.segs.map((s, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute z-20 rounded-full border border-line bg-surface px-3 py-1 text-[12.5px] font-medium whitespace-nowrap text-ink-2 shadow-[0_1px_2px_#0b0d120a,0_6px_18px_#0b0d120d]",
                s.wide ? "-translate-x-1/2 -translate-y-1/2" : "-translate-y-1/2",
              )}
              style={{ left: s.label.x, top: s.label.y }}
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -22% 0px" }}
              transition={{ duration: 0.5, delay: reduce ? 0 : 0.45, ease: EASE }}
            >
              {labels[i]}
            </motion.span>
          ))
        : null}
    </div>
  )
}

/** Point d'attache sur le bord d'une carte : creux au repos, bleu quand le tracé l'atteint. */
function Socket({ at, reduce, delay }: { at: Pt; reduce: boolean; delay: number }) {
  return (
    <g transform={`translate(${at.x} ${at.y})`}>
      <circle r={5.5} fill="var(--surface)" stroke="var(--line-strong)" strokeWidth={1.5} />
      <motion.circle
        r={3}
        fill="var(--brand)"
        initial={reduce ? false : { scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -22% 0px" }}
        transition={{ duration: 0.35, delay: reduce ? 0 : delay, ease: EASE }}
      />
    </g>
  )
}
