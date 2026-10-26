"use client"

import { motion, type Variants } from "framer-motion"
import { EASE } from "@/components/motion/reveal"
import { useReducedMotion } from "@/components/motion/use-reduced-motion"
import type { ProductMotif } from "@/lib/content/product"

/*
 * Motifs des quatre bénéfices de brAIn. Même vocabulaire que l'illustration principale :
 * traits fins, bleu de la marque, ambre pour la contradiction. Dessinés une fois à l'apparition.
 */

const draw = (delay = 0, duration = 0.9): Variants => ({
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { delay, duration, ease: EASE } },
})
const pop = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { delay, duration: 0.5, ease: EASE } },
})
const rise = (delay = 0): Variants => ({
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { delay, duration: 0.7, ease: EASE } },
})
const box = { transformBox: "fill-box" as const, transformOrigin: "50% 50%" }
const base = { transformBox: "fill-box" as const, transformOrigin: "50% 100%" }

const S = "var(--line-strong)"
const B = "var(--brand)"
const W = "var(--warn)"
const I = "var(--ink-3)"

/** Des sources qui convergent vers des chiffres, avec un renvoi de citation. */
function Facts() {
  const docs = [10, 32, 54]
  return (
    <>
      {docs.map((y, i) => (
        <g key={y}>
          <motion.rect x="6" y={y - 8} width="30" height="16" rx="4" fill="none" stroke={I} strokeWidth="1.3" variants={pop(i * 0.08)} style={box} />
          <motion.path d={`M36 ${y} C 56 ${y}, 52 34, 72 34`} fill="none" stroke={S} strokeWidth="1.3" variants={draw(0.25 + i * 0.08, 0.7)} />
        </g>
      ))}
      <motion.circle cx="74" cy="34" r="3.5" fill={B} variants={pop(0.6)} style={box} />
      {[
        { x: 86, h: 22 },
        { x: 98, h: 34 },
        { x: 110, h: 16 },
      ].map((b, i) => (
        <motion.rect key={b.x} x={b.x} y={56 - b.h} width="8" height={b.h} rx="2" fill={i === 1 ? B : "#ffffff26"} variants={rise(0.7 + i * 0.08)} style={base} />
      ))}
      <motion.g variants={pop(1.05)} style={box}>
        <circle cx="114" cy="12" r="7" fill="none" stroke={B} strokeWidth="1.3" />
        <text x="114" y="15.5" textAnchor="middle" fontSize="9" fontWeight="600" fill={B}>
          1
        </text>
      </motion.g>
    </>
  )
}

/** Une balance : le pour et le contre pesés avant de trancher. Les plateaux restent d'aplomb. */
function Debate() {
  const tilt = 7
  const arm = 38
  const dy = Math.sin((tilt * Math.PI) / 180) * arm
  const hang = (dir: 1 | -1, color: string, delay: number) => (
    <motion.g
      variants={{
        hidden: { y: 0, opacity: 0 },
        show: { y: -dir * dy, opacity: 1, transition: { delay, duration: 1.2, ease: EASE } },
      }}
    >
      <path d={`M${60 + dir * arm} 18 V 30`} stroke={color} strokeWidth="1.2" />
      <path d={`M${60 + dir * arm - 9} 30 H ${60 + dir * arm + 9} Q ${60 + dir * arm} 40 ${60 + dir * arm - 9} 30`} fill="none" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx={60 + dir * arm} cy="31.5" r="2.6" fill={color} />
    </motion.g>
  )
  return (
    <>
      <motion.path d="M60 18 V 62 M46 62 H 74" fill="none" stroke={I} strokeWidth="1.4" strokeLinecap="round" variants={draw(0, 0.6)} />
      <motion.path
        d={`M${60 - arm} 18 H ${60 + arm}`}
        stroke={S}
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={{
          hidden: { rotate: 0, opacity: 0 },
          show: { rotate: -tilt, opacity: 1, transition: { delay: 0.4, duration: 1.2, ease: EASE } },
        }}
        style={{ transformOrigin: "60px 18px" }}
      />
      {hang(-1, B, 0.4)}
      {hang(1, W, 0.4)}
      <motion.circle cx="60" cy="18" r="3" fill="var(--ink)" variants={pop(0.2)} style={box} />
    </>
  )
}

/** Le sceau de la décision : brAIn recommande, le CODIR valide. */
function Seal() {
  return (
    <>
      <motion.circle cx="60" cy="36" r="27" fill="none" stroke={S} strokeWidth="1.2" strokeDasharray="2 5" variants={pop(0)} style={box} />
      <motion.circle cx="60" cy="36" r="19" fill="#7d96ff1f" stroke={B} strokeWidth="1.5" variants={pop(0.2)} style={box} />
      <motion.path d="M51 36 l6 6 l12 -13" fill="none" stroke={B} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" variants={draw(0.55, 0.6)} />
      <motion.path d="M96 18 h14 M96 26 h10" stroke={I} strokeWidth="1.3" strokeLinecap="round" variants={draw(0.8, 0.5)} />
      <motion.path d="M10 46 h14 M14 54 h10" stroke={I} strokeWidth="1.3" strokeLinecap="round" variants={draw(0.9, 0.5)} />
    </>
  )
}

/** L'arc de Jegsen : la décision revient, 90 jours plus tard, avec l'attendu et le réalisé. */
function Loop() {
  const arc = "M60 9 A27 27 0 1 1 33.1 38.4"
  return (
    <>
      <circle cx="60" cy="36" r="27" fill="none" stroke="#ffffff12" strokeWidth="1.4" />
      <motion.path d={arc} fill="none" stroke={B} strokeWidth="2" strokeLinecap="round" variants={draw(0.1, 1.2)} />
      <motion.circle cx="33.1" cy="38.4" r="3.5" fill={B} variants={pop(1.2)} style={box} />
      <motion.text x="60" y="40" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink)" variants={pop(0.9)} style={box}>
        90 j
      </motion.text>
      <motion.rect x="98" y="30" width="7" height="26" rx="2" fill="#ffffff26" variants={rise(1)} style={base} />
      <motion.rect x="108" y="22" width="7" height="34" rx="2" fill={B} variants={rise(1.1)} style={base} />
    </>
  )
}

const motifs: Record<ProductMotif, () => React.JSX.Element> = { facts: Facts, debate: Debate, seal: Seal, loop: Loop }

export function BrainMotif({ motif }: { motif: ProductMotif }) {
  const reduce = useReducedMotion()
  const Motif = motifs[motif]
  return (
    <div
      className="relative grid h-[132px] place-items-center overflow-hidden rounded-[16px] border border-line"
      style={{
        backgroundImage:
          "radial-gradient(120% 90% at 50% 0%, #7d96ff1c, #0000 62%), radial-gradient(#ffffff12 1px, transparent 1.2px)",
        backgroundSize: "auto, 14px 14px",
        backgroundPosition: "0 0, 7px 7px",
      }}
    >
      <motion.svg
        viewBox="0 0 120 72"
        className="h-[92px] w-[154px] overflow-visible"
        aria-hidden
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
      >
        <Motif />
      </motion.svg>
    </div>
  )
}
