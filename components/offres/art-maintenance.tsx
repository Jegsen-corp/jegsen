"use client"

import { useId } from "react"
import { motion } from "framer-motion"
import { C, CENTER, Frame, Legend, Mark, Pill, fade, pop, rise, useStill } from "./art-kit"

/*
 * Maintenance : le moniteur de veille. Un écran sombre, trois workflows en production, chacun avec sa
 * ligne de vie qui défile. Sur l'une d'elles, un pic : l'alerte, puis le correctif, puis le retour au
 * calme. En bas de l'écran, les heures gagnées se maintiennent mois après mois. Le journal des
 * interventions s'écrit à côté. Chiffres et horaires d'exemple.
 */

const SCR = { x: 18, y: 56, w: 560, h: 298 }
const LANE_X0 = SCR.x + 176
const LANE_X1 = SCR.x + SCR.w - 104
const LANE_W = LANE_X1 - LANE_X0
const LANES = [
  { label: "Factures fournisseurs", y: SCR.y + 86, seed: 1 },
  { label: "Tri des e-mails", y: SCR.y + 142, seed: 2, alert: true },
  { label: "Comptes rendus", y: SCR.y + 198, seed: 3 },
]
const ALERT_AT = 1.7
const FIX_AT = 2.9
const GAINS = [44, 47, 46, 48, 45, 49, 47, 48, 50, 48, 49, 51]

const f = (n: number) => n.toFixed(1)
/** Ligne de vie : un motif calme sur toute la largeur de la piste. */
function life(seed: number) {
  const pts: [number, number][] = []
  const step = 14
  for (let x = 0; x <= LANE_W; x += step) {
    const k = x / step
    const bump = (k * 7 + seed * 3) % 11 === 0 ? -5 : (k * 5 + seed) % 7 === 0 ? 3 : 0
    pts.push([x, bump + ((k + seed) % 3 === 0 ? -1.5 : 1)])
  }
  return pts.map(([x, y], i) => `${i ? "L" : "M"}${f(x)} ${f(y)}`).join(" ")
}
/** Le pic de l'anomalie, dessiné par-dessus. */
const SPIKE = "M0 0 L8 -2 L14 -22 L20 10 L26 -6 L32 0"

export function MaintenanceArt() {
  return (
    <Frame
      viewBox="0 0 640 440"
      label="Moniteur de supervision. Trois workflows en production (factures fournisseurs, tri des e-mails, comptes rendus), chacun avec sa ligne de vie. Une anomalie sur le tri des e-mails déclenche une alerte, un correctif est appliqué et le workflow revient à la normale. En bas de l'écran, les heures gagnées chaque mois restent stables sur douze mois. Le journal note l'alerte, le correctif et le rétablissement (exemple)."
      legends={[
        { title: "La supervision", sub: "Ce qui veille, en continu", tone: "brand" },
        { title: "Les gains", sub: "Suivis mois après mois", tone: "time" },
      ]}
    >
      <Scene />
    </Frame>
  )
}

function Scene() {
  const still = useStill()
  const id = useId().replace(/[:«»]/g, "")
  return (
    <>
      {/* L'écran */}
      <motion.g variants={rise(16, 0.1, 0.9)}>
        <rect x={SCR.x} y={SCR.y} width={SCR.w} height={SCR.h} rx={22} fill="url(#art-dark)" stroke="#ffffff1f" filter="url(#art-shadow)" />
        <ellipse cx={SCR.x + 120} cy={SCR.y + 30} rx={150} ry={50} fill="url(#art-core)" opacity={0.5} />
        <text x={SCR.x + 50} y={SCR.y + 36} fontSize={13} fontWeight={600} fill="#f3f4f6" style={{ fontFamily: "var(--font-display)" }}>
          Supervision
        </text>
        <circle cx={SCR.x + SCR.w - 24} cy={SCR.y + 31} r={4} fill={C.timeLight} style={{ filter: "drop-shadow(0 0 6px #38d6b8)" }} />
        <text x={SCR.x + SCR.w - 34} y={SCR.y + 35} textAnchor="end" fontSize={10.5} fill="#aeb8e8">
          3 workflows en production
        </text>
        <line x1={SCR.x + 20} x2={SCR.x + SCR.w - 20} y1={SCR.y + 54} y2={SCR.y + 54} stroke="#ffffff14" />
        {/* Grille fine derrière les lignes de vie */}
        {[0, 1, 2, 3, 4, 5, 6].map((k) => (
          <line key={k} x1={LANE_X0 + (LANE_W * k) / 6} x2={LANE_X0 + (LANE_W * k) / 6} y1={SCR.y + 64} y2={SCR.y + 220} stroke="#ffffff0a" />
        ))}
      </motion.g>
      <Mark x={SCR.x + 30} y={SCR.y + 31} size={24} delay={0.5} onDark />

      {/* Les lignes de vie */}
      <defs>
        <clipPath id={`${id}-clip`}>
          <rect x={LANE_X0} y={SCR.y + 60} width={LANE_W} height={166} />
        </clipPath>
        <linearGradient id={`${id}-scan`} x1="0" x2="1">
          <stop offset="0" stopColor="#7d96ff" stopOpacity="0" />
          <stop offset="0.7" stopColor="#7d96ff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#7d96ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Le balayage du moniteur, en continu */}
      {!still ? (
        <g clipPath={`url(#${id}-clip)`}>
          <motion.rect x={LANE_X0 - 60} y={SCR.y + 60} width={60} height={166} fill={`url(#${id}-scan)`} initial={{ x: 0 }} animate={{ x: LANE_W + 60 }} transition={{ duration: 3.6, ease: "linear", repeat: Infinity, delay: 1 }} />
        </g>
      ) : null}
      {LANES.map((l, i) => (
        <g key={l.label}>
          <motion.g variants={fade(0.5 + i * 0.12, 0.5)}>
            <StatusDot cx={SCR.x + 30} cy={l.y} alert={!!l.alert} />
            <text x={SCR.x + 44} y={l.y + 4} fontSize={11.5} fontWeight={500} fill="#dfe5ff">
              {l.label}
            </text>
          </motion.g>
          <motion.path d={life(l.seed)} transform={`translate(${LANE_X0} ${l.y})`} fill="none" stroke={C.brandLight} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" strokeOpacity={0.9} variants={fade(0.7 + i * 0.12, 0.5)} />
          {l.alert ? <Spike cx={LANE_X0 + LANE_W * 0.58} cy={l.y} /> : null}
          <Status x={LANE_X1 + 52} y={l.y} alert={!!l.alert} />
        </g>
      ))}

      {/* Les gains, dans le bandeau bas de l'écran */}
      <motion.g variants={fade(1.2)}>
        <line x1={SCR.x + 20} x2={SCR.x + SCR.w - 20} y1={SCR.y + 232} y2={SCR.y + 232} stroke="#ffffff14" />
        <text x={SCR.x + 30} y={SCR.y + 254} fontSize={11} fontWeight={500} fill="#dfe5ff">
          Heures gagnées par mois
        </text>
        <text x={SCR.x + 30} y={SCR.y + 268} fontSize={9.5} fill="#8a93b8">
          douze mois, exemple
        </text>
        <text x={LANE_X0} y={SCR.y + 288} fontSize={9.5} fill="#8a93b8">
          Mois 1
        </text>
        <text x={LANE_X1} y={SCR.y + 288} textAnchor="end" fontSize={9.5} fill="#8a93b8">
          Mois 12
        </text>
      </motion.g>
      {GAINS.map((g, k) => {
        const x = LANE_X0 + (k * LANE_W) / 12 + 6
        const h = Math.round(g * 0.62)
        return (
          <motion.rect key={k} x={x} y={SCR.y + 276 - h} width={12} height={h} rx={3} fill={k === GAINS.length - 1 ? C.timeLight : "#38d6b866"} variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { delay: 1.4 + k * 0.05, duration: 0.6, ease: [0.2, 0.7, 0.1, 1] } } }} style={{ transformBox: "fill-box", transformOrigin: "bottom" }} />
        )
      })}

      {/* Le journal des interventions, sous l'écran */}
      <Journal />

      <Legend x={0} y={SCR.y - 26} title="La supervision" sub="Ce qui veille, en continu" tone="brand" anchor="start" />
      <Legend x={640} y={SCR.y - 26} title="Les gains" sub="Suivis mois après mois" tone="time" anchor="end" />
    </>
  )
}

/** Trois fiches du journal, alignées sous l'écran : alerte, correctif, rétabli. */
function Journal() {
  const items = [
    { tone: C.amber, title: "Alerte", text: "Format de facture modifié", time: "09:12", at: ALERT_AT + 0.2 },
    { tone: C.brand, title: "Correctif", text: "Règle d'extraction ajustée", time: "09:47", at: FIX_AT - 0.3 },
    { tone: C.time, title: "Rétabli", text: "Contrôle sur 50 documents", time: "10:05", at: FIX_AT + 0.35 },
  ]
  const w = 176
  const gap = 16
  const x0 = 320 - (items.length * w + (items.length - 1) * gap) / 2
  return (
    <g>
      {items.map((j, i) => {
        const x = x0 + i * (w + gap)
        const y = SCR.y + SCR.h + 22
        return (
          <motion.g key={j.title} variants={pop(j.at)} style={CENTER}>
            <rect x={x} y={y} width={w} height={44} rx={13} fill={C.surface} stroke={C.line} filter="url(#art-shadow)" />
            <circle cx={x + 16} cy={y + 22} r={5} fill={j.tone} />
            <text x={x + 28} y={y + 18} fontSize={11} fontWeight={600} fill={C.ink}>
              {j.title}
            </text>
            <text x={x + w - 12} y={y + 18} textAnchor="end" fontSize={10} fill={C.ink3}>
              {j.time}
            </text>
            <text x={x + 28} y={y + 33} fontSize={10} fill={C.ink2}>
              {j.text}
            </text>
          </motion.g>
        )
      })}
    </g>
  )
}

function StatusDot({ cx, cy, alert }: { cx: number; cy: number; alert: boolean }) {
  const still = useStill()
  if (!alert || still) return <circle cx={cx} cy={cy} r={4} fill={C.timeLight} />
  return <motion.circle cx={cx} cy={cy} r={4} initial={{ fill: C.timeLight }} animate={{ fill: [C.timeLight, C.timeLight, C.amber, C.amber, C.timeLight] }} transition={{ duration: FIX_AT + 0.1, times: [0, (ALERT_AT - 0.05) / (FIX_AT + 0.1), (ALERT_AT + 0.05) / (FIX_AT + 0.1), (FIX_AT - 0.05) / (FIX_AT + 0.1), 1], ease: "linear" }} />
}

/** Le pic de l'anomalie sur la ligne de vie, puis la marque qui reste. */
function Spike({ cx, cy }: { cx: number; cy: number }) {
  const still = useStill()
  return (
    <g transform={`translate(${cx - 16} ${cy})`}>
      <motion.path d={SPIKE} fill="none" stroke={C.amber} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1, transition: { delay: ALERT_AT - 0.3, duration: 0.35 } } }} />
      {!still ? <motion.circle cx={14} cy={-22} r={6} fill="none" stroke={C.amber} strokeWidth={1.5} initial={{ opacity: 0, scale: 1 }} animate={{ opacity: [0, 0.9, 0], scale: [1, 1, 3] }} transition={{ duration: 0.9, delay: ALERT_AT, ease: "easeOut" }} style={CENTER} /> : null}
      <motion.circle cx={14} cy={-22} r={3.5} fill={C.amber} variants={pop(ALERT_AT)} style={CENTER} />
    </g>
  )
}

/** Pastille d'état : Normal, puis Alerte, puis Corrigé. */
function Status({ x, y, alert }: { x: number; y: number; alert: boolean }) {
  const still = useStill()
  if (!alert) return <Pill x={x} y={y} text="Normal" tone="time" small />
  if (still) return <Pill x={x} y={y} text="Corrigé" tone="time" small />
  const seq = (values: number[], times: number[], end: number) => ({
    initial: { opacity: values[0] },
    animate: { opacity: values },
    transition: { duration: end, times: times.map((t) => t / end), ease: "linear" as const },
  })
  const e = 0.05
  return (
    <g>
      <motion.g {...seq([1, 1, 0], [0, ALERT_AT - e, ALERT_AT + e], ALERT_AT + e)}>
        <Pill x={x} y={y} text="Normal" tone="time" small />
      </motion.g>
      <motion.g {...seq([0, 0, 1, 1, 0], [0, ALERT_AT - e, ALERT_AT + e, FIX_AT - e, FIX_AT + e], FIX_AT + e)}>
        <Pill x={x} y={y} text="Alerte" tone="amber" small />
      </motion.g>
      <motion.g {...seq([0, 0, 1], [0, FIX_AT - e, FIX_AT + e], FIX_AT + e)}>
        <Pill x={x} y={y} text="Corrigé" tone="time" small />
      </motion.g>
    </g>
  )
}
