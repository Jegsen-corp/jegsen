import type { Metadata } from "next"
import { Reveal } from "@/components/motion/reveal"
import { CtaBlock, Eyebrow, PageHero } from "@/components/site/blocks"
import { Icon, icons } from "@/components/site/icon"
import { SplitSection } from "@/components/site/sections"
import { CardIcon, SiteCard } from "@/components/site/site-card"
import { pageMeta } from "@/lib/metadata"
import { team } from "@/lib/site"
import { product } from "@/lib/content/product"

export const metadata: Metadata = pageMeta({
  title: "À propos : notre mission, rendre l'IA rentable | Jegsen IA",
  description:
    "Notre mission : transformer l'IA en levier de rentabilité pour les PME et ETI françaises, par la formation, le conseil et l'automatisation. Basé à Nantes.",
  path: "/a-propos",
})

const values = [
  {
    icon: icons.chart,
    title: "Mesurer plutôt que promettre",
    text: "Nous relevons vos indicateurs avant d'automatiser, puis après. Les gains annoncés sont ceux que vous constatez.",
  },
  {
    icon: icons.people,
    title: "Accompagner les personnes",
    text: "Une solution n'a de valeur que si les équipes l'adoptent. La formation fait partie du travail, pas d'une option.",
  },
  {
    icon: icons.bolt,
    title: "Construire des produits",
    text: `Ce que nous voyons sur le terrain devient du logiciel. Notre premier produit, ${product.name}, aide les comités de direction à préparer leurs décisions.`,
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero blobs={[3]} crumbs={[{ label: "À propos" }]}>
        <Reveal>
          <Eyebrow>À propos</Eyebrow>
        </Reveal>
        <Reveal as="h1" className="max-w-[18ch] text-[clamp(2.4rem,5.4vw,4.4rem)]">
          Transformer l'IA en levier de rentabilité.
        </Reveal>
        <Reveal as="p" className="lead">
          Nous accompagnons les PME et ETI françaises dans leur adoption de l'IA, par la formation, le conseil et
          l'automatisation de leurs processus métiers, avec un objectif : réduire les coûts, améliorer la productivité et
          créer de la valeur mesurable.
        </Reveal>
      </PageHero>

      <SplitSection eyebrow="Notre vision" title="Rendre l'IA concrètement utile, accessible et rentable.">
        <div className="prose-site">
          <p>
            Notre conviction : chaque entreprise possède déjà, dans ses documents et ses données, la matière d'un
            véritable cerveau d'entreprise. Notre travail consiste à l'organiser et à le brancher sur les processus qui
            comptent.
          </p>
          <p>
            En parallèle de nos missions, nous développons {product.name}, l&apos;aide à la décision des comités de
            direction, à partir de ce que nous voyons chez nos clients. Notre ambition : une entreprise qui allie
            expertise technique, accompagnement humain et produits évolutifs.
          </p>
          <p>Nous sommes basés à Nantes et intervenons partout en France.</p>
        </div>
      </SplitSection>

      {team.length > 0 && (
        <section className="section">
          <div className="container-site">
            <Eyebrow>L'équipe</Eyebrow>
            <h2 className="mb-8">Les personnes derrière Jegsen.</h2>
            <div className="grid-balance grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
              {team.map((m, i) => (
                <SiteCard key={m.name} delay={i * 0.08}>
                  <h3>{m.name}</h3>
                  <p className="mb-3 text-[13px] font-semibold text-brand">{m.role}</p>
                  <p className="m-0">{m.bio}</p>
                </SiteCard>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container-site grid-balance grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <SiteCard key={v.title} delay={i * 0.08}>
              <CardIcon>
                <Icon shapes={v.icon} />
              </CardIcon>
              <h3>{v.title}</h3>
              <p className="m-0">{v.text}</p>
            </SiteCard>
          ))}
        </div>
      </section>

      <CtaBlock />
    </>
  )
}
