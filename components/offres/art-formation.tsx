"use client"

import { motion } from "framer-motion"
import { Core, FACES, Grid, IsoScene, Legend, Pill, Shadow, Slab, fade, flat, iso, pop, rise, useIso } from "./iso-kit"
import type { LegendItem } from "./iso-kit"

/*
 * Formation : le plateau de l'entreprise, quatre équipes dans ses quatre coins, chacune avec ses personnes.
 * Au centre, le plateau sombre de la charte d'utilisation (les règles communes), signé. Des ondes partent
 * du centre et, atelier après atelier, chaque équipe passe au bleu : formée sur ses propres tâches.
 * Devant, l'adoption se mesure, semaine après semaine. Chiffres d'exemple.
 */

const CX = 320
const CY = 300
const S = 118
const CH = 166 // hauteur du plateau de la charte, au-dessus des équipes
const CS = 38 // demi-côté du plateau de la charte

type Team = { id: string; label: string; u: number; v: number; at: number }
const TEAMS: Team[] = [
  { id: "compta", label: "Comptabilité", u: -74, v: -74, at: 1.3 },
  { id: "vente", label: "Commerce", u: 74, v: -74, at: 1.75 },
  { id: "rh", label: "RH", u: -74, v: 74, at: 2.2 },
  { id: "exploit", label: "Exploitation", u: 74, v: 74, at: 2.65 },
]
const TS = 34 // demi-côté d'une tuile d'équipe
const TH = 8
/** Positions des trois personnes sur une tuile. */
const SEATS: [number, number][] = [
  [-14, 8],
  [2, -10],
  [16, 12],
]

const RULES = ["Données autorisées", "Outils validés", "Résultats vérifiés", "Responsabilités"]

const LEGENDS: LegendItem[] = [
  { title: "La charte", sub: "Les règles communes, posées au cadrage", tone: "brand" },
  { title: "Vos équipes", sub: "Formées sur leurs propres tâches" },
]

export function FormationArt() {
  return (
    <IsoScene
      cx={CX}
      legends={LEGENDS}
      viewBox="0 0 640 520"
      label="Schéma du programme de formation. Sur le plateau de l'entreprise, quatre équipes : comptabilité, commerce, RH, exploitation. Au centre, la charte d'utilisation de l'IA : données autorisées, outils validés, résultats vérifiés, responsabilités. Atelier après atelier, chaque équipe est formée sur ses propres tâches. Exemple d'adoption mesurée : 8 personnes sur 10 utilisent les outils validés en semaine 3."
    >
      <Scene />
    </IsoScene>
  )
}

function Scene() {
  const { still } = useIso()
  const core = iso(CX, CY, 0, 0, CH + 40)
  return (
    <>
      <Shadow cy={CY} s={S} />

      {/* Le plateau de l'entreprise */}
      <motion.g variants={rise(-50, 0.05)}>
        <Slab cy={CY} s={S} t={12} f={FACES.floor} />
        <Grid cy={CY} s={S} step={29.5} />
        {/* Liens de la charte vers chaque équipe */}
        <g transform={flat(CX, CY)}>
          {TEAMS.map((t) => (
            <path key={t.id} d={`M0 0 L${t.u} ${t.v}`} stroke="#3355ff" strokeOpacity={0.25} strokeWidth={1.2} strokeDasharray="3 5" />
          ))}
        </g>
      </motion.g>

      {/* Les ondes de la charte vers les équipes */}
      {!still
        ? TEAMS.map((t, i) => (
            <g key={t.id} transform={flat(CX, CY)}>
              <motion.circle r={20} fill="none" stroke="#3355ff" strokeWidth={2} initial={{ scale: 1, opacity: 0 }} animate={{ scale: [1, 5.6], opacity: [0, 0.55, 0] }} transition={{ duration: 1.1, delay: t.at - 0.75 + i * 0, ease: "easeOut" }} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
            </g>
          ))
        : null}

      {/* Les équipes */}
      {[...TEAMS].sort((a, b) => a.u + a.v - (b.u + b.v)).map((t, i) => (
        <motion.g key={t.id} variants={rise(20, 0.3 + i * 0.08, 0.8)}>
          <Slab cy={CY} u={t.u} v={t.v} s={TS} z={TH} t={TH} f={FACES.tile} />
          <motion.g variants={fade(t.at, 0.4)}>
            <Slab cy={CY} u={t.u} v={t.v} s={TS} z={TH} t={TH} f={FACES.blueTile} />
          </motion.g>
          {SEATS.map(([du, dv], k) => (
            <Person key={k} u={t.u + du} v={t.v + dv} at={t.at + k * 0.1} />
          ))}
        </motion.g>
      ))}

      {/* La charte : plateau sombre, signé, les quatre règles posées dessus */}
      <motion.g variants={rise(40, 0.2)}>
        <Slab cy={CY} s={CS} z={CH} t={14} f={FACES.dark} />
        <Grid cy={CY} s={CS} step={19} color="#ffffff0b" z={CH} />
        <g transform={flat(CX, CY, 0, 0, CH)}>
          <circle r={12} fill="none" stroke="#7d96ff" strokeOpacity={0.35} />
          <circle r={22} fill="none" stroke="#7d96ff" strokeOpacity={0.18} strokeDasharray="3 6" />
          {RULES.map((r, i) => {
            const a = (i / 4) * Math.PI * 2 + Math.PI / 4
            return <circle key={r} cx={Math.cos(a) * 27} cy={Math.sin(a) * 27} r={3} fill="#7d96ff" />
          })}
        </g>
        <ellipse cx={iso(CX, CY, 0, 0, CH)[0]} cy={iso(CX, CY, 0, 0, CH)[1]} rx={60} ry={30} fill="url(#iso-core)" />
      </motion.g>
      <motion.g variants={pop(0.8)} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <path d={`M${core[0]} ${iso(CX, CY, 0, 0, CH)[1]} V ${core[1] + 20}`} stroke="#7d96ff" strokeOpacity={0.5} strokeWidth={1.5} />
        <Core x={core[0]} y={core[1]} r={24} />
      </motion.g>

      {/* Étiquettes */}
      <motion.g variants={fade(0.9)}>
        <Pill x={core[0] + 112} y={core[1] - 10} text="Charte d'utilisation de l'IA" tone="dark" />
        {RULES.map((r, i) => (
          <Pill key={r} x={core[0] + 100} y={core[1] + 14 + i * 22} text={r} tone="brand" small />
        ))}
      </motion.g>
      {TEAMS.map((t) => {
        const [x, y] = iso(CX, CY, t.u, t.v, TH)
        const py = y + (t.u + t.v < 0 ? 36 : 42)
        const w = t.label.length * 6.3 + 20
        return (
          <g key={t.id}>
            <motion.g variants={fade(0.9)}>
              <Pill x={x - 22} y={py} text={t.label} />
            </motion.g>
            <motion.g variants={fade(t.at + 0.35, 0.4)}>
              <Pill x={x - 22 + w / 2 + 30} y={py} text="Formée" tone="brand" small />
            </motion.g>
          </g>
        )
      })}
      <motion.g variants={fade(3.2)}>
        <Pill x={CX + 130} y={CY + S * 0.5 + 92} text="8 personnes sur 10 utilisent les outils validés, exemple" tone="time" small />
      </motion.g>
      <motion.g variants={fade(0.8)}>
        <Pill x={CX - 160} y={core[1] - 6} text="1 à 3 semaines, ateliers par métier" small />
      </motion.g>

      <motion.g variants={fade(0.7)}>
        <Legend x={0} y={CY + 70} title="Vos équipes" sub="Formées sur leurs propres tâches" />
        <Legend x={0} y={CY - 250} title="La charte" sub="Les règles communes, posées au cadrage" tone="brand" />
      </motion.g>
    </>
  )
}

/** Une personne debout sur le plateau : grise, puis bleue une fois formée. */
function Person({ u, v, at }: { u: number; v: number; at: number }) {
  const [x, y] = iso(CX, CY, u, v, 8)
  const figure = (fill: string) => (
    <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
      <ellipse cx={0} cy={0} rx={5} ry={2.5} fill="#0b0d12" opacity={0.12} />
      <path d="M-4.5 0 v-8 a4.5 4.5 0 0 1 9 0 v8 z" fill={fill} />
      <circle cx={0} cy={-13} r={4} fill={fill} />
    </g>
  )
  return (
    <g>
      {figure("#b4b9c4")}
      <motion.g variants={fade(at, 0.3)}>{figure("#3355ff")}</motion.g>
    </g>
  )
}
