"use client"

import { animate, useInView } from "framer-motion"
import { useReducedMotion } from "@/components/motion/use-reduced-motion"
import { useEffect, useRef } from "react"

/** Compteur qui monte jusqu’à `to` quand il entre dans l’écran. */
export function CountUp({ to, duration = 1.4 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !inView) return
    if (reduce) {
      el.textContent = String(to)
      return
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: (v) => {
        el.textContent = String(Math.round(v))
      },
    })
    return () => controls.stop()
  }, [inView, reduce, to, duration])

  return <span ref={ref}>{to}</span>
}
