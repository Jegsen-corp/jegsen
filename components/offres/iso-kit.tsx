"use client"

import { createContext, useContext, type ReactNode } from "react"
import { motion, type Variants } from "framer-motion"
import { EASE } from "@/components/motion/reveal"
import { useReducedMotion } from "@/components/motion/use-reduced-motion"

/*
 * Moteur isométrique des illustrations d'offres, dans la langue du cerveau d'entreprise (components/home/brain-diagram.tsx) :
 * des plateaux posés dans l'espace, des pavés blancs pour ce qui vient de l'entreprise, un plateau sombre pour ce que
 * fait Jegsen (il porte le symbole), des faisceaux bleus pour l'IA et verts pour le temps rendu, des étiquettes plates.
 *
 * Tout est dessiné en coordonnées locales de plateau (u, v), puis projeté en isométrie.
 * Chaque illustration joue une seule séquence à l'arrivée. Avec « réduire les animations », l'état final s'affiche.
 */

export const K = 0.866
export type Pt = [number, number]

export const iso = (cx: number, cy: number, u: number, v: number, z = 0): Pt => [cx + (u - v) * K, cy + (u + v) * 0.5 - z]
export const pts = (p: Pt[]) => p.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ")
/** Matrice qui pose un dessin local (u, v) à plat sur un plateau, à la hauteur z. */
export const flat = (cx: number, cy: number, u = 0, v = 0, z = 0) => {
  const [x, y] = iso(cx, cy, u, v, z)
  return `matrix(${K} 0.5 ${-K} 0.5 ${x.toFixed(1)} ${y.toFixed(1)})`
}

export type Faces = { top: string; left: string; right: string; stroke: string }

export const FACES = {
  floor: { top: "#ffffff", left: "#ebebe6", right: "#dfdfd9", stroke: "#0b0d121c" },
  tile: { top: "#ffffff", left: "#f0f0ec", right: "#e4e4df", stroke: "#0b0d1226" },
  tileMuted: { top: "#f6f6f3", left: "#e6e6e1", right: "#dadad4", stroke: "#0b0d121a" },
  dark: { top: "url(#iso-dark-top)", left: "#0e1119", right: "#07080d", stroke: "#ffffff1f" },
  blueFloor: { top: "#f4f6ff", left: "#e2e7ff", right: "#d5dcff", stroke: "#3355ff2e" },
  blueTile: { top: "#ffffff", left: "#e8ecff", right: "#dce3ff", stroke: "#3355ff59" },
  blue: { top: "#8aa0ff", left: "#3355ff", right: "#2a46d6", stroke: "#2a46d6" },
  blueSoft: { top: "#e6eaff", left: "#cdd5ff", right: "#bcc6fb", stroke: "#3355ff26" },
  green: { top: "#6fd9c4", left: "#0fa58c", right: "#0b826f", stroke: "#0b826f" },
  greenSoft: { top: "#e2f5f1", left: "#bfe9df", right: "#a9ded2", stroke: "#0fa58c40" },
  amber: { top: "#ffd27a", left: "#f59f0b", right: "#c77f06", stroke: "#c77f06" },
  grey: { top: "#d9dbe0", left: "#b9bcc4", right: "#a5a9b2", stroke: "#8a8f99" },
} satisfies Record<string, Faces>

type IsoCtx = { cx: number; still: boolean }
const Ctx = createContext<IsoCtx>({ cx: 300, still: false })
export const useIso = () => useContext(Ctx)

/** Pavé isométrique : face du dessus à la hauteur z, flancs jusqu'à z - t. */
export function Slab({ cy, u = 0, v = 0, s, su, sv, z = 0, t, f, cx: cxp }: { cy: number; u?: number; v?: number; s?: number; su?: number; sv?: number; z?: number; t: number; f: Faces; cx?: number }) {
  const { cx: cxc } = useIso()
  const cx = cxp ?? cxc
  const a = su ?? s ?? 10
  const b = sv ?? s ?? 10
  const A = iso(cx, cy, u - a, v - b, z)
  const B = iso(cx, cy, u + a, v - b, z)
  const C = iso(cx, cy, u + a, v + b, z)
  const D = iso(cx, cy, u - a, v + b, z)
  const down = ([x, y]: Pt): Pt => [x, y + t]
  return (
    <g>
      <polygon points={pts([D, C, down(C), down(D)])} fill={f.left} />
      <polygon points={pts([C, B, down(B), down(C)])} fill={f.right} />
      <polygon points={pts([A, B, C, D])} fill={f.top} stroke={f.stroke} strokeWidth={1} strokeLinejoin="round" />
    </g>
  )
}

/** Quadrillage posé à plat sur un plateau. */
export function Grid({ cy, s, step = 25, color = "#0b0d120d", z = 0 }: { cy: number; s: number; step?: number; color?: string; z?: number }) {
  const { cx } = useIso()
  const ks: number[] = []
  for (let k = -s + step; k < s; k += step) ks.push(k)
  return (
    <g transform={flat(cx, cy, 0, 0, z)}>
      {ks.map((k) => (
        <path key={k} d={`M${k} ${-s} V ${s} M${-s} ${k} H ${s}`} stroke={color} strokeWidth={1} />
      ))}
    </g>
  )
}

/** Ombre portée douce d'un plateau. */
export function Shadow({ cy, s, dy = 26 }: { cy: number; s: number; dy?: number }) {
  const { cx } = useIso()
  return <ellipse cx={cx} cy={cy + s * 0.55 + dy} rx={s * 1.5} ry={s * 0.45} fill="#0b0d12" opacity={0.07} filter="url(#iso-soft)" />
}

/** Faisceau vertical animé (tirets qui montent), ou trait fixe avec « réduire les animations ». */
export function Beam({ x, y1, y2, color, delay = 0, width = 2.5, up = true }: { x: number; y1: number; y2: number; color: string; delay?: number; width?: number; up?: boolean }) {
  const { still } = useIso()
  const d = `M${x.toFixed(1)} ${y1.toFixed(1)} V ${y2.toFixed(1)}`
  return (
    <g>
      <path d={d} stroke={color} strokeOpacity={0.22} strokeWidth={1.5} />
      {!still && (
        <motion.path d={d} stroke={color} strokeWidth={width} strokeLinecap="round" strokeDasharray="7 26" initial={{ strokeDashoffset: 0 }} animate={{ strokeDashoffset: up ? -66 : 66 }} transition={{ duration: 2.2, ease: "linear", repeat: Infinity, delay }} />
      )}
    </g>
  )
}

/** Étiquette plate (non projetée). */
export function Pill({ x, y, text, tone = "light", small = false }: { x: number; y: number; text: string; tone?: "light" | "brand" | "time" | "dark" | "amber"; small?: boolean }) {
  const size = small ? 10.5 : 11.5
  const w = text.length * (small ? 5.8 : 6.3) + (small ? 16 : 20)
  const h = small ? 19 : 22
  const fill = tone === "dark" ? "#0b0d12" : "#ffffff"
  const stroke = tone === "brand" ? "#3355ff40" : tone === "time" ? "#0fa58c4d" : tone === "amber" ? "#f59f0b66" : tone === "dark" ? "#0b0d12" : "#0b0d1217"
  const color = tone === "brand" ? "#2a46d6" : tone === "time" ? "#0b826f" : tone === "amber" ? "#a86400" : tone === "dark" ? "#f3f4f6" : "#0b0d12"
  return (
    <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={fill} stroke={stroke} style={{ filter: "drop-shadow(0 4px 10px #0b0d1212)" }} />
      <text x={0} y={size * 0.36} textAnchor="middle" fontSize={size} fontWeight={tone === "light" ? 500 : 600} fill={color}>
        {text}
      </text>
    </g>
  )
}

/** Le cœur Jegsen : disque sombre, symbole clair, halo bleu. Flotte doucement. */
export function Core({ x, y, r = 26 }: { x: number; y: number; r?: number }) {
  const { still } = useIso()
  const k = r / 30
  return (
    <motion.g animate={still ? undefined : { y: [0, -4, 0] }} transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}>
      <circle cx={x} cy={y} r={r} fill="#0b0d12" stroke="#ffffff26" style={{ filter: "drop-shadow(0 0 22px #3355ff88)" }} />
      <g transform={`translate(${x - 32 * k} ${y - 32 * k}) scale(${k})`}>
        <path d="M32 14A18 18 0 1 1 14 32" fill="none" stroke="#f3f4f6" strokeWidth={5.5} strokeLinecap="round" />
        <circle cx="14" cy="32" r="5" fill="#7d96ff" />
        <circle cx="32" cy="32" r="3.2" fill="#f3f4f6" />
      </g>
    </motion.g>
  )
}

export type LegendItem = { title: string; sub: string; tone?: "light" | "brand" | "time" }

/** Légende d'un niveau, à gauche de la scène (écrans larges : sur téléphone, la liste sous la figure). */
export function Legend({ x, y, title, sub, tone = "light" }: { x: number; y: number } & LegendItem) {
  return (
    <g transform={`translate(${x} ${y})`} className="max-sm:hidden">
      <text x={0} y={-4} fontSize={14.5} fontWeight={600} fill="#0b0d12" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>
        {title}
      </text>
      <text x={0} y={13} fontSize={11.5} fill="#686e7a">
        {sub}
      </text>
      <path d="M0 24 H 22" stroke={tone === "brand" ? "#3355ff" : tone === "time" ? "#0fa58c" : "#0b0d1226"} strokeWidth={2} strokeLinecap="round" />
    </g>
  )
}

/** Variantes de la séquence d'entrée : montée depuis `from`, ou simple fondu. */
export const rise = (from: number, delay: number, duration = 1.1): Variants => ({
  hidden: { y: from, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { delay, duration, ease: EASE } },
})
export const fade = (delay: number, duration = 0.8): Variants => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { delay, duration } },
})
export const pop = (delay: number): Variants => ({
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { delay, duration: 0.45, ease: [0.34, 1.56, 0.64, 1] } },
})

/** Cadre commun : halo de fond, définitions, légende accessible, séquence au chargement. */
export function IsoScene({ label, viewBox, cx, legends = [], children, className = "" }: { label: string; viewBox: string; cx: number; legends?: LegendItem[]; children: ReactNode; className?: string }) {
  const still = useReducedMotion()
  return (
    <Ctx.Provider value={{ cx, still }}>
      <figure className={`relative m-0 ${className}`}>
        <figcaption className="sr-only">{label}</figcaption>
        <div aria-hidden className="pointer-events-none absolute inset-[10%] rounded-full bg-[radial-gradient(closest-side,#3355ff1c,#0000)] blur-2xl" />
        <motion.svg
          key={still ? "still" : "motion"}
          aria-hidden
          viewBox={viewBox}
          className="relative h-auto w-full overflow-visible"
          initial={still ? false : "hidden"}
          animate="show"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <defs>
            <linearGradient id="iso-dark-top" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#1a1f31" />
              <stop offset="1" stopColor="#0b0d12" />
            </linearGradient>
            <radialGradient id="iso-core">
              <stop offset="0" stopColor="#7d96ff" stopOpacity="0.55" />
              <stop offset="1" stopColor="#7d96ff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="iso-amber">
              <stop offset="0" stopColor="#f59f0b" stopOpacity="0.6" />
              <stop offset="1" stopColor="#f59f0b" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="iso-green">
              <stop offset="0" stopColor="#0fa58c" stopOpacity="0.5" />
              <stop offset="1" stopColor="#0fa58c" stopOpacity="0" />
            </radialGradient>
            <filter id="iso-soft" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="14" />
            </filter>
          </defs>
          {children}
        </motion.svg>
        {legends.length ? (
          <ol className="m-0 mt-3 grid list-none gap-1.5 p-0 sm:hidden">
            {legends.map((l) => (
              <li key={l.title} className="flex items-baseline gap-2 text-sm">
                <span aria-hidden="true" className={`block h-0.5 w-4 flex-none translate-y-[-3px] rounded-full ${l.tone === "brand" ? "bg-brand" : l.tone === "time" ? "bg-time" : "bg-line-strong"}`} />
                <b className="font-semibold text-ink">{l.title}</b>
                <span className="text-ink-3">{l.sub}</span>
              </li>
            ))}
          </ol>
        ) : null}
      </figure>
    </Ctx.Provider>
  )
}
