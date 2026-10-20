import { useCases } from "./cases-data"

export const caseHref = (slug: string) => `/cas-usage/${slug}`

export function getUseCase(slug: string) {
  return useCases.find((c) => c.slug === slug)
}

/** Processus métier (hors socle technique), dans l'ordre du site. */
export const processCases = useCases.filter((c) => !c.technical)

/** Autres processus métier, hors cas courant. */
export function otherCases(slug: string) {
  return processCases.filter((c) => c.slug !== slug)
}

export { useCases }
