"use client"

import { motion } from "framer-motion"
import { Appear, ArtFrame, C, Card, Draw, ExampleTag, Seal, T, useArt } from "./art-kit"

/*
 * Maintenance : le tableau de supervision des workflows en production. Une anomalie déclenche une
 * alerte, elle est corrigée (journal des interventions), et les gains continuent d'être suivis mois
 * après mois. Chiffres et horaires d'exemple.
 */

const SPARK_X = 236
const SPARK_STEP = 17
const ROWS = [
  { label: "Factures fournisseurs", y: 106, wave: [1, -1, 2, 0, 1, -2, 1, 0, 2, -1, 1, 0] },
  { label: "Tri des e-mails", y: 150, wave: [1, 0, 2, -1, 1, 0, -15, 2, 0, 1, -1, 1], alert: 6 },
  { label: "Comptes rendus", y: 194, wave: [0, 1, -1, 2, 0, 1, -1, 0, 2, 0, -1, 1] },
]
const ALERT_AT = 1.3 // l'anomalie est détectée
const FIX_AT = 2.4 // l'alerte devient « Corrigé »

function spark(y: number, wave: number[]) {
  return wave.map((w, k) => `${k ? "L" : "M"}${SPARK_X + k * SPARK_STEP} ${y + w}`).join(" ")
}

const JOURNAL = [
  { tone: C.warn, title: "Alerte", text: "Format de facture modifié", time: "09:12", delay: 1.55 },
  { tone: C.brand, title: "Correctif", text: "Règle d'extraction ajustée", time: "09:47", delay: 1.9 },
  { tone: C.time, title: "Rétabli", text: "Contrôle sur 50 documents", time: "10:05", delay: 2.25 },
]

// Heures gagnées par mois, sur douze mois : les gains se maintiennent
const GAINS = [44, 47, 46, 48, 45, 49, 47, 48, 50, 48, 49, 51]

export function MaintenanceArt() {
  return (
    <ArtFrame label="Exemple de maintenance : trois workflows sous supervision. Une anomalie sur le tri des e-mails déclenche une alerte, elle est corrigée dans la matinée et notée au journal des interventions. Les heures gagnées chaque mois restent stables sur douze mois.">
      {/* Supervision, signée */}
      <Card x={16} y={24} w={528} h={210} delay={0}>
        <Seal x={32} y={38} size={22} delay={0.3} />
        <T x={62} y={54} size={13} weight={600} display>Supervision</T>
        <T x={528} y={54} size={11} color={C.ink3} anchor="end">3 workflows en production</T>
        <line x1={16} x2={544} y1={72} y2={72} stroke={C.lineSoft} />
        {ROWS.map((r, i) => (
          <Appear key={r.label} delay={0.25 + i * 0.1} x={-4} y={0}>
            <StatusDot cy={r.y} alert={r.alert !== undefined} />
            <T x={56} y={r.y + 4} size={12} weight={500}>{r.label}</T>
            <Draw d={spark(r.y, r.wave)} stroke={r.alert !== undefined ? C.ink3 : C.brandMid} width={1.6} delay={0.5 + i * 0.1} duration={1} />
            {r.alert !== undefined ? <AlertMark x={SPARK_X + r.alert * SPARK_STEP} y={r.y + r.wave[r.alert]} /> : null}
            <Status y={r.y} alert={r.alert !== undefined} />
            {i < ROWS.length - 1 ? <line x1={32} x2={528} y1={r.y + 22} y2={r.y + 22} stroke={C.lineSoft} /> : null}
          </Appear>
        ))}
      </Card>

      {/* Journal des interventions */}
      <Card x={16} y={252} w={260} h={172} delay={1.3}>
        <T x={32} y={278} size={12.5} weight={600} display>Journal des interventions</T>
        <line x1={38} x2={38} y1={302} y2={392} stroke={C.lineSoft} strokeWidth={2} />
        {JOURNAL.map((j, i) => {
          const y = 304 + i * 42
          return (
            <Appear key={j.title} delay={j.delay} x={-6} y={0}>
              <circle cx={38} cy={y} r={5} fill={j.tone} stroke="#fff" strokeWidth={2} />
              <T x={52} y={y + 4} size={11.5} weight={600}>{j.title}</T>
              <T x={260} y={y + 4} size={10.5} color={C.ink3} anchor="end">{j.time}</T>
              <T x={52} y={y + 19} size={11} color={C.ink2}>{j.text}</T>
            </Appear>
          )
        })}
      </Card>

      {/* Gains suivis */}
      <Card x={292} y={252} w={252} h={172} delay={1.4}>
        <T x={308} y={278} size={12.5} weight={600} display>Gains suivis</T>
        <ExampleTag x={474} y={265} />
        <T x={308} y={296} size={10.5} color={C.ink3}>heures gagnées par mois</T>
        <line x1={308} x2={528} y1={392} y2={392} stroke={C.line} />
        {GAINS.map((g, k) => {
          const h = Math.round(g * 1.45)
          return <Bar key={k} x={310 + k * 18} y={392 - h} h={h} delay={1.6 + k * 0.04} last={k === GAINS.length - 1} />
        })}
        <T x={310} y={410} size={10} color={C.ink3}>Mois 1</T>
        <T x={528} y={410} size={10} color={C.ink3} anchor="end">Mois 12</T>
      </Card>
    </ArtFrame>
  )
}

function Bar({ x, y, h, delay, last }: { x: number; y: number; h: number; delay: number; last: boolean }) {
  const { reduce } = useArt()
  return (
    <motion.rect x={x} y={y} width={12} height={h} rx={3} fill={last ? C.time : "#0fa58c59"} initial={reduce ? false : { scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.1, 1] }} style={{ transformBox: "fill-box", transformOrigin: "bottom" }} />
  )
}

function StatusDot({ cy, alert }: { cy: number; alert: boolean }) {
  const { reduce } = useArt()
  if (!alert || reduce) return <circle cx={40} cy={cy} r={4.5} fill={C.time} />
  return (
    <motion.circle cx={40} cy={cy} r={4.5} initial={{ fill: C.time }} animate={{ fill: [C.time, C.time, C.warn, C.warn, C.time] }} transition={{ duration: FIX_AT + 0.05, times: [0, ALERT_AT - 0.05, ALERT_AT + 0.05, FIX_AT - 0.05, FIX_AT + 0.05].map((t) => t / (FIX_AT + 0.05)), ease: "linear" }} />
  )
}

function AlertMark({ x, y }: { x: number; y: number }) {
  const { reduce } = useArt()
  return (
    <g>
      {!reduce ? <motion.circle cx={x} cy={y} r={6} fill="none" stroke={C.warn} strokeWidth={1.5} initial={{ opacity: 0, scale: 1 }} animate={{ opacity: [0, 0.8, 0], scale: [1, 1, 2.6] }} transition={{ duration: 0.9, delay: ALERT_AT + 0.05 }} style={{ transformBox: "fill-box", transformOrigin: "center" }} /> : null}
      <Appear delay={ALERT_AT} y={0} duration={0.2}>
        <circle cx={x} cy={y} r={4} fill={C.warn} stroke="#fff" strokeWidth={1.5} />
      </Appear>
    </g>
  )
}

/** Pastille d'état : « Normal », ou « Alerte » qui devient « Corrigé ». */
function Status({ y, alert }: { y: number; alert: boolean }) {
  const { reduce } = useArt()
  const pill = (label: string, fg: string, bg: string) => (
    <g>
      <rect x={448} y={y - 11} width={80} height={22} rx={11} fill={bg} />
      <T x={488} y={y + 4} size={10.5} weight={600} color={fg} anchor="middle">{label}</T>
    </g>
  )
  if (!alert) return pill("Normal", C.time, C.timeSoft)
  if (reduce) return pill("Corrigé", C.time, C.timeSoft)
  // Normal, puis Alerte à ALERT_AT, puis Corrigé à FIX_AT
  const seq = (values: number[], at: number[], end: number) => ({
    initial: { opacity: values[0] },
    animate: { opacity: values },
    transition: { duration: end, times: at.map((t) => t / end), ease: "linear" as const },
  })
  return (
    <g>
      <motion.g {...seq([1, 1, 0], [0, ALERT_AT - 0.05, ALERT_AT + 0.05], ALERT_AT + 0.05)}>{pill("Normal", C.time, C.timeSoft)}</motion.g>
      <motion.g {...seq([0, 0, 1, 1, 0], [0, ALERT_AT - 0.05, ALERT_AT + 0.05, FIX_AT - 0.05, FIX_AT + 0.05], FIX_AT + 0.05)}>{pill("Alerte", "#a86400", C.warnSoft)}</motion.g>
      <motion.g {...seq([0, 0, 1], [0, FIX_AT - 0.05, FIX_AT + 0.05], FIX_AT + 0.05)}>{pill("Corrigé", C.time, C.timeSoft)}</motion.g>
    </g>
  )
}
