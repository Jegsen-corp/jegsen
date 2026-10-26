import Link from "next/link"
import { Reveal } from "@/components/motion/reveal"
import { LogoMark } from "@/components/site/logo"
import { offerHref, type OfferSummary } from "@/lib/content/offers"
import { cn } from "@/lib/utils"

/**
 * Offres de l'accueil : le symbole Jegsen au centre, tel quel, sur le quadrillage doux ;
 * les quatre offres dans les coins, toutes visibles d'un coup.
 */

type Pitch = { name: string; promise: string; line: string; badge?: string }

/** Textes de l'accueil, dans l'ordre de lecture : haut gauche, haut droite, bas gauche, bas droite. */
const PITCH: Record<string, Pitch> = {
  "diagnostic-rentabilite-ia": { name: "Diagnostic", promise: "Savoir où l'IA rapporte.", line: "Deux à trois cas d'usage chiffrés, avec ROI, risques et feuille de route.", badge: "Déduit du sprint" },
  "sprint-integration-ia": { name: "Intégration", promise: "Automatiser un premier processus.", line: "Mis en production, branché sur vos outils, gains mesurés." },
  "programme-formation-ia": { name: "Formation", promise: "Faire adopter par vos équipes.", line: "Ateliers par métier, règles d'usage et suivi de l'adoption." },
  "maintenance-suivi-ia": { name: "Maintenance", promise: "Garder les gains dans la durée.", line: "Supervision, corrections et suivi des gains, mois après mois." },
}

const PLACE = ["lg:col-start-1 lg:row-start-1", "lg:col-start-3 lg:row-start-1", "lg:col-start-1 lg:row-start-2", "lg:col-start-3 lg:row-start-2"]

function OfferTile({ o, k }: { o: OfferSummary; k: number }) {
  const delay = `${-k * 1.6}s`
  const p = PITCH[o.slug]
  const [amount, unit] = o.price.split(" / ")
  const from = o.compactPrice.startsWith("dès")
  return (
    <div className="group relative isolate h-full transition-[translate] duration-500 ease-brand hover:-translate-y-1 has-[:focus-visible]:-translate-y-1">
    <Link
      href={offerHref(o.slug)}
      style={{ animationDelay: delay }}
      className="shine-border relative flex h-full flex-col rounded-[24px] p-[clamp(22px,2.4vw,30px)]"
    >
      <div className="mb-5 flex min-h-7 items-center justify-between gap-3">
        <span className="font-display text-[13px] font-semibold tracking-[0.08em] text-ink-3 transition-colors group-hover:text-brand">{String(k + 1).padStart(2, "0")} / 04</span>
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

export function OffersHub({ offers }: { offers: OfferSummary[] }) {
  const list = Object.keys(PITCH).map((slug) => offers.find((o) => o.slug === slug)).filter((o): o is OfferSummary => !!o)
  return (
    <div className="relative isolate">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-[6vw] -inset-y-16 -z-10 [background-image:linear-gradient(to_right,color-mix(in_srgb,var(--ink)_9%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--ink)_9%,transparent)_1px,transparent_1px)] [background-size:44px_44px] [background-position:center] [mask-image:radial-gradient(ellipse_at_center,#000_25%,transparent_72%)]"
      />
      <div className="grid gap-[18px] md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_clamp(180px,18vw,240px)_minmax(0,1fr)] lg:grid-rows-2 lg:gap-x-[clamp(28px,4vw,64px)]">
        <Reveal className="order-first mx-auto w-[min(40vw,150px)] text-ink md:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:w-full lg:self-center">
          <LogoMark className="size-auto h-auto w-full" />
        </Reveal>
        {list.map((o, k) => (
          <Reveal key={o.slug} delay={0.06 * k} className={cn(PLACE[k])}>
            <OfferTile o={o} k={k} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
