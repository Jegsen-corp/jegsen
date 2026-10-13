import type { ReactNode } from "react"
import { Reveal } from "@/components/motion/reveal"
import { articleHref, articles, formatDate, getArticle } from "@/lib/content/articles"
import { pageMeta } from "@/lib/metadata"
import { site } from "@/lib/site"
import { CtaBlock, Eyebrow, PageHero, SectionHead } from "./blocks"
import { JsonLd } from "./json-ld"
import { ArrowLink } from "./links"
import { OfferFooter, OfferKicker } from "./offer-card"
import { SiteCard } from "./site-card"

export function articleMetadata(slug: string) {
  const a = getArticle(slug)
  return pageMeta({ title: a.metaTitle, description: a.description, path: articleHref(slug) })
}

/** Carte d’article (liste des ressources et « À lire aussi »). */
export function ArticleCard({ slug, compact }: { slug: string; compact?: boolean }) {
  const a = getArticle(slug)
  return (
    <SiteCard as="article" className="flex min-h-full flex-col">
      {!compact && (
        <OfferKicker>
          {a.category} · {a.readingTime}
        </OfferKicker>
      )}
      <h2 className={compact ? "text-[1.3rem]" : "text-[1.6rem]"}>{a.title}</h2>
      <p>{a.description}</p>
      <OfferFooter>
        <small className="text-[13px] text-ink-3">
          {compact ? a.readingTime : `Mis à jour le ${formatDate(a.verified)}`}
        </small>
        <ArrowLink href={articleHref(slug)} stretched>
          Lire
        </ArrowLink>
      </OfferFooter>
    </SiteCard>
  )
}

export function ArticleLayout({ slug, children }: { slug: string; children: ReactNode }) {
  const a = getArticle(slug)
  const others = articles.filter((o) => o.slug !== slug)
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.description,
          datePublished: a.published,
          dateModified: a.verified,
          inLanguage: "fr-FR",
          url: `${site.url}${articleHref(slug)}`,
          author: { "@id": `${site.url}/#organisation` },
          publisher: { "@id": `${site.url}/#organisation` },
        }}
      />
      <PageHero blobs={[1]} className="pb-[30px]" crumbs={[{ label: "Ressources", href: "/ressources" }, { label: a.crumb }]}>
        <Eyebrow>
          {a.category} · {a.readingTime} de lecture
        </Eyebrow>
        <h1 className="max-w-[22ch] text-[clamp(2rem,4.4vw,3.4rem)]">{a.title}</h1>
        <p className="text-sm text-ink-3">
          Publié le <time dateTime={a.published}>{formatDate(a.published)}</time> · dernière vérification des sources
          le <time dateTime={a.verified}>{formatDate(a.verified)}</time>
        </p>
      </PageHero>
      <article className="section-tight pt-2.5">
        <div className="container-site">
          <div className="prose-site">
            {children}
            <p className="text-sm! text-ink-3!">
              Cet article a une vocation informative et ne constitue pas un conseil juridique, fiscal ou comptable.
            </p>
          </div>
        </div>
      </article>
      <section className="section-tight">
        <div className="container-site">
          <SectionHead eyebrow="À lire aussi" />
          <div className="grid gap-[18px] sm:grid-cols-2">
            {others.map((o) => (
              <ArticleCard key={o.slug} slug={o.slug} compact />
            ))}
          </div>
        </div>
      </section>
      <CtaBlock />
    </>
  )
}

export function ResourcesIntro() {
  return (
    <>
      <Reveal>
        <Eyebrow>Ressources</Eyebrow>
      </Reveal>
      <Reveal as="h1" className="max-w-[18ch] text-[clamp(2.4rem,5.4vw,4.4rem)]">
        Comprendre avant d’automatiser.
      </Reveal>
      <Reveal as="p" className="lead">
        Des articles courts, sourcés et datés sur l’IA en entreprise.
      </Reveal>
    </>
  )
}
