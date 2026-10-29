"use client"

import { motion } from "framer-motion"
import { C, CENTER, Frame, Legend, Mark, Pill, draw, fade, pop, rise, useStill } from "./art-kit"

/*
 * Intégration : un panneau de câblage. À gauche, vos documents arrivent par des câbles bleus dans le
 * module du workflow (boîtier sombre, quatre étapes, voyant « en production »). À droite, le module est
 * branché, prise par prise, sur vos outils : chaque câble vert se tire puis s'enclenche. En dessous, la
 * sortie des cas douteux vers une personne. Les impulsions circulent en continu. Chiffres d'exemple.
 */

const MOD = { x: 222, y: 72, w: 196, h: 286 } // le boîtier
const PORT_IN_X = MOD.x
const PORT_OUT_X = MOD.x + MOD.w
const STEPS = ["Réception", "Extraction des données", "Contrôles de cohérence", "Mise à jour de vos outils"]
const STEP_Y = (i: number) => MOD.y + 92 + i * 44

const DOCS = [
  { id: "doc", label: "Factures", y: 126 },
  { id: "mail", label: "E-mails", y: 206 },
  { id: "box", label: "Bons de livraison", y: 286 },
]
const TOOLS = [
  { id: "mail", label: "Messagerie", y: 112 },
  { id: "ged", label: "GED", y: 184 },
  { id: "erp", label: "ERP", y: 256 },
  { id: "crm", label: "CRM", y: 328 },
]
const DOC_X = 10 // bord gauche des fiches
const DOC_W = 160
const TOOL_X = 516 // centre des prises

const f = (n: number) => n.toFixed(1)
/** Câble en S entre deux points. */
const cable = (x1: number, y1: number, x2: number, y2: number) => {
  const k = (x2 - x1) * 0.55
  return `M${f(x1)} ${f(y1)} C ${f(x1 + k)} ${f(y1)} ${f(x2 - k)} ${f(y2)} ${f(x2)} ${f(y2)}`
}

const P = { fill: "none", stroke: C.ink2, strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
function Icon({ id }: { id: string }) {
  switch (id) {
    case "doc":
      return <g {...P}><path d="M-7 -9h9l5 5v13h-14z" /><path d="M2 -9v5h5M-3 1h6M-3 5h6" /></g>
    case "mail":
      return <g {...P}><rect x="-9" y="-6" width="18" height="13" rx="2" /><path d="M-8 -4l8 5.5 8-5.5" /></g>
    case "box":
      return <g {...P}><path d="M-8 -3.5l8-4.5 8 4.5v8l-8 4.5-8-4.5z" /><path d="M-8 -3.5l8 4.5 8-4.5M0 1v8" /></g>
    case "ged":
      return <g {...P}><path d="M-9 -5v12h18v-9h-8l-2-3z" /></g>
    case "erp":
      return <g {...P}><rect x="-8" y="-8" width="16" height="16" rx="2" /><path d="M-8 -2h16M-8 3h16M-2 -8v16" /></g>
    case "crm":
      return <g {...P}><circle cx="0" cy="-3.5" r="4" /><path d="M-7 8c1-4.5 3.5-6.5 7-6.5s6 2 7 6.5" /></g>
  }
  return null
}
const W = { fill: "none", stroke: "#dfe5ff", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
function StepIcon({ i }: { i: number }) {
  switch (i) {
    case 0:
      return <g {...W}><path d="M-7 1.5h3.5l1.3 2h4.4l1.3-2H7" /><path d="M-7 1.5l1.8-6h10.4l1.8 6v4.5H-7z" /></g>
    case 1:
      return <g {...W}><path d="M-7 -2.5v-4.5h4.5M2.5 -7H7v4.5M7 2.5V7H2.5M-2.5 7H-7V2.5" /><path d="M-3.5 -1h7M-3.5 2h4.5" /></g>
    case 2:
      return <g {...W}><path d="M0 -7.5l6 2.2v4.3c0 3.4-2.6 5.8-6 6.9-3.4-1.1-6-3.5-6-6.9v-4.3z" /><path d="M-2.6 0l1.9 1.9 3.6-3.9" /></g>
    default:
      return <g {...W}><path d="M6 -1.5A6 6 0 0 0 -4.7 -3.4M-6 1.5A6 6 0 0 0 4.7 3.4" /><path d="M6.5 -5v3.5H3M-6.5 5V1.5H-3" /></g>
  }
}

export function IntegrationArt() {
  return (
    <Frame
      viewBox="0 20 640 440"
      label="Panneau de câblage de l'intégration. À gauche, vos documents (factures, e-mails, bons de livraison) entrent dans le module du workflow, en production : réception, extraction des données, contrôles de cohérence, mise à jour de vos outils. À droite, le module est branché sur la messagerie, la GED, l'ERP et le CRM. Les cas douteux sortent vers une personne qui décide. Exemple : 2 minutes par document au lieu de 9, 6 % d'exceptions."
      legends={[
        { title: "Vos documents", sub: "Tels qu'ils arrivent" },
        { title: "Le workflow", sub: "Branché, testé, mesuré", tone: "brand" },
        { title: "Vos outils", sub: "Mis à jour, sans ressaisie", tone: "time" },
      ]}
    >
      <Scene />
    </Frame>
  )
}

function Scene() {
  const still = useStill()
  const HUMAN = { x: 318, y: 414 }
  return (
    <>
      {/* Câbles d'entrée : des fiches au module */}
      {DOCS.map((d, i) => (
        <Cable key={d.id} d={cable(DOC_X + DOC_W, d.y, PORT_IN_X, STEP_Y(0) + (i - 1) * 9)} color={C.brand} at={0.9 + i * 0.15} still={still} pulseDelay={i * 0.7} />
      ))}
      {/* Câbles de sortie : du module aux prises des outils */}
      {TOOLS.map((t, i) => (
        <Cable key={t.id} d={cable(PORT_OUT_X, STEP_Y(3) + (i - 1.5) * 7, TOOL_X - 26, t.y)} color={C.time} at={1.5 + i * 0.18} still={still} pulseDelay={0.4 + i * 0.5} plug />
      ))}
      {/* Sortie des cas douteux vers une personne */}
      <motion.g variants={fade(2.3)}>
        <path d={`M${PORT_IN_X} ${STEP_Y(2)} C ${PORT_IN_X - 40} ${STEP_Y(2)} ${HUMAN.x - 90} ${HUMAN.y} ${HUMAN.x - 58} ${HUMAN.y}`} fill="none" stroke={C.time} strokeWidth={2} strokeDasharray="3 6" strokeLinecap="round" />
      </motion.g>

      {/* Vos documents : trois fiches */}
      {DOCS.map((d, i) => (
        <motion.g key={d.id} variants={rise(14, 0.1 + i * 0.1, 0.8)}>
          <rect x={DOC_X} y={d.y - 26} width={DOC_W} height={52} rx={14} fill={C.surface} stroke={C.line} filter="url(#art-shadow)" />
          <rect x={DOC_X + 12} y={d.y - 14} width={28} height={28} rx={8} fill={C.bg2} />
          <g transform={`translate(${DOC_X + 26} ${d.y})`}>
            <Icon id={d.id} />
          </g>
          <text x={DOC_X + 50} y={d.y + 4} fontSize={11.5} fontWeight={600} fill={C.ink}>
            {d.label}
          </text>
          {/* La fiche est branchée : connecteur sur son bord */}
          <circle cx={DOC_X + DOC_W} cy={d.y} r={5} fill={C.surface} stroke={C.brand} strokeWidth={2} />
        </motion.g>
      ))}

      {/* Le module du workflow */}
      <motion.g variants={rise(20, 0.2, 0.9)}>
        <rect x={MOD.x} y={MOD.y} width={MOD.w} height={MOD.h} rx={22} fill="url(#art-dark)" stroke="#ffffff1f" filter="url(#art-shadow)" />
        <rect x={MOD.x + 10} y={MOD.y + 10} width={MOD.w - 20} height={MOD.h - 20} rx={16} fill="none" stroke="#ffffff10" />
        <ellipse cx={MOD.x + MOD.w / 2} cy={MOD.y + 48} rx={80} ry={40} fill="url(#art-core)" opacity={0.7} />
        {/* Voyant : en production */}
        <motion.g variants={fade(2.6, 0.4)}>
          <circle cx={MOD.x + 28} cy={MOD.y + MOD.h - 26} r={4} fill={C.timeLight} style={{ filter: "drop-shadow(0 0 6px #38d6b8)" }} />
          <text x={MOD.x + 40} y={MOD.y + MOD.h - 22} fontSize={10} fontWeight={600} fill={C.timeLight} letterSpacing="0.04em">
            EN PRODUCTION
          </text>
        </motion.g>
        <text x={MOD.x + 50} y={MOD.y + 42} fontSize={13} fontWeight={600} fill="#f3f4f6" style={{ fontFamily: "var(--font-display)" }}>
          Workflow
        </text>
        <line x1={MOD.x + 20} x2={MOD.x + MOD.w - 20} y1={MOD.y + 62} y2={MOD.y + 62} stroke="#ffffff14" />
        {/* Les quatre étapes, avec leurs ports */}
        {STEPS.map((s, i) => (
          <motion.g key={s} variants={fade(0.6 + i * 0.12, 0.5)}>
            <circle cx={MOD.x + 36} cy={STEP_Y(i)} r={13} fill={i === 3 ? C.time : C.brand} />
            <g transform={`translate(${MOD.x + 36} ${STEP_Y(i)})`}>
              <StepIcon i={i} />
            </g>
            <text x={MOD.x + 58} y={STEP_Y(i) + 4} fontSize={11} fontWeight={500} fill="#dfe5ff">
              {s}
            </text>
            {i < 3 ? <line x1={MOD.x + 36} x2={MOD.x + 36} y1={STEP_Y(i) + 15} y2={STEP_Y(i + 1) - 15} stroke="#7d96ff" strokeOpacity={0.5} strokeWidth={1.5} /> : null}
          </motion.g>
        ))}
        {/* Ports : entrée, sortie */}
        {[-1, 0, 1].map((k) => (
          <rect key={k} x={PORT_IN_X - 4} y={STEP_Y(0) + k * 9 - 2.5} width={8} height={5} rx={1.5} fill="#2a46d6" />
        ))}
        {[-1.5, -0.5, 0.5, 1.5].map((k) => (
          <rect key={k} x={PORT_OUT_X - 4} y={STEP_Y(3) + k * 7 - 2.5} width={8} height={5} rx={1.5} fill="#0b826f" />
        ))}
        <rect x={PORT_IN_X - 4} y={STEP_Y(2) - 2.5} width={8} height={5} rx={1.5} fill="#0b826f" />
      </motion.g>
      <Mark x={MOD.x + 32} y={MOD.y + 36} size={24} delay={0.7} onDark />

      {/* Vos outils : quatre prises */}
      {TOOLS.map((t, i) => (
        <motion.g key={t.id} variants={rise(14, 0.3 + i * 0.1, 0.8)}>
          <rect x={TOOL_X - 26} y={t.y - 26} width={52} height={52} rx={14} fill={C.surface} stroke={C.line} filter="url(#art-shadow)" />
          <g transform={`translate(${TOOL_X} ${t.y})`}>
            <Icon id={t.id} />
          </g>
          <text x={TOOL_X + 34} y={t.y + 4} fontSize={12} fontWeight={600} fill={C.ink}>
            {t.label}
          </text>
          {/* La prise : s'allume quand le câble s'enclenche */}
          <motion.rect x={TOOL_X - 29} y={t.y - 9} width={6} height={18} rx={2} fill={C.time} variants={fade(1.5 + i * 0.18 + 0.75, 0.2)} />
        </motion.g>
      ))}

      {/* Une personne décide des cas douteux */}
      <motion.g variants={pop(2.4)} style={CENTER}>
        <rect x={HUMAN.x - 58} y={HUMAN.y - 22} width={238} height={44} rx={14} fill={C.surface} stroke={C.line} filter="url(#art-shadow)" />
        <circle cx={HUMAN.x - 34} cy={HUMAN.y} r={13} fill={C.timeSoft} stroke={C.time} strokeWidth={1.4} />
        <g fill="none" stroke={C.time} strokeWidth={1.5} strokeLinecap="round">
          <circle cx={HUMAN.x - 34} cy={HUMAN.y - 3.5} r={3.6} />
          <path d={`M${HUMAN.x - 40.5} ${HUMAN.y + 7.5}c0-3.8 2.8-6 6.5-6s6.5 2.2 6.5 6`} />
        </g>
        <text x={HUMAN.x - 14} y={HUMAN.y - 2} fontSize={12} fontWeight={600} fill={C.ink}>
          Une personne décide des cas douteux
        </text>
        <text x={HUMAN.x - 14} y={HUMAN.y + 13} fontSize={10.5} fill={C.ink3}>
          6 % d&apos;exceptions, tracées (exemple)
        </text>
      </motion.g>

      {/* Mesure */}
      <motion.g variants={fade(3)}>
        <Pill x={TOOL_X + 90} y={TOOLS[3].y + 54} text="2 min par document, 9 avant" tone="time" anchor="end" small />
      </motion.g>

      <Legend x={DOC_X} y={62} title="Vos documents" sub="Tels qu'ils arrivent" />
      <Legend x={TOOL_X - 26} y={62} title="Vos outils" sub="Mis à jour, sans ressaisie" tone="time" />
      <Legend x={DOC_X} y={372} title="Le workflow" sub="Branché, testé, mesuré" tone="brand" />
    </>
  )
}

/** Un câble : se tire, puis (option) s'enclenche dans sa prise ; ensuite les impulsions circulent. */
function Cable({ d, color, at, still, pulseDelay, plug = false }: { d: string; color: string; at: number; still: boolean; pulseDelay: number; plug?: boolean }) {
  return (
    <g>
      <motion.path d={d} fill="none" stroke={color} strokeWidth={4} strokeLinecap="round" strokeOpacity={0.9} variants={draw(at, 0.7)} />
      <motion.path d={d} fill="none" stroke="#ffffff" strokeWidth={1.2} strokeLinecap="round" strokeOpacity={0.35} variants={draw(at, 0.7)} />
      {!still ? (
        <motion.path d={d} fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeDasharray="6 30" initial={{ strokeDashoffset: 36, opacity: 0 }} animate={{ strokeDashoffset: -36, opacity: 0.9 }} transition={{ strokeDashoffset: { duration: 1.6, ease: "linear", repeat: Infinity, delay: at + 0.9 + pulseDelay }, opacity: { delay: at + 0.9, duration: 0.3 } }} />
      ) : null}
      {plug ? null : null}
    </g>
  )
}
