"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"
import type { Step } from "@/lib/content/types"
import { EASE } from "./reveal"

/** Étapes numérotées, rail qui se remplit au défilement. */
export function Steps({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null)
  // Progression : 0 quand le haut de la liste atteint 60 % de l’écran, 1 quand le bas l’atteint.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end 0.6"] })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={ref} className="relative pl-11">
      <div
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[13px] w-0.5 overflow-hidden rounded-xs bg-line"
      >
        <motion.i
          className="absolute inset-0 origin-top bg-linear-to-b from-brand via-brand-2 to-time will-change-transform"
          style={{ scaleY }}
        />
      </div>
      {steps.map((step, i) => (
        <StepItem key={step.title} step={step} index={i} last={i === steps.length - 1} />
      ))}
    </div>
  )
}

function StepItem({ step, index, last }: { step: Step; index: number; last: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.12, margin: "0px 0px -8% 0px" })
  return (
    <motion.div
      ref={ref}
      className={cn("relative pt-1", last ? "pb-0" : "pb-12")}
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-1 -left-11 grid size-7 place-items-center rounded-full border-[1.5px] text-xs font-bold transition-all duration-400 ease-brand",
          inView
            ? "border-ink bg-ink text-bg shadow-[0_0_0_6px_var(--brand-soft)]"
            : "border-line-strong bg-surface text-ink-3"
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mb-2">{step.title}</h3>
      <p className="m-0 text-ink-2">{step.text}</p>
    </motion.div>
  )
}
