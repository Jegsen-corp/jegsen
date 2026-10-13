"use client"

import { motion, type HTMLMotionProps } from "framer-motion"

export const EASE = [0.2, 0.7, 0.1, 1] as const

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number
  /** "up" : glisse vers le haut ; "scale" : léger zoom. */
  variant?: "up" | "scale"
  as?: "div" | "section" | "article" | "ul" | "dl" | "p" | "span" | "h1" | "header"
}

/** Apparition au défilement, une seule fois, comme `data-reveal` sur le site d’origine. */
export function Reveal({
  delay = 0,
  variant = "up",
  as = "div",
  children,
  ...props
}: RevealProps) {
  const Comp = motion[as] as typeof motion.div
  const hidden = variant === "scale" ? { opacity: 0, scale: 0.96 } : { opacity: 0, y: 26 }
  return (
    <Comp
      initial={hidden}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...props}
    >
      {children}
    </Comp>
  )
}
