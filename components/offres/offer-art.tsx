"use client"

import type { OfferVisual } from "@/lib/content/offer-visuals"
import { DiagnosticArt } from "./art-diagnostic"
import { FormationArt } from "./art-formation"
import { IntegrationArt } from "./art-integration"
import { MaintenanceArt } from "./art-maintenance"

/** Illustration d'en-tête de la page d'offre : une forme propre à chaque offre. */
export function OfferArt({ kind }: { kind: OfferVisual }) {
  switch (kind) {
    case "diagnostic":
      return <DiagnosticArt />
    case "integration":
      return <IntegrationArt />
    case "formation":
      return <FormationArt />
    case "maintenance":
      return <MaintenanceArt />
  }
}
