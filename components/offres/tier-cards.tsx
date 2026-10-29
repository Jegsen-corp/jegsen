import { Reveal } from "@/components/motion/reveal"
import { Checklist } from "@/components/site/blocks"
import { formatEuros } from "@/lib/content/offers-data"
import type { OfferTier } from "@/lib/content/types"
import { cn } from "@/lib/utils"
import { Strip, type Rhythm } from "./year-track"

/*
 * Paliers de l'abonnement : prix, promesse, contenu, et le rythme de l'année que chaque palier
 * apporte (supervision en continu, bilan trimestriel, rapport mensuel, revue technique), dessiné
 * avec les mêmes pistes que le déroulé pour comparer d'un coup d'œil.
 */

const QUARTERS = [3, 6, 9, 12]
const ALL = Array.from({ length: 12 }, (_, i) => i + 1)

/** Rythmes ajoutés palier après palier (Essentiel, Standard, Premium). */
const RHYTHMS: { from: number; label: string; rhythm: Rhythm }[] = [
  { from: 0, label: "Supervision", rhythm: { kind: "continuous" } },
  { from: 1, label: "Bilan des gains", rhythm: { kind: "marks", months: QUARTERS, shape: "bar", tone: "time" } },
  { from: 2, label: "Rapport mensuel", rhythm: { kind: "marks", months: ALL, shape: "dot", tone: "time" } },
  { from: 2, label: "Revue technique", rhythm: { kind: "marks", months: QUARTERS, shape: "diamond", tone: "brand" } },
]

export function TierCards({ tiers, unit }: { tiers: OfferTier[]; unit: string }) {
  return (
    <div className="grid gap-[18px] lg:grid-cols-3">
      {tiers.map((t, i) => (
        <Reveal key={t.name} as="article" delay={i * 0.08} className="flex min-h-full flex-col rounded-[24px] border border-line bg-surface p-[clamp(22px,2.6vw,30px)] shadow-[var(--shadow)]">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h3 className="m-0 text-[1.35rem]">{t.name}</h3>
            <span aria-hidden="true" className="flex gap-1">
              {[0, 1, 2].map((k) => (
                <span key={k} className={cn("block h-2 w-5 rounded-full", k <= i ? "bg-brand" : "bg-line")} />
              ))}
            </span>
          </div>
          <p className="m-0 flex flex-wrap items-baseline gap-x-2">
            <strong className="font-display text-[clamp(2.1rem,3.4vw,2.7rem)] leading-none font-semibold tracking-[-0.045em]">{formatEuros(t.amount)}&nbsp;HT</strong>
          </p>
          <p className="mt-1.5 mb-5 text-sm text-ink-3">par mois et par {unit}</p>
          <p className="mb-5 font-medium text-ink">{t.tagline}</p>
          <Checklist items={t.items} />
          <div className="mt-auto pt-7">
            {/* Résumé visuel des éléments listés au-dessus : masqué aux lecteurs d'écran */}
            <div aria-hidden="true" className="rounded-2xl bg-bg-2/70 p-4">
              <p className="mt-0 mb-3 text-[12.5px] font-medium text-ink-3">Sur douze mois</p>
              <div className="grid gap-2">
                {RHYTHMS.map((r) => {
                  const on = i >= r.from
                  return (
                    <div key={r.label} className={cn("grid grid-cols-[104px_minmax(0,1fr)] items-center gap-3", !on && "opacity-35")}>
                      <span className={cn("text-[12px]", on ? "text-ink-2" : "text-ink-3 line-through decoration-ink-3/50")}>{r.label}</span>
                      {on ? <Strip rhythm={r.rhythm} index={i} compact /> : <span aria-hidden="true" className="block h-px bg-line-strong" />}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
