import type { MetadataRoute } from "next"
import { articleHref, articles } from "@/lib/content/articles"
import { caseHref, useCases } from "@/lib/content/cases"
import { offerHref, offers } from "@/lib/content/offers"
import { site } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...offers.map((o) => offerHref(o.slug)),
    "/cas-usage",
    ...useCases.map((c) => caseHref(c.slug)),
    "/ressources",
    ...articles.map((a) => articleHref(a.slug)),
    "/automatisation-ia-nantes",
    "/intelligence-artificielle-nantes",
    "/a-propos",
    "/contact",
    "/mentions-legales",
    "/confidentialite",
  ]
  // Date de dernière modification réelle du contenu de chaque page (et non la date du build).
  const updated: Record<string, string> = {
    "/": "2026-10-20",
    "/automatisation-ia-nantes": "2026-10-20",
    "/intelligence-artificielle-nantes": "2026-10-20",
  }
  return paths.map((path) => ({
    url: `${site.url}${path === "/" ? "/" : path}`,
    lastModified: updated[path] ?? "2026-10-13",
  }))
}
