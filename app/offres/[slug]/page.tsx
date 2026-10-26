import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { Reveal } from "@/components/motion/reveal"
import { CtaBlock, Checklist, Eyebrow, Facts, PageFallback, PageHero, SectionHead } from "@/components/site/blocks"
import { Icon } from "@/components/site/icon"
import { JsonLd, priceSpecification } from "@/components/site/json-ld"
import { ButtonRow, LinkButton } from "@/components/site/links"
import { OfferCardCompact, OfferKicker } from "@/components/site/offer-card"
import { CaseLinks, FaqSection, MethodSection, SplitSection } from "@/components/site/sections"
import { CardIcon, SiteCard } from "@/components/site/site-card"
import { getOffer, offerDetails, offers } from "@/lib/content/offers"
import { formatEuros } from "@/lib/content/offers-data"
import { pageMeta } from "@/lib/metadata"
import { site } from "@/lib/site"

export function generateStaticParams() {
  return offerDetails.map((o) => ({ slug: o.slug }))
}

export async function generateMetadata({ params }: PageProps<"/offres/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const offer = getOffer(slug)
  if (!offer) return {}
  return pageMeta({ title: offer.metaTitle, description: offer.metaDescription, path: `/offres/${slug}` })
}

export default function OfferPage({ params }: PageProps<"/offres/[slug]">) {
  // Le contenu dépend du paramètre d'URL : il est rendu sous Suspense pour garder une navigation instantanée.
  return (
    <Suspense fallback={<PageFallback />}>
      <OfferContent params={params} />
    </Suspense>
  )
}

async function OfferContent({ params }: { params: PageProps<"/offres/[slug]">["params"] }) {
  const { slug } = await params
  const offer = getOffer(slug)
  if (!offer) notFound()

  const others = offers.filter((o) => o.slug !== slug)
  // Abonnement à paliers (maintenance) : unité de facturation affichée sous chaque prix.
  const tierUnit = offer.pricing.kind === "perMonth" ? offer.pricing.unit : null

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${site.url}/offres/${slug}#service`,
          name: offer.title,
          description: offer.metaDescription,
          url: `${site.url}/offres/${slug}`,
          provider: { "@id": `${site.url}/#organisation` },
          areaServed: { "@type": "Country", name: "France" },
          ...(offer.tiers && tierUnit
            ? {
                offers: offer.tiers.map((t) => ({
                  "@type": "Offer",
                  name: `${offer.title}, palier ${t.name}`,
                  description: t.tagline,
                  priceSpecification: priceSpecification({ ...offer.pricing, amount: t.amount }, true),
                })),
              }
            : {}),
        }}
      />
      <PageHero blobs={[1]} crumbs={[{ label: offer.crumb }]}>
        <Reveal>
          <Eyebrow>{offer.kicker}</Eyebrow>
        </Reveal>
        <Reveal as="h1" className="max-w-[18ch] text-[clamp(2.4rem,5.4vw,4.4rem)]">
          {offer.title}
        </Reveal>
        <Reveal as="p" delay={0.1} className="lead">
          {offer.lead}
        </Reveal>
        <Facts facts={offer.facts} delay={0.2} />
        <Reveal className="mt-8">
          <ButtonRow>
            <LinkButton href={`/contact?offre=${slug}`} arrow>
              {offer.ctaLabel ?? "Demander un devis"}
            </LinkButton>
          </ButtonRow>
        </Reveal>
      </PageHero>

      <SplitSection eyebrow="Pour qui" title="Cette offre est faite pour vous si…">
        <Checklist items={offer.forWho} />
      </SplitSection>

      {offer.tiers && tierUnit && (
        <section className="section-tight">
          <div className="container-site">
            <SectionHead
              eyebrow="Paliers"
              title={offer.tiers.length === 3 ? "Trois niveaux de service." : "Nos niveaux de service."}
              lead={offer.deliverablesLead}
            />
            {/* Trois paliers côte à côte à partir de 1 024 px, empilés en dessous (pas de carte orpheline). */}
            <div className="grid gap-[18px] lg:grid-cols-3">
              {offer.tiers.map((t, i) => (
                <SiteCard key={t.name} as="article" delay={i * 0.08} className="flex min-h-full flex-col">
                  <OfferKicker>{t.name}</OfferKicker>
                  <div className="mb-3 flex flex-wrap items-baseline gap-x-2">
                    <strong className="font-display text-[clamp(2rem,3.4vw,2.6rem)] leading-none tracking-[-0.04em]">
                      {formatEuros(t.amount)}&nbsp;HT
                    </strong>
                    <span className="text-sm text-ink-3">par mois et par {tierUnit}</span>
                  </div>
                  <p>{t.tagline}</p>
                  <Checklist items={t.items} />
                </SiteCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {offer.examples && (
        <section className="section-tight">
          <div className="container-site">
            <SectionHead eyebrow="Exemples de processus" title="Ce que nous mettons en production." />
            <div className="grid-balance grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
              {offer.examples.map((ex, i) => (
                <SiteCard key={ex.title} delay={(i % 3) * 0.08}>
                  <CardIcon>
                    <Icon shapes={ex.icon} />
                  </CardIcon>
                  <h3>{ex.title}</h3>
                  <p className="m-0">{ex.text}</p>
                </SiteCard>
              ))}
            </div>
          </div>
        </section>
      )}

      <MethodSection eyebrow="Déroulé" title="Comment nous travaillons." lead={offer.stepsLead} steps={offer.steps} />

      {/* Avec des paliers, la note de prix est déjà affichée au-dessus des paliers. */}
      <SplitSection eyebrow="Livrables" title="Ce que vous obtenez." lead={offer.tiers ? undefined : offer.deliverablesLead}>
        <Checklist items={offer.deliverables} />
      </SplitSection>

      {offer.showCases && (
        <SplitSection eyebrow="Cas d'usage" title="Des exemples détaillés.">
          <CaseLinks />
        </SplitSection>
      )}

      <FaqSection title="Avant de vous lancer." items={offer.faq} />

      <section className="section-tight">
        <div className="container-site">
          <SectionHead eyebrow="Aller plus loin" title="Nos autres offres." />
          <div className="grid-balance grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <OfferCardCompact key={o.slug} offer={o} />
            ))}
          </div>
        </div>
      </section>

      <CtaBlock />
    </>
  )
}
