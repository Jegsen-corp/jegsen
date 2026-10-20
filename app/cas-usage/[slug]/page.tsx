import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { Reveal } from "@/components/motion/reveal"
import { CtaBlock, Checklist, Eyebrow, Facts, PageFallback, PageHero, SectionHead } from "@/components/site/blocks"
import { Icon } from "@/components/site/icon"
import { JsonLd } from "@/components/site/json-ld"
import { ArrowLink, ButtonRow, LinkButton } from "@/components/site/links"
import { RichText } from "@/components/site/rich-text"
import { FaqSection, MethodSection, SplitSection } from "@/components/site/sections"
import { CardIcon, SiteCard } from "@/components/site/site-card"
import { caseHref, getUseCase, otherCases, useCases } from "@/lib/content/cases"
import { pageMeta } from "@/lib/metadata"
import { site } from "@/lib/site"

export function generateStaticParams() {
  return useCases.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps<"/cas-usage/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const useCase = getUseCase(slug)
  if (!useCase) return {}
  return pageMeta({ title: useCase.metaTitle, description: useCase.metaDescription, path: caseHref(slug) })
}

export default function UseCasePage({ params }: PageProps<"/cas-usage/[slug]">) {
  // Le contenu dépend du paramètre d'URL : il est rendu sous Suspense pour garder une navigation instantanée.
  return (
    <Suspense fallback={<PageFallback />}>
      <UseCaseContent params={params} />
    </Suspense>
  )
}

async function UseCaseContent({ params }: { params: PageProps<"/cas-usage/[slug]">["params"] }) {
  const { slug } = await params
  const c = getUseCase(slug)
  if (!c) notFound()

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${site.url}${caseHref(slug)}#service`,
          name: c.title,
          description: c.metaDescription,
          url: `${site.url}${caseHref(slug)}`,
          serviceType: "Automatisation de processus par intelligence artificielle",
          provider: { "@id": `${site.url}/#organisation` },
          areaServed: { "@type": "Country", name: "France" },
          audience: { "@type": "BusinessAudience", name: c.audiences.join(", ") },
        }}
      />
      <PageHero blobs={[1]} crumbs={[{ label: "Cas d'usage", href: "/cas-usage" }, { label: c.shortTitle }]}>
        <Reveal>
          <Eyebrow>{c.technical ? "Cas d'usage technique" : "Cas d'usage"}</Eyebrow>
        </Reveal>
        <Reveal as="h1" className="max-w-[20ch] text-[clamp(2.4rem,5.4vw,4.4rem)]">
          {c.title}
        </Reveal>
        <Reveal as="p" className="lead">
          {c.lead}
        </Reveal>
        <Facts facts={c.audiences.map((a) => ({ label: "Pour", value: a }))} />
        <Reveal className="mt-7">
          <ButtonRow>
            <LinkButton href="/contact?offre=sprint-integration-ia" arrow>
              Étudier mon cas
            </LinkButton>
            <LinkButton href="/offres/sprint-integration-ia" variant="line">
              Sprint d'intégration IA
            </LinkButton>
          </ButtonRow>
        </Reveal>
      </PageHero>

      <SplitSection eyebrow="Aujourd'hui" title="Ce qui coûte du temps.">
        <div className="prose-site">
          {c.today.map((p) => (
            <p key={p}>
              <RichText text={p} />
            </p>
          ))}
        </div>
      </SplitSection>

      <MethodSection
        eyebrow="Fonctionnement"
        title={c.howTitle}
        lead="Branchée sur vos outils existants, avec une validation humaine pour tout ce qui sort des règles."
        steps={c.steps}
      />

      <section className="section-tight">
        <div className="container-site grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {c.cards.map((card, i) => (
            <SiteCard key={card.title} delay={i * 0.08}>
              <CardIcon>
                <Icon shapes={card.icon} />
              </CardIcon>
              <h2 className="text-[1.35rem]">{card.title}</h2>
              <Checklist items={card.items} className="mt-3.5" />
            </SiteCard>
          ))}
        </div>
      </section>

      <FaqSection title="Questions fréquentes." items={c.faq} />

      <section className="section-tight">
        <div className="container-site">
          <SectionHead eyebrow="Autres cas d'usage" title="Ce que nous automatisons aussi." />
          <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
            {otherCases(slug).map((o) => (
              <SiteCard key={o.slug} as="article" className="p-[22px] py-[22px]">
                <h3 className="text-[1.1rem]">{o.shortTitle}</h3>
                <p className="text-[15px]!">{o.summary}</p>
                <ArrowLink href={caseHref(o.slug)} stretched>
                  Voir
                </ArrowLink>
              </SiteCard>
            ))}
          </div>
        </div>
      </section>

      <CtaBlock
        title="Ce processus vous coûte du temps ?"
        lead="Un premier échange de 30 minutes pour estimer le gain sur vos volumes réels, et vous dire si l'automatisation est rentable."
      />
    </>
  )
}
