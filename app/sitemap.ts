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
    "/intelligence-artificielle-nantes",
    "/a-propos",
    "/contact",
    "/mentions-legales",
    "/confidentialite",
  ]
  return paths.map((path) => ({ url: `${site.url}${path === "/" ? "/" : path}`, lastModified: "2026-10-13" }))
}
