"use client"

import { motion, type HTMLMotionProps } from "framer-motion"
import { useReducedMotion } from "@/components/motion/use-reduced-motion"
import { cn } from "@/lib/utils"

/** Fond des en-têtes de page : grille masquée et halos colorés qui dérivent. */
export function HeroBackdrop({ blobs = [1] }: { blobs?: (1 | 2 | 3)[] }) {
  const reduce = useReducedMotion()
  const delays: Record<number, number> = { 1: 0, 2: -6, 3: -12 }
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="hero-grid" />
      {blobs.map((b) => (
        <motion.div
          key={b}
          className={cn("blob", `blob-${b}`)}
          animate={reduce ? undefined : { x: [0, 40], y: [0, 30], scale: [1, 1.08] }}
          transition={{
            duration: 18,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
            delay: delays[b],
          }}
        />
      ))}
    </div>
  )
}

/** Flottement vertical doux, en boucle. */
export function Float({ delay = 0, className, children, ...props }: HTMLMotionProps<"div"> & { delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      animate={reduce ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/** Dégradé tournant derrière les blocs d’appel à l’action. */
export function SpinGlow() {
  const reduce = useReducedMotion()
  return (
    <motion.div
      aria-hidden="true"
      className="cta-glow"
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration: 24, ease: "linear", repeat: Infinity }}
    />
  )
}

/** Point qui émet des ondes (localisation). */
export function Ping() {
  const reduce = useReducedMotion()
  return (
    <span aria-hidden="true" className="relative size-2.5 flex-none">
      <i className="absolute inset-0 rounded-full bg-time" />
      {!reduce &&
        [0, 1.3].map((delay) => (
          <motion.i
            key={delay}
            className="absolute inset-0 rounded-full bg-time"
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 3.4 }}
            transition={{ duration: 2.6, ease: [0, 0.4, 0.4, 1], repeat: Infinity, delay }}
          />
        ))}
    </span>
  )
}
