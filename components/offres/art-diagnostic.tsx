"use client"

import { motion } from "framer-motion"
import { Appear, ArtFrame, C, Card, ExampleTag, GrowBar, Seal, T, useArt } from "./art-kit"

/*
 * Diagnostic : la semaine, la cartographie des processus (où va le temps), les deux ou trois cas retenus
 * en bleu, puis la feuille de route chiffrée et l'analyse des risques. Chiffres d'exemple.
 */

const ROWS = [
  { label: "Saisie des factures", hours: 64, pick: true },
  { label: "Tri des e-mails", hours: 42, pick: true },
  { label: "Relances clients", hours: 18, pick: false },
  { label: "Comptes rendus", hours: 36, pick: true },
  { label: "Contrôle des bons", hours: 12, pick: false },
]
const ROW_Y = (i: number) => 98 + i * 36
const BAR_X = 182
const BAR_W = 136

// Gain annuel estimé : heures par mois × 12 × trois quarts du temps libérés, arrondi à la dizaine
const ROADMAP = [
  { label: "Saisie des factures", gain: "≈ 580 h/an", risk: "Risque faible" },
  { label: "Tri des e-mails", gain: "≈ 380 h/an", risk: "Risque faible" },
  { label: "Comptes rendus", gain: "≈ 320 h/an", risk: "Risque moyen" },
]

const RISKS = [
  { label: "Données", level: 1 },
  { label: "Sécurité", level: 1 },
  { label: "Conformité", level: 2 },
  { label: "Adoption", level: 2 },
]

export function DiagnosticArt() {
  return (
    <ArtFrame label="Exemple de diagnostic : cartographie des heures passées sur cinq processus, trois cas d'usage retenus, puis une feuille de route chiffrée avec leurs gains estimés et une analyse des risques, en une semaine.">
      {/* Cartographie : où va le temps */}
      <Card x={16} y={24} w={352} h={248} delay={0}>
        <T x={36} y={54} size={13} weight={600} display>
          Cartographie des processus
        </T>
        <T x={348} y={54} size={11} color={C.ink3} anchor="end">
          heures par mois
        </T>
        <line x1={16} x2={368} y1={70} y2={70} stroke={C.lineSoft} />
        {ROWS.map((r, i) => (
          <Row key={r.label} i={i} {...r} />
        ))}
      </Card>
      <ScanBand />

      {/* La semaine */}
      <Card x={388} y={24} w={156} h={92} delay={0.12}>
        <T x={404} y={50} size={13} weight={600} display>
          1 semaine
        </T>
        <T x={404} y={68} size={11} color={C.ink3}>
          3 jours de travail
        </T>
        {[0, 1, 2, 3, 4].map((d) => (
          <rect key={d} x={404 + d * 27} y={80} width={20} height={20} rx={5} fill={d === 0 || d === 2 || d === 4 ? C.brand : C.surface} stroke={d === 0 || d === 2 || d === 4 ? C.brand : C.line} />
        ))}
      </Card>

      {/* Des cas retenus à la feuille de route */}
      <Appear delay={1.6} y={0}>
        <path d="M368 152C430 152 462 180 462 236" fill="none" stroke={C.brand} strokeWidth={1.5} strokeDasharray="2 5" strokeLinecap="round" />
        <path d="M456 230l6 8 6-8" fill="none" stroke={C.brand} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        <rect x={406} y={170} width={112} height={26} rx={13} fill={C.surface} stroke={C.brandMid} />
        <T x={462} y={187} size={11.5} weight={600} color={C.brand} anchor="middle">
          3 cas retenus
        </T>
      </Appear>

      {/* Risques */}
      <Card x={16} y={292} w={176} h={132} delay={1.5}>
        <T x={32} y={318} size={13} weight={600} display>
          Risques
        </T>
        <T x={176} y={318} size={11} color={C.ink3} anchor="end">
          niveau
        </T>
        {RISKS.map((r, i) => (
          <g key={r.label}>
            <T x={32} y={345 + i * 20} size={11.5} color={C.ink2}>
              {r.label}
            </T>
            {[0, 1, 2].map((k) => (
              <circle key={k} cx={146 + k * 12} cy={341 + i * 20} r={3.5} fill={k < r.level ? C.ink2 : "#0b0d1222"} />
            ))}
          </g>
        ))}
      </Card>

      {/* Feuille de route : le livrable, signé */}
      <Card x={212} y={252} w={332} h={172} delay={1.7}>
        <Seal x={228} y={264} size={24} delay={2.0} />
        <T x={260} y={282} size={13} weight={600} display>
          Feuille de route
        </T>
        <ExampleTag x={474} y={268} />
        <line x1={212} x2={544} y1={298} y2={298} stroke={C.lineSoft} />
        {ROADMAP.map((r, j) => {
          const y = 324 + j * 36
          return (
            <Appear key={r.label} delay={1.95 + j * 0.12} x={-6} y={0}>
              <circle cx={242} cy={y - 4} r={10} fill={C.brandSoft} />
              <T x={242} y={y} size={11} weight={600} color={C.brand} anchor="middle">
                {j + 1}
              </T>
              <T x={262} y={y} size={12.5} weight={500}>
                {r.label}
              </T>
              <T x={262} y={y + 14} size={10.5} color={C.ink3}>
                {r.risk}
              </T>
              <T x={524} y={y + 1} size={12.5} weight={600} color={C.time} anchor="end">
                {r.gain}
              </T>
            </Appear>
          )
        })}
      </Card>
    </ArtFrame>
  )
}

function Row({ i, label, hours, pick }: { i: number; label: string; hours: number; pick: boolean }) {
  const { reduce } = useArt()
  const y = ROW_Y(i)
  const w = Math.round((hours / 64) * BAR_W)
  const chosen = 0.95 + i * 0.2 // au passage de la bande de lecture
  return (
    <g>
      <circle cx={34} cy={y} r={4} fill={C.fill} />
      <T x={46} y={y + 4} size={12} color={C.ink2}>
        {label}
      </T>
      <rect x={BAR_X} y={y - 4} width={BAR_W} height={8} rx={4} fill={C.lineSoft} />
      <GrowBar x={BAR_X} y={y - 4} w={w} fill="#0b0d1230" delay={0.3 + i * 0.06} />
      {pick ? (
        <>
          <motion.rect x={BAR_X} y={y - 4} width={w} height={8} rx={4} fill={C.brand} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35, delay: chosen }} />
          <motion.circle cx={34} cy={y} r={4} fill={C.brand} initial={reduce ? false : { scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.35, delay: chosen, ease: [0.34, 1.56, 0.64, 1] }} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
        </>
      ) : null}
      <T x={348} y={y + 4} size={11.5} weight={pick ? 600 : 400} color={pick ? C.ink : C.ink3} anchor="end">
        {`${hours} h`}
      </T>
    </g>
  )
}

/** Bande de lecture qui descend une fois sur la cartographie. */
function ScanBand() {
  const { reduce } = useArt()
  if (reduce) return null
  return (
    <motion.rect
      x={20}
      width={344}
      height={30}
      rx={8}
      fill={C.brand}
      initial={{ y: ROW_Y(0) - 15, opacity: 0 }}
      animate={{ y: [ROW_Y(0) - 15, ROW_Y(4) - 15], opacity: [0, 0.07, 0.07, 0] }}
      transition={{ duration: 0.8, delay: 0.95, ease: "linear", opacity: { duration: 0.8, delay: 0.95, times: [0, 0.15, 0.85, 1] } }}
      pointerEvents="none"
    />
  )
}
