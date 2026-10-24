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

export type OfferPricing =
  | { kind: "forfait"; amount: number; note: string }
  | { kind: "from"; amount: number; note: string }
  | { kind: "perDay"; amount: number; groupMax: number; note: string }
  /** Abonnement mensuel, prix d'entrée par unité (par exemple par workflow en production). */
  | { kind: "perMonth"; amount: number; unit: string; note: string }

/** Palier d'un abonnement (maintenance) : nom, prix mensuel, promesse et contenu. */
export type OfferTier = { name: string; amount: number; tagline: string; items: string[] }

export type OfferDetail = {
  slug: string
  metaTitle: string
  metaDescription: string
  kicker: string
  title: string
  crumb: string
  lead: string
  duration: string
  /** Prix affiché : forfait fixe, « sur devis, à partir de », ou prix à la journée. */
  pricing: OfferPricing
  /** Libellé du bouton d'action de la page d'offre (par défaut « Demander un devis »). */
  ctaLabel?: string
  /** Phrase de livrable sur les cartes (plus longue que la puce d'en-tête). */
  cardDeliverable: string
  featured?: boolean
  /** Offre de suite (après une mise en production) : absente des grilles « Trois façons de commencer ». */
  followUp?: boolean
  /** Paliers de l'abonnement, affichés sur la page de l'offre. */
  tiers?: OfferTier[]
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
