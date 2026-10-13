import type { Metadata } from "next"

/** Métadonnées d’une page : titre complet (déjà suffixé « | Jegsen »), description, URL canonique. */
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: "Jegsen", locale: "fr_FR", title, description, url: path },
    twitter: { title, description },
  }
}
