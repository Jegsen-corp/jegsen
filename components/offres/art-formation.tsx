"use client"

import { motion } from "framer-motion"
import { Appear, ArtFrame, C, Card, Check, Draw, ExampleTag, Lines, Seal, T, useArt } from "./art-kit"

/*
 * Formation : la charte d'utilisation au centre (les règles communes), quatre équipes autour, chacune
 * formée sur ses propres tâches, et l'adoption suivie semaine après semaine. Chiffres d'exemple.
 */

const RULES = ["Données autorisées", "Outils validés", "Résultats vérifiés", "Responsabilités"]

const TEAMS = [
  { label: "Comptabilité", x: 16, y: 40, side: "left" as const },
  { label: "Commerce", x: 400, y: 40, side: "right" as const },
  { label: "RH", x: 16, y: 190, side: "left" as const },
  { label: "Exploitation", x: 400, y: 190, side: "right" as const },
]
const TEAM_W = 144
const TEAM_H = 76

export function FormationArt() {
  return (
    <ArtFrame label="Exemple de programme de formation : une charte d'utilisation de l'IA (données autorisées, outils validés, résultats vérifiés, responsabilités), quatre équipes formées par métier, et l'usage qui progresse de semaine en semaine.">
      {/* Liaisons équipes ↔ charte */}
      <Appear delay={0.6} y={0}>
        {TEAMS.map((t) => {
          const ty = t.y + TEAM_H / 2
          const d = t.side === "left" ? `M${t.x + TEAM_W} ${ty}C${t.x + TEAM_W + 22} ${ty} 172 ${ty < 150 ? 130 : 220} 192 ${ty < 150 ? 130 : 220}` : `M${t.x} ${ty}C${t.x - 22} ${ty} 388 ${ty < 150 ? 130 : 220} 368 ${ty < 150 ? 130 : 220}`
          return <path key={t.label} d={d} fill="none" stroke={C.brandMid} strokeWidth={1.5} strokeDasharray="2 5" strokeLinecap="round" />
        })}
      </Appear>

      {/* La charte, signée */}
      <Card x={192} y={40} w={176} h={250} rx={10} delay={0}>
        {/* coin replié de la feuille */}
        <path d="M346 40h12a10 10 0 0 1 10 10v12z" fill={C.bg2} />
        <path d="M346 40v14a8 8 0 0 0 8 8h14" fill="none" stroke={C.line} />
        <Seal x={208} y={58} size={24} delay={0.35} />
        <T x={240} y={70} size={12.5} weight={600} display>Charte</T>
        <T x={240} y={85} size={11} color={C.ink3}>d&apos;utilisation de l&apos;IA</T>
        <line x1={208} x2={352} y1={102} y2={102} stroke={C.lineSoft} />
        {RULES.map((r, i) => {
          const y = 128 + i * 40
          return (
            <Appear key={r} delay={0.5 + i * 0.12} x={-4} y={0}>
              <Check cx={216} cy={y - 4} r={8} />
              <T x={232} y={y} size={11.5} weight={500}>{r}</T>
              <Lines x={232} y={y + 9} widths={[104, 76]} gap={8} h={4} />
            </Appear>
          )
        })}
      </Card>

      {/* Les équipes, formées une à une */}
      {TEAMS.map((t, i) => (
        <Team key={t.label} {...t} delay={0.25 + i * 0.1} formed={1.2 + i * 0.22} />
      ))}

      {/* L'adoption, suivie */}
      <Card x={16} y={306} w={528} h={118} delay={1.1}>
        <T x={32} y={332} size={12.5} weight={600} display>Indicateurs d&apos;adoption</T>
        <ExampleTag x={250} y={319} />
        {[352, 374, 396].map((y) => <line key={y} x1={32} x2={372} y1={y} y2={y} stroke={C.lineSoft} />)}
        <AdoptionArea />
        <Draw d="M32 392C90 390 120 378 168 370S260 352 372 346" stroke={C.brand} width={2.5} delay={1.6} duration={1.1} />
        {[[32, 392], [202, 365], [372, 346]].map(([x, y], i) => (
          <Appear key={i} delay={1.7 + i * 0.35} y={0}>
            <circle cx={x} cy={y} r={4} fill="#fff" stroke={C.brand} strokeWidth={2} />
          </Appear>
        ))}
        <T x={32} y={414} size={10} color={C.ink3}>Semaine 1</T>
        <T x={202} y={414} size={10} color={C.ink3} anchor="middle">Semaine 2</T>
        <T x={372} y={414} size={10} color={C.ink3} anchor="end">Semaine 3</T>
        <line x1={400} x2={400} y1={330} y2={408} stroke={C.lineSoft} />
        <Appear delay={2.3} y={6}>
          <T x={420} y={370} size={30} weight={600} display ls={-1}>8 / 10</T>
          <T x={420} y={390} size={11} color={C.ink3}>utilisent les outils</T>
          <T x={420} y={404} size={11} color={C.ink3}>validés</T>
        </Appear>
      </Card>
    </ArtFrame>
  )
}

function AdoptionArea() {
  const { reduce } = useArt()
  return (
    <motion.path
      d="M32 392C90 390 120 378 168 370S260 352 372 346V396H32z"
      fill={C.brandSoft}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 0.8 }}
      transition={{ duration: 0.8, delay: 2.2 }}
    />
  )
}

/** Une équipe : trois personnes, le métier, et la mention « formée » une fois l'atelier passé. */
function Team({ label, x, y, delay, formed }: { label: string; x: number; y: number; delay: number; formed: number }) {
  const { reduce } = useArt()
  const people = [0, 1, 2]
  return (
    <Card x={x} y={y} w={TEAM_W} h={TEAM_H} rx={12} delay={delay}>
      {people.map((k) => {
        const cx = x + 26 + k * 18
        const cy = y + 28
        return (
          <g key={k}>
            <Avatar cx={cx} cy={cy} fill={C.bg2} stroke={C.ink3} />
            <motion.g initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35, delay: formed + k * 0.08 }}>
              <Avatar cx={cx} cy={cy} fill={C.brand} stroke="#fff" />
            </motion.g>
          </g>
        )
      })}
      <T x={x + 16} y={y + 60} size={12} weight={600}>{label}</T>
      <Appear delay={formed + 0.25} y={0}>
        <rect x={x + TEAM_W - 66} y={y + 18} width={52} height={20} rx={10} fill={C.brandSoft} />
        <T x={x + TEAM_W - 40} y={y + 32} size={10} weight={600} color={C.brand} anchor="middle">Formée</T>
      </Appear>
    </Card>
  )
}

function Avatar({ cx, cy, fill, stroke }: { cx: number; cy: number; fill: string; stroke: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={11} fill={fill} stroke="#fff" strokeWidth={2} />
      <circle cx={cx} cy={cy - 2.6} r={3} fill="none" stroke={stroke} strokeWidth={1.4} />
      <path d={`M${cx - 5} ${cy + 6}c0-3 2.2-4.4 5-4.4s5 1.4 5 4.4`} fill="none" stroke={stroke} strokeWidth={1.4} strokeLinecap="round" />
    </g>
  )
}
