export type ArticleMeta = {
  slug: string
  category: string
  readingTime: string
  title: string
  crumb: string
  metaTitle: string
  description: string
  published: string
  verified: string
}

export const articles: ArticleMeta[] = [
  {
    slug: "facture-electronique-ia",
    category: "Réglementation",
    readingTime: "5 min",
    title:
      "Facture électronique 2026-2027 : ce qui change pour les PME, et où l’IA reste utile",
    crumb: "Facture électronique",
    metaTitle: "Facture électronique 2026-2027 : calendrier PME et IA | Jegsen",
    description:
      "Réception obligatoire depuis le 1er septembre 2026, émission pour les PME au 1er septembre 2027 : le calendrier, ce que la réforme automatise, et ce qui reste à faire.",
    published: "2026-10-10",
    verified: "2026-10-10",
  },
  {
    slug: "roi-projet-ia",
    category: "Méthode",
    readingTime: "6 min",
    title:
      "Calculer le retour sur investissement d’un projet d’IA : la méthode pour une PME",
    crumb: "ROI d’un projet IA",
    metaTitle: "ROI d’un projet d’IA en PME : méthode et exemple | Jegsen",
    description:
      "Les formules pour estimer le gain, le coût et le délai de retour d’une automatisation par l’IA, un exemple chiffré pas à pas et les erreurs qui faussent le calcul.",
    published: "2026-10-10",
    verified: "2026-10-10",
  },
  {
    slug: "maitrise-ia-article-4",
    category: "Réglementation",
    readingTime: "6 min",
    title:
      "Article 4 du règlement européen sur l’IA : ce que la « maîtrise de l’IA » demande aux PME",
    crumb: "Maîtrise de l’IA",
    metaTitle: "Article 4 AI Act : la maîtrise de l’IA pour les PME | Jegsen",
    description:
      "Qui est concerné par l'article 4 du règlement européen sur l'IA, ce qu'a changé l'omnibus de juillet 2026, et comment une PME peut s'y conformer.",
    published: "2026-10-10",
    verified: "2026-10-10",
  },
]

export const articleHref = (slug: string) => `/ressources/${slug}`

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug)!
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso))
}
