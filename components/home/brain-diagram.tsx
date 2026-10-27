"use client"

import { motion } from "framer-motion"
import { useSyncExternalStore } from "react"
import { EASE } from "@/components/motion/reveal"
import { useReducedMotion } from "@/components/motion/use-reduced-motion"

/*
 * Cerveau d'entreprise : vue éclatée isométrique en trois plateaux.
 * En bas, les données de l'entreprise. Au milieu, le cerveau (plateau sombre, symbole Jegsen).
 * En haut, ce que les équipes en font. Les flux montent en bleu (l'IA), ressortent en vert (le temps gagné).
 * Tout est dessiné en coordonnées locales de plateau (u, v), puis projeté en isométrie.
 */

const K = 0.866
const CX = 340
const S = 100 // demi-côté d'un plateau
const T = 12 // épaisseur d'un plateau
const Y = { uses: 108, brain: 330, data: 526 } // centre écran de chaque plateau

type Pt = [number, number]
const iso = (cy: number, u: number, v: number, z = 0): Pt => [CX + (u - v) * K, cy + (u + v) * 0.5 - z]
const pts = (p: Pt[]) => p.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ")
/** Pose un dessin local (u, v) à plat sur un plateau, à la hauteur z. */
const flat = (cy: number, u = 0, v = 0, z = 0) => {
  const [x, y] = iso(cy, u, v, z)
  return `matrix(${K} 0.5 ${-K} 0.5 ${x.toFixed(1)} ${y.toFixed(1)})`
}

type Faces = { top: string; left: string; right: string; stroke: string }

/** Pavé isométrique : face du dessus à la hauteur z, flancs jusqu'à z - t. */
function Slab({ cy, u = 0, v = 0, s, z = 0, t, f }: { cy: number; u?: number; v?: number; s: number; z?: number; t: number; f: Faces }) {
  const A = iso(cy, u - s, v - s, z)
  const B = iso(cy, u + s, v - s, z)
  const C = iso(cy, u + s, v + s, z)
  const D = iso(cy, u - s, v + s, z)
  const down = ([x, y]: Pt): Pt => [x, y + t]
  return (
    <g>
      <polygon points={pts([D, C, down(C), down(D)])} fill={f.left} />
      <polygon points={pts([C, B, down(B), down(C)])} fill={f.right} />
      <polygon points={pts([A, B, C, D])} fill={f.top} stroke={f.stroke} strokeWidth={1} strokeLinejoin="round" />
    </g>
  )
}

/* Données : cinq blocs, deux rangées. */
const DATA_H = 9
const DATA_S = 21
const data = [
  { id: "doc", label: "Documents", u: -50, v: 10 },
  { id: "mail", label: "E-mails", u: 10, v: -50 },
  { id: "crm", label: "CRM", u: -35, v: 85 },
  { id: "erp", label: "ERP", u: 25, v: 25 },
  { id: "proc", label: "Procédures", u: 85, v: -35 },
] as const

/* Usages : trois blocs. */
const USE_H = 11
const USE_S = 24
const uses = [
  { id: "answer", label: "Réponses sourcées", u: -50, v: 80 },
  { id: "flow", label: "Workflows agentiques", u: 15, v: 15 },
  { id: "decide", label: "Décisions avec brAIn", u: 80, v: -50 },
] as const

const faces = {
  data: { top: "#ffffff", left: "#ebebe6", right: "#dfdfd9", stroke: "#0b0d121c" },
  dataTile: { top: "#ffffff", left: "#f0f0ec", right: "#e4e4df", stroke: "#0b0d1226" },
  brain: { top: "url(#bd-brain-top)", left: "#0e1119", right: "#07080d", stroke: "#ffffff1f" },
  uses: { top: "#f4f6ff", left: "#e2e7ff", right: "#d5dcff", stroke: "#3355ff2e" },
  useTile: { top: "#ffffff", left: "#e8ecff", right: "#dce3ff", stroke: "#3355ff59" },
} satisfies Record<string, Faces>

/** Icônes dessinées en coordonnées locales, centrées sur 0, posées à plat sur les blocs. */
function DataIcon({ id }: { id: (typeof data)[number]["id"] }) {
  const p = { fill: "none", stroke: "#686e7a", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  switch (id) {
    case "doc":
      return (
        <g {...p}>
          <path d="M-8 -11 h10 l6 6 v16 h-16 z" />
          <path d="M-4 0 h8 M-4 4 h8" />
        </g>
      )
    case "mail":
      return (
        <g {...p}>
          <rect x="-11" y="-8" width="22" height="16" rx="2" />
          <path d="M-10 -6 l10 7 l10 -7" />
        </g>
      )
    case "crm":
      return (
        <g {...p}>
          <circle cx="0" cy="-4" r="5" />
          <path d="M-9 10 c1 -6 4 -8 9 -8 s8 2 9 8" />
        </g>
      )
    case "erp":
      return (
        <g {...p}>
          <rect x="-10" y="-10" width="20" height="20" rx="2" />
          <path d="M-10 -3 h20 M-10 4 h20 M-3 -10 v20" />
        </g>
      )
    case "proc":
      return (
        <g {...p}>
          <rect x="-9" y="-10" width="18" height="21" rx="2" />
          <path d="M-4 -12 h8 v4 h-8 z" />
          <path d="M-5 -1 h10 M-5 4 h10 M-5 9 h6" />
        </g>
      )
  }
}

function UseIcon({ id }: { id: (typeof uses)[number]["id"] }) {
  const p = { fill: "none", stroke: "#3355ff", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  switch (id) {
    case "answer":
      return (
        <g {...p}>
          <path d="M-12 -10 h24 v14 h-14 l-6 5 v-5 h-4 z" />
          <path d="M-7 -4 h14 M-7 0 h8" />
          <circle cx="10" cy="10" r="3.2" fill="#3355ff" stroke="none" />
        </g>
      )
    case "flow":
      return (
        <g {...p}>
          <circle cx="-10" cy="-8" r="3.4" />
          <circle cx="0" cy="0" r="3.4" />
          <circle cx="10" cy="8" r="3.4" fill="#0fa58c" stroke="#0fa58c" />
          <path d="M-7.5 -5.5 l5 3 M2.5 2.5 l5 3" />
        </g>
      )
    case "decide":
      return null
  }
}

/** Décisions : trois options en colonnes, la recommandée en bleu. */
function Bars({ u, v }: { u: number; v: number }) {
  const bar = { top: "#e6eaff", left: "#cdd5ff", right: "#bcc6fb", stroke: "#3355ff26" }
  const pick = { top: "#8aa0ff", left: "#3355ff", right: "#2a46d6", stroke: "#2a46d6" }
  const cols = [
    { du: -10, dv: 10, h: 12, f: bar },
    { du: 0, dv: 0, h: 22, f: pick },
    { du: 10, dv: -10, h: 8, f: bar },
  ]
  return (
    <g>
      {cols.map((c, i) => (
        <Slab key={i} cy={Y.uses} u={u + c.du} v={v + c.dv} s={4.5} z={USE_H + c.h} t={c.h} f={c.f} />
      ))}
    </g>
  )
}

/** Faisceau vertical animé, de bas en haut. */
function Beam({ x, y1, y2, color, delay, still }: { x: number; y1: number; y2: number; color: string; delay: number; still: boolean }) {
  const d = `M${x.toFixed(1)} ${y1.toFixed(1)} V ${y2.toFixed(1)}`
  return (
    <g>
      <path d={d} stroke={color} strokeOpacity={0.22} strokeWidth={1.5} />
      {!still && (
        <motion.path
          d={d}
          stroke={color}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray="7 26"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -66 }}
          transition={{ duration: 2.2, ease: "linear", repeat: Infinity, delay }}
        />
      )}
    </g>
  )
}

/** Étiquette plate (non projetée) posée près d'un bloc. */
function Pill({ x, y, text, tone = "light" }: { x: number; y: number; text: string; tone?: "light" | "brand" }) {
  const w = text.length * 6.3 + 20
  return (
    <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
      <rect
        x={-w / 2}
        y={-11}
        width={w}
        height={22}
        rx={11}
        fill="#ffffff"
        stroke={tone === "brand" ? "#3355ff40" : "#0b0d1217"}
        style={{ filter: "drop-shadow(0 4px 10px #0b0d1212)" }}
      />
      <text x={0} y={4} textAnchor="middle" fontSize={11.5} fontWeight={tone === "brand" ? 600 : 500} fill={tone === "brand" ? "#2a46d6" : "#0b0d12"}>
        {text}
      </text>
    </g>
  )
}

const layers = [
  { y: Y.uses, title: "Les usages", sub: "Ce que vos équipes en font" },
  { y: Y.brain, title: "Le cerveau", sub: "Indexé, sourcé, sécurisé" },
  { y: Y.data, title: "Vos données", sub: "Là où elles sont déjà" },
]

const NARROW = "(max-width: 640px)"
function useNarrow() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(NARROW)
      m.addEventListener("change", cb)
      return () => m.removeEventListener("change", cb)
    },
    () => window.matchMedia(NARROW).matches,
    () => false
  )
}

export function BrainDiagram() {
  const reduce = useReducedMotion()
  const narrow = useNarrow()
  const still = reduce

  const rise = (from: number, delay: number) => ({
    hidden: { y: from, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { delay, duration: 1.1, ease: EASE } },
  })
  const fade = (delay: number) => ({
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { delay, duration: 0.8 } },
  })

  // Points d'arrivée des données et de départ des usages sur le plateau du cerveau.
  const core: Pt = [CX, Y.brain - 40]

  return (
    <figure className="relative m-0">
      <figcaption className="sr-only">
        Schéma du cerveau d&apos;entreprise en trois niveaux. En bas, les données de l&apos;entreprise : documents,
        e-mails, CRM, ERP et procédures. Au milieu, le cerveau d&apos;entreprise, qui les indexe et cite ses sources. En
        haut, ce que les équipes en font : des réponses sourcées, des workflows agentiques et des décisions préparées
        avec brAIn.
      </figcaption>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,#3355ff1f,#0000)] blur-2xl"
      />

      <motion.svg
        aria-hidden
        viewBox={narrow ? "150 0 380 650" : "0 0 560 650"}
        className="relative h-auto w-full overflow-visible"
        initial={still ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <defs>
          <linearGradient id="bd-brain-top" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1a1f31" />
            <stop offset="1" stopColor="#0b0d12" />
          </linearGradient>
          <radialGradient id="bd-core">
            <stop offset="0" stopColor="#7d96ff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#7d96ff" stopOpacity="0" />
          </radialGradient>
          <filter id="bd-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>

        {/* Ombres portées des plateaux */}
        {[Y.data, Y.brain, Y.uses].map((cy) => (
          <ellipse key={cy} cx={CX} cy={cy + S * 0.55 + 26} rx={S * 1.5} ry={S * 0.45} fill="#0b0d12" opacity={0.07} filter="url(#bd-soft)" />
        ))}

        {/* Niveau 1 : les données */}
        <motion.g variants={rise(-60, 0.05)}>
          <Slab cy={Y.data} s={S} t={T} f={faces.data} />
          <g transform={flat(Y.data)} opacity={0.5}>
            {[-75, -50, -25, 0, 25, 50, 75].map((k) => (
              <path key={k} d={`M${k} -100 V 100 M-100 ${k} H 100`} stroke="#0b0d120d" strokeWidth={1} />
            ))}
          </g>
          {data.map((d) => (
            <g key={d.id}>
              <Slab cy={Y.data} u={d.u} v={d.v} s={DATA_S} z={DATA_H} t={DATA_H} f={faces.dataTile} />
              <g transform={flat(Y.data, d.u, d.v, DATA_H)}>
                <DataIcon id={d.id} />
              </g>
            </g>
          ))}
        </motion.g>

        {/* Flux des données vers le cerveau (en partie cachés sous le plateau du milieu) */}
        <motion.g variants={fade(1)}>
          {data.map((d, i) => {
            const [x, y] = iso(Y.data, d.u, d.v, DATA_H)
            const [, y2] = iso(Y.brain, d.u, d.v)
            return <Beam key={d.id} x={x} y1={y} y2={y2} color="#3355ff" delay={i * 0.35} still={still} />
          })}
        </motion.g>

        {/* Étiquettes des données */}
        <motion.g variants={fade(0.9)}>
          {data.map((d) => {
            const [x, y] = iso(Y.data, d.u, d.v, DATA_H)
            const front = d.u + d.v > 0
            return <Pill key={d.id} x={x} y={front ? y + DATA_S + 22 : y - DATA_S - 10} text={d.label} />
          })}
        </motion.g>

        {/* Niveau 2 : le cerveau */}
        <motion.g variants={rise(0, 0.15)}>
          <Slab cy={Y.brain} s={S} t={T + 2} f={faces.brain} />
          <g transform={flat(Y.brain)}>
            {[-75, -50, -25, 0, 25, 50, 75].map((k) => (
              <path key={k} d={`M${k} -100 V 100 M-100 ${k} H 100`} stroke="#ffffff0b" strokeWidth={1} />
            ))}
            {/* Liens : données vers le cœur (bleu), cœur vers les usages (vert) */}
            {data.map((d) => (
              <path key={d.id} d={`M${d.u} ${d.v} L0 0`} stroke="#7d96ff" strokeOpacity={0.55} strokeWidth={1.2} />
            ))}
            {uses.map((u) => (
              <path key={u.id} d={`M0 0 L${u.u} ${u.v}`} stroke="#38d6b8" strokeOpacity={0.6} strokeWidth={1.2} />
            ))}
            {data.map((d) => (
              <circle key={d.id} cx={d.u} cy={d.v} r={3.4} fill="#7d96ff" />
            ))}
            {uses.map((u) => (
              <circle key={u.id} cx={u.u} cy={u.v} r={3.4} fill="#38d6b8" />
            ))}
            {[[-70, -60], [60, 55], [-80, 30], [40, -85], [-20, -80], [70, 10]].map(([a, b]) => (
              <circle key={`${a}${b}`} cx={a} cy={b} r={1.8} fill="#ffffff40" />
            ))}
            <circle r={30} fill="none" stroke="#7d96ff" strokeOpacity={0.35} />
            <circle r={44} fill="none" stroke="#7d96ff" strokeOpacity={0.18} strokeDasharray="3 6" />
          </g>
        </motion.g>

        {/* Cœur : le symbole Jegsen, debout au-dessus du plateau sombre */}
        <motion.g variants={fade(0.6)}>
          <ellipse cx={CX} cy={Y.brain} rx={60} ry={30} fill="url(#bd-core)" />
          <path d={`M${CX} ${Y.brain} V ${core[1] + 30}`} stroke="#7d96ff" strokeOpacity={0.5} strokeWidth={1.5} />
          <motion.g
            animate={still ? undefined : { y: [0, -5, 0] }}
            transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
          >
            <circle cx={core[0]} cy={core[1]} r={30} fill="#0b0d12" stroke="#ffffff26" style={{ filter: "drop-shadow(0 0 22px #3355ff88)" }} />
            <g transform={`translate(${core[0] - 32} ${core[1] - 32})`}>
              <path d="M32 14A18 18 0 1 1 14 32" fill="none" stroke="#f3f4f6" strokeWidth={5.5} strokeLinecap="round" />
              <circle cx="14" cy="32" r="5" fill="#7d96ff" />
              <circle cx="32" cy="32" r="3.2" fill="#f3f4f6" />
            </g>
          </motion.g>
        </motion.g>

        {/* Flux du cerveau vers les usages */}
        <motion.g variants={fade(1.3)}>
          {uses.map((u, i) => {
            const [x, y] = iso(Y.brain, u.u, u.v)
            const [, y2] = iso(Y.uses, u.u, u.v, USE_H)
            const start = u.id === "flow" ? core[1] - 32 : y
            return <Beam key={u.id} x={x} y1={start} y2={y2} color="#0fa58c" delay={0.4 + i * 0.35} still={still} />
          })}
        </motion.g>

        {/* Niveau 3 : les usages */}
        <motion.g variants={rise(60, 0.05)}>
          <Slab cy={Y.uses} s={S} t={T} f={faces.uses} />
          {uses.map((u) => (
            <g key={u.id}>
              <Slab cy={Y.uses} u={u.u} v={u.v} s={USE_S} z={USE_H} t={USE_H} f={faces.useTile} />
              {u.id === "decide" ? (
                <Bars u={u.u} v={u.v} />
              ) : (
                <g transform={flat(Y.uses, u.u, u.v, USE_H)}>
                  <UseIcon id={u.id} />
                </g>
              )}
            </g>
          ))}
        </motion.g>

        <motion.g variants={fade(1.1)}>
          {uses.map((u) => {
            const [x, y] = iso(Y.uses, u.u, u.v, USE_H)
            const above = u.id === "flow"
            return <Pill key={u.id} x={x} y={above ? y - USE_S - 14 : y + USE_S + 24} text={u.label} tone="brand" />
          })}
        </motion.g>

        {/* Légende des niveaux (écrans larges) */}
        {!narrow && (
          <motion.g variants={fade(0.8)}>
            {layers.map((l) => (
              <g key={l.title} transform={`translate(0 ${l.y})`}>
                <text x={0} y={-4} fontSize={15} fontWeight={600} fill="#0b0d12" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>
                  {l.title}
                </text>
                <text x={0} y={14} fontSize={12} fill="#686e7a">
                  {l.sub}
                </text>
                <path d={`M0 26 H 22`} stroke={l.y === Y.brain ? "#3355ff" : "#0b0d1226"} strokeWidth={2} strokeLinecap="round" />
              </g>
            ))}
          </motion.g>
        )}
      </motion.svg>

      {/* Légende des niveaux (mobile) */}
      <ol className="m-0 mt-4 grid list-none gap-2 p-0 sm:hidden">
        {layers.map((l) => (
          <li key={l.title} className="flex items-baseline gap-2 text-sm">
            <b className="font-semibold text-ink">{l.title}</b>
            <span className="text-ink-3">{l.sub}</span>
          </li>
        ))}
      </ol>
    </figure>
  )
}
