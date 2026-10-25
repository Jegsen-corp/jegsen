import { offerHref, type OfferSummary } from "@/lib/content/offers"
import { cn } from "@/lib/utils"
import { ArrowLink } from "./links"
import { SiteCard } from "./site-card"

export function OfferKicker({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mb-3.5 text-[13px] font-semibold tracking-[0.02em] text-brand", className)}>{children}</div>
}

export function OfferFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("mt-auto flex items-end justify-between gap-3 border-t border-line pt-[22px]", className)}>
      {children}
    </div>
  )
}

export function Tag({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "out" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-[11px] py-[5px] text-[13px] font-medium whitespace-nowrap [&_svg]:size-3.5 [&_svg]:flex-none",
        tone === "out" ? "border-transparent bg-brand-soft text-brand" : "border-line bg-bg-2 text-ink-2"
      )}
    >
      {children}
    </span>
  )
}

/** Carte d'offre compacte (pages offres, IA à Nantes). */
export function OfferCardCompact({ offer, delay }: { offer: OfferSummary; delay?: number }) {
  return (
    <SiteCard as="article" delay={delay} className="flex min-h-full flex-col">
      <OfferKicker>{offer.kicker}</OfferKicker>
      <h3>{offer.title}</h3>
      <p>{offer.description}</p>
      <OfferFooter>
        <div>
          <small className="text-[13px] text-ink-3">{offer.duration}</small>
          {/* 20 px : « dès 1 950 € HT / jour » tient sur une ligne dans une grille de trois cartes. */}
          <strong className="block font-display text-xl tracking-[-0.03em] whitespace-nowrap">{offer.compactPrice}</strong>
        </div>
        <ArrowLink href={offerHref(offer.slug)} stretched>
          Détails
        </ArrowLink>
      </OfferFooter>
    </SiteCard>
  )
}
