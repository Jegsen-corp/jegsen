import { offerDetails } from "./offers-data"

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

export const offers: OfferSummary[] = [
  {
    slug: "diagnostic-rentabilite-ia",
    kicker: "Pour commencer",
    title: "Diagnostic de rentabilité IA",
    duration: "1 à 2 semaines",
    description:
      "En une à deux semaines, nous identifions où l'IA rapporte vraiment dans votre entreprise, et où elle ne rapporte pas.",
    deliverable: "Plan d'action chiffré, avec hypothèses de ROI et risques",
    fromPrice: "1 500 € HT",
  },
  {
    slug: "sprint-integration-ia",
    kicker: "Automatisez un processus",
    title: "Sprint d’intégration IA",
    duration: "2 à 6 semaines",
    description:
      "Nous prenons un processus précis et nous le mettons en production, branché sur vos outils, avec des gains mesurés.",
    deliverable:
      "Workflow opérationnel, tests, documentation, sécurisation et mesure des gains",
    fromPrice: "5 000 € HT",
    featured: true,
  },
  {
    slug: "programme-formation-ia",
    kicker: "Formez vos équipes",
    title: "Programme IA et adoption",
    duration: "1 à 3 semaines",
    description:
      "Un outil que personne n'utilise ne rapporte rien. Nous formons vos équipes et encadrons les usages pour que les gains se matérialisent.",
    deliverable:
      "Équipes formées, usages encadrés, indicateurs d'adoption et bilan de gains",
    fromPrice: "2 000 € HT",
  },
]

export const offerHref = (slug: string) => `/offres/${slug}`

export function getOffer(slug: string) {
  return offerDetails.find((o) => o.slug === slug)
}

export { offerDetails }
