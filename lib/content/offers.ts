import { formatEuros, offerDetails } from "./offers-data"

export type OfferSummary = {
  slug: string
  kicker: string
  title: string
  duration: string
  description: string
  deliverable: string
  fromPrice: string
  featured?: boolean
}

/** Cartes d'offres, dérivées des fiches détaillées. */
export const offers: OfferSummary[] = offerDetails.map((offer) => ({
  slug: offer.slug,
  kicker: offer.kicker,
  title: offer.title,
  duration: offer.duration,
  description: offer.lead,
  deliverable: offer.cardDeliverable,
  fromPrice: `${formatEuros(offer.priceMin)} HT`,
  featured: offer.featured,
}))

export const offerHref = (slug: string) => `/offres/${slug}`

export function getOffer(slug: string) {
  return offerDetails.find((o) => o.slug === slug)
}

export { offerDetails }
