import type { Metadata } from "next"
import { ArticleCard, ResourcesIntro } from "@/components/site/article-layout"
import { CtaBlock, PageHero } from "@/components/site/blocks"
import { articles } from "@/lib/content/articles"
import { pageMeta } from "@/lib/metadata"

export const metadata: Metadata = pageMeta({
  title: "Ressources : l’IA en entreprise, sourcée et datée | Jegsen IA",
  description:
    "Articles sourcés sur l'IA en PME et ETI : réglementation (règlement européen sur l'IA), automatisation des processus, formation et mesure des gains.",
  path: "/ressources",
})

export default function ResourcesPage() {
  return (
    <>
      <PageHero blobs={[1]} crumbs={[{ label: "Ressources" }]}>
        <ResourcesIntro />
      </PageHero>
      <section className="section-tight">
        <div className="container-site grid gap-[18px] sm:grid-cols-2">
          {articles.map((a) => (
            <ArticleCard key={a.slug} slug={a.slug} />
          ))}
        </div>
      </section>
      <CtaBlock />
    </>
  )
}
