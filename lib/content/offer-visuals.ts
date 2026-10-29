/**
 * Habillage visuel de chaque page d'offre : illustration d'en-tête et forme du déroulé.
 * Fichier sans dépendance client : utilisable côté serveur comme côté navigateur.
 */

export type OfferVisual = "diagnostic" | "integration" | "formation" | "maintenance"

const BY_SLUG: Record<string, OfferVisual> = {
  "diagnostic-rentabilite-ia": "diagnostic",
  "sprint-integration-ia": "integration",
  "programme-formation-ia": "formation",
  "maintenance-suivi-ia": "maintenance",
}

export function offerVisual(slug: string): OfferVisual {
  return BY_SLUG[slug] ?? "integration"
}
