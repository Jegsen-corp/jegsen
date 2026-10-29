"use client"

import { motion } from "framer-motion"
import { C, CENTER, ExampleNote, Frame, Legend, Mark, Note, fade, pop, rise, useStill } from "./art-kit"

/*
 * Formation : un atelier, vu de dessus. Une table, huit personnes, la charte posée au milieu.
 * Un groupe à la fois, sur ses propres tâches : les personnes passent au bleu une à une pendant l'atelier.
 * Chiffres d'exemple.
 */

const TX = 320
const TY = 232
const TW = 300
const TH = 150
/** Les places autour de la table : trois en haut, trois en bas, une à chaque bout. */
const SEATS: { x: number; y: number; at: number }[] = [
  { x: TX - 90, y: TY - TH / 2 - 34, at: 1.3 },
  { x: TX, y: TY - TH / 2 - 34, at: 1.55 },
  { x: TX + 90, y: TY - TH / 2 - 34, at: 1.8 },
  { x: TX + TW / 2 + 34, y: TY, at: 2.05 },
  { x: TX + 90, y: TY + TH / 2 + 34, at: 2.3 },
  { x: TX, y: TY + TH / 2 + 34, at: 2.55 },
  { x: TX - 90, y: TY + TH / 2 + 34, at: 2.8 },
  { x: TX - TW / 2 - 34, y: TY, at: 3.05 },
]
const RULES = ["Données autorisées", "Outils validés", "Résultats vérifiés", "Responsabilités"]

export function FormationArt() {
  return (
    <Frame
      viewBox="0 0 640 440"
      label="Un atelier de formation vu de dessus : huit personnes autour d'une table, la charte d'utilisation de l'IA posée au milieu (données autorisées, outils validés, résultats vérifiés, responsabilités). Pendant l'atelier, chaque personne est formée sur ses propres tâches. Un groupe de dix personnes au plus, par métier."
      legends={[
        { title: "L'atelier", sub: "Une équipe, une journée, ses propres tâches", tone: "brand" },
        { title: "La charte", sub: "Les règles communes, posées au cadrage" },
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
      {/* La table */}
      <motion.g variants={rise(12, 0.1, 0.9)}>
        <rect x={TX - TW / 2} y={TY - TH / 2} width={TW} height={TH} rx={TH / 2} fill={C.surface} stroke={C.line} filter="url(#art-shadow)" />
        <rect x={TX - TW / 2 + 10} y={TY - TH / 2 + 10} width={TW - 20} height={TH - 20} rx={(TH - 20) / 2} fill="none" stroke="#0b0d120a" />
      </motion.g>

      {/* La charte, posée au milieu de la table */}
      <motion.g variants={rise(10, 0.4, 0.8)}>
        <rect x={TX - 110} y={TY - 46} width={220} height={92} rx={12} fill="url(#art-dark)" stroke="#ffffff1f" filter="url(#art-shadow)" />
        <ellipse cx={TX - 50} cy={TY - 30} rx={80} ry={30} fill="url(#art-core)" opacity={0.5} />
        <text x={TX - 66} y={TY - 20} fontSize={11.5} fontWeight={600} fill="#f3f4f6" style={{ fontFamily: "var(--font-display)" }}>
          Charte d&apos;utilisation de l&apos;IA
        </text>
        {RULES.map((r, i) => (
          <motion.g key={r} variants={fade(0.9 + i * 0.12, 0.4)}>
            <circle cx={TX - 92 + (i % 2) * 108} cy={TY + 2 + Math.floor(i / 2) * 18} r={2.6} fill={C.brandLight} />
            <text x={TX - 84 + (i % 2) * 108} y={TY + 5.5 + Math.floor(i / 2) * 18} fontSize={9.5} fill="#dfe5ff">
              {r}
            </text>
          </motion.g>
        ))}
      </motion.g>
      <Mark x={TX - 88} y={TY - 24} size={22} delay={0.7} onDark />

      {/* Les personnes : grises, puis bleues une à une pendant l'atelier */}
      {SEATS.map((s, i) => (
        <g key={i}>
          {!still ? (
            <motion.circle cx={s.x} cy={s.y} r={16} fill="none" stroke={C.brand} strokeWidth={1.5} initial={{ opacity: 0, scale: 1 }} animate={{ opacity: [0, 0.7, 0], scale: [1, 1, 2.2] }} transition={{ duration: 0.8, delay: s.at, ease: "easeOut" }} style={CENTER} />
          ) : null}
          <motion.g variants={pop(0.5 + i * 0.07)} style={CENTER}>
            <Person x={s.x} y={s.y} fill="#c3c6ce" />
          </motion.g>
          <motion.g variants={fade(s.at, 0.3)}>
            <Person x={s.x} y={s.y} fill={C.brand} />
          </motion.g>
        </g>
      ))}

      {/* Repères */}
      <motion.g variants={fade(0.9)}>
        <Note x={TX} y={TY + TH / 2 + 84} text="Atelier comptabilité, 10 personnes au plus" tone="brand" anchor="middle" size={12.5} />
      </motion.g>
      <motion.g variants={fade(3.4)}>
        <Note x={TX} y={TY + TH / 2 + 106} text="Formés sur leurs propres tâches, avec des cas pratiques" tone="time" anchor="middle" size={12} />
      </motion.g>

      <Legend x={0} y={60} title="L'atelier" sub="Une équipe, une journée" tone="brand" />
      <Legend x={640} y={60} title="La charte" sub="Les règles communes" anchor="end" />
      <ExampleNote x={640} y={424} />
    </>
  )
}

/** Une personne vue de dessus : la tête et les épaules. */
function Person({ x, y, fill }: { x: number; y: number; fill: string }) {
  return (
    <g>
      <ellipse cx={x} cy={y + 2} rx={16} ry={11} fill={fill} opacity={0.55} />
      <circle cx={x} cy={y - 2} r={9} fill={fill} />
    </g>
  )
}
