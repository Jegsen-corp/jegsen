"use client"

import { useId } from "react"
import { motion } from "framer-motion"
import { FACES, Grid, IsoScene, Legend, Pill, Shadow, Slab, fade, flat, iso, pop, rise, useIso } from "./iso-kit"
import type { LegendItem } from "./iso-kit"

/*
 * Intégration : trois plateaux en escalier. À gauche, vos documents. Au centre, plus haut, le plateau sombre
 * du workflow en production : les documents y suivent un chemin en quatre étapes, les cas douteux bifurquent
 * vers une personne (vert). À droite, plus haut encore, vos outils, mis à jour. Les flux circulent en continu.
 */

const CX = 320
const CY = 330
const PS = 58 // demi-côté des plateaux
const DOCS: [number, number, number] = [-118, 118, 0] // (u, v, z) du centre de chaque plateau
const WORK: [number, number, number] = [0, 0, 58]
const TOOLS: [number, number, number] = [118, -118, 116]

const docTiles = [
  { id: "doc", label: "Factures", du: -34, dv: 34 },
  { id: "mail", label: "E-mails", du: 0, dv: 0 },
  { id: "box", label: "Bons de livraison", du: 34, dv: -34 },
] as const
const toolTiles = [
  { id: "mail", label: "Messagerie", du: -24, dv: -24 },
  { id: "ged", label: "GED", du: 24, dv: -24 },
  { id: "erp", label: "ERP", du: -24, dv: 24 },
  { id: "crm", label: "CRM", du: 24, dv: 24 },
] as const
/** Étapes du workflow, en coordonnées locales du plateau sombre, de l'entrée (gauche) à la sortie (droite). */
const steps = [
  { id: "in", label: "Réception", u: -38, v: 38 },
  { id: "read", label: "Extraction", u: -13, v: 13 },
  { id: "check", label: "Contrôles", u: 13, v: -13 },
  { id: "out", label: "Mise à jour", u: 38, v: -38 },
] as const
const HUMAN = { u: 30, v: 34 } // la personne, devant le plateau

const P = { fill: "none", stroke: "#686e7a", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
function TileIcon({ id }: { id: string }) {
  switch (id) {
    case "doc":
      return <g {...P}><path d="M-7 -10h9l5 5v15h-14z" /><path d="M-3 0h6M-3 4h6" /></g>
    case "mail":
      return <g {...P}><rect x="-10" y="-7" width="20" height="14" rx="2" /><path d="M-9 -5l9 6 9-6" /></g>
    case "box":
      return <g {...P}><path d="M-9 -4l9-5 9 5v9l-9 5-9-5z" /><path d="M-9 -4l9 5 9-5M0 1v9" /></g>
    case "ged":
      return <g {...P}><path d="M-10 -6v13h20v-10h-9l-2-3h-9z" /></g>
    case "erp":
      return <g {...P}><rect x="-9" y="-9" width="18" height="18" rx="2" /><path d="M-9 -2h18M-9 4h18M-2 -9v18" /></g>
    case "crm":
      return <g {...P}><circle cx="0" cy="-4" r="4.5" /><path d="M-8 9c1-5 4-7 8-7s7 2 8 7" /></g>
  }
  return null
}
const B = { fill: "none", stroke: "#ffffff", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
function StepIcon({ id }: { id: string }) {
  switch (id) {
    case "in":
      return <g {...B}><path d="M-8 2h4l1.5 2.5h5L4 2h4" /><path d="M-8 2l2-7h12l2 7v5H-8z" /></g>
    case "read":
      return <g {...B}><path d="M-8 -3v-5h5M3 -8h5v5M8 3v5H3M-3 8h-5V3" /><path d="M-4 -1h8M-4 2.5h5" /></g>
    case "check":
      return <g {...B}><path d="M0 -9l7 2.5v5c0 4-3 6.7-7 8-4-1.3-7-4-7-8v-5z" /><path d="M-3 0l2.2 2.2L3.5 -2" /></g>
    case "out":
      return <g {...B}><path d="M7 -2A7 7 0 0 0 -5.5 -4M-7 2A7 7 0 0 0 5.5 4" /><path d="M7.5 -6v4h-4M-7.5 6V2h4" /></g>
  }
  return null
}

const LEGENDS: LegendItem[] = [
  { title: "Vos documents", sub: "Tels qu'ils arrivent" },
  { title: "Le workflow", sub: "Branché, testé, mesuré", tone: "brand" },
  { title: "Vos outils", sub: "Mis à jour, sans ressaisie", tone: "time" },
]

export function IntegrationArt() {
  return (
    <IsoScene
      cx={CX}
      legends={LEGENDS}
      viewBox="0 70 640 420"
      label="Schéma de l'intégration en trois plateaux. À gauche, vos documents : factures, e-mails, bons de livraison. Au centre, le workflow en production : réception, extraction, contrôles, mise à jour. Les cas douteux sont transmis à une personne. À droite, vos outils mis à jour : messagerie, GED, ERP, CRM. Exemple : 2 minutes par document au lieu de 9, 6 % d'exceptions."
    >
      <Scene />
    </IsoScene>
  )
}

function Scene() {
  const { still } = useIso()
  const id = useId().replace(/[:«»]/g, "")
  const at = (p: readonly [number, number, number], du = 0, dv = 0, dz = 0) => iso(CX, CY, p[0] + du, p[1] + dv, p[2] + dz)
  const pt = (p: [number, number]) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`
  const DOC_H = 9
  const TOOL_H = 9
  const NODE_H = 8

  // Chemin du workflow, en coordonnées locales du plateau sombre (posé à plat)
  const path = steps.map((s, i) => `${i ? "L" : "M"}${s.u} ${s.v}`).join(" ")
  const branch = `M${steps[2].u} ${steps[2].v} Q ${steps[2].u + 10} ${HUMAN.v - 4} ${HUMAN.u} ${HUMAN.v}`

  // Flux entre plateaux : des tuiles de documents à l'entrée du workflow, de la sortie aux outils
  const entry = at(WORK, steps[0].u, steps[0].v, NODE_H)
  const exit = at(WORK, steps[3].u, steps[3].v, NODE_H)

  return (
    <>
      <Shadow cy={at(DOCS)[1]} s={PS} dy={18} />
      <Shadow cy={at(WORK)[1] + WORK[2]} s={PS} dy={18} />
      <Shadow cy={at(TOOLS)[1] + TOOLS[2]} s={PS} dy={18} />

      {/* Vos documents */}
      <motion.g variants={rise(-40, 0.05)}>
        <Slab cy={CY} u={DOCS[0]} v={DOCS[1]} s={PS} z={DOCS[2]} t={12} f={FACES.floor} />
        {docTiles.map((t) => (
          <g key={t.id}>
            <Slab cy={CY} u={DOCS[0] + t.du} v={DOCS[1] + t.dv} s={15} z={DOC_H} t={DOC_H} f={FACES.tile} />
            <g transform={flat(CX, CY, DOCS[0] + t.du, DOCS[1] + t.dv, DOC_H)}>
              <TileIcon id={t.id} />
            </g>
          </g>
        ))}
      </motion.g>

      {/* Flux d'entrée */}
      <motion.g variants={fade(1.0)}>
        {docTiles.map((t, i) => {
          const from = at(DOCS, t.du, t.dv, DOC_H)
          const d = `M${pt(from)} C ${pt([from[0], from[1] - 50])} ${pt([entry[0] - 40, entry[1] + 10])} ${pt(entry)}`
          return <Flow key={t.id} d={d} color="#3355ff" delay={i * 0.5} still={still} />
        })}
      </motion.g>

      {/* Le workflow, en production */}
      <motion.g variants={rise(40, 0.2)}>
        <Slab cy={CY} u={WORK[0]} v={WORK[1]} s={PS + 10} z={WORK[2]} t={14} f={FACES.dark} />
        <Grid cy={CY} s={PS + 10} color="#ffffff0b" z={WORK[2]} />
        <g transform={flat(CX, CY, 0, 0, WORK[2])}>
          <defs>
            <path id={`${id}-p`} d={path} />
          </defs>
          <path d={path} stroke="#7d96ff" strokeOpacity={0.6} strokeWidth={2} strokeLinecap="round" />
          <path d={branch} stroke="#38d6b8" strokeOpacity={0.75} strokeWidth={1.6} strokeDasharray="3 5" fill="none" />
          {[[-52, -30], [40, 44], [-46, 16], [22, -50], [-10, -44], [50, 8]].map(([a, b]) => (
            <circle key={`${a}${b}`} cx={a} cy={b} r={1.8} fill="#ffffff40" />
          ))}
          {/* Documents en circulation */}
          {!still
            ? [0, 1, 2].map((k) => (
                <g key={k}>
                  <rect x={-5} y={-6.5} width={10} height={13} rx={2} fill="#ffffff" stroke="#3355ff" strokeWidth={1.3}>
                    <animateMotion dur="4.2s" begin={`${-k * 1.4}s`} repeatCount="indefinite" rotate="0">
                      <mpath href={`#${id}-p`} />
                    </animateMotion>
                  </rect>
                </g>
              ))
            : null}
        </g>
        {steps.map((s, i) => (
          <motion.g key={s.id} variants={pop(0.7 + i * 0.12)} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
            <Slab cy={CY} u={s.u} v={s.v} s={11} z={WORK[2] + NODE_H} t={NODE_H} f={i === 3 ? FACES.green : FACES.blue} />
            <g transform={flat(CX, CY, s.u, s.v, WORK[2] + NODE_H)}>
              <StepIcon id={s.id} />
            </g>
          </motion.g>
        ))}
        {/* La personne qui décide des cas douteux */}
        <motion.g variants={pop(1.5)} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <Slab cy={CY} u={HUMAN.u} v={HUMAN.v} s={11} z={WORK[2] + 10} t={10} f={FACES.greenSoft} />
          <g transform={flat(CX, CY, HUMAN.u, HUMAN.v, WORK[2] + 10)}>
            <g fill="none" stroke="#0b826f" strokeWidth={1.7} strokeLinecap="round">
              <circle cx="0" cy="-4" r="4.2" />
              <path d="M-8 8c1-5 4-7 8-7s7 2 8 7" />
            </g>
          </g>
        </motion.g>
        <ellipse cx={at(WORK, 0, 0)[0]} cy={at(WORK, 0, 0)[1]} rx={70} ry={35} fill="url(#iso-core)" opacity={0.6} />
      </motion.g>

      {/* Flux de sortie : jusqu'au bord du plateau des outils, puis distribué à plat vers chaque outil */}
      <motion.g variants={fade(1.3)}>
        {(() => {
          const to = at(TOOLS, -PS + 6, PS - 10, 2)
          const d = `M${pt(exit)} C ${pt([exit[0] + 36, exit[1] - 36])} ${pt([to[0] - 46, to[1] + 4])} ${pt(to)}`
          return <Flow d={d} color="#0fa58c" delay={0.3} still={still} />
        })()}
      </motion.g>

      {/* Vos outils */}
      <motion.g variants={rise(60, 0.35)}>
        <Slab cy={CY} u={TOOLS[0]} v={TOOLS[1]} s={PS} z={TOOLS[2]} t={12} f={FACES.blueFloor} />
        <g transform={flat(CX, CY, TOOLS[0], TOOLS[1], TOOLS[2])}>
          {toolTiles.map((t) => (
            <path key={t.id} d={`M${-PS + 6} ${PS - 10} L${t.du} ${t.dv}`} stroke="#0fa58c" strokeOpacity={0.55} strokeWidth={1.4} />
          ))}
          <circle cx={-PS + 6} cy={PS - 10} r={3.5} fill="#0fa58c" />
        </g>
        {toolTiles.map((t) => (
          <g key={t.id}>
            <Slab cy={CY} u={TOOLS[0] + t.du} v={TOOLS[1] + t.dv} s={14} z={TOOLS[2] + TOOL_H} t={TOOL_H} f={FACES.blueTile} />
            <g transform={flat(CX, CY, TOOLS[0] + t.du, TOOLS[1] + t.dv, TOOLS[2] + TOOL_H)}>
              <TileIcon id={t.id} />
            </g>
          </g>
        ))}
      </motion.g>

      {/* Étiquettes */}
      <motion.g variants={fade(0.9)}>
        {docTiles.map((t, i) => {
          const [x, y] = at(DOCS, t.du, t.dv, DOC_H)
          return <Pill key={t.id} x={x} y={y + (i === 1 ? 54 : 32)} text={t.label} small />
        })}
        {toolTiles.map((t) => {
          const [x, y] = at(TOOLS, t.du, t.dv, TOOL_H)
          const front = t.du + t.dv > 0
          return <Pill key={t.id} x={x} y={front ? y + 30 : y - 24} text={t.label} tone="brand" small />
        })}
      </motion.g>
      <motion.g variants={fade(1.2)}>
        {steps.map((s, i) => {
          const [x, y] = at(WORK, s.u, s.v, NODE_H)
          return <Pill key={s.id} x={x} y={y - (i % 2 ? 56 : 32)} text={s.label} tone={i === 3 ? "time" : "brand"} small />
        })}
        <Pill x={at(WORK, 0, 0)[0]} y={at(WORK, 0, 0)[1] - 96} text="En production" tone="dark" small />
      </motion.g>
      <motion.g variants={fade(1.8)}>
        <Pill x={at(WORK, HUMAN.u, HUMAN.v, 10)[0] + 8} y={at(WORK, HUMAN.u, HUMAN.v, 10)[1] + 36} text="Une personne décide des cas douteux" tone="time" small />
        <Pill x={at(WORK, HUMAN.u, HUMAN.v, 10)[0] + 8} y={at(WORK, HUMAN.u, HUMAN.v, 10)[1] + 58} text="6 % d'exceptions, exemple" small />
      </motion.g>
      <motion.g variants={fade(2.1)}>
        <Pill x={at(TOOLS)[0]} y={at(TOOLS)[1] - 84} text="2 min par document, 9 avant" tone="time" small />
      </motion.g>

      {/* Légendes */}
      <motion.g variants={fade(0.7)}>
        <Legend x={at(DOCS)[0] - 70} y={at(DOCS)[1] + 112} title="Vos documents" sub="Tels qu'ils arrivent" />
        <Legend x={CX - 60} y={at(WORK)[1] + 150} title="Le workflow" sub="Branché, testé, mesuré" tone="brand" />
        <Legend x={at(TOOLS)[0] - 40} y={at(TOOLS)[1] + 118} title="Vos outils" sub="Mis à jour, sans ressaisie" tone="time" />
      </motion.g>
    </>
  )
}

/** Trait entre deux plateaux : fond discret et tirets qui avancent. */
function Flow({ d, color, delay, still }: { d: string; color: string; delay: number; still: boolean }) {
  return (
    <g>
      <path d={d} fill="none" stroke={color} strokeOpacity={0.22} strokeWidth={1.5} />
      {!still ? <motion.path d={d} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeDasharray="7 26" initial={{ strokeDashoffset: 66 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 2.2, ease: "linear", repeat: Infinity, delay }} /> : null}
    </g>
  )
}
