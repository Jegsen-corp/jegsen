import { offerDetails, priceLabels } from "./offers-data"

export type OfferSummary = {
  slug: string
  kicker: string
  title: string
  duration: string
  description: string
  deliverable: string
  /** Petit libellé au-dessus du prix (« Forfait », « À partir de »…). */
  priceLabel: string
  price: string
  /** Prix sur une ligne pour les cartes compactes. */
  compactPrice: string
  featured?: boolean
}

/** Cartes d'offres, dérivées des fiches détaillées. */
export const offers: OfferSummary[] = offerDetails.map((offer) => {
  const price = priceLabels(offer.pricing)
  return {
    slug: offer.slug,
    kicker: offer.kicker,
    title: offer.title,
    duration: offer.duration,
    description: offer.lead,
    deliverable: offer.cardDeliverable,
    priceLabel: price.cardLabel,
    price: price.card,
    compactPrice: price.compact,
    featured: offer.featured,
  }
})

export const offerHref = (slug: string) => `/offres/${slug}`

export function getOffer(slug: string) {
  return offerDetails.find((o) => o.slug === slug)
}

export { offerDetails }
