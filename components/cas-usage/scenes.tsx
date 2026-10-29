"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/components/motion/use-reduced-motion"
import { EASE } from "@/components/motion/reveal"

/*
 * Scènes des cas d'usage : chaque processus en une image, lisible en un coup d'œil.
 * Même grammaire partout : à gauche ce qui arrive (documents, e-mails, notes, demandes), au milieu
 * le passage par l'IA (bleu), à droite ce qui en sort, net et rangé, avec la validation humaine (vert).
 * Les scènes bouclent doucement. Avec « réduire les animations », elles sont fixes.
 */

const C = { ink: "#0b0d12", ink2: "#464c58", ink3: "#686e7a", line: "#0b0d1c1f", lineSoft: "#0b0d1210", surface: "#ffffff", bg2: "#f1f1ee", brand: "#3355ff", brandLight: "#9fb1ff", brandSoft: "#e8ecff", time: "#0fa58c", timeSoft: "#e2f5f1", amber: "#f59f0b" }
const FONT = "var(--font-sans)"

type SceneProps = { still: boolean }

/** Cadre d'une scène : 320 × 200, ombre commune, animation déclenchée à l'entrée dans l'écran. */
function Scene({ label, children, dark = false }: { label: string; children: (p: SceneProps) => React.ReactNode; dark?: boolean }) {
  const still = useReducedMotion()
  return (
    <motion.svg
      viewBox="0 0 320 200"
      role="img"
      aria-label={label}
      className="h-auto w-full overflow-visible"
      initial={still ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      style={{ fontFamily: FONT }}
    >
      <defs>
        <filter id="cs-shadow" x="-20%" y="-20%" width="140%" height="160%" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="1" stdDeviation="0.6" floodColor="#0b0d12" floodOpacity="0.07" />
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#1d2a66" floodOpacity={dark ? 0.3 : 0.09} />
        </filter>
      </defs>
      {children({ still })}
    </motion.svg>
  )
}

const fade = (delay: number, duration = 0.6) => ({ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay, duration } } })
const rise = (from: number, delay: number) => ({ hidden: { y: from, opacity: 0 }, show: { y: 0, opacity: 1, transition: { delay, duration: 0.8, ease: EASE } } })
const pop = (delay: number) => ({ hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1, transition: { delay, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as const } } })
const CENTER = { transformBox: "fill-box" as const, transformOrigin: "center" }

/** Feuille blanche avec coin replié et lignes de texte. */
function Sheet({ x, y, w = 64, h = 80, lines = [0.8, 0.6, 0.7, 0.4], rotate = 0, tone = "surface" }: { x: number; y: number; w?: number; h?: number; lines?: number[]; rotate?: number; tone?: "surface" | "soft" }) {
  return (
    <g transform={`rotate(${rotate} ${x + w / 2} ${y + h / 2})`}>
      <path d={`M${x} ${y + 6}a6 6 0 0 1 6-6h${w - 20}l14 14v${h - 20}a6 6 0 0 1-6 6h${-(w - 12)}a6 6 0 0 1-6-6z`} fill={tone === "soft" ? C.bg2 : C.surface} stroke={C.line} filter="url(#cs-shadow)" />
      <path d={`M${x + w - 14} ${y}v8a6 6 0 0 0 6 6h8`} fill={C.bg2} stroke={C.line} />
      {lines.map((l, i) => (
        <rect key={i} x={x + 10} y={y + 24 + i * 11} width={(w - 20) * l} height={4} rx={2} fill={C.lineSoft} />
      ))}
    </g>
  )
}

/** Le passage par l'IA : une ligne bleue avec des impulsions, et le point du symbole. */
function Pass({ x1, x2, y, still, delay = 0 }: { x1: number; x2: number; y: number; still: boolean; delay?: number }) {
  const d = `M${x1} ${y} H ${x2}`
  return (
    <g>
      <path d={d} stroke={C.brand} strokeOpacity={0.25} strokeWidth={2} strokeLinecap="round" />
      {!still ? <motion.path d={d} stroke={C.brand} strokeWidth={2.5} strokeLinecap="round" strokeDasharray="8 22" initial={{ strokeDashoffset: 60 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 1.6, ease: "linear", repeat: Infinity, delay }} /> : null}
      <circle cx={(x1 + x2) / 2} cy={y} r={9} fill={C.brand} />
      <path d={`M${(x1 + x2) / 2 - 3.2} ${y} l2.2 2.2 l4.4 -4.6`} fill="none" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  )
}

/** Validation humaine : une personne et sa coche verte. */
function Human({ x, y, delay = 1.2 }: { x: number; y: number; delay?: number }) {
  return (
    <motion.g variants={pop(delay)} style={CENTER}>
      <circle cx={x} cy={y} r={13} fill={C.timeSoft} stroke={C.time} strokeWidth={1.4} />
      <circle cx={x} cy={y - 3.5} r={3.6} fill="none" stroke={C.time} strokeWidth={1.5} />
      <path d={`M${x - 6.5} ${y + 7.5}c0-3.8 2.8-6 6.5-6s6.5 2.2 6.5 6`} fill="none" stroke={C.time} strokeWidth={1.5} strokeLinecap="round" />
      <circle cx={x + 11} cy={y - 10} r={6} fill={C.time} />
      <path d={`M${x + 8.3} ${y - 10} l1.9 1.9 l3.6-3.8`} fill="none" stroke="#fff" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
    </motion.g>
  )
}

/** Tableau rangé : des lignes qui se remplissent une à une. */
function Ledger({ x, y, w = 110, rows = 4, delay = 0.9, cols = [0.3, 0.42, 0.2] }: { x: number; y: number; w?: number; rows?: number; delay?: number; cols?: number[] }) {
  const h = 18 + rows * 16 + 6
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={C.surface} stroke={C.line} filter="url(#cs-shadow)" />
      <rect x={x} y={y} width={w} height={18} rx={8} fill={C.bg2} />
      <rect x={x} y={y + 10} width={w} height={8} fill={C.bg2} />
      {cols.map((c, k) => {
        const cx = x + 8 + cols.slice(0, k).reduce((a, b) => a + b * (w - 16) + 6, 0)
        return <rect key={k} x={cx} y={y + 7} width={c * (w - 16) - 6} height={4} rx={2} fill="#0b0d1226" />
      })}
      {Array.from({ length: rows }, (_, i) => (
        <motion.g key={i} variants={fade(delay + i * 0.15, 0.4)}>
          {cols.map((c, k) => {
            const cx = x + 8 + cols.slice(0, k).reduce((a, b) => a + b * (w - 16) + 6, 0)
            return <rect key={k} x={cx} y={y + 25 + i * 16} width={c * (w - 16) - 6} height={5} rx={2.5} fill={k === cols.length - 1 ? C.brandLight : C.lineSoft} />
          })}
        </motion.g>
      ))}
    </g>
  )
}

/* ------------------------------------------------------------------ */
/* Les scènes                                                          */
/* ------------------------------------------------------------------ */

/** Factures : trois factures qui arrivent, une écriture rangée qui en sort. */
export function InvoicesScene() {
  return (
    <Scene label="Trois factures arrivent, elles sont lues et rapprochées, et ressortent en écritures comptables rangées, validées par une personne.">
      {({ still }) => (
        <>
          <motion.g variants={rise(10, 0)}>
            <Sheet x={30} y={60} rotate={-8} tone="soft" lines={[0.7, 0.5, 0.6]} />
            <Sheet x={44} y={56} rotate={-3} tone="soft" lines={[0.6, 0.7, 0.5]} />
            <Sheet x={58} y={52} lines={[0.75, 0.55, 0.65, 0.4]} />
            <text x={90} y={122} fontSize={13} fontWeight={700} fill={C.brand}>
              €
            </text>
          </motion.g>
          <Pass x1={138} x2={198} y={100} still={still} />
          <motion.g variants={rise(10, 0.5)}>
            <Ledger x={200} y={60} w={100} rows={4} />
          </motion.g>
          <Human x={286} y={158} />
        </>
      )}
    </Scene>
  )
}

/** Bons de livraison : une photo de bon pris au smartphone, un enregistrement net qui part dans vos outils. */
export function DeliveryScene() {
  return (
    <Scene label="Un bon de livraison photographié au smartphone est lu, ses données sont extraites et envoyées dans vos outils, avec les réserves, sous validation humaine.">
      {({ still }) => (
        <>
          {/* Le téléphone et sa photo de bon, un peu de travers */}
          <motion.g variants={rise(10, 0)}>
            <rect x={44} y={42} width={72} height={124} rx={14} fill={C.ink} filter="url(#cs-shadow)" />
            <rect x={49} y={50} width={62} height={108} rx={9} fill="#2a2f3d" />
            <g transform="rotate(-6 80 100)">
              <rect x={56} y={62} width={48} height={66} rx={3} fill={C.surface} />
              {[0, 1, 2, 3].map((i) => (
                <rect key={i} x={62} y={72 + i * 10} width={36 - i * 6} height={3} rx={1.5} fill={C.lineSoft} />
              ))}
              <circle cx={92} cy={112} r={8} fill="none" stroke={C.brand} strokeWidth={1.5} strokeDasharray="2 2" />
              <path d="M64 118 c6 -6 10 2 18 -4" fill="none" stroke={C.ink2} strokeWidth={1.2} strokeLinecap="round" />
            </g>
            <rect x={72} y={150} width={16} height={3} rx={1.5} fill="#ffffff55" />
          </motion.g>
          <Pass x1={132} x2={192} y={100} still={still} />
          <motion.g variants={rise(10, 0.5)}>
            <Ledger x={196} y={64} w={98} rows={3} cols={[0.5, 0.28]} />
            {/* La réserve, repérée */}
            <motion.g variants={pop(1.5)} style={CENTER}>
              <circle cx={283} cy={113} r={5.5} fill={C.amber} />
              <path d="M283 110.2v3.4M283 115.6v.3" stroke="#fff" strokeWidth={1.4} strokeLinecap="round" />
            </motion.g>
          </motion.g>
          <Human x={286} y={158} delay={1.7} />
        </>
      )}
    </Scene>
  )
}

/** Tri des e-mails : une boîte qui déborde, trois dossiers qui se remplissent. */
export function MailScene() {
  const folders = [
    { y: 52, color: C.brand },
    { y: 100, color: C.time },
    { y: 148, color: "#8a909c" },
  ]
  return (
    <Scene label="Une boîte de réception pleine : chaque e-mail est lu et classé dans le bon dossier, les réponses courantes sont préparées, une personne garde la main.">
      {({ still }) => (
        <>
          {/* La boîte qui déborde */}
          <motion.g variants={rise(10, 0)}>
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i} transform={`translate(${40 + (i % 2) * 6} ${54 + i * 16}) rotate(${(i % 3) * 4 - 4})`}>
                <rect x={0} y={0} width={64} height={38} rx={5} fill={C.surface} stroke={C.line} filter="url(#cs-shadow)" />
                <path d="M4 6l28 17 28-17" fill="none" stroke={C.ink3} strokeWidth={1.4} />
              </g>
            ))}
          </motion.g>
          {/* Trois chemins vers trois dossiers */}
          {folders.map((f, i) => {
            const d = `M126 100 C 160 100 160 ${f.y + 18} 196 ${f.y + 18}`
            return (
              <g key={i}>
                <path d={d} fill="none" stroke={f.color} strokeOpacity={0.3} strokeWidth={2} />
                {!still ? <motion.path d={d} fill="none" stroke={f.color} strokeWidth={2.5} strokeLinecap="round" strokeDasharray="8 30" initial={{ strokeDashoffset: 76 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 1.9, ease: "linear", repeat: Infinity, delay: i * 0.5 }} /> : null}
              </g>
            )
          })}
          <circle cx={150} cy={100} r={9} fill={C.brand} />
          <path d="M146.8 100l2.2 2.2 4.4-4.6" fill="none" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
          {folders.map((f, i) => (
            <motion.g key={i} variants={rise(8, 0.4 + i * 0.15)}>
              <path d={`M198 ${f.y + 6}h16l5 5h35a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4h-56a4 4 0 0 1-4-4v-27a4 4 0 0 1 4-4z`} fill={C.surface} stroke={C.line} filter="url(#cs-shadow)" />
              <rect x={198} y={f.y + 16} width={60} height={3} fill={f.color} opacity={0.9} />
              {/* le dossier se remplit */}
              {[0, 1, 2].map((k) => (
                <motion.rect key={k} x={206 + k * 3} y={f.y + 24 - k * 2} width={44} height={3.5} rx={1.5} fill={C.lineSoft} variants={fade(1 + i * 0.3 + k * 0.25, 0.3)} />
              ))}
            </motion.g>
          ))}
          <Human x={294} y={182} delay={1.6} />
        </>
      )}
    </Scene>
  )
}

/** Comptes rendus : une voix et des notes, un compte rendu structuré avec décisions et actions. */
export function MinutesScene() {
  const bars = [6, 14, 22, 12, 26, 18, 8, 20, 14, 6, 16, 24, 10]
  return (
    <Scene label="Des notes rapides et un enregistrement deviennent un compte rendu structuré : décisions, actions, responsables, prêt à relire.">
      {({ still }) => (
        <>
          <motion.g variants={rise(10, 0)}>
            {/* l'onde de la voix */}
            {bars.map((h, i) => (
              <motion.rect key={i} x={34 + i * 7} y={70 - h / 2} width={3.5} height={h} rx={1.75} fill={C.brand} animate={still ? undefined : { scaleY: [1, 0.5 + ((i * 7) % 5) / 5, 1] }} transition={{ duration: 1.2 + (i % 3) * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.08 }} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
            ))}
            {/* les notes griffonnées */}
            <Sheet x={48} y={96} w={66} h={70} lines={[]} tone="soft" />
            <path d="M58 118c8-6 12 4 20-2s10 4 18-2M58 130c6-4 14 2 20-2s12 2 18-3M58 142c8-6 12 4 18-1" fill="none" stroke={C.ink2} strokeWidth={1.2} strokeLinecap="round" />
          </motion.g>
          <Pass x1={132} x2={192} y={100} still={still} />
          <motion.g variants={rise(10, 0.5)}>
            <rect x={196} y={42} width={104} height={120} rx={8} fill={C.surface} stroke={C.line} filter="url(#cs-shadow)" />
            <rect x={206} y={54} width={60} height={5} rx={2.5} fill={C.ink} opacity={0.8} />
            <rect x={206} y={64} width={40} height={3.5} rx={1.75} fill={C.lineSoft} />
            {["Décisions", "Actions"].map((t, k) => (
              <motion.g key={t} variants={fade(0.9 + k * 0.4, 0.4)}>
                <text x={206} y={86 + k * 36} fontSize={8.5} fontWeight={700} fill={C.brand} letterSpacing="0.04em">
                  {t.toUpperCase()}
                </text>
                {[0, 1].map((r) => (
                  <g key={r}>
                    <rect x={206} y={92 + k * 36 + r * 11} width={7} height={7} rx={2} fill="none" stroke={k === 1 ? C.time : C.brandLight} strokeWidth={1.2} />
                    {k === 1 && r === 0 ? <path d="M207.6 95.6l1.8 1.8 3.4-3.6" fill="none" stroke={C.time} strokeWidth={1.2} strokeLinecap="round" /> : null}
                    <rect x={218} y={94 + k * 36 + r * 11} width={60 - r * 18} height={3.5} rx={1.75} fill={C.lineSoft} />
                  </g>
                ))}
              </motion.g>
            ))}
          </motion.g>
          <Human x={286} y={176} delay={1.6} />
        </>
      )}
    </Scene>
  )
}

/** Qualification des demandes : un flux de demandes, chacune priorisée et remise à la bonne personne. */
export function RequestsScene() {
  const people = [
    { y: 58, tone: C.brand },
    { y: 100, tone: C.brand },
    { y: 142, tone: C.brand },
  ]
  return (
    <Scene label="Des demandes de toutes sortes arrivent, chacune est analysée, priorisée et transmise à la bonne personne, avec les informations utiles.">
      {({ still }) => (
        <>
          {/* Les demandes : bulles de tailles diverses */}
          <motion.g variants={rise(10, 0)}>
            {[
              { x: 30, y: 52, w: 70 },
              { x: 44, y: 84, w: 58 },
              { x: 28, y: 116, w: 76 },
              { x: 50, y: 148, w: 52 },
            ].map((b, i) => (
              <g key={i}>
                <path d={`M${b.x} ${b.y}h${b.w}a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6h${-(b.w - 12)}l-8 7v-7h-4a6 6 0 0 1-6-6v-12a6 6 0 0 1 6-6z`} fill={C.surface} stroke={C.line} filter="url(#cs-shadow)" />
                <rect x={b.x + 8} y={b.y + 8} width={b.w - 14} height={3.5} rx={1.75} fill={C.lineSoft} />
                <rect x={b.x + 8} y={b.y + 15} width={(b.w - 14) * 0.6} height={3.5} rx={1.75} fill={C.lineSoft} />
              </g>
            ))}
          </motion.g>
          {/* Le tri : une ligne par personne */}
          {people.map((p, i) => {
            const d = `M126 100 C 164 100 164 ${p.y} 236 ${p.y}`
            return (
              <g key={i}>
                <path d={d} fill="none" stroke={C.brand} strokeOpacity={0.25} strokeWidth={2} />
                {!still ? <motion.path d={d} fill="none" stroke={C.brand} strokeWidth={2.5} strokeLinecap="round" strokeDasharray="8 34" initial={{ strokeDashoffset: 84 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 2.1, ease: "linear", repeat: Infinity, delay: i * 0.6 }} /> : null}
              </g>
            )
          })}
          <circle cx={150} cy={100} r={9} fill={C.brand} />
          <path d="M146.8 100l2.2 2.2 4.4-4.6" fill="none" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
          {/* Les bonnes personnes, et la priorité */}
          {people.map((p, i) => (
            <motion.g key={i} variants={pop(0.5 + i * 0.15)} style={CENTER}>
              <circle cx={252} cy={p.y} r={14} fill={C.surface} stroke={C.line} filter="url(#cs-shadow)" />
              <circle cx={252} cy={p.y - 4} r={4} fill="none" stroke={C.ink2} strokeWidth={1.5} />
              <path d={`M${252 - 7} ${p.y + 8}c0-4 3-6.5 7-6.5s7 2.5 7 6.5`} fill="none" stroke={C.ink2} strokeWidth={1.5} strokeLinecap="round" />
              <motion.circle cx={264} cy={p.y - 10} r={4.5} fill={i === 0 ? C.amber : i === 1 ? C.brand : "#8a909c"} variants={pop(1.3 + i * 0.3)} style={CENTER} />
            </motion.g>
          ))}
          <text x={274} y={62} fontSize={9} fontWeight={600} fill={C.ink3}>
            urgent
          </text>
        </>
      )}
    </Scene>
  )
}

/** Appel d'offres : un dossier épais et sa date limite, une grille d'exigences qui se coche, le mémoire prêt. */
export function TenderScene() {
  const rows = [0.7, 0.55, 0.65, 0.5, 0.6]
  return (
    <Scene label="Un dossier de consultation épais, avec sa date limite. Chaque exigence est relevée dans une grille qui se coche au fur et à mesure, le mémoire technique se prépare à partir de vos réponses passées, une personne relit et dépose.">
      {({ still }) => (
        <>
          {/* Le dossier : plusieurs pièces, un onglet, la date limite */}
          <motion.g variants={rise(10, 0)}>
            <Sheet x={34} y={66} w={62} h={84} tone="soft" lines={[0.6, 0.7, 0.5]} rotate={-5} />
            <Sheet x={46} y={60} w={62} h={84} tone="soft" lines={[0.7, 0.5, 0.6]} rotate={-2} />
            <Sheet x={58} y={54} w={62} h={84} lines={[0.75, 0.55, 0.65, 0.45, 0.6]} />
            <rect x={58} y={54} width={26} height={11} rx={3} fill={C.brand} />
            <text x={71} y={62.5} textAnchor="middle" fontSize={7} fontWeight={700} fill="#fff" letterSpacing="0.06em">
              DCE
            </text>
            {/* la date limite */}
            <g transform="translate(30 150)">
              <rect x={0} y={0} width={34} height={30} rx={6} fill={C.surface} stroke={C.line} filter="url(#cs-shadow)" />
              <rect x={0} y={0} width={34} height={9} rx={6} fill={C.amber} />
              <rect x={0} y={5} width={34} height={4} fill={C.amber} />
              <text x={17} y={24} textAnchor="middle" fontSize={11} fontWeight={700} fill={C.ink}>
                12
              </text>
            </g>
          </motion.g>
          <Pass x1={136} x2={196} y={100} still={still} />
          {/* La grille des exigences, puis le mémoire */}
          <motion.g variants={rise(10, 0.5)}>
            <rect x={198} y={44} width={104} height={118} rx={8} fill={C.surface} stroke={C.line} filter="url(#cs-shadow)" />
            <rect x={208} y={54} width={52} height={5} rx={2.5} fill={C.ink} opacity={0.8} />
            {rows.map((w, i) => (
              <g key={i}>
                <rect x={208} y={68 + i * 17} width={9} height={9} rx={2.5} fill="none" stroke={C.brandLight} strokeWidth={1.2} />
                <rect x={222} y={70.5 + i * 17} width={70 * w} height={4} rx={2} fill={C.lineSoft} />
                <motion.g variants={fade(1 + i * 0.22, 0.25)}>
                  <rect x={208} y={68 + i * 17} width={9} height={9} rx={2.5} fill={C.brand} />
                  <path d={`M210.2 ${72.5 + i * 17}l2 2 3.8-4`} fill="none" stroke="#fff" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
                </motion.g>
              </g>
            ))}
            <motion.g variants={fade(2.3, 0.4)}>
              <rect x={208} y={150} width={84} height={5} rx={2.5} fill={C.timeSoft} />
              <rect x={208} y={150} width={84} height={5} rx={2.5} fill={C.time} opacity={0.85} />
            </motion.g>
          </motion.g>
          <Human x={288} y={176} delay={2.5} />
        </>
      )}
    </Scene>
  )
}

/** Votre processus : une feuille encore vide, un tracé qui se dessine, la question posée. */
export function CustomScene() {
  return (
    <Scene dark label="Une feuille encore vide : votre processus, celui que nous n'avons pas encore dessiné.">
      {({ still }) => (
        <>
          <motion.g variants={rise(10, 0)}>
            <path d="M104 44a6 6 0 0 1 6-6h78l22 22v96a6 6 0 0 1-6 6h-94a6 6 0 0 1-6-6z" fill="#ffffff0a" stroke="#ffffff33" strokeDasharray="4 5" />
            <path d="M188 38v16a6 6 0 0 0 6 6h16" fill="none" stroke="#ffffff33" />
          </motion.g>
          {/* Le tracé qui se dessine : les étapes de votre processus */}
          <motion.path
            d="M124 76 h40 M124 76 v20 h30 v-8 M154 108 h50 M124 128 h26 l8 8 h30"
            fill="none"
            stroke="#7d96ff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { delay: 0.4, duration: 1.6, ease: "easeInOut" } } }}
          />
          {[
            [124, 76],
            [164, 76],
            [154, 108],
            [204, 108],
            [188, 136],
          ].map(([x, y], i) => (
            <motion.circle key={i} cx={x} cy={y} r={4} fill="#7d96ff" variants={pop(0.5 + i * 0.3)} style={CENTER} />
          ))}
          {/* Le point d'interrogation, qui respire */}
          <motion.g animate={still ? undefined : { y: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            <circle cx={214} cy={148} r={13} fill="#3355ff" style={{ filter: "drop-shadow(0 0 10px #3355ff88)" }} />
            <text x={214} y={153} textAnchor="middle" fontSize={15} fontWeight={700} fill="#fff">
              ?
            </text>
          </motion.g>
        </>
      )}
    </Scene>
  )
}

/** Cerveau d'entreprise : vos documents entrent, une réponse sourcée en sort. */
export function BrainScene() {
  return (
    <Scene label="Vos documents, procédures et e-mails entrent dans le cerveau d'entreprise, une réponse en sort, avec ses sources.">
      {({ still }) => (
        <>
          <motion.g variants={rise(10, 0)}>
            <Sheet x={26} y={44} w={46} h={56} lines={[0.7, 0.5, 0.6]} tone="soft" rotate={-6} />
            <Sheet x={52} y={78} w={46} h={56} lines={[0.6, 0.7]} tone="soft" rotate={4} />
            <Sheet x={30} y={118} w={46} h={56} lines={[0.5, 0.7, 0.4]} rotate={-3} />
          </motion.g>
          {[70, 100, 140].map((y, i) => {
            const d = `M104 ${y} C 128 ${y} 128 100 150 100`
            return (
              <g key={i}>
                <path d={d} fill="none" stroke={C.brand} strokeOpacity={0.25} strokeWidth={2} />
                {!still ? <motion.path d={d} fill="none" stroke={C.brand} strokeWidth={2.5} strokeLinecap="round" strokeDasharray="8 26" initial={{ strokeDashoffset: 68 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 1.8, ease: "linear", repeat: Infinity, delay: i * 0.5 }} /> : null}
              </g>
            )
          })}
          {/* Le cœur */}
          <motion.g variants={pop(0.3)} style={CENTER}>
            <circle cx={166} cy={100} r={22} fill={C.ink} style={{ filter: "drop-shadow(0 0 14px #3355ff66)" }} />
            <g transform="translate(150 84) scale(0.5)">
              <path d="M32 10A22 22 0 1 1 10 32" fill="none" stroke="#f3f4f6" strokeWidth={6.5} strokeLinecap="round" />
              <circle cx={10} cy={32} r={5.5} fill="#7d96ff" />
              <circle cx={32} cy={32} r={3.4} fill="#f3f4f6" />
            </g>
          </motion.g>
          <Pass x1={192} x2={214} y={100} still={still} delay={0.4} />
          {/* La réponse, avec ses sources */}
          <motion.g variants={rise(10, 0.7)}>
            <path d="M216 70h84a6 6 0 0 1 6 6v40a6 6 0 0 1-6 6h-70l-10 9v-9h-4a6 6 0 0 1-6-6v-40a6 6 0 0 1 6-6z" fill={C.surface} stroke={C.line} filter="url(#cs-shadow)" />
            <rect x={224} y={80} width={68} height={4} rx={2} fill={C.lineSoft} />
            <rect x={224} y={89} width={56} height={4} rx={2} fill={C.lineSoft} />
            <rect x={224} y={98} width={62} height={4} rx={2} fill={C.lineSoft} />
            {[0, 1].map((k) => (
              <motion.g key={k} variants={fade(1.3 + k * 0.2, 0.3)}>
                <rect x={224 + k * 30} y={108} width={26} height={8} rx={4} fill={C.brandSoft} />
                <text x={237 + k * 30} y={114} textAnchor="middle" fontSize={6.5} fontWeight={600} fill={C.brand}>
                  source {k + 1}
                </text>
              </motion.g>
            ))}
          </motion.g>
        </>
      )}
    </Scene>
  )
}

/** Workflows agentiques : un agent enchaîne les actions dans vos outils, une personne valide la sensible. */
export function AgentsScene() {
  const steps = [
    { x: 60, label: "ticket" },
    { x: 136, label: "fiche" },
    { x: 212, label: "commande" },
  ]
  return (
    <Scene label="Un agent enchaîne les actions dans vos outils, créer un ticket, mettre à jour une fiche, préparer une commande, et une personne valide les actions sensibles.">
      {({ still }) => (
        <>
          <path d="M60 100 H 212" stroke={C.brand} strokeOpacity={0.25} strokeWidth={2} />
          {!still ? <motion.path d="M60 100 H 212" stroke={C.brand} strokeWidth={2.5} strokeLinecap="round" strokeDasharray="8 30" initial={{ strokeDashoffset: 76 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 2, ease: "linear", repeat: Infinity }} /> : null}
          {steps.map((s, i) => (
            <motion.g key={s.label} variants={pop(0.2 + i * 0.25)} style={CENTER}>
              <rect x={s.x - 24} y={76} width={48} height={48} rx={12} fill={C.surface} stroke={C.line} filter="url(#cs-shadow)" />
              <g transform={`translate(${s.x} 100)`} fill="none" stroke={C.ink2} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                {i === 0 ? <><path d="M-9 -7h18v14h-18z" /><path d="M-5 -2h10M-5 2h6" /></> : i === 1 ? <><circle cx={0} cy={-3} r={4} /><path d="M-8 9c1-5 4-7 8-7s7 2 8 7" /></> : <><path d="M-9 -6l9-5 9 5v10l-9 5-9-5z" /><path d="M-9 -6l9 5 9-5M0 -1v10" /></>}
              </g>
              <text x={s.x} y={140} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={C.ink3}>
                {s.label}
              </text>
            </motion.g>
          ))}
          {/* L'action sensible passe par une personne */}
          <path d="M212 100 C 240 100 240 64 262 64" fill="none" stroke={C.time} strokeWidth={2} strokeDasharray="3 5" strokeLinecap="round" />
          <Human x={284} y={60} delay={1.1} />
          <motion.g variants={fade(1.4)}>
            <text x={262} y={108} fontSize={9} fill={C.ink3}>
              actions
            </text>
            <text x={262} y={119} fontSize={9} fill={C.ink3}>
              sensibles
            </text>
          </motion.g>
        </>
      )}
    </Scene>
  )
}
