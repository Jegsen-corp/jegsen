"use client"

import type { ComponentProps, PointerEvent } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { EASE } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

type SiteCardProps = ComponentProps<typeof Card> & {
  /** Délai d’apparition au défilement (s). */
  delay?: number
  /** Désactive le soulèvement au survol. */
  still?: boolean
  as?: "div" | "article"
}

const MotionCard = motion.create(Card)

/** Carte shadcn aux couleurs de la charte : halo sous le pointeur, soulèvement, apparition. */
export function SiteCard({ className, delay = 0, still, as, children, ...props }: SiteCardProps) {
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`)
  }
  return (
    <MotionCard
      role={as === "article" ? "article" : undefined}
      onPointerMove={onPointerMove}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={cn(
        "group/card spotlight relative isolate block gap-0 rounded-[22px] border border-line bg-surface p-[clamp(24px,3vw,34px)] py-[clamp(24px,3vw,34px)] text-base text-ink ring-0",
        "transition-[translate,box-shadow,border-color] duration-500 ease-brand",
        !still && "hover:-translate-y-1 hover:border-line-strong hover:shadow-lift",
        "[&_h3]:mb-2.5 [&_p]:text-base [&_p]:text-ink-2",
        className
      )}
      {...(props as object)}
    >
      {children}
    </MotionCard>
  )
}

export function CardIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-[22px] grid size-[46px] place-items-center rounded-[14px] bg-brand-soft text-brand">
      {children}
    </div>
  )
}
