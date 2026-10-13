"use client"

import { useAnimationFrame, useMotionValue, motion } from "framer-motion"
import { useReducedMotion } from "@/components/motion/use-reduced-motion"
import { useRef } from "react"

/** Bandeau défilant en continu, en pause au survol. */
export function Marquee({ items, label }: { items: string[]; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const paused = useRef(false)
  const reduce = useReducedMotion()

  // 48 s pour parcourir une demi-piste, comme l’original.
  useAnimationFrame((_, delta) => {
    const track = trackRef.current
    if (!track || paused.current || reduce) return
    const half = track.scrollWidth / 2
    if (!half) return
    let next = x.get() - (half / 48000) * delta
    if (next <= -half) next += half
    x.set(next)
  })

  return (
    <div
      aria-label={label}
      className="marquee-mask overflow-hidden border-y border-line py-[22px]"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-12">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="inline-flex items-center gap-3 font-display text-xl font-medium tracking-[-0.02em] whitespace-nowrap text-ink-2 before:size-[7px] before:rotate-45 before:rounded-[2px] before:bg-linear-135 before:from-brand before:to-brand-2 before:content-['']"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
