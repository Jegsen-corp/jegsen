import Link from "next/link"
import { Icon, icons } from "@/components/site/icon"
import { offerHref, type OfferSummary } from "@/lib/content/offers"
import { OffersJourneyPath } from "./offers-journey-path"

/**
 * Offres de l'accueil.
 * - Le parcours projet : diagnostic, intégration, maintenance, reliés par un tracé.
 *   Chaque liaison dit à quelle condition on passe à l'étape suivante.
 * - La formation, à part : elle ne dépend d'aucune intégration et se commande seule, à tout moment.
 */

type Pitch = { name: string; promise: string; line: string; badge?: string }

/** Textes du parcours projet, dans l'ordre. */
const PITCH: Record<string, Pitch> = {
  "diagnostic-rentabilite-ia": { name: "Diagnostic", promise: "Savoir où l'IA rapporte.", line: "Deux à trois cas d'usage chiffrés, avec ROI, risques et feuille de route.", badge: "Déduit du sprint" },
  "sprint-integration-ia": { name: "Intégration", promise: "Automatiser un premier processus.", line: "Mis en production, branché sur vos outils, gains mesurés." },
  "maintenance-suivi-ia": { name: "Maintenance", promise: "Garder les gains dans la durée.", line: "Supervision, corrections et suivi des gains, mois après mois." },
}

/** Condition de passage d'une étape à la suivante, posée sur le tracé. */
const STEPS = ["Si le ROI se confirme", "Une fois en production"]

const TRAINING = "programme-formation-ia"
/** Points tirés de la fiche de l'offre (lib/content/offers-data.ts). */
const TRAINING_POINTS = ["Aucune connaissance technique requise", "Ateliers par métier, sur vos propres tâches", "Charte d'utilisation de l'IA incluse"]

/** Prix découpé pour l'affichage : montant et unité (jour, mois). */
function priceParts(o: OfferSummary) {
  const [amount, unit] = o.price.split(" / ")
  return { amount, unit, from: o.compactPrice.startsWith("dès") }
}

function OfferTile({ o, k, total }: { o: OfferSummary; k: number; total: number }) {
  const delay = `${-k * 1.6}s`
  const p = PITCH[o.slug]
  const { amount, unit, from } = priceParts(o)
  return (
    <div className="group relative isolate h-full">
    <Link
      href={offerHref(o.slug)}
      style={{ animationDelay: delay }}
      className="shine-border relative flex h-full flex-col rounded-[24px] p-[clamp(22px,2.4vw,30px)]"
    >
      <div className="mb-5 flex min-h-7 items-center justify-between gap-3">
        <span className="font-display text-[13px] font-semibold tracking-[0.08em] text-ink-3 transition-colors group-hover:text-brand">{String(k + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        {p.badge ? <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[12px] font-semibold text-brand">{p.badge}</span> : null}
      </div>
      <h3 className="mb-1 font-display text-[clamp(1.7rem,2.6vw,2.2rem)] leading-none font-semibold tracking-[-0.045em]">{p.name}</h3>
      <p className="mb-3 text-[16px] font-medium text-ink">{p.promise}</p>
      <p className="mb-6 text-[14.5px] leading-relaxed text-ink-3">{p.line}</p>
      <div className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-4">
        <div>
          <p className="m-0 text-[12.5px] text-ink-3">{o.duration}{from ? " · à partir de" : " · forfait"}</p>
          <p className="m-0 font-display font-semibold tracking-[-0.035em] whitespace-nowrap">
            <span className="text-[1.5rem]">{amount}</span>
            {unit && <span className="ml-1 text-[14px] font-medium tracking-normal text-ink-3">/ {unit}</span>}
          </p>
        </div>
        <span className="grid size-10 flex-none place-items-center rounded-full border border-line-strong transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-surface" aria-hidden="true">
          <svg viewBox="0 0 16 16" className="size-4"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>
      <span className="sr-only">En savoir plus : {o.title}</span>
    </Link>
    </div>
  )
}

/**
 * Formation : bandeau en retrait sous le parcours (fond grisé, sans numéro ni liaison), pour que le parcours reste au premier plan.
 * L'arc du logo, en filigrane, rappelle la marque sans rattacher le bloc au tracé.
 */
function TrainingBand({ o }: { o: OfferSummary }) {
  const { amount, unit } = priceParts(o)
  return (
    <Link
      href={offerHref(o.slug)}
      className="group relative isolate mt-16 grid overflow-hidden rounded-[28px] border border-line bg-bg-2/80 p-[clamp(26px,3.4vw,44px)] text-ink outline-offset-4 transition-colors duration-500 hover:border-line-strong lg:mt-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-x-[clamp(40px,6vw,88px)]"
    >
      <svg aria-hidden="true" viewBox="0 0 200 200" fill="none" className="pointer-events-none absolute top-1/2 right-0 -z-10 hidden lg:block size-[clamp(300px,30vw,390px)] translate-x-[28%] -translate-y-1/2 text-ink/[0.045] transition-transform duration-[1.4s] ease-brand group-hover:rotate-[20deg]">
        <path d="M100 22a78 78 0 1 1-78 78" stroke="currentColor" strokeWidth="14" strokeLinecap="round" />
      </svg>
      <div>
        <p className="m-0 mb-6 inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-3 py-1 text-[12.5px] font-medium text-ink-2">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-ink-3" />
          À tout moment, avec ou sans projet
        </p>
        <h3 className="mb-1 font-display text-[clamp(1.7rem,2.6vw,2.2rem)] leading-none font-semibold tracking-[-0.045em]">Formation</h3>
        <p className="mb-4 text-[16px] font-medium">Faire adopter l&apos;IA par vos équipes.</p>
        <p className="m-0 max-w-[46ch] text-[14.5px] leading-relaxed text-ink-3">
          Vos salariés utilisent déjà des outils d&apos;IA, sans règles communes ? Nous posons le cadre et formons chaque équipe sur son métier. Indépendante de nos intégrations, la formation se commande seule.
        </p>
      </div>
      <div className="mt-8 flex flex-col lg:mt-0">
        <ul className="m-0 grid list-none gap-3 p-0">
          {TRAINING_POINTS.map((t) => (
            <li key={t} className="flex items-start gap-3 border-b border-line pb-3 text-[14px] text-ink-2">
              <Icon shapes={icons.check} className="mt-0.5 size-4 flex-none text-ink-3" />
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-end justify-between gap-4 pt-7">
          <div>
            <p className="m-0 text-[12.5px] text-ink-3">{o.duration} · à partir de</p>
            <p className="m-0 font-display font-semibold tracking-[-0.035em] whitespace-nowrap">
              <span className="text-[1.5rem]">{amount}</span>
              {unit && <span className="ml-1 text-[14px] font-medium tracking-normal text-ink-3">/ {unit}</span>}
            </p>
          </div>
          <span className="grid size-10 flex-none place-items-center rounded-full border border-line-strong transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-surface" aria-hidden="true">
            <svg viewBox="0 0 16 16" className="size-4"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </div>
      </div>
      <span className="sr-only">En savoir plus : {o.title}</span>
    </Link>
  )
}

export function OffersJourney({ offers }: { offers: OfferSummary[] }) {
  const list = Object.keys(PITCH).map((slug) => offers.find((o) => o.slug === slug)).filter((o): o is OfferSummary => !!o)
  const training = offers.find((o) => o.slug === TRAINING)
  return (
    <div className="relative isolate mx-auto max-w-[1080px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-[8vw] -inset-y-20 -z-10 [background-image:linear-gradient(to_right,color-mix(in_srgb,var(--ink)_9%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--ink)_9%,transparent)_1px,transparent_1px)] [background-size:44px_44px] [background-position:center] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_74%)]"
      />
      <OffersJourneyPath labels={STEPS}>
        {list.map((o, k) => (
          <OfferTile key={o.slug} o={o} k={k} total={list.length} />
        ))}
      </OffersJourneyPath>
      {training ? <TrainingBand o={training} /> : null}
    </div>
  )
}
