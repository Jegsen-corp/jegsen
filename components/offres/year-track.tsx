"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { EASE, Reveal } from "@/components/motion/reveal"
import { useReducedMotion } from "@/components/motion/use-reduced-motion"
import type { Step } from "@/lib/content/types"
import { cn } from "@/lib/utils"

/*
 * Déroulé de la maintenance : une année d'abonnement. Chaque étape est une ligne, son rythme est
 * dessiné sur douze mois (en continu, au besoin, chaque trimestre, chaque mois) et le palier qui
 * l'inclut est indiqué. Les textes des étapes restent ceux de la fiche de l'offre.
 */

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1)
const QUARTERS = [3, 6, 9, 12]

export type Tier = "all" | "standard" | "premium"

export function TierChip({ tier, className }: { tier: Tier; className?: string }) {
  const label = tier === "all" ? "Tous les paliers" : tier === "standard" ? "Standard et Premium" : "Premium"
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-[3px] text-[12px] font-semibold whitespace-nowrap",
        tier === "all" && "border border-line-strong text-ink-2",
        tier === "standard" && "bg-brand-soft text-brand",
        tier === "premium" && "bg-brand text-white",
        className
      )}
    >
      {label}
    </span>
  )
}

/** Rythme d'une étape sur douze mois. */
type Rhythm =
  | { kind: "start" }
  | { kind: "continuous" }
  | { kind: "onDemand" }
  | { kind: "marks"; months: number[]; shape: "dot" | "diamond" | "bar"; label?: string; tone: "brand" | "time" }

/** Lignes de l'année, dans l'ordre des étapes de la fiche (Mise sous supervision, Surveillance, …). */
const LANES: { tier: Tier; rhythms: Rhythm[]; note: string }[] = [
  { tier: "all", rhythms: [{ kind: "start" }], note: "Au démarrage" },
  { tier: "all", rhythms: [{ kind: "continuous" }], note: "En continu" },
  { tier: "all", rhythms: [{ kind: "onDemand" }], note: "Au besoin" },
  {
    tier: "standard",
    rhythms: [
      { kind: "marks", months: QUARTERS, shape: "bar", label: "Bilan", tone: "time" },
      { kind: "marks", months: MONTHS, shape: "dot", label: "Rapport", tone: "time" },
    ],
    note: "Bilan chaque trimestre (Standard et Premium), rapport chaque mois (Premium)",
  },
  { tier: "premium", rhythms: [{ kind: "marks", months: QUARTERS, shape: "diamond", tone: "brand" }], note: "Chaque trimestre" },
]

export type { Rhythm }

export function YearTrack({ steps }: { steps: Step[] }) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-line bg-surface">
      {/* En-tête : les douze mois */}
      <div className="hidden grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-8 border-b border-line bg-bg-2/60 px-7 py-3.5 lg:grid">
        <span className="text-[13px] font-medium text-ink-3">Étape et palier</span>
        <MonthScale />
      </div>
      <ol className="m-0 list-none p-0">
        {steps.map((s, i) => {
          const lane = LANES[i] ?? LANES[LANES.length - 1]
          return (
            <li key={s.title} className="border-b border-line last:border-b-0">
              <Reveal delay={i * 0.05} className="grid gap-x-8 gap-y-5 px-[clamp(20px,3vw,28px)] py-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center">
                <div className="grid grid-cols-[34px_minmax(0,1fr)] gap-x-4">
                  <span aria-hidden="true" className="grid size-[34px] place-items-center rounded-full bg-ink font-display text-[12px] font-bold text-bg">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <h3 className="m-0 text-[clamp(1.1rem,1.5vw,1.25rem)]">{s.title}</h3>
                      <TierChip tier={lane.tier} />
                    </div>
                    <p className="m-0 text-[15px] leading-relaxed text-ink-2">{s.text}</p>
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-[13px] font-medium text-ink-3 lg:hidden">{lane.note}, sur douze mois</p>
                  <div className="grid gap-2.5">
                    {lane.rhythms.map((r, k) => (
                      <Strip key={k} rhythm={r} index={i} />
                    ))}
                  </div>
                  <p className="mt-2 mb-0 hidden text-[13px] text-ink-3 lg:block">{lane.note}</p>
                </div>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function MonthScale() {
  return (
    <div className="grid grid-cols-[64px_repeat(12,minmax(0,1fr))] items-end text-[12px] text-ink-3 tabular-nums">
      <span>Mois</span>
      {MONTHS.map((m) => (
        <span key={m} className="text-center">
          {m}
        </span>
      ))}
    </div>
  )
}

/** Une piste de douze mois et son rythme. */
export function Strip({ rhythm, index = 0, compact = false }: { rhythm: Rhythm; index?: number; compact?: boolean }) {
  const reduce = useReducedMotion()
  const label = rhythm.kind === "marks" ? rhythm.label : undefined
  const grow = (child: ReactNode, origin = "left") => (
    <motion.div
      className="absolute inset-0"
      style={{ transformOrigin: origin }}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.1, delay: 0.15 + index * 0.05, ease: EASE }}
    >
      {child}
    </motion.div>
  )
  return (
    <div className={cn("grid items-center", compact ? "grid-cols-[repeat(12,minmax(0,1fr))]" : "grid-cols-[64px_repeat(12,minmax(0,1fr))]")}>
      {!compact ? <span className="text-[12px] font-medium text-ink-3">{label ?? ""}</span> : null}
      <div className="relative col-span-12 h-6" aria-hidden="true">
        {/* repères des mois */}
        <div className="absolute inset-x-0 top-1/2 grid -translate-y-1/2 grid-cols-12">
          {MONTHS.map((m) => (
            <span key={m} className="mx-auto block size-1 rounded-full bg-line-strong" />
          ))}
        </div>
        {rhythm.kind === "continuous"
          ? grow(<span className="absolute inset-x-0 top-1/2 block h-2 -translate-y-1/2 rounded-full bg-brand" />)
          : null}
        {rhythm.kind === "onDemand"
          ? grow(<span className="absolute inset-x-0 top-1/2 block h-2.5 -translate-y-1/2 rounded-full border-[1.5px] border-dashed border-brand bg-brand-soft" />)
          : null}
        {rhythm.kind === "start" ? (
          <span className="absolute top-1/2 left-0 flex -translate-y-1/2 items-center gap-2">
            <span className="block size-3.5 rounded-full bg-brand ring-4 ring-brand-soft" />
            <span className="rounded-full bg-surface pr-2 text-[12px] font-medium whitespace-nowrap text-ink-2">Mise en production</span>
          </span>
        ) : null}
        {rhythm.kind === "marks" ? (
          <div className="absolute inset-0 grid grid-cols-12 items-center">
            {MONTHS.map((m) => (
              <span key={m} className="flex justify-center">
                {rhythm.months.includes(m) ? <Mark shape={rhythm.shape} tone={rhythm.tone} small={compact} delay={0.2 + index * 0.05 + m * 0.04} /> : null}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

function Mark({ shape, tone, delay, small }: { shape: "dot" | "diamond" | "bar"; tone: "brand" | "time"; delay: number; small?: boolean }) {
  const reduce = useReducedMotion()
  const color = tone === "brand" ? "bg-brand" : "bg-time"
  return (
    <motion.span
      className={cn(
        "block",
        color,
        shape === "dot" && (small ? "size-2 rounded-full" : "size-2.5 rounded-full"),
        shape === "diamond" && (small ? "size-2.5 rotate-45 rounded-[2px]" : "size-3 rotate-45 rounded-[2px]"),
        shape === "bar" && (small ? "h-4 w-1.5 rounded-full" : "h-5 w-2 rounded-full")
      )}
      initial={reduce ? false : { scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.35, delay, ease: [0.34, 1.56, 0.64, 1] }}
    />
  )
}
