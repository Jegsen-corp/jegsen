export type IconShape = { d: string } | { cx: string; cy: string; r: string }

export type Step = { title: string; text: string }
export type FaqItem = { q: string; a: string }

export type UseCase = {
  slug: string
  /** Cas d'usage technique (socle) plutôt que processus métier. */
  technical: boolean
  metaTitle: string
  metaDescription: string
  title: string
  shortTitle: string
  lead: string
  /** Résumé court utilisé dans les cartes « Autres cas d'usage ». */
  summary: string
  audiences: string[]
  today: string[]
  howTitle: string
  steps: Step[]
  cards: { title: string; icon: IconShape[]; items: string[] }[]
  faq: FaqItem[]
}

export type OfferDetail = {
  slug: string
  metaTitle: string
  metaDescription: string
  kicker: string
  title: string
  crumb: string
  lead: string
  duration: string
  /** Prix de départ affiché sur les cartes, et borne basse du JSON-LD. */
  priceMin: number
  priceMax: number
  /** Phrase de livrable sur les cartes (plus longue que la puce d'en-tête). */
  cardDeliverable: string
  featured?: boolean
  facts: { label: string; value: string }[]
  forWho: string[]
  examples?: { title: string; text: string; icon: IconShape[] }[]
  stepsLead: string
  steps: Step[]
  deliverablesLead: string
  deliverables: string[]
  showCases: boolean
  faq: FaqItem[]
}
