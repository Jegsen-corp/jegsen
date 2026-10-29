"use client"

import { createContext, useContext, useId, type ReactNode } from "react"
import { motion, type Transition } from "framer-motion"
import { EASE } from "@/components/motion/reveal"
import { useReducedMotion } from "@/components/motion/use-reduced-motion"

/*
 * Kit des illustrations d'offres (en-têtes des pages /offres/*).
 *
 * Grammaire commune : des objets de travail réels (fiches, listes, documents) posés sur la page,
 * blancs, bord fin, ombre douce. Le bleu marque ce que fait l'IA ou ce qui est retenu, le vert le temps
 * gagné et la personne qui décide, l'ambre une alerte. Tout chiffre inventé porte l'étiquette « Exemple ».
 * Le symbole Jegsen signe ce que l'offre remet (feuille de route, workflow, charte, rapport).
 *
 * Une seule séquence par illustration, au chargement. Avec « réduire les animations », l'état final
 * s'affiche directement.
 */

export const C = {
  ink: "#0b0d12",
  ink2: "#464c58",
  ink3: "#686e7a",
  line: "#0b0d121a",
  lineSoft: "#0b0d120f",
  fill: "#0b0d120b",
  surface: "#ffffff",
  bg2: "#f4f4f1",
  brand: "#3355ff",
  brandSoft: "#e8ecff",
  brandMid: "#9fb1ff",
  time: "#0fa58c",
  timeSoft: "#e2f5f1",
  warn: "#f59f0b",
  warnSoft: "#fff3dc",
} as const

export const FONT = "var(--font-sans)"
export const DISPLAY = "var(--font-display)"

/** Arrondi à deux décimales : même chaîne au rendu serveur et dans le navigateur. */
export const r2 = (x: number) => Math.round(x * 100) / 100

type ArtCtx = { shadow: string; reduce: boolean }
const Ctx = createContext<ArtCtx>({ shadow: "", reduce: false })
export const useArt = () => useContext(Ctx)

/** Cadre SVG commun : définitions (ombre), accessibilité, contexte d'animation. */
export function ArtFrame({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  const id = useId().replace(/[:«»]/g, "")
  const reduce = useReducedMotion()
  const shadow = `art-shadow-${id}`
  return (
    <Ctx.Provider value={{ shadow, reduce }}>
      <svg viewBox="0 0 560 440" role="img" aria-label={label} className={`h-auto w-full overflow-visible ${className}`}>
        <defs>
          <filter id={shadow} x="-20%" y="-20%" width="140%" height="160%" colorInterpolationFilters="sRGB">
            <feDropShadow dx="0" dy="1" stdDeviation="0.8" floodColor="#0b0d12" floodOpacity="0.06" />
            <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#1d2a66" floodOpacity="0.08" />
          </filter>
        </defs>
        {/* La préférence n'est connue qu'après l'hydratation : on remonte alors la scène dans son état final */}
        <g key={reduce ? "still" : "motion"}>{children}</g>
      </svg>
    </Ctx.Provider>
  )
}

/** Transition de la séquence d'entrée, décalée de `delay` secondes. */
export function tr(delay: number, duration = 0.7): Transition {
  return { duration, delay, ease: EASE }
}

/** Groupe qui apparaît (fondu et léger glissement) à `delay` secondes. */
export function Appear({ delay = 0, y = 10, x = 0, children, duration = 0.7 }: { delay?: number; y?: number; x?: number; children: ReactNode; duration?: number }) {
  const { reduce } = useArt()
  return (
    <motion.g initial={reduce ? false : { opacity: 0, x, y }} animate={{ opacity: 1, x: 0, y: 0 }} transition={tr(delay, duration)}>
      {children}
    </motion.g>
  )
}

/** Fiche blanche avec bord fin et ombre douce. */
export function Card({ x, y, w, h, rx = 14, children, delay = 0, tone = "surface" }: { x: number; y: number; w: number; h: number; rx?: number; children?: ReactNode; delay?: number; tone?: "surface" | "soft" }) {
  const { shadow } = useArt()
  return (
    <Appear delay={delay} y={14}>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={tone === "soft" ? C.bg2 : C.surface} stroke={C.line} filter={tone === "soft" ? undefined : `url(#${shadow})`} />
      {children}
    </Appear>
  )
}

/** Texte de l'illustration (Inter). */
export function T({ x, y, children, size = 12, weight = 400, color = C.ink, anchor = "start", display = false, ls }: { x: number; y: number; children: ReactNode; size?: number; weight?: number; color?: string; anchor?: "start" | "middle" | "end"; display?: boolean; ls?: number }) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight={weight} fill={color} textAnchor={anchor} fontFamily={display ? DISPLAY : FONT} letterSpacing={ls}>
      {children}
    </text>
  )
}

/** Ligne de texte simulée (barre arrondie). */
export function Lines({ x, y, widths, gap = 9, h = 5, color = C.fill }: { x: number; y: number; widths: number[]; gap?: number; h?: number; color?: string }) {
  return (
    <g>
      {widths.map((w, i) => (
        <rect key={i} x={x} y={y + i * gap} width={w} height={h} rx={h / 2} fill={color} />
      ))}
    </g>
  )
}

/** Étiquette « Exemple » : les chiffres de l'illustration ne sont pas des résultats clients. */
export function ExampleTag({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={54} height={18} rx={9} fill={C.bg2} stroke={C.line} />
      <T x={x + 27} y={y + 12.5} size={10} color={C.ink3} anchor="middle" weight={500}>
        Exemple
      </T>
    </g>
  )
}

/** Pastille ronde avec une coche. */
export function Check({ cx, cy, r = 8, color = C.brand, filled = true }: { cx: number; cy: number; r?: number; color?: string; filled?: boolean }) {
  const s = r / 8
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={filled ? color : C.surface} stroke={color} strokeWidth={filled ? 0 : 1.4} />
      <path d={`M${r2(cx - 3.4 * s)} ${r2(cy + 0.2 * s)}l${r2(2.3 * s)} ${r2(2.3 * s)}l${r2(4.6 * s)}-${r2(4.8 * s)}`} fill="none" stroke={filled ? "#fff" : color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  )
}

/** Petite personne (tête et épaules), pour les équipes et la validation humaine. */
export function Person({ cx, cy, r = 13, color = C.time, soft = C.timeSoft }: { cx: number; cy: number; r?: number; color?: string; soft?: string }) {
  const k = r / 13
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={soft} stroke={color} strokeWidth={1.4} />
      <circle cx={cx} cy={r2(cy - 3.2 * k)} r={r2(3.6 * k)} fill="none" stroke={color} strokeWidth={1.5} />
      <path d={`M${r2(cx - 6.4 * k)} ${r2(cy + 7.2 * k)}c0-${r2(3.6 * k)} ${r2(2.8 * k)}-${r2(5.6 * k)} ${r2(6.4 * k)}-${r2(5.6 * k)}s${r2(6.4 * k)} ${r2(2 * k)} ${r2(6.4 * k)} ${r2(5.6 * k)}`} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </g>
  )
}

/**
 * Le symbole Jegsen en signature sur ce que l'offre remet : l'arc se trace, le point bleu se pose,
 * comme à l'ouverture du site. `size` est la taille du symbole en unités de la scène.
 */
export function Seal({ x, y, size = 22, delay = 1.2 }: { x: number; y: number; size?: number; delay?: number }) {
  const { reduce } = useArt()
  const k = size / 64
  const pop = (d: number) => ({
    initial: reduce ? false : { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.4, delay: d, ease: [0.34, 1.56, 0.64, 1] as const },
    style: { transformBox: "fill-box" as const, transformOrigin: "center" },
  })
  return (
    <g transform={`translate(${x} ${y}) scale(${r2(k)})`} aria-hidden="true">
      <motion.path
        d="M32 10A22 22 0 1 1 10 32"
        fill="none"
        stroke={C.ink}
        strokeWidth={6.5}
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay, ease: [0.3, 0, 0.2, 1] }}
      />
      <motion.circle cx={10} cy={32} r={5.5} fill={C.brand} {...pop(delay + 0.55)} />
      <motion.circle cx={32} cy={32} r={3.4} fill={C.ink} {...pop(delay + 0.7)} />
    </g>
  )
}

/** Barre qui grandit depuis la gauche. */
export function GrowBar({ x, y, w, h = 8, fill, delay = 0, rx }: { x: number; y: number; w: number; h?: number; fill: string; delay?: number; rx?: number }) {
  const { reduce } = useArt()
  return (
    <motion.rect x={x} y={y} width={w} height={h} rx={rx ?? h / 2} fill={fill} initial={reduce ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={tr(delay, 0.8)} style={{ transformBox: "fill-box", transformOrigin: "left center" }} />
  )
}

/** Tracé qui se dessine. */
export function Draw({ d, stroke, width = 2, delay = 0, duration = 1, dash, opacity = 1 }: { d: string; stroke: string; width?: number; delay?: number; duration?: number; dash?: string; opacity?: number }) {
  const { reduce } = useArt()
  if (dash) {
    // Un pointillé ne se « dessine » pas proprement : il apparaît en fondu.
    return <motion.path d={d} fill="none" stroke={stroke} strokeWidth={width} strokeDasharray={dash} strokeLinecap="round" strokeOpacity={opacity} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={tr(delay, duration)} />
  }
  return <motion.path d={d} fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" strokeOpacity={opacity} initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration, delay, ease: [0.3, 0, 0.2, 1] }} />
}
