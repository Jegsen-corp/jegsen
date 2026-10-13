"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/components/motion/use-reduced-motion"
import { Reveal } from "@/components/motion/reveal"
import { LogoMark } from "@/components/site/logo"
import { Tag } from "@/components/site/offer-card"

function Flow() {
  const reduce = useReducedMotion()
  return (
    <div className="relative my-2.5 h-[34px] w-0.5 overflow-hidden rounded-xs bg-linear-to-b from-line-strong to-brand">
      {!reduce && (
        <motion.span
          className="absolute top-0 left-0 h-3 w-0.5 rounded-xs bg-brand"
          initial={{ y: -12 }}
          animate={{ y: 34 }}
          transition={{ duration: 1.8, ease: "linear", repeat: Infinity }}
        />
      )}
    </div>
  )
}

/** Sources → cerveau d’entreprise → usages. */
export function BrainDiagram() {
  return (
    <Reveal
      variant="scale"
      aria-hidden="true"
      className="grid justify-items-center rounded-[22px] border border-line bg-surface p-[clamp(24px,4vw,40px)] shadow-soft"
    >
      <div className="flex flex-wrap justify-center gap-2">
        {["Documents", "E-mails", "CRM", "ERP", "Procédures"].map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <Flow />
      <div className="inline-flex items-center gap-2.5 rounded-full bg-ink px-[22px] py-3.5 font-display font-semibold tracking-[-0.01em] text-bg shadow-[0_10px_34px_var(--glow)]">
        <LogoMark className="size-[22px] text-bg" />
        Cerveau d’entreprise
      </div>
      <Flow />
      <div className="flex flex-wrap justify-center gap-2">
        {["Réponses sourcées", "Workflows agentiques", "Décisions"].map((t) => (
          <Tag key={t} tone="out">
            {t}
          </Tag>
        ))}
      </div>
    </Reveal>
  )
}
