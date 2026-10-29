"use client"

import { createContext, useContext, type ReactNode } from "react"
import { motion, type Variants } from "framer-motion"
import { EASE } from "@/components/motion/reveal"
import { useReducedMotion } from "@/components/motion/use-reduced-motion"

/*
 * Socle commun des illustrations d'offres. Chaque offre a sa propre forme (cadran, panneau de câblage,
 * salle, moniteur) ; ce fichier ne porte que ce qu'elles partagent : la palette de la charte, le cadre
 * accessible, la séquence d'entrée et quelques éléments (étiquette, symbole Jegsen).
 * Une seule séquence par scène, à l'arrivée. Avec « réduire les animations », l'état final s'affiche.
 */

export const C = {
  ink: "#0b0d12",
  ink2: "#464c58",
  ink3: "#686e7a",
  line: "#0b0d121c",
  surface: "#ffffff",
  bg2: "#f1f1ee",
  brand: "#3355ff",
  brandLight: "#7d96ff",
  brandSoft: "#e8ecff",
  time: "#0fa58c",
  timeLight: "#38d6b8",
  timeSoft: "#e2f5f1",
  amber: "#f59f0b",
  amberSoft: "#fff3dc",
} as const

type Ctx = { still: boolean }
const ArtCtx = createContext<Ctx>({ still: false })
export const useStill = () => useContext(ArtCtx).still

export const fade = (delay: number, duration = 0.8): Variants => ({ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay, duration } } })
export const rise = (from: number, delay: number, duration = 1): Variants => ({ hidden: { y: from, opacity: 0 }, show: { y: 0, opacity: 1, transition: { delay, duration, ease: EASE } } })
export const pop = (delay: number): Variants => ({ hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1, transition: { delay, duration: 0.45, ease: [0.34, 1.56, 0.64, 1] } } })
export const draw = (delay: number, duration = 1): Variants => ({ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { delay, duration, ease: [0.3, 0, 0.2, 1] } } })
export const CENTER = { transformBox: "fill-box" as const, transformOrigin: "center" }

/** Cadre : figure accessible, halo, définitions communes, séquence au chargement. */
export function Frame({ label, viewBox, legends = [], children, className = "" }: { label: string; viewBox: string; legends?: { title: string; sub: string; tone?: "brand" | "time" | "light" }[]; children: ReactNode; className?: string }) {
  const still = useReducedMotion()
  return (
    <ArtCtx.Provider value={{ still }}>
      <figure className={`relative m-0 ${className}`}>
        <figcaption className="sr-only">{label}</figcaption>
        <div aria-hidden className="pointer-events-none absolute inset-[12%] rounded-full bg-[radial-gradient(closest-side,#3355ff1a,#0000)] blur-2xl" />
        <motion.svg key={still ? "still" : "motion"} aria-hidden viewBox={viewBox} className="relative h-auto w-full overflow-visible" initial={still ? false : "hidden"} animate="show" style={{ fontFamily: "var(--font-sans)" }}>
          <defs>
            <linearGradient id="art-dark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#1a1f31" />
              <stop offset="1" stopColor="#0b0d12" />
            </linearGradient>
            <radialGradient id="art-core">
              <stop offset="0" stopColor="#7d96ff" stopOpacity="0.55" />
              <stop offset="1" stopColor="#7d96ff" stopOpacity="0" />
            </radialGradient>
            <filter id="art-soft" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="14" />
            </filter>
            <filter id="art-shadow" x="-20%" y="-20%" width="140%" height="160%" colorInterpolationFilters="sRGB">
              <feDropShadow dx="0" dy="1" stdDeviation="0.8" floodColor="#0b0d12" floodOpacity="0.06" />
              <feDropShadow dx="0" dy="16" stdDeviation="16" floodColor="#1d2a66" floodOpacity="0.1" />
            </filter>
          </defs>
          {children}
        </motion.svg>
        {legends.length ? (
          <ol className="m-0 mt-3 grid list-none gap-1.5 p-0 sm:hidden">
            {legends.map((l) => (
              <li key={l.title} className="flex items-baseline gap-2 text-sm">
                <span aria-hidden="true" className={`block h-0.5 w-4 flex-none translate-y-[-3px] rounded-full ${l.tone === "brand" ? "bg-brand" : l.tone === "time" ? "bg-time" : "bg-line-strong"}`} />
                <b className="shrink-0 font-semibold whitespace-nowrap text-ink">{l.title}</b>
                <span className="text-ink-3">{l.sub}</span>
              </li>
            ))}
          </ol>
        ) : null}
      </figure>
    </ArtCtx.Provider>
  )
}

/** Étiquette plate. */
export function Pill({ x, y, text, tone = "light", small = false, anchor = "middle" }: { x: number; y: number; text: string; tone?: "light" | "brand" | "time" | "dark" | "amber"; small?: boolean; anchor?: "start" | "middle" | "end" }) {
  const size = small ? 10.5 : 11.5
  const w = text.length * (small ? 5.8 : 6.3) + (small ? 16 : 20)
  const h = small ? 19 : 22
  const fill = tone === "dark" ? C.ink : C.surface
  const stroke = tone === "brand" ? "#3355ff40" : tone === "time" ? "#0fa58c4d" : tone === "amber" ? "#f59f0b66" : tone === "dark" ? C.ink : "#0b0d1217"
  const color = tone === "brand" ? "#2a46d6" : tone === "time" ? "#0b826f" : tone === "amber" ? "#a86400" : tone === "dark" ? "#f3f4f6" : C.ink
  const ox = anchor === "start" ? w / 2 : anchor === "end" ? -w / 2 : 0
  return (
    <g transform={`translate(${(x + ox).toFixed(1)} ${y.toFixed(1)})`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={fill} stroke={stroke} style={{ filter: "drop-shadow(0 4px 10px #0b0d1212)" }} />
      <text x={0} y={size * 0.36} textAnchor="middle" fontSize={size} fontWeight={tone === "light" ? 500 : 600} fill={color}>
        {text}
      </text>
    </g>
  )
}

/** Légende d'un niveau (écrans larges : sur téléphone, la liste sous la figure). */
export function Legend({ x, y, title, sub, tone = "light", anchor = "start" }: { x: number; y: number; title: string; sub: string; tone?: "light" | "brand" | "time"; anchor?: "start" | "end" }) {
  return (
    <g transform={`translate(${x} ${y})`} className="max-sm:hidden">
      <text x={0} y={-4} fontSize={14.5} fontWeight={600} fill={C.ink} textAnchor={anchor} style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>
        {title}
      </text>
      <text x={0} y={13} fontSize={11.5} fill={C.ink3} textAnchor={anchor}>
        {sub}
      </text>
      <path d={anchor === "end" ? "M-22 24 H 0" : "M0 24 H 22"} stroke={tone === "brand" ? C.brand : tone === "time" ? C.time : "#0b0d1226"} strokeWidth={2} strokeLinecap="round" />
    </g>
  )
}

/** Le symbole Jegsen, tracé puis ponctué, en clair sur fond sombre ou en encre sur fond clair. */
export function Mark({ x, y, size = 28, delay = 0.6, onDark = false }: { x: number; y: number; size?: number; delay?: number; onDark?: boolean }) {
  const k = size / 64
  const ink = onDark ? "#f3f4f6" : C.ink
  const dot = onDark ? C.brandLight : C.brand
  return (
    <g transform={`translate(${x - 32 * k} ${y - 32 * k}) scale(${k})`}>
      <motion.path d="M32 10A22 22 0 1 1 10 32" fill="none" stroke={ink} strokeWidth={6.5} strokeLinecap="round" variants={draw(delay, 0.6)} />
      <motion.circle cx={10} cy={32} r={5.5} fill={dot} variants={pop(delay + 0.55)} style={CENTER} />
      <motion.circle cx={32} cy={32} r={3.4} fill={ink} variants={pop(delay + 0.7)} style={CENTER} />
    </g>
  )
}
