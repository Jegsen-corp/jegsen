"use client"

import { motion } from "framer-motion"
import { Beam, Core, FACES, Grid, IsoScene, Legend, Pill, Shadow, Slab, fade, flat, iso, pop, rise, useIso } from "./iso-kit"
import type { LegendItem } from "./iso-kit"

/*
 * Maintenance : en bas, vos workflows en production sur leur plateau, reliés en bleu au plateau sombre de la
 * supervision, au-dessus. Un workflow passe à l'ambre (anomalie), un faisceau vert redescend (correctif),
 * il revient au vert. Le long du bord, les heures gagnées se dressent mois après mois : les gains tiennent.
 * Chiffres et horaires d'exemple.
 */

const CX = 330
const Y = { sup: 150, floor: 372 }
const S = 112
const SS = 78 // demi-côté du plateau de supervision
const ALERT_AT = 1.6
const FIX_AT = 2.7

const FLOWS = [
  { id: "inv", label: "Factures fournisseurs", u: -58, v: 58 },
  { id: "mail", label: "Tri des e-mails", u: 0, v: 0, alert: true },
  { id: "cr", label: "Comptes rendus", u: 58, v: -58 },
] as const
const GU = -46 // centre de la bande des gains
const GV = 186
const WS = 20
const WH = 10

/** Heures gagnées par mois (exemple) : les gains se maintiennent. */
const GAINS = [44, 47, 46, 48, 45, 49, 47, 48, 50, 48, 49, 51]

const LEGENDS: LegendItem[] = [
  { title: "La supervision", sub: "Ce qui veille sur vos workflows", tone: "brand" },
  { title: "En production", sub: "Vos workflows, mois après mois" },
]

export function MaintenanceArt() {
  return (
    <IsoScene
      cx={CX}
      legends={LEGENDS}
      viewBox="0 30 640 500"
      label="Schéma de la maintenance. En bas, trois workflows en production (factures fournisseurs, tri des e-mails, comptes rendus), reliés au plateau de supervision au-dessus. Une anomalie sur le tri des e-mails déclenche une alerte, un correctif est appliqué, le workflow revient à la normale. Le long du plateau, les heures gagnées chaque mois restent stables sur douze mois (exemple)."
    >
      <Scene />
    </IsoScene>
  )
}

function Scene() {
  const { still } = useIso()
  const core = iso(CX, Y.sup, 0, 0, 34)
  return (
    <>
      <Shadow cy={Y.floor} s={S} />
      <Shadow cy={Y.sup} s={SS} dy={20} />

      {/* Vos workflows en production */}
      <motion.g variants={rise(-50, 0.05)}>
        <Slab cy={Y.floor} s={S} t={12} f={FACES.floor} />
        <Grid cy={Y.floor} s={S} step={28} />
      </motion.g>

      {/* Heures gagnées, mois après mois : une bande devant le plateau, à gauche */}
      <motion.g variants={rise(-30, 0.5)}>
        <Slab cy={Y.floor} u={GU} v={GV} su={82} sv={13} t={8} f={FACES.floor} />
      </motion.g>
      {GAINS.map((g, k) => {
        const u = GU - 72 + k * 13
        const h = Math.round(g * 0.9)
        return (
          <motion.g key={k} variants={rise(12, 1.9 + k * 0.06, 0.5)}>
            <Slab cy={Y.floor} u={u} v={GV} s={4.5} z={h} t={h} f={k === GAINS.length - 1 ? FACES.green : FACES.greenSoft} />
          </motion.g>
        )
      })}

      {/* Les trois workflows */}
      {FLOWS.map((f, i) => (
        <motion.g key={f.id} variants={pop(0.35 + i * 0.1)} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <Slab cy={Y.floor} u={f.u} v={f.v} s={WS} z={WH} t={WH} f={FACES.blueTile} />
          {"alert" in f ? (
            <>
              <motion.g variants={fade(ALERT_AT, 0.3)}>
                <Slab cy={Y.floor} u={f.u} v={f.v} s={WS} z={WH} t={WH} f={FACES.amber} />
              </motion.g>
              <motion.g variants={fade(FIX_AT, 0.4)}>
                <Slab cy={Y.floor} u={f.u} v={f.v} s={WS} z={WH} t={WH} f={FACES.green} />
              </motion.g>
            </>
          ) : null}
          <g transform={flat(CX, Y.floor, f.u, f.v, WH)}>
            <Pulse i={i} />
          </g>
        </motion.g>
      ))}

      {/* L'onde de l'alerte */}
      {!still ? (
        <g transform={flat(CX, Y.floor, 0, 0, WH)}>
          <motion.circle r={18} fill="none" stroke="#f59f0b" strokeWidth={2.5} initial={{ scale: 1, opacity: 0 }} animate={{ scale: [1, 3.4], opacity: [0, 0.8, 0] }} transition={{ duration: 1, delay: ALERT_AT, ease: "easeOut" }} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
        </g>
      ) : null}

      {/* Surveillance : chaque workflow remonte vers la supervision */}
      <motion.g variants={fade(1.0)}>
        {FLOWS.map((f, i) => {
          const [x, y] = iso(CX, Y.floor, f.u, f.v, WH)
          const [, y2] = iso(CX, Y.sup, f.u, f.v)
          return <Beam key={f.id} x={x} y1={y - 10} y2={y2} color="#3355ff" delay={i * 0.35} />
        })}
      </motion.g>
      {/* Le correctif redescend */}
      {!still ? (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 1.2, delay: FIX_AT - 0.6, times: [0, 0.2, 0.8, 1] }}>
          <Beam x={iso(CX, Y.floor, 0, 0)[0] + 10} y1={iso(CX, Y.sup, 0, 0)[1] + 14} y2={iso(CX, Y.floor, 0, 0, WH)[1] - 8} color="#0fa58c" width={3} up={false} />
        </motion.g>
      ) : null}

      {/* La supervision : plateau sombre, signé */}
      <motion.g variants={rise(40, 0.2)}>
        <Slab cy={Y.sup} s={SS} t={14} f={FACES.dark} />
        <Grid cy={Y.sup} s={SS} step={26} color="#ffffff0b" />
        <g transform={flat(CX, Y.sup)}>
          {FLOWS.map((f) => (
            <g key={f.id}>
              <path d={`M0 0 L${f.u} ${f.v}`} stroke="#7d96ff" strokeOpacity={0.5} strokeWidth={1.2} />
              <circle cx={f.u} cy={f.v} r={3.4} fill="#7d96ff" />
            </g>
          ))}
          <circle r={18} fill="none" stroke="#7d96ff" strokeOpacity={0.35} />
          <circle r={34} fill="none" stroke="#7d96ff" strokeOpacity={0.18} strokeDasharray="3 6" />
          {!still ? <Sweep /> : null}
        </g>
        <ellipse cx={CX} cy={Y.sup} rx={60} ry={30} fill="url(#iso-core)" />
      </motion.g>
      <motion.g variants={pop(0.8)} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <path d={`M${CX} ${Y.sup} V ${core[1] + 20}`} stroke="#7d96ff" strokeOpacity={0.5} strokeWidth={1.5} />
        <Core x={core[0]} y={core[1]} r={24} />
      </motion.g>

      {/* Étiquettes */}
      <motion.g variants={fade(0.9)}>
        {FLOWS.map((f, i) => {
          const [x, y] = iso(CX, Y.floor, f.u, f.v, WH)
          return <Pill key={f.id} x={x + (i === 0 ? -10 : i === 2 ? 10 : 0)} y={y + 42} text={f.label} small />
        })}
        <Pill x={CX + 150} y={Y.sup - 40} text="Supervision et alertes, en continu" tone="brand" small />
        <Pill x={CX + 150} y={Y.sup - 18} text="Correctifs, mises à jour, suivi des gains" tone="brand" small />
      </motion.g>
      <Status />
      <motion.g variants={fade(2.8)}>
        <Pill x={iso(CX, Y.floor, GU, GV)[0] + 92} y={iso(CX, Y.floor, GU, GV)[1] + 44} text="Heures gagnées par mois, 12 mois, exemple" tone="time" small />
      </motion.g>

      <motion.g variants={fade(0.7)}>
        <Legend x={0} y={Y.sup + 6} title="La supervision" sub="Ce qui veille sur vos workflows" tone="brand" />
        <Legend x={0} y={Y.floor - 48} title="En production" sub="Vos workflows, mois après mois" />
      </motion.g>
    </>
  )
}

/** Pastille d'état du workflow surveillé : Normal, Alerte, Corrigé. */
function Status() {
  const { still } = useIso()
  const [x, y] = iso(CX, Y.floor, 0, 0, WH)
  const px = x
  const py = y + 66
  if (still) return <Pill x={px} y={py} text="Corrigé" tone="time" small />
  const seq = (values: number[], times: number[], end: number) => ({
    initial: { opacity: values[0] },
    animate: { opacity: values },
    transition: { duration: end, times: times.map((t) => t / end), ease: "linear" as const },
  })
  const e = 0.05
  return (
    <g>
      <motion.g {...seq([0, 0, 1, 1, 0], [0, 1.0, 1.1, ALERT_AT - e, ALERT_AT + e], ALERT_AT + e)}>
        <Pill x={px} y={py} text="Normal" tone="time" small />
      </motion.g>
      <motion.g {...seq([0, 0, 1, 1, 0], [0, ALERT_AT - e, ALERT_AT + e, FIX_AT - e, FIX_AT + e], FIX_AT + e)}>
        <Pill x={px} y={py} text="Alerte, format de facture modifié" tone="amber" small />
      </motion.g>
      <motion.g {...seq([0, 0, 1], [0, FIX_AT - e, FIX_AT + e], FIX_AT + e)}>
        <Pill x={px} y={py} text="Corrigé, règle ajustée" tone="time" small />
      </motion.g>
    </g>
  )
}

/** Courbe de vie posée sur chaque workflow. */
function Pulse({ i }: { i: number }) {
  const d = i === 1 ? "M-14 2 h6 l3 -8 l4 14 l3 -8 h12" : "M-14 1 h7 l3 -4 l4 6 l3 -3 h11"
  return <path d={d} fill="none" stroke="#2a46d6" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" opacity={0.85} />
}

/** Balayage circulaire de la supervision, en continu. */
function Sweep() {
  return (
    <motion.g animate={{ rotate: 360 }} transition={{ duration: 6, ease: "linear", repeat: Infinity }} style={{ transformOrigin: "0px 0px" }}>
      <path d="M0 0 L60 0 A60 60 0 0 0 42.4 -42.4 Z" fill="#7d96ff" fillOpacity={0.14} />
      <path d="M0 0 L60 0" stroke="#7d96ff" strokeOpacity={0.6} strokeWidth={1.2} />
    </motion.g>
  )
}
