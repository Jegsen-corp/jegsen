import { offerDetails } from "@/lib/content/offers"
import type { FaqItem, OfferPricing } from "@/lib/content/types"
import { founders, site } from "@/lib/site"

/** Prix au format schema.org : forfait (price), à partir de (minPrice) ou prix à la journée. */
function priceSpecification(p: OfferPricing) {
  const base = { priceCurrency: "EUR", valueAddedTaxIncluded: false }
  if (p.kind === "from") return { "@type": "PriceSpecification", minPrice: p.amount, ...base }
  if (p.kind === "perDay")
    return {
      "@type": "UnitPriceSpecification",
      price: p.amount,
      referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "DAY" },
      ...base,
    }
  return { "@type": "PriceSpecification", price: p.amount, ...base }
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Le contenu est statique et contrôlé : pas de risque d'injection.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}

const plain = (s: string) => s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[(.+?)\]\(.+?\)/g, "$1")

export const faqLd = (items: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: plain(f.q),
    acceptedAnswer: { "@type": "Answer", text: plain(f.a) },
  })),
})

export const breadcrumbLd = (items: { label: string; href?: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.label,
    ...(c.href ? { item: `${site.url}${c.href === "/" ? "/" : c.href}` } : {}),
  })),
})

export const organizationLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#organisation`,
      name: site.name,
      alternateName: "Jegsen",
      url: site.url,
      logo: `${site.url}/logo.png`,
      image: `${site.url}/opengraph-image.png`,
      description: site.description,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.city,
        postalCode: site.postalCode,
        addressRegion: site.region,
        addressCountry: "FR",
      },
      sameAs: [site.linkedin],
      founder: founders.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.jobTitle })),
      areaServed: [
        { "@type": "City", name: "Nantes" },
        { "@type": "AdministrativeArea", name: "Loire-Atlantique" },
        { "@type": "Country", name: "France" },
      ],
      knowsAbout: [
        "Intelligence artificielle",
        "Automatisation des processus métier",
        "Workflows agentiques",
        "Agents IA",
        "Extraction de données de documents",
        "Formation à l'IA en entreprise",
        "Intégration de systèmes d'information",
        "Cerveau d'entreprise et bases de connaissances",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Prestations IA pour PME et ETI",
        itemListElement: offerDetails.map((offer) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            "@id": `${site.url}/offres/${offer.slug}#service`,
            name: offer.title,
          },
          priceSpecification: priceSpecification(offer.pricing),
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#site`,
      url: site.url,
      name: site.name,
      inLanguage: "fr-FR",
      publisher: { "@id": `${site.url}/#organisation` },
    },
  ],
}
