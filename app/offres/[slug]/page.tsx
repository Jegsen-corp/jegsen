import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { Reveal } from "@/components/motion/reveal"
import { DeliverablesSheet } from "@/components/offres/deliverables-sheet"
import { ExamplesList } from "@/components/offres/examples-list"
import { OfferArt } from "@/components/offres/offer-art"
import { OfferFacts } from "@/components/offres/offer-facts"
import { ProcessTrack } from "@/components/offres/process-track"
import { TierCards } from "@/components/offres/tier-cards"
import { YearTrack } from "@/components/offres/year-track"
import { CtaBlock, Checklist, Eyebrow, PageFallback, PageHero, SectionHead } from "@/components/site/blocks"
import { JsonLd, priceSpecification } from "@/components/site/json-ld"
import { ButtonRow, LinkButton } from "@/components/site/links"
import { OfferCardCompact } from "@/components/site/offer-card"
import { CaseLinks, FaqSection, SplitSection } from "@/components/site/sections"
import { keepHyphenated } from "@/components/site/typo"
import { offerVisual } from "@/lib/content/offer-visuals"
import { getOffer, offerDetails, offers } from "@/lib/content/offers"
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

/*
 * Page d'offre. Ordre de lecture : ce que c'est et ce que ça produit (en-tête illustré et fiche),
 * pour qui, ce qui est inclus (paliers ou exemples), comment ça se déroule dans le temps,
 * ce qui vous est remis, puis les questions et les autres offres.
 */
async function OfferContent({ params }: { params: PageProps<"/offres/[slug]">["params"] }) {
  const { slug } = await params
  const offer = getOffer(slug)
  if (!offer) notFound()

  const visual = offerVisual(slug)
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
        <div className="grid items-center gap-x-[clamp(40px,5vw,80px)] gap-y-12 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
          <div>
            <Reveal>
              <Eyebrow>{offer.kicker}</Eyebrow>
            </Reveal>
            <Reveal as="h1" className="max-w-[16ch] text-[clamp(2.3rem,4.3vw,3.7rem)]">
              {offer.title}
            </Reveal>
            <Reveal as="p" delay={0.1} className="lead max-w-[46ch]">
              {offer.lead}
            </Reveal>
            <Reveal delay={0.15} className="mt-8">
              <ButtonRow>
                <LinkButton href={`/contact?offre=${slug}`} arrow>
                  {offer.ctaLabel ?? "Demander un devis"}
                </LinkButton>
                <LinkButton href="#deroule" variant="line">
                  Voir le déroulé
                </LinkButton>
              </ButtonRow>
            </Reveal>
          </div>
          <Reveal delay={0.05} className="mx-auto w-full max-w-[620px] lg:-mr-4 lg:max-w-none xl:-mr-10">
            <OfferArt kind={visual} />
          </Reveal>
        </div>
        <OfferFacts facts={offer.facts} />
      </PageHero>

      <SplitSection eyebrow="Pour qui" title="Cette offre est faite pour vous si…">
        <Checklist items={offer.forWho} className="[&_li]:text-[17px]" />
      </SplitSection>

      {offer.tiers && tierUnit && (
        <section className="section-tight">
          <div className="container-site">
            <SectionHead
              eyebrow="Paliers"
              title={offer.tiers.length === 3 ? "Trois niveaux de service." : "Nos niveaux de service."}
              lead={offer.deliverablesLead}
            />
            <TierCards tiers={offer.tiers} unit={tierUnit} />
          </div>
        </section>
      )}

      {offer.examples && (
        <section className="section-tight">
          <div className="container-site">
            <SectionHead eyebrow="Exemples de processus" title="Ce que nous mettons en production." />
            <ExamplesList examples={offer.examples} />
          </div>
        </section>
      )}

      <section id="deroule" className="section scroll-mt-20">
        <div className="container-site">
          <SectionHead eyebrow="Déroulé" title="Comment nous travaillons." lead={offer.stepsLead} />
          {visual === "maintenance" ? <YearTrack steps={offer.steps} /> : <ProcessTrack steps={offer.steps} duration={offer.duration} />}
        </div>
      </section>

      {/* Avec des paliers, la note de prix est déjà affichée au-dessus des paliers. */}
      <section className="section-tight">
        <div className="container-site grid items-start gap-[clamp(36px,6vw,88px)] md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <Reveal className="md:sticky md:top-[120px]">
            <Eyebrow>Livrables</Eyebrow>
            <h2>{keepHyphenated("Ce que vous obtenez.")}</h2>
            {!offer.tiers ? <p className="lead">{offer.deliverablesLead}</p> : null}
          </Reveal>
          <DeliverablesSheet offerTitle={offer.title} items={offer.deliverables} />
        </div>
      </section>

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
