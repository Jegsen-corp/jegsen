"use client"

import { motion } from "framer-motion"
import { C, CENTER, ExampleNote, Frame, Legend, Mark, Note, draw, fade, pop, useStill } from "./art-kit"

/*
 * Diagnostic : un cadran de mesure. Chaque processus est un arc, qui s'ouvre d'autant plus que l'équipe y
 * passe d'heures (le plus lourd fait trois quarts de tour, comme l'arc du logo). Une aiguille fait le tour
 * du cadran, la mesure, et les trois cas les plus rentables passent au bleu. Leurs gains estimés sortent du
 * cadran. Chiffres d'exemple.
 */

const CX = 322
const CY = 262
const MAX_H = 64
const SWEEP_AT = 1.5
const SWEEP_DUR = 1.2

type Proc = { label: string; hours: number; r: number; pick: boolean; gain?: string }
const PROCS: Proc[] = [
  { label: "Saisie des factures", hours: 64, r: 156, pick: true, gain: "580 h/an" },
  { label: "Tri des e-mails", hours: 42, r: 126, pick: true, gain: "380 h/an" },
  { label: "Comptes rendus", hours: 36, r: 96, pick: true, gain: "320 h/an" },
  { label: "Relances clients", hours: 18, r: 66, pick: false },
]

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
      label="Cadran du diagnostic. Quatre processus, chacun représenté par un arc proportionnel aux heures passées chaque mois (exemple : saisie des factures 64 h, tri des e-mails 42 h, comptes rendus 36 h, relances 18 h). Une mesure fait le tour du cadran et retient les trois cas les plus rentables, avec leur gain annuel estimé."
      legends={[
        { title: "La mesure", sub: "Vos chiffres, pas des moyennes", tone: "brand" },
        { title: "Les gains", sub: "Trois cas retenus, chiffrés", tone: "time" },
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
      {/* Les pistes et les arcs des processus */}
      {PROCS.map((p, i) => {
        const a = angle(p.hours)
        const at = litAt(p.hours)
        const [ex, ey] = pt(p.r, a)
        return (
          <g key={p.label}>
            <circle cx={CX} cy={CY} r={p.r} fill="none" stroke="#0b0d1209" strokeWidth={14} />
            <motion.path d={arc(p.r, a)} fill="none" stroke="#c9ccd3" strokeWidth={14} strokeLinecap="round" variants={draw(0.4 + i * 0.12, 0.9)} />
            {p.pick ? <motion.path d={arc(p.r, a)} fill="none" stroke={C.brand} strokeWidth={14} strokeLinecap="round" variants={fade(at, 0.3)} /> : null}
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
        const [tx, ty] = pt(184, a)
        const [gx, gy] = pt(198, a)
        const anchor = a > 200 ? "end" : a > 160 ? "middle" : "start"
        return (
          <motion.g key={p.label} variants={fade(litAt(p.hours) + 0.4, 0.5)}>
            <path d={`M${f(ex)} ${f(ey)} L${f(tx)} ${f(ty)}`} stroke={C.time} strokeWidth={1.5} strokeOpacity={0.7} />
            <circle cx={tx} cy={ty} r={2.5} fill={C.time} />
            <Note x={gx} y={gy + (anchor === "middle" ? 10 : 0)} text={p.gain ?? ""} tone="time" anchor={anchor} size={12.5} />
          </motion.g>
        )
      })}

      {/* Le centre : le symbole, posé sur le cadran */}
      <motion.g variants={pop(0.3)} style={CENTER}>
        <circle cx={CX} cy={CY} r={40} fill={C.ink} style={{ filter: "drop-shadow(0 0 22px #3355ff66)" }} />
        <circle cx={CX} cy={CY} r={40} fill="none" stroke="#ffffff26" />
      </motion.g>
      <Mark x={CX} y={CY} size={42} delay={0.7} onDark />

      {/* L'aiguille de mesure, un tour */}
      {!still ? (
        <motion.g initial={{ rotate: 0, opacity: 0 }} animate={{ rotate: 360, opacity: [0, 1, 1, 0] }} transition={{ duration: SWEEP_DUR, delay: SWEEP_AT, ease: "linear", opacity: { duration: SWEEP_DUR, delay: SWEEP_AT, times: [0, 0.08, 0.92, 1] } }} style={{ transformOrigin: `${CX}px ${CY}px` }}>
          <path d={`M${CX} ${CY - 46} V ${CY - 168}`} stroke={C.brand} strokeWidth={2} strokeLinecap="round" />
          <path d={`M${CX - 12} ${CY - 46} L${CX + 12} ${CY - 46} L${CX + 1} ${CY - 168} L${CX - 1} ${CY - 168} Z`} fill={C.brand} fillOpacity={0.12} />
        </motion.g>
      ) : null}

      {/* Repères */}
      <Legend x={0} y={58} title="La mesure" sub="Vos chiffres, pas des moyennes" tone="brand" />
      <Legend x={640} y={CY + 180} title="Les gains" sub="Trois cas retenus, chiffrés" tone="time" anchor="end" />
      <ExampleNote x={640} y={500} />
    </>
  )
}
