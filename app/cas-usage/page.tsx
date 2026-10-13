import Link from "next/link"
import type { Metadata } from "next"
import { Reveal } from "@/components/motion/reveal"
import { CtaBlock, Eyebrow, PageHero, SectionHead, Split } from "@/components/site/blocks"
import { ArrowLink, ButtonRow, LinkButton } from "@/components/site/links"
import { OfferFooter, OfferKicker } from "@/components/site/offer-card"
import { SiteCard } from "@/components/site/site-card"
import { caseHref, processCases } from "@/lib/content/cases"
import { pageMeta } from "@/lib/metadata"

export const metadata: Metadata = pageMeta({
  title: "Cas d’usage de l’IA en entreprise | Jegsen",
  description:
    "Factures, bons de livraison, e-mails, comptes rendus, demandes entrantes, cerveau d’entreprise, workflows agentiques : les processus et usages techniques que nous mettons en production.",
  path: "/cas-usage",
})

const techUses: { title: string; href?: string; text: string }[] = [
  {
    title: "Cerveau d’entreprise",
    href: "/cas-usage/cerveau-entreprise",
    text: "Vos documents, procédures et historiques rassemblés dans une base de connaissances interrogeable, qui cite ses sources et respecte vos droits d’accès.",
  },
  {
    title: "Assistant interne connecté à vos outils",
    text: "Un assistant qui répond aux questions des équipes à partir du cerveau d’entreprise, dans Teams, dans le navigateur ou dans votre intranet.",
  },
  {
    title: "Recherche sémantique dans la GED",
    text: "Retrouver un document par ce qu’il dit et non par son nom de fichier, sur l’ensemble de vos dossiers partagés.",
  },
  {
    title: "Workflows agentiques",
    href: "/cas-usage/workflows-agentiques",
    text: "Des agents IA qui enchaînent les actions dans vos outils (créer un ticket, mettre à jour une fiche client, préparer une commande), avec validation humaine des actions sensibles.",
  },
  {
    title: "Intégration des modèles d’IA dans votre SI",
    text: "Connecteurs, API et flux entre les modèles d’IA et votre messagerie, Microsoft 365, CRM, ERP ou logiciels métiers.",
  },
  {
    title: "Tri des tickets de support informatique",
    text: "Classement, priorisation et pré-diagnostic des demandes d’assistance, avec routage vers le bon niveau de support.",
  },
  {
    title: "Données structurées pour vos tableaux de bord",
    text: "Les données extraites des documents et des e-mails alimentent directement vos tableaux de bord et votre reporting.",
  },
  {
    title: "Choix et hébergement des modèles",
    text: "Sélection des modèles selon la tâche, le coût et la sensibilité des données : services cloud, hébergement européen ou installation dans votre environnement.",
  },
]

export default function UseCasesPage() {
  return (
    <>
      <PageHero blobs={[2]} crumbs={[{ label: "Cas d’usage" }]}>
        <Reveal>
          <Eyebrow>Cas d’usage</Eyebrow>
        </Reveal>
        <Reveal as="h1" className="max-w-[18ch] text-[clamp(2.4rem,5.4vw,4.4rem)]">
          Les processus que l’IA automatise le mieux.
        </Reveal>
        <Reveal as="p" className="lead">
          Les gains les plus nets viennent des tâches répétitives, à fort volume, qui consistent à lire, vérifier et
          ressaisir. Ils reposent sur un socle technique : vos données, organisées en un cerveau d’entreprise et reliées
          à vos outils.
        </Reveal>
      </PageHero>

      <section className="section-tight">
        <div className="container-site">
          <SectionHead eyebrow="Processus métier" title="Ce que nous automatisons au quotidien." />
          <div className="grid gap-[18px] sm:grid-cols-2">
            {processCases.map((c, i) => (
              <SiteCard key={c.slug} as="article" delay={(i % 2) * 0.08} className="flex min-h-full flex-col">
                <OfferKicker>{c.audiences.slice(0, 2).join(" · ")}</OfferKicker>
                <h3 className="text-[1.45rem]">{c.title}</h3>
                <p>{c.lead}</p>
                <OfferFooter>
                  <small className="text-[13px] text-ink-3">
                    {c.steps.length} étapes automatisées, validation humaine des exceptions
                  </small>
                  <ArrowLink href={caseHref(c.slug)} stretched>
                    Voir
                  </ArrowLink>
                </OfferFooter>
              </SiteCard>
            ))}
            <SiteCard
              as="article"
              delay={0.08}
              className="theme-dark flex min-h-full flex-col border-transparent hover:border-transparent [&_p]:text-ink-2"
              style={{ background: "#0b0d12" }}
            >
              <OfferKicker className="text-ink-2">Sur mesure</OfferKicker>
              <h3 className="text-[1.45rem]">Votre processus n’est pas dans la liste ?</h3>
              <p>
                Décrivez-nous la tâche qui mobilise le plus vos équipes : nous vous dirons si elle se prête à
                l’automatisation.
              </p>
              <OfferFooter className="border-line-strong">
                <small className="text-[13px] text-ink-3">Premier échange de 30 minutes</small>
                <ArrowLink href="/contact" stretched>
                  Nous écrire
                </ArrowLink>
              </OfferFooter>
            </SiteCard>
          </div>
        </div>
      </section>

      <section className="section">
        <Split>
          <Reveal>
            <Eyebrow>Cas d’usage techniques</Eyebrow>
            <h2>Le socle : vos données, organisées et branchées.</h2>
            <p className="lead">
              Derrière chaque automatisation, la même base : un cerveau d’entreprise construit à partir de vos données,
              des connexions propres avec votre système d’information et, quand le processus le demande, des workflows
              agentiques sous contrôle humain.
            </p>
            <ButtonRow className="mt-6">
              <LinkButton href="/cas-usage/cerveau-entreprise" arrow>
                Le cerveau d’entreprise
              </LinkButton>
              <LinkButton href="/cas-usage/workflows-agentiques" variant="line">
                Les workflows agentiques
              </LinkButton>
            </ButtonRow>
          </Reveal>
          <Reveal as="dl" className="m-0 grid border-t border-line">
            {techUses.map((t) => (
              <div
                key={t.title}
                className="grid gap-x-7 gap-y-2 border-b border-line py-5 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]"
              >
                <dt className="font-display text-[1.05rem] font-semibold tracking-[-0.015em]">
                  {t.href ? (
                    <Link href={t.href} className="underline decoration-brand underline-offset-4">
                      {t.title}
                    </Link>
                  ) : (
                    t.title
                  )}
                </dt>
                <dd className="m-0 text-[15px] text-ink-2">{t.text}</dd>
              </div>
            ))}
          </Reveal>
        </Split>
      </section>

      <CtaBlock
        title="Un processus vous coûte du temps ?"
        lead="Un premier échange de 30 minutes pour estimer le gain sur vos volumes réels, et vous dire si l’automatisation est rentable."
      />
    </>
  )
}
