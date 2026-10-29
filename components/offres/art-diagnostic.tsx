"use client"

import { motion } from "framer-motion"
import { C, CENTER, Frame, Legend, Mark, Pill, draw, fade, pop, useStill } from "./art-kit"

/*
 * Diagnostic : un cadran de mesure. Chaque processus est un arc, qui s'ouvre d'autant plus que l'équipe y
 * passe d'heures (le plus lourd fait trois quarts de tour, comme l'arc du logo). Une aiguille fait le tour
 * du cadran, la mesure, et les trois cas les plus rentables passent au bleu. Leurs gains estimés sortent du
 * cadran. Autour, la semaine du diagnostic : trois jours travaillés. Chiffres d'exemple.
 */

const CX = 300
const CY = 262
const MAX_H = 64
const SWEEP_AT = 1.5
const SWEEP_DUR = 1.2

type Proc = { label: string; hours: number; r: number; pick: boolean; gain?: string }
const PROCS: Proc[] = [
  { label: "Saisie des factures", hours: 64, r: 132, pick: true, gain: "580 h/an" },
  { label: "Tri des e-mails", hours: 42, r: 112, pick: true, gain: "380 h/an" },
  { label: "Comptes rendus", hours: 36, r: 92, pick: true, gain: "320 h/an" },
  { label: "Relances clients", hours: 18, r: 72, pick: false },
  { label: "Contrôle des bons", hours: 12, r: 52, pick: false },
]
const WEEK = ["L", "M", "M", "J", "V", "S", "D"]
const WORKED = [0, 1, 4]

const rad = (deg: number) => ((deg - 90) * Math.PI) / 180
// Arrondi : même chaîne au rendu serveur et dans le navigateur
const pt = (r: number, deg: number): [number, number] => [Math.round((CX + r * Math.cos(rad(deg))) * 100) / 100, Math.round((CY + r * Math.sin(rad(deg))) * 100) / 100]
const f = (n: number) => n.toFixed(1)
/** Arc depuis midi, dans le sens horaire, jusqu'à `deg`. */
function arc(r: number, deg: number) {
  const [x1, y1] = pt(r, 0)
  const [x2, y2] = pt(r, deg)
  return `M${f(x1)} ${f(y1)} A${r} ${r} 0 ${deg > 180 ? 1 : 0} 1 ${f(x2)} ${f(y2)}`
}
const angle = (h: number) => (h / MAX_H) * 270
/** Instant où l'aiguille passe la fin d'un arc. */
const litAt = (h: number) => SWEEP_AT + (angle(h) / 360) * SWEEP_DUR

export function DiagnosticArt() {
  return (
    <Frame
      viewBox="0 10 640 500"
      label="Cadran du diagnostic. Cinq processus, chacun représenté par un arc proportionnel aux heures passées chaque mois (exemple : saisie des factures 64 h, tri des e-mails 42 h, comptes rendus 36 h, relances 18 h, contrôle des bons 12 h). Une mesure fait le tour du cadran et retient les trois cas les plus rentables, avec leur gain annuel estimé. Autour, la semaine du diagnostic, trois jours travaillés."
      legends={[
        { title: "La mesure", sub: "Vos chiffres, pas des moyennes", tone: "brand" },
        { title: "La semaine", sub: "Trois jours de travail, une restitution" },
      ]}
    >
      <Scene />
    </Frame>
  )
}

function Scene() {
  const still = useStill()
  return (
    <>
      {/* La semaine, autour du cadran : sept secteurs, trois jours travaillés */}
      <motion.g variants={fade(0.2)}>
        {WEEK.map((d, i) => {
          const a0 = (i / 7) * 360 + 2
          const a1 = ((i + 1) / 7) * 360 - 2
          const worked = WORKED.includes(i)
          const [x1, y1] = pt(172, a0)
          const [x2, y2] = pt(172, a1)
          const [lx, ly] = pt(188, (a0 + a1) / 2)
          return (
            <g key={i}>
              <path d={`M${f(x1)} ${f(y1)} A172 172 0 0 1 ${f(x2)} ${f(y2)}`} fill="none" stroke={worked ? C.brand : C.line} strokeWidth={worked ? 5 : 2} strokeLinecap="round" />
              <text x={lx} y={ly + 4} textAnchor="middle" fontSize={11.5} fontWeight={worked ? 700 : 500} fill={worked ? C.brand : C.ink3}>
                {d}
              </text>
            </g>
          )
        })}
      </motion.g>

      {/* Les pistes et les arcs des processus */}
      {PROCS.map((p, i) => {
        const a = angle(p.hours)
        const at = litAt(p.hours)
        const [ex, ey] = pt(p.r, a)
        return (
          <g key={p.label}>
            <circle cx={CX} cy={CY} r={p.r} fill="none" stroke="#0b0d1209" strokeWidth={11} />
            <motion.path d={arc(p.r, a)} fill="none" stroke="#c9ccd3" strokeWidth={11} strokeLinecap="round" variants={draw(0.4 + i * 0.12, 0.9)} />
            {p.pick ? <motion.path d={arc(p.r, a)} fill="none" stroke={C.brand} strokeWidth={11} strokeLinecap="round" variants={fade(at, 0.3)} /> : null}
            {/* Nom et heures, à la naissance de l'arc */}
            <motion.g variants={fade(0.6 + i * 0.12, 0.5)}>
              <text x={CX - 12} y={CY - p.r + 4} textAnchor="end" fontSize={11} fontWeight={500} fill={C.ink2}>
                {p.label}
              </text>
              {p.pick ? (
                <motion.text x={CX - 12} y={CY - p.r + 4} textAnchor="end" fontSize={11} fontWeight={600} fill={C.brand} variants={fade(at, 0.3)}>
                  {p.label}
                </motion.text>
              ) : null}
              <text x={CX + 10} y={CY - p.r + 4} fontSize={11} fontWeight={600} fill={C.ink}>
                {p.hours} h
              </text>
            </motion.g>
            {/* Le point de mesure, au bout de l'arc */}
            {p.pick ? <motion.circle cx={ex} cy={ey} r={5} fill="#fff" stroke={C.brand} strokeWidth={2.5} variants={pop(at)} style={CENTER} /> : null}
          </g>
        )
      })}

      {/* Les gains estimés, sortis du cadran au bout de chaque arc retenu */}
      {PROCS.filter((p) => p.pick).map((p) => {
        const a = angle(p.hours)
        const [ex, ey] = pt(p.r + 7, a)
        const [tx, ty] = pt(200, a)
        const [gx, gy] = pt(216, a)
        const anchor = a > 200 ? "end" : a > 160 ? "middle" : "start"
        return (
          <motion.g key={p.label} variants={fade(litAt(p.hours) + 0.4, 0.5)}>
            <path d={`M${f(ex)} ${f(ey)} L${f(tx)} ${f(ty)}`} stroke={C.time} strokeWidth={1.5} strokeOpacity={0.7} />
            <circle cx={tx} cy={ty} r={2.5} fill={C.time} />
            <Pill x={gx} y={gy + (anchor === "middle" ? 12 : 0)} text={p.gain ?? ""} tone="time" anchor={anchor} />
          </motion.g>
        )
      })}

      {/* Le centre : le symbole, posé sur le cadran */}
      <motion.g variants={pop(0.3)} style={CENTER}>
        <circle cx={CX} cy={CY} r={36} fill={C.ink} style={{ filter: "drop-shadow(0 0 22px #3355ff66)" }} />
        <circle cx={CX} cy={CY} r={36} fill="none" stroke="#ffffff26" />
      </motion.g>
      <Mark x={CX} y={CY} size={38} delay={0.7} onDark />

      {/* L'aiguille de mesure, un tour */}
      {!still ? (
        <motion.g initial={{ rotate: 0, opacity: 0 }} animate={{ rotate: 360, opacity: [0, 1, 1, 0] }} transition={{ duration: SWEEP_DUR, delay: SWEEP_AT, ease: "linear", opacity: { duration: SWEEP_DUR, delay: SWEEP_AT, times: [0, 0.08, 0.92, 1] } }} style={{ transformOrigin: `${CX}px ${CY}px` }}>
          <path d={`M${CX} ${CY - 40} V ${CY - 144}`} stroke={C.brand} strokeWidth={2} strokeLinecap="round" />
          <path d={`M${CX - 12} ${CY - 40} L${CX + 12} ${CY - 40} L${CX + 1} ${CY - 144} L${CX - 1} ${CY - 144} Z`} fill={C.brand} fillOpacity={0.12} />
        </motion.g>
      ) : null}

      {/* Repères */}
      <motion.g variants={fade(SWEEP_AT + SWEEP_DUR + 0.6)}>
        <Pill x={452} y={58} text="3 cas chiffrés et priorisés" tone="brand" anchor="start" small />
        <Pill x={452} y={80} text="Gains estimés, exemple" anchor="start" small />
      </motion.g>
      <Legend x={0} y={58} title="La mesure" sub="Vos chiffres, pas des moyennes" tone="brand" />
      <Legend x={0} y={CY + 176} title="La semaine" sub="Trois jours, une restitution" />
    </>
  )
}
