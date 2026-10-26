"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/components/motion/use-reduced-motion"
import { Reveal } from "@/components/motion/reveal"

const nodes = [
  { x: 0, y: 40, title: "Documents & e-mails", sub: "PDF, scans, pièces jointes" },
  { x: 290, y: 40, title: "Extraction", sub: "Données structurées" },
  { x: 580, y: 40, title: "Contrôle", sub: "Cohérence, règles métier" },
  { x: 870, y: 40, title: "Logiciel métier", sub: "ERP, TMS, GMAO, CRM…" },
]
const links = ["M220 78 L290 78", "M510 78 L580 78", "M800 78 L870 78"]

const mobileSteps = [
  ...nodes.map((n) => ({ title: n.title, sub: n.sub })),
  { title: "Exceptions", sub: "Transmises à une personne pour validation" },
]

function Node({ x, y, title, sub, delay, warn }: { x: number; y: number; title: string; sub: string; delay: number; warn?: boolean }) {
  const reduce = useReducedMotion()
  return (
    <g className="pipe-node" transform={`translate(${x} ${y})`}>
      <rect width="220" height="76" rx="16" style={warn ? { stroke: "var(--warn)" } : undefined} />
      <motion.circle
        cx="22"
        cy="24"
        r="4"
        style={{ fill: warn ? "var(--warn)" : "var(--brand)", transformBox: "fill-box", transformOrigin: "50% 50%" }}
        animate={reduce ? undefined : { opacity: [1, 0.35, 1], scale: [1, 0.7, 1] }}
        transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, delay }}
      />
      <text x="36" y="29">
        {title}
      </text>
      <text className="sub" x="22" y="54">
        {sub}
      </text>
    </g>
  )
}

/** Un trait lumineux qui parcourt un segment en boucle. */
function FlowPath({ d, delay, warn }: { d: string; delay: number; warn?: boolean }) {
  const reduce = useReducedMotion()
  const gap = warn ? 180 : 190
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={warn ? "var(--warn)" : "url(#pipeGrad)"}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeDasharray={`${warn ? 6 : 10} ${gap}`}
      initial={{ strokeDashoffset: 0 }}
      animate={reduce ? undefined : { strokeDashoffset: -200 }}
      transition={{ duration: warn ? 4.4 : 3.2, ease: "linear", repeat: Infinity, delay }}
    />
  )
}

/** Documents → extraction → contrôle → logiciel métier, exceptions vers un humain. */
export function Pipeline() {
  return (
    <Reveal className="relative mt-14">
      <svg
        viewBox="-10 0 1110 270"
        role="img"
        aria-label="Flux : documents et e-mails, extraction des données, contrôle de cohérence, mise à jour du logiciel métier. Les exceptions sont transmises à une personne pour validation."
        className="hidden h-auto w-full overflow-visible md:block"
      >
        <defs>
          <linearGradient id="pipeGrad" x1="0" x2="1">
            <stop offset="0" stopColor="#7d96ff" />
            <stop offset="1" stopColor="#38d6b8" />
          </linearGradient>
        </defs>
        {links.map((d, i) => (
          <g key={d}>
            <path className="pipe-path" d={d} />
            <FlowPath d={d} delay={i * 0.8} />
          </g>
        ))}
        <path className="pipe-path" d="M690 116 L 690 172" />
        <FlowPath d="M690 116 L 690 172" delay={1} warn />
        {nodes.map((n, i) => (
          <Node key={n.title} {...n} delay={i * 0.4} />
        ))}
        <Node x={580} y={172} title="Exception" sub="Validation humaine" delay={0} warn />
      </svg>
      <ol className="m-0 grid gap-2.5 p-0 md:hidden">
        {mobileSteps.map((s) => (
          <li key={s.title} className="list-none rounded-[14px] border border-line bg-surface px-[18px] py-4">
            <b className="block">{s.title}</b>
            <span className="text-sm text-ink-3">{s.sub}</span>
          </li>
        ))}
      </ol>
    </Reveal>
  )
}
