"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { EASE } from "@/components/motion/reveal"
import { useReducedMotion } from "@/components/motion/use-reduced-motion"
import type { Step } from "@/lib/content/types"
import { cn } from "@/lib/utils"

/*
 * Déroulé d'une offre à durée fixe, dessiné comme une cote de plan : la durée totale au-dessus,
 * les étapes en séquence sur un même trait. Le trait se remplit une fois, à l'arrivée à l'écran.
 * Téléphone : les étapes s'empilent le long d'un rail vertical.
 */
export function ProcessTrack({ steps, duration }: { steps: Step[]; duration: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { once: true, amount: 0.35 })
  const reduce = useReducedMotion()
  const on = seen || reduce
  const n = steps.length
  const STEP_S = 0.42 // durée de remplissage d'un segment

  return (
    <div ref={ref}>
      {/* Cote : la durée totale, d'un bout à l'autre du déroulé */}
      <div className="mb-8 flex items-center gap-3 text-ink-3" aria-label={`Durée totale : ${duration}`}>
        <span aria-hidden="true" className="h-3.5 w-px bg-ink-3/60" />
        <span aria-hidden="true" className="h-px flex-1 bg-ink-3/40" />
        <span className="rounded-full border border-line-strong bg-surface px-3.5 py-1.5 text-[14px] font-semibold whitespace-nowrap text-ink">{duration}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-ink-3/40" />
        <span aria-hidden="true" className="h-3.5 w-px bg-ink-3/60" />
      </div>

      <ol className={cn("m-0 grid list-none p-0 md:gap-x-6", n === 4 ? "md:grid-cols-4" : n === 3 ? "md:grid-cols-3" : "md:grid-cols-5")}>
        {steps.map((s, i) => {
          const last = i === n - 1
          const at = i * STEP_S
          return (
            <li key={s.title} className={cn("relative grid grid-cols-[34px_minmax(0,1fr)] gap-x-4 md:block", last ? "pb-0" : "pb-10 md:pb-0")}>
              {/* Rail vertical (téléphone) */}
              {!last ? <span aria-hidden="true" className="absolute top-10 bottom-1 left-[16px] w-0.5 rounded-full bg-line md:hidden" /> : null}
              <div className="md:flex md:items-center md:gap-3">
                <motion.span
                  aria-hidden="true"
                  className="relative z-10 grid size-[34px] flex-none place-items-center rounded-full border-[1.5px] font-display text-[12px] font-bold"
                  initial={false}
                  animate={on ? { backgroundColor: last ? "var(--time)" : "var(--ink)", borderColor: last ? "var(--time)" : "var(--ink)", color: "var(--bg)" } : { backgroundColor: "var(--surface)", borderColor: "var(--line-strong)", color: "var(--ink-3)" }}
                  transition={{ duration: 0.3, delay: reduce ? 0 : at }}
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.span>
                {/* Segment horizontal vers l'étape suivante (bureau) */}
                <span aria-hidden="true" className="relative hidden h-[3px] flex-1 overflow-hidden rounded-full bg-line md:block">
                  <motion.i
                    className={cn("absolute inset-0 origin-left rounded-full", last ? "bg-linear-to-r from-time to-time/0" : "bg-linear-to-r from-ink to-brand")}
                    initial={false}
                    animate={{ scaleX: on ? 1 : 0 }}
                    transition={{ duration: reduce ? 0 : STEP_S, delay: reduce ? 0 : at + 0.15, ease: last ? EASE : "linear" }}
                  />
                </span>
              </div>
              <div className="pt-1 md:pt-0 md:pr-2">
                <h3 className="mt-0 mb-2 text-[clamp(1.15rem,1.6vw,1.3rem)] md:mt-6">{s.title}</h3>
                <p className="m-0 text-[15px] leading-relaxed text-ink-2">{s.text}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
