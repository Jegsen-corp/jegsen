import { Reveal } from "@/components/motion/reveal"
import { Icon, icons } from "@/components/site/icon"

/*
 * Fiche de l'offre sous l'en-tête : durée, prix, livrable, sur une ligne séparée par des filets.
 * Téléphone : les trois lignes s'empilent.
 */
const ICON: Record<string, (typeof icons)[keyof typeof icons]> = {
  Durée: icons.clock,
  Prix: icons.euro,
  Livrable: icons.check,
}

export function OfferFacts({ facts }: { facts: { label: string; value: string }[] }) {
  return (
    <Reveal delay={0.25} as="dl" className="mt-[clamp(44px,6vw,72px)] mb-0 grid rounded-[22px] border border-line bg-surface/85 shadow-[var(--shadow)] backdrop-blur-sm sm:grid-cols-3">
      {facts.map((f) => (
        <div key={f.label} className="flex items-start gap-3.5 border-b border-line px-[clamp(18px,2.4vw,28px)] py-5 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0">
          <span aria-hidden="true" className="mt-0.5 grid size-9 flex-none place-items-center rounded-xl bg-brand-soft text-brand">
            <Icon shapes={ICON[f.label] ?? icons.check} className="size-[18px]" />
          </span>
          <div className="min-w-0">
            <dt className="text-[13px] text-ink-3">{f.label}</dt>
            <dd className="m-0 font-display text-[clamp(1.05rem,1.5vw,1.25rem)] leading-snug font-semibold tracking-[-0.02em]">{f.value.replace(/ (€|HT)\b/g, "\u00a0$1").replace(/ €/g, "\u00a0€")}</dd>
          </div>
        </div>
      ))}
    </Reveal>
  )
}
