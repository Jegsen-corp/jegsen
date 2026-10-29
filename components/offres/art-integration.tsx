"use client"

import { useId } from "react"
import { useReducedMotion } from "@/components/motion/use-reduced-motion"
import { Appear, ArtFrame, C, Card, Check, ExampleTag, GrowBar, Person, Seal, T } from "./art-kit"

/*
 * Intégration : un workflow en production, alimenté par vos documents et vos e-mails, branché sur vos
 * outils (messagerie, GED, ERP, CRM). Les cas douteux partent vers une personne. En bas, la mesure
 * avant / après et ce qui sécurise la mise en production. Chiffres d'exemple.
 */

type G = "doc" | "mail" | "box" | "inbox" | "scan" | "shield" | "sync" | "folder" | "grid" | "contact"

/** Pictogrammes 16 × 16, trait de 1,5. */
function Glyph({ g, x, y, color = C.ink2 }: { g: G; x: number; y: number; color?: string }) {
  const p = { fill: "none", stroke: color, strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  const d: Record<G, React.ReactNode> = {
    doc: <><path d="M4 1.5h5.5L13 5v9.5H4z" {...p} /><path d="M9.5 1.5V5H13M6.5 8.5h4M6.5 11h3" {...p} /></>,
    mail: <><rect x="1.5" y="3.5" width="13" height="9.5" rx="1.5" {...p} /><path d="M2 4.5l6 4.5 6-4.5" {...p} /></>,
    box: <><path d="M2 5l6-3 6 3v6.5l-6 3-6-3z" {...p} /><path d="M2 5l6 3 6-3M8 8v6.5" {...p} /></>,
    inbox: <><path d="M2 9.5h3.5l1 1.5h3l1-1.5H14" {...p} /><path d="M2 9.5 4 3h8l2 6.5V13H2z" {...p} /></>,
    scan: <><path d="M2 5V2.5h2.5M11.5 2.5H14V5M14 11v2.5h-2.5M4.5 13.5H2V11" {...p} /><path d="M5 6h6M5 8h4M5 10h5" {...p} /></>,
    shield: <><path d="M8 1.5l5.5 2v4.2c0 3.3-2.4 5.6-5.5 6.8-3.1-1.2-5.5-3.5-5.5-6.8V3.5z" {...p} /><path d="M5.5 8l1.8 1.8L10.8 6.3" {...p} /></>,
    sync: <><path d="M13 6.5A5 5 0 0 0 3.6 5M3 9.5A5 5 0 0 0 12.4 11" {...p} /><path d="M13.2 3v3.5H9.7M2.8 13V9.5h3.5" {...p} /></>,
    folder: <><path d="M1.5 4.5V13h13V5.5H8L6.5 3.5h-5z" {...p} /></>,
    grid: <><rect x="2" y="2" width="5" height="5" rx="1" {...p} /><rect x="9" y="2" width="5" height="5" rx="1" {...p} /><rect x="2" y="9" width="5" height="5" rx="1" {...p} /><rect x="9" y="9" width="5" height="5" rx="1" {...p} /></>,
    contact: <><circle cx="8" cy="6" r="2.6" {...p} /><path d="M3 14c.6-2.6 2.6-4 5-4s4.4 1.4 5 4" {...p} /></>,
  }
  return <g transform={`translate(${x} ${y})`}>{d[g]}</g>
}

const SOURCES: { label: string; g: G }[] = [
  { label: "Factures", g: "doc" },
  { label: "E-mails", g: "mail" },
  { label: "Bons de livraison", g: "box" },
]
const SRC_Y = [64, 126, 188] // centres des pastilles d'entrée

const STEPS: { label: string; g: G }[] = [
  { label: "Réception", g: "inbox" },
  { label: "Extraction des données", g: "scan" },
  { label: "Contrôles de cohérence", g: "shield" },
  { label: "Mise à jour de vos outils", g: "sync" },
]
const STEP_Y = [100, 146, 192, 238]

const TOOLS: { label: string; g: G }[] = [
  { label: "Messagerie", g: "mail" },
  { label: "GED", g: "folder" },
  { label: "ERP", g: "grid" },
  { label: "CRM", g: "contact" },
]
const TOOL_Y = [64, 118, 172, 226]

export function IntegrationArt() {
  const reduce = useReducedMotion()
  const id = useId().replace(/[:«»]/g, "")
  // Entrées : chaque source rejoint l'étape « Réception »
  const inPaths = SRC_Y.map((y) => `M140 ${y}C156 ${y} 158 ${STEP_Y[0]} 186 ${STEP_Y[0]}`)
  // Sorties : l'étape « Mise à jour » alimente chaque outil
  const outPaths = TOOL_Y.map((y) => `M374 ${STEP_Y[3]}C398 ${STEP_Y[3]} 398 ${y} 420 ${y}`)

  return (
    <ArtFrame label="Exemple d'intégration : factures, e-mails et bons de livraison passent par un workflow en production (réception, extraction, contrôles, mise à jour), branché sur la messagerie, la GED, l'ERP et le CRM. Les cas douteux sont transmis à une personne. Le temps par document passe de 9 à 2 minutes dans cet exemple.">
      <defs>
        {inPaths.map((d, i) => <path key={i} id={`${id}-in${i}`} d={d} />)}
        {outPaths.map((d, i) => <path key={i} id={`${id}-out${i}`} d={d} />)}
      </defs>

      <Appear delay={0}>
        <T x={16} y={34} size={11} color={C.ink3}>Vos documents</T>
        <T x={544} y={34} size={11} color={C.ink3} anchor="end">Vos outils</T>
      </Appear>

      {/* Liaisons */}
      <Appear delay={0.5} y={0}>
        {inPaths.map((d, i) => <path key={i} d={d} fill="none" stroke={C.brandMid} strokeWidth={1.5} />)}
        {outPaths.map((d, i) => <path key={i} d={d} fill="none" stroke={C.brandMid} strokeWidth={1.5} />)}
      </Appear>

      {/* Entrées */}
      {SOURCES.map((s, i) => (
        <Card key={s.label} x={16} y={SRC_Y[i] - 22} w={124} h={44} rx={12} delay={0.1 + i * 0.08}>
          <rect x={28} y={SRC_Y[i] - 12} width={24} height={24} rx={7} fill={C.bg2} />
          <Glyph g={s.g} x={32} y={SRC_Y[i] - 8} />
          {s.label.includes(" ") && s.label.length > 12 ? (
            <>
              <T x={60} y={SRC_Y[i] - 2} size={11.5} weight={500}>{s.label.slice(0, s.label.lastIndexOf(" "))}</T>
              <T x={60} y={SRC_Y[i] + 12} size={11.5} weight={500}>{s.label.slice(s.label.lastIndexOf(" ") + 1)}</T>
            </>
          ) : (
            <T x={60} y={SRC_Y[i] + 4} size={11.5} weight={500}>{s.label}</T>
          )}
        </Card>
      ))}

      {/* Le workflow, signé */}
      <Card x={170} y={24} w={220} h={252} delay={0.25}>
        <Seal x={186} y={38} size={22} delay={1.3} />
        <T x={216} y={54} size={13} weight={600} display>Workflow</T>
        <rect x={282} y={40} width={94} height={20} rx={10} fill={C.timeSoft} />
        <circle cx={293} cy={50} r={3.5} fill={C.time} />
        <T x={301} y={54} size={10.5} weight={600} color={C.time}>En production</T>
        <line x1={170} x2={390} y1={72} y2={72} stroke={C.lineSoft} />
        <line x1={200} x2={200} y1={STEP_Y[0]} y2={STEP_Y[3]} stroke={C.brandMid} strokeWidth={1.5} />
        {STEPS.map((s, i) => (
          <Appear key={s.label} delay={0.55 + i * 0.12} x={-4} y={0}>
            <circle cx={200} cy={STEP_Y[i]} r={14} fill={i === 3 ? C.brand : C.brandSoft} />
            <Glyph g={s.g} x={192} y={STEP_Y[i] - 8} color={i === 3 ? "#fff" : C.brand} />
            <T x={224} y={STEP_Y[i] + 4} size={11.5} weight={500}>{s.label}</T>
          </Appear>
        ))}
      </Card>

      {/* Sorties */}
      {TOOLS.map((t, i) => (
        <Card key={t.label} x={420} y={TOOL_Y[i] - 21} w={124} h={42} rx={12} delay={0.35 + i * 0.08}>
          <rect x={432} y={TOOL_Y[i] - 12} width={24} height={24} rx={7} fill={C.bg2} />
          <Glyph g={t.g} x={436} y={TOOL_Y[i] - 8} />
          <T x={466} y={TOOL_Y[i] + 4} size={11.5} weight={500}>{t.label}</T>
        </Card>
      ))}

      {/* Les cas douteux partent vers une personne */}
      <Appear delay={1.1} y={0}>
        <path d={`M186 ${STEP_Y[2]}C160 ${STEP_Y[2]} 158 ${STEP_Y[2] + 40} 158 300C158 330 168 346 196 352`} fill="none" stroke={C.time} strokeWidth={1.5} strokeDasharray="2 5" strokeLinecap="round" />
      </Appear>
      <Card x={170} y={312} w={220} h={112} delay={1.15}>
        <Person cx={204} cy={352} r={15} />
        <T x={228} y={348} size={12.5} weight={600}>Une personne décide</T>
        <T x={228} y={364} size={11} color={C.ink3}>des cas douteux</T>
        <line x1={186} x2={374} y1={384} y2={384} stroke={C.lineSoft} />
        <T x={186} y={406} size={11} color={C.ink3}>Exceptions tracées</T>
        <T x={374} y={406} size={11.5} weight={600} anchor="end">6 %</T>
      </Card>

      {/* Mesure avant / après */}
      <Card x={16} y={244} w={124} h={180} delay={1.3}>
        <T x={30} y={270} size={12} weight={600} display>Temps par</T>
        <T x={30} y={285} size={12} weight={600} display>document</T>
        <T x={30} y={314} size={10.5} color={C.ink3}>Avant</T>
        <T x={126} y={314} size={11.5} weight={600} anchor="end">9 min</T>
        <GrowBar x={30} y={320} w={96} h={7} fill="#0b0d1230" delay={1.5} />
        <T x={30} y={348} size={10.5} color={C.ink3}>Après</T>
        <T x={126} y={348} size={11.5} weight={600} color={C.time} anchor="end">2 min</T>
        <GrowBar x={30} y={354} w={22} h={7} fill={C.time} delay={1.7} />
        <ExampleTag x={30} y={384} />
      </Card>

      {/* Ce qui sécurise la mise en production */}
      <Card x={420} y={272} w={124} h={152} delay={1.4}>
        <T x={434} y={298} size={12} weight={600} display>Sécurisé</T>
        {["Jeux de tests", "Droits d'accès", "Journalisation", "Documentation"].map((l, i) => (
          <g key={l}>
            <Check cx={442} cy={322 + i * 24} r={7} color={C.brand} />
            <T x={456} y={326 + i * 24} size={11} color={C.ink2}>{l}</T>
          </g>
        ))}
      </Card>

      {/* Documents en circulation, en continu : l'automatisation tourne */}
      {!reduce
        ? SRC_Y.map((_, i) => (
            <g key={i}>
              <Token href={`#${id}-in${i}`} begin={1.6 + i * 0.9} />
              <Token href={`#${id}-out${i + (i === 2 ? 1 : 0)}`} begin={2.3 + i * 0.9} />
            </g>
          ))
        : null}
    </ArtFrame>
  )
}

/** Petit document bleu qui suit une liaison, en boucle. */
function Token({ href, begin }: { href: string; begin: number }) {
  return (
    <g opacity={0}>
      <rect x={-5} y={-6.5} width={10} height={13} rx={2} fill="#fff" stroke={C.brand} strokeWidth={1.4} />
      <path d="M-2.5 -2h5M-2.5 1h5M-2.5 4h3" stroke={C.brandMid} strokeWidth={1.1} strokeLinecap="round" />
      <animateMotion dur="1.1s" begin={`${begin}s;${href.replace("#", "")}-a.end+2.6s`} id={`${href.replace("#", "")}-a`} fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1">
        <mpath href={href} />
      </animateMotion>
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="1.1s" begin={`${begin}s;${href.replace("#", "")}-a.end+2.6s`} fill="freeze" />
    </g>
  )
}
