import Link from "next/link"
import type { Metadata } from "next"
import { Ping } from "@/components/motion/ambient"
import { Reveal } from "@/components/motion/reveal"
import { CtaBlock, PageHero, SectionHead } from "@/components/site/blocks"
import { ButtonRow, LinkButton } from "@/components/site/links"
import { OfferCardCompact } from "@/components/site/offer-card"
import { CaseLinks, FaqSection, SplitSection } from "@/components/site/sections"
import { offers } from "@/lib/content/offers"
import { pageMeta } from "@/lib/metadata"

export const metadata: Metadata = pageMeta({
  title: "Intégration et formation IA à Nantes pour PME et ETI | Jegsen IA",
  description:
    "Accompagnement IA à Nantes et en Loire-Atlantique : diagnostic de rentabilité, automatisation des processus intégrée à votre SI et formation des équipes, sur site.",
  path: "/intelligence-artificielle-nantes",
})

const faq = [
  {
    q: "Vous déplacez-vous dans nos locaux ?",
    a: "Oui. À Nantes et dans la région, les entretiens du diagnostic, les ateliers de formation et la mise en production se font de préférence sur site, au plus près des équipes qui font le travail.",
  },
  {
    q: "Travaillez-vous avec des entreprises hors de Loire-Atlantique ?",
    a: "Oui, partout en France. Le travail se fait alors à distance, avec des déplacements aux étapes où la présence compte : lancement, ateliers, mise en production.",
  },
  {
    q: "Faut-il un service informatique en interne ?",
    a: "Non. Nous travaillons avec votre prestataire informatique s'il y en a un, ou directement avec vous. Nous avons besoin d'accès aux outils concernés, pas d'une équipe technique.",
  },
  {
    q: "Par quoi commencer ?",
    a: "Par un échange de 30 minutes sur un processus précis. S'il se prête à l'automatisation, nous proposons un diagnostic chiffré ou, si le besoin est déjà clair, un sprint d'intégration.",
  },
]

export default function NantesPage() {
  return (
    <>
      <PageHero blobs={[3, 1]} crumbs={[{ label: "IA à Nantes" }]}>
        <Reveal as="p" className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-2.5 text-[13px] text-ink-3">
          <Ping />
          <span className="text-[12.5px] font-bold tracking-[0.16em] text-ink uppercase">Nantes</span>
          <span aria-hidden="true" className="h-3.5 w-px flex-none bg-line-strong" />
          <span>Loire-Atlantique · Pays de la Loire</span>
        </Reveal>
        <Reveal as="h1" className="max-w-[20ch] text-[clamp(2.4rem,5.4vw,4.4rem)]">
          Intégration et formation à l'IA pour les entreprises nantaises.
        </Reveal>
        <Reveal as="p" className="lead">
          Jegsen est basé à Nantes. Nous aidons les PME et ETI de Loire-Atlantique et des Pays de la Loire à identifier
          les processus rentables à automatiser, à les mettre en production dans leurs outils et à former leurs équipes,
          avec une présence sur site aux moments qui comptent.
        </Reveal>
        <Reveal className="mt-7">
          <ButtonRow>
            <LinkButton href="/contact" arrow>
              Prendre rendez-vous
            </LinkButton>
          </ButtonRow>
        </Reveal>
      </PageHero>

      <SplitSection
        eyebrow="Pourquoi un partenaire local"
        title="L'IA se déploie auprès des équipes, pas seulement dans les outils."
      >
        <div className="prose-site">
          <p>
            Un projet d'automatisation réussit quand il part du travail réel : observer comment une facture est traitée,
            comment une demande est triée, où se perdent les minutes. Ce travail se fait mieux dans vos locaux, avec les
            personnes concernées.
          </p>
          <p>
            Même logique pour la formation : des ateliers en présentiel, sur les tâches de chaque métier, ancrent les
            nouveaux usages bien plus sûrement qu'un module en ligne générique.
          </p>
          <p>
            Être à Nantes nous permet d'être présents au lancement, pendant les ateliers et lors de la mise en
            production, sans frais de déplacement disproportionnés pour un projet de PME.
          </p>
        </div>
      </SplitSection>

      <section className="section">
        <div className="container-site">
          <SectionHead eyebrow="Nos offres à Nantes" title="Trois façons de démarrer." />
          <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((o, i) => (
              <OfferCardCompact key={o.slug} offer={o} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      <SplitSection
        eyebrow="Exemples"
        title="Ce que nous automatisons le plus souvent."
        lead="Des tâches de lecture, de vérification et de ressaisie, présentes dans la plupart des entreprises."
      >
        <CaseLinks />
        <p className="mt-6 text-ink-2">
          Méthode, contrôles et budget :{" "}
          <Link href="/automatisation-ia-nantes" className="underline underline-offset-3">
            notre offre d'automatisation IA à Nantes
          </Link>
          .
        </p>
      </SplitSection>

      <FaqSection title="Travailler avec nous depuis Nantes." items={faq} />

      <CtaBlock
        title="Un projet IA à Nantes ?"
        lead="Un premier échange de 30 minutes, dans vos locaux ou en visio, pour regarder un de vos processus et estimer le gain."
      />
    </>
  )
}
