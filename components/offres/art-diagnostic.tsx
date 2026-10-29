"use client"

import { motion } from "framer-motion"
import { Beam, Core, FACES, Grid, IsoScene, Legend, Pill, Shadow, Slab, fade, flat, iso, pop, rise, useIso } from "./iso-kit"
import type { LegendItem } from "./iso-kit"

/*
 * Diagnostic : en bas, le plateau de l'entreprise avec ses processus dressés à la hauteur du temps qu'ils
 * consomment. Une nappe bleue balaie le plateau (la journée sur site, la mesure) : les trois cas les plus
 * rentables s'allument en bleu. Ils alimentent, au-dessus, le plateau sombre de la feuille de route, où
 * leurs gains estimés se dressent en vert. Chiffres d'exemple.
 */

const CX = 350
const Y = { plan: 135, floor: 410 }
const PS = 90 // demi-côté de la feuille de route
const S = 100
const SCAN_AT = 1.1 // début du balayage
const SCAN_DUR = 1.1

type Proc = { id: string; label: string; hours: number; u: number; v: number; pick: boolean; gain?: string }
const PROCS: Proc[] = [
  { id: "inv", label: "Factures", hours: 64, u: -52, v: -56, pick: true, gain: "580 h/an" },
  { id: "mail", label: "E-mails", hours: 42, u: 14, v: -64, pick: true, gain: "380 h/an" },
  { id: "rel", label: "Relances", hours: 18, u: -64, v: 22, pick: false },
  { id: "cr", label: "Comptes rendus", hours: 36, u: 24, v: 8, pick: true, gain: "320 h/an" },
  { id: "bl", label: "Bons de livraison", hours: 12, u: 66, v: -28, pick: false },
]
const TS = 14 // demi-côté d'une tour
const height = (h: number) => Math.round(h * 0.95)
/** Instant où la nappe passe sur une tour : proportionnel à sa coordonnée v. */
const litAt = (v: number) => SCAN_AT + ((v + S) / (2 * S)) * SCAN_DUR

/** Les trois cas retenus, sur la feuille de route : rang, hauteur du gain. */
const PLAN = PROCS.filter((p) => p.pick).sort((a, b) => b.hours - a.hours)
const PLAN_POS: [number, number][] = [
  [-36, 44],
  [4, 4],
  [44, -36],
]
const CORE_UV: [number, number] = [-48, -48]

const LEGENDS: LegendItem[] = [
  { title: "Feuille de route", sub: "Ce que le diagnostic remet", tone: "brand" },
  { title: "Vos processus", sub: "Où passe le temps, mesuré" },
]

export function DiagnosticArt() {
  return (
    <IsoScene
      cx={CX}
      legends={LEGENDS}
      viewBox="0 0 640 570"
      label="Schéma du diagnostic. En bas, les processus de l'entreprise dressés à la hauteur du temps qu'ils consomment chaque mois (exemple : factures 64 h, e-mails 42 h, comptes rendus 36 h, relances 18 h, bons de livraison 12 h). Une mesure balaie le plateau et retient les trois cas les plus rentables. Au-dessus, la feuille de route les classe avec leur gain annuel estimé."
    >
      <Scene />
    </IsoScene>
  )
}

function Scene() {
  const { still } = useIso()
  const ordered = [...PROCS].sort((a, b) => a.u + a.v - (b.u + b.v))
  return (
    <>
      <Shadow cy={Y.floor} s={S} />
      <Shadow cy={Y.plan} s={PS} dy={20} />

      {/* Le plateau de l'entreprise */}
      <motion.g variants={rise(-50, 0.05)}>
        <Slab cy={Y.floor} s={S} t={12} f={FACES.floor} />
        <Grid cy={Y.floor} s={S} />
      </motion.g>

      {/* Les processus, dressés à la hauteur du temps passé */}
      {ordered.map((p, i) => {
        const h = height(p.hours)
        const at = litAt(p.v)
        return (
          <motion.g key={p.id} variants={rise(24, 0.35 + i * 0.08, 0.8)}>
            <Slab cy={Y.floor} u={p.u} v={p.v} s={TS} z={h} t={h} f={FACES.tileMuted} />
            {p.pick ? (
              <motion.g variants={fade(at, 0.35)}>
                <Slab cy={Y.floor} u={p.u} v={p.v} s={TS} z={h} t={h} f={FACES.blue} />
              </motion.g>
            ) : null}
          </motion.g>
        )
      })}

      {/* La nappe de mesure qui balaie le plateau une fois */}
      {!still ? <ScanSheet /> : null}

      {/* Heures par mois */}
      <motion.g variants={fade(0.9)}>
        {PROCS.map((p) => {
          const [x, y] = iso(CX, Y.floor, p.u, p.v, height(p.hours))
          return (
            <motion.g key={p.id} variants={fade(litAt(p.v) + 0.05, 0.3)}>
              <Pill x={x} y={y - 18} text={`${p.hours} h`} tone={p.pick ? "brand" : "light"} small />
            </motion.g>
          )
        })}
      </motion.g>

      {/* Les cas retenus montent vers la feuille de route */}
      <motion.g variants={fade(SCAN_AT + SCAN_DUR + 0.2)}>
        {PLAN.map((p, i) => {
          const [x, y] = iso(CX, Y.floor, p.u, p.v, height(p.hours))
          const [, y2] = iso(CX, Y.plan, p.u, p.v)
          return <Beam key={p.id} x={x} y1={y - 26} y2={y2} color="#3355ff" delay={i * 0.35} />
        })}
      </motion.g>

      {/* La feuille de route : plateau sombre, signé */}
      <motion.g variants={rise(40, 0.25)}>
        <Slab cy={Y.plan} s={PS} t={14} f={FACES.dark} />
        <Grid cy={Y.plan} s={PS} color="#ffffff0b" />
        <g transform={flat(CX, Y.plan)}>
          {PLAN_POS.map(([u, v], i) => (
            <path key={i} d={`M${CORE_UV[0]} ${CORE_UV[1]} L${u} ${v}`} stroke="#7d96ff" strokeOpacity={0.45} strokeWidth={1.2} />
          ))}
          <circle cx={CORE_UV[0]} cy={CORE_UV[1]} r={18} fill="none" stroke="#7d96ff" strokeOpacity={0.35} />
          <circle cx={CORE_UV[0]} cy={CORE_UV[1]} r={30} fill="none" stroke="#7d96ff" strokeOpacity={0.18} strokeDasharray="3 6" />
        </g>
        <ellipse cx={iso(CX, Y.plan, CORE_UV[0], CORE_UV[1])[0]} cy={iso(CX, Y.plan, CORE_UV[0], CORE_UV[1])[1]} rx={46} ry={23} fill="url(#iso-core)" />
      </motion.g>

      {/* Les gains estimés, en vert, par rang */}
      {PLAN.map((p, i) => {
        const [u, v] = PLAN_POS[i]
        const h = [34, 24, 18][i]
        const at = SCAN_AT + SCAN_DUR + 0.5 + i * 0.25
        const [x, y] = iso(CX, Y.plan, u, v, h)
        return (
          <g key={p.id}>
            <motion.g variants={rise(16, at, 0.6)}>
              <Slab cy={Y.plan} u={u} v={v} s={9} z={h} t={h} f={FACES.green} />
            </motion.g>
            <motion.g variants={fade(at + 0.3, 0.4)}>
              <Pill x={x} y={y - 26} text={p.gain ?? ""} tone="time" small />
            </motion.g>
          </g>
        )
      })}

      {/* Le cœur Jegsen, posé sur la feuille de route */}
      <motion.g variants={pop(0.9)} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <path d={`M${iso(CX, Y.plan, ...CORE_UV)[0]} ${iso(CX, Y.plan, ...CORE_UV)[1]} V ${iso(CX, Y.plan, CORE_UV[0], CORE_UV[1], 44)[1] + 22}`} stroke="#7d96ff" strokeOpacity={0.5} strokeWidth={1.5} />
        <Core x={iso(CX, Y.plan, CORE_UV[0], CORE_UV[1], 44)[0]} y={iso(CX, Y.plan, CORE_UV[0], CORE_UV[1], 44)[1]} r={22} />
      </motion.g>

      {/* Étiquettes */}
      <motion.g variants={fade(0.8)}>
        <Pill x={CX + 150} y={Y.plan - 112} text="1 semaine, 3 jours de travail" />
      </motion.g>
      <motion.g variants={fade(SCAN_AT + SCAN_DUR + 1.3)}>
        <Pill x={CX + 160} y={Y.plan + 124} text="3 cas chiffrés, risques, priorités" tone="brand" />
        <Pill x={CX + 150} y={Y.plan + 12} text="Gains estimés, exemple" small />
      </motion.g>
      <motion.g variants={fade(SCAN_AT + 0.2)}>
        <Pill x={CX - 150} y={Y.floor - 130} text="Une journée avec vos équipes" />
      </motion.g>

      {/* Légende des niveaux */}
      <motion.g variants={fade(0.7)}>
        <Legend x={0} y={Y.plan - 10} title="Feuille de route" sub="Ce que le diagnostic remet" tone="brand" />
        <Legend x={0} y={Y.floor + 40} title="Vos processus" sub="Où passe le temps, mesuré" />
      </motion.g>
    </>
  )
}

/** Nappe bleue translucide, posée en l'air, qui traverse le plateau le long de v. */
function ScanSheet() {
  const z = 72
  const half = 7
  const A = iso(CX, Y.floor, -S, -half, z)
  const B = iso(CX, Y.floor, S, -half, z)
  const C = iso(CX, Y.floor, S, half, z)
  const D = iso(CX, Y.floor, -S, half, z)
  const down = ([x, y]: [number, number]): [number, number] => [x, y + z]
  const dx = S * 0.866
  const dy = S * 0.5
  return (
    <motion.g
      initial={{ x: dx, y: -dy, opacity: 0 }}
      animate={{ x: [dx, dx, -dx, -dx], y: [-dy, -dy, dy, dy], opacity: [0, 0.9, 0.9, 0] }}
      transition={{ duration: SCAN_DUR + 0.3, delay: SCAN_AT - 0.15, times: [0, 0.12, 0.88, 1], ease: "linear" }}
    >
      {/* le voile qui descend jusqu'au sol */}
      <polygon points={[A, B, down(B), down(A)].map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ")} fill="#3355ff" fillOpacity={0.07} />
      <polygon points={[A, B, C, D].map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ")} fill="#3355ff" fillOpacity={0.28} stroke="#3355ff" strokeOpacity={0.6} />
    </motion.g>
  )
}
