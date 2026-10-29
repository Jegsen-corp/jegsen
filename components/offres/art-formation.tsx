"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { C, ExampleNote, Frame, Legend, Mark, Note, fade, rise, useStill } from "./art-kit"

/*
 * Formation : la salle, vue de dessus. En haut, la charte (les règles communes) tient lieu de scène.
 * En face, les sièges, rangés par métier. Atelier après atelier, une lumière part de la scène et chaque
 * section s'allume en bleu : l'équipe est formée sur ses propres tâches. À la fin, l'adoption se compte.
 * Chiffres d'exemple.
 */

const SX = 320 // centre de la scène (et des arcs de sièges)
const SY = 52
const ROWS = [150, 188, 226, 264]
const SECTIONS = [
  { label: "Comptabilité", a0: 200, a1: 231, at: 1.5 },
  { label: "Commerce", a0: 239, a1: 266, at: 2.05 },
  { label: "RH", a0: 274, a1: 301, at: 2.6 },
  { label: "Exploitation", a0: 309, a1: 340, at: 3.15 },
] // angles en degrés, 270 = plein sud (face à la scène)
const RULES = ["Données autorisées", "Outils validés", "Résultats vérifiés", "Responsabilités"]

const rad = (deg: number) => (deg * Math.PI) / 180
// Arrondi : même chaîne au rendu serveur et dans le navigateur
const pt = (r: number, deg: number): [number, number] => [Math.round((SX + r * Math.cos(rad(deg))) * 100) / 100, Math.round((SY - r * Math.sin(rad(deg))) * 100) / 100]
const f = (n: number) => n.toFixed(1)

type Seat = { x: number; y: number; rot: number; section: number; row: number }
function seats(): Seat[] {
  const out: Seat[] = []
  SECTIONS.forEach((s, si) => {
    ROWS.forEach((r, ri) => {
      const step = (16 / r) * (180 / Math.PI) * 1.0 // environ 16 px entre sièges
      const n = Math.floor((s.a1 - s.a0) / step)
      for (let k = 0; k <= n; k++) {
        const a = s.a0 + ((s.a1 - s.a0) * k) / Math.max(n, 1)
        const [x, y] = pt(r, a)
        out.push({ x, y, rot: Math.round((90 - a) * 100) / 100, section: si, row: ri })
      }
    })
  })
  return out
}
const SEATS = seats()

export function FormationArt() {
  return (
    <Frame
      viewBox="0 0 640 450"
      label="La salle de formation, vue de dessus. En haut, la charte d'utilisation de l'IA : données autorisées, outils validés, résultats vérifiés, responsabilités. En face, les sièges rangés par métier : comptabilité, commerce, RH, exploitation. Atelier après atelier, chaque section s'allume : l'équipe est formée sur ses propres tâches. Exemple d'adoption : 8 personnes sur 10 utilisent les outils validés."
      legends={[
        { title: "La charte", sub: "Les règles communes, posées au cadrage", tone: "brand" },
        { title: "Vos équipes", sub: "Formées sur leurs propres tâches" },
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
      {/* La scène : la charte */}
      <motion.g variants={rise(-16, 0.1, 0.9)}>
        <rect x={SX - 192} y={SY - 36} width={384} height={78} rx={20} fill="url(#art-dark)" stroke="#ffffff1f" filter="url(#art-shadow)" />
        <ellipse cx={SX} cy={SY + 40} rx={190} ry={26} fill="url(#art-core)" opacity={0.8} />
        <text x={SX - 150} y={SY - 8} fontSize={13} fontWeight={600} fill="#f3f4f6" style={{ fontFamily: "var(--font-display)" }}>
          Charte d&apos;utilisation de l&apos;IA
        </text>
        <text x={SX - 150} y={SY + 8} fontSize={10.5} fill="#aeb8e8">
          Les règles communes, posées au cadrage
        </text>
        {RULES.reduce<{ x: number; nodes: ReactNode[] }>(
          (acc, r, i) => {
            const w = r.length * 4.6 + 12
            acc.nodes.push(
              <motion.g key={r} variants={fade(0.8 + i * 0.12, 0.4)}>
                <rect x={acc.x} y={SY + 16} width={w} height={18} rx={9} fill="#ffffff14" stroke="#7d96ff55" />
                <text x={acc.x + w / 2} y={SY + 28.5} textAnchor="middle" fontSize={8} fontWeight={600} fill="#dfe5ff">
                  {r}
                </text>
              </motion.g>
            )
            acc.x += w + 6
            return acc
          },
          { x: SX - 178, nodes: [] }
        ).nodes}
      </motion.g>
      <Mark x={SX - 172} y={SY - 4} size={26} delay={0.5} onDark />

      {/* La lumière de chaque atelier, depuis la scène */}
      {!still
        ? SECTIONS.map((s) => {
            const [x1, y1] = pt(290, s.a0 - 2)
            const [x2, y2] = pt(290, s.a1 + 2)
            return (
              <motion.path
                key={s.label}
                d={`M${SX} ${SY + 36} L${f(x1)} ${f(y1)} A290 290 0 0 0 ${f(x2)} ${f(y2)} Z`}
                fill={C.brand}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.14, 0.14, 0] }}
                transition={{ duration: 1.1, delay: s.at - 0.2, times: [0, 0.2, 0.7, 1] }}
              />
            )
          })
        : null}

      {/* Les sièges */}
      {SEATS.map((s, i) => {
        const sec = SECTIONS[s.section]
        const at = sec.at + s.row * 0.12
        return (
          <g key={i} transform={`translate(${f(s.x)} ${f(s.y)}) rotate(${f(s.rot)})`}>
            <motion.g variants={fade(0.4 + s.row * 0.1, 0.5)}>
              <rect x={-6} y={-5} width={12} height={10} rx={3} fill="#d9dbe0" />
              <rect x={-6} y={-7} width={12} height={3} rx={1.5} fill="#c3c6ce" />
            </motion.g>
            <motion.g variants={fade(at, 0.3)}>
              <rect x={-6} y={-5} width={12} height={10} rx={3} fill={C.brand} />
              <rect x={-6} y={-7} width={12} height={3} rx={1.5} fill="#2a46d6" />
            </motion.g>
          </g>
        )
      })}

      {/* Les métiers, et « formée » quand l'atelier est passé */}
      {SECTIONS.map((s) => {
        const mid = (s.a0 + s.a1) / 2
        const [x, y] = pt(292, mid)
        const anchor = mid < 250 ? "end" : mid > 290 ? "start" : "middle"
        return (
          <g key={s.label}>
            <motion.g variants={fade(0.9)}>
              <Note x={x} y={y} text={s.label} anchor={anchor} size={12} />
            </motion.g>
            <motion.g variants={fade(s.at + 0.6, 0.4)}>
              <Check x={x + (anchor === "end" ? -8 : anchor === "start" ? 0 : -24)} y={y + 20} anchor={anchor} />
            </motion.g>
          </g>
        )
      })}

      {/* L'adoption, comptée */}
      <motion.g variants={fade(4.0)}>
        <Note x={SX} y={SY + 356} text="8 personnes sur 10 utilisent les outils validés" tone="time" anchor="middle" size={12.5} />
      </motion.g>
      <motion.g variants={fade(0.9)}>
        <Note x={0} y={SY + 318} text="1 à 3 semaines" sub="des ateliers par métier" tone="muted" />
      </motion.g>

      <Legend x={0} y={SY + 4} title="La charte" sub="Les règles communes" tone="brand" />
      <Legend x={0} y={SY + 250} title="Vos équipes" sub="Formées sur leurs tâches" />
      <ExampleNote x={640} y={SY + 380} />
    </>
  )
}

/** « Formée » : une coche et le mot, sans capsule. */
function Check({ x, y, anchor }: { x: number; y: number; anchor: "start" | "middle" | "end" }) {
  const tx = anchor === "end" ? x - 10 : x + 14
  return (
    <g>
      <circle cx={anchor === "end" ? x : x + 4} cy={y} r={6} fill={C.brand} />
      <path d={`M${(anchor === "end" ? x : x + 4) - 2.6} ${y} l1.8 1.8 l3.6-3.8`} fill="none" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <text x={anchor === "end" ? tx : tx} y={y + 4} textAnchor={anchor === "end" ? "end" : "start"} fontSize={11} fontWeight={600} fill="#2a46d6">
        Formée
      </text>
    </g>
  )
}
