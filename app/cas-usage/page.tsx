import Link from "next/link"
import type { Metadata } from "next"
import { Reveal } from "@/components/motion/reveal"
import { CtaBlock, Eyebrow, PageHero, SectionHead, Split } from "@/components/site/blocks"
import { ArrowLink, ButtonRow, LinkButton } from "@/components/site/links"
import { caseHref, processCases } from "@/lib/content/cases"
import { pageMeta } from "@/lib/metadata"

export const metadata: Metadata = pageMeta({
  title: "Cas d'usage de l'IA en entreprise | Jegsen IA",
  description:
    "Factures, bons de livraison, e-mails, comptes rendus, demandes entrantes, cerveau d'entreprise, workflows agentiques : les processus et usages techniques que nous mettons en production.",
  path: "/cas-usage",
})

const techUses: { title: string; href?: string; text: string }[] = [
  {
    title: "Cerveau d'entreprise",
    href: "/cas-usage/cerveau-entreprise",
    text: "Vos documents, procédures et historiques rassemblés dans une base de connaissances interrogeable, qui cite ses sources et respecte vos droits d'accès.",
  },
  {
    title: "Assistant interne connecté à vos outils",
    text: "Un assistant qui répond aux questions des équipes à partir du cerveau d'entreprise, dans Teams, dans le navigateur ou dans votre intranet.",
  },
  {
    title: "Recherche sémantique dans la GED",
    text: "Retrouver un document par ce qu'il dit et non par son nom de fichier, sur l'ensemble de vos dossiers partagés.",
  },
  {
    title: "Workflows agentiques",
    href: "/cas-usage/workflows-agentiques",
    text: "Des agents IA qui enchaînent les actions dans vos outils (créer un ticket, mettre à jour une fiche client, préparer une commande), avec validation humaine des actions sensibles.",
  },
  {
    title: "Intégration des modèles d'IA dans votre SI",
    text: "Connecteurs, API et flux entre les modèles d'IA et votre messagerie, Microsoft 365, CRM, ERP ou logiciels métiers.",
  },
  {
    title: "Tri des tickets de support informatique",
    text: "Classement, priorisation et pré-diagnostic des demandes d'assistance, avec routage vers le bon niveau de support.",
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

const pad = (n: number) => String(n).padStart(2, "0")

export default function UseCasesPage() {
  return (
    <>
      {/* En-tête : le propos à gauche, le sommaire des processus à droite */}
      <PageHero blobs={[2]} crumbs={[{ label: "Cas d'usage" }]}>
        <div className="grid items-start gap-x-[clamp(40px,6vw,96px)] gap-y-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <Reveal>
              <Eyebrow>Cas d'usage</Eyebrow>
            </Reveal>
            <Reveal as="h1" className="max-w-[16ch] text-[clamp(2.4rem,5vw,4.2rem)]">
              Les processus que l'IA automatise le mieux.
            </Reveal>
            <Reveal as="p" delay={0.1} className="lead max-w-[48ch]">
              Les gains les plus nets viennent des tâches répétitives, à fort volume, qui consistent à lire, vérifier et
              ressaisir. Ils reposent sur un socle technique : vos données, organisées en un cerveau d'entreprise et reliées
              à vos outils.
            </Reveal>
          </div>
          <Reveal as="div" delay={0.15} className="lg:pt-10">
            <ol className="m-0 list-none border-t border-line-strong p-0">
              {processCases.map((c, i) => (
                <li key={c.slug} className="border-b border-line">
                  <Link href={`#${c.slug}`} className="group grid grid-cols-[40px_minmax(0,1fr)_auto] items-baseline gap-x-3 py-3.5 text-ink transition-colors hover:text-brand">
                    <span className="font-display text-[12px] font-semibold tracking-[0.06em] text-ink-3">{pad(i + 1)}</span>
                    <span className="font-display text-[clamp(1.05rem,1.4vw,1.2rem)] font-semibold tracking-[-0.02em]">{c.shortTitle}</span>
                    <span aria-hidden="true" className="text-ink-3 transition-transform group-hover:translate-y-0.5">↓</span>
                  </Link>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </PageHero>

      {/* Les processus, un par un : à qui, pourquoi, et la chaîne des étapes automatisées */}
      <section className="section-tight">
        <div className="container-site">
          <SectionHead eyebrow="Processus métier" title="Ce que nous automatisons au quotidien." />
          <ol className="m-0 list-none border-t border-line-strong p-0">
            {processCases.map((c, i) => (
              <li key={c.slug} id={c.slug} className="scroll-mt-24 border-b border-line">
                <Reveal className="grid gap-x-[clamp(32px,5vw,80px)] gap-y-6 py-[clamp(28px,4vw,48px)] md:grid-cols-[48px_minmax(0,1fr)_minmax(0,0.9fr)]">
                  <span className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] leading-none font-semibold tracking-[-0.04em] text-ink-3/70">{pad(i + 1)}</span>
                  <div>
                    <p className="mb-2 text-[13px] font-semibold tracking-[0.02em] text-brand">{c.audiences.slice(0, 2).join(", ")}</p>
                    <h3 className="mb-3 text-[clamp(1.3rem,2vw,1.7rem)]">
                      <Link href={caseHref(c.slug)} className="transition-colors hover:text-brand">
                        {c.title}
                      </Link>
                    </h3>
                    <p className="m-0 max-w-[56ch] text-[15.5px] leading-relaxed text-ink-2">{c.lead}</p>
                    <ArrowLink href={caseHref(c.slug)} className="mt-5">
                      Voir le détail
                    </ArrowLink>
                  </div>
                  {/* La chaîne des étapes : ce que l'automatisation enchaîne, puis la personne qui décide */}
                  <ol className="m-0 list-none p-0 text-[14px] md:pt-1">
                    {c.steps.map((s, k) => (
                      <li key={s.title} className="relative grid grid-cols-[22px_minmax(0,1fr)] gap-x-3 pb-3.5">
                        {k < c.steps.length ? <span aria-hidden="true" className="absolute top-5 bottom-0 left-[8.5px] w-px bg-line-strong" /> : null}
                        <span aria-hidden="true" className="relative z-10 mt-[3px] grid size-[18px] place-items-center rounded-full border border-brand/40 bg-surface">
                          <span className="size-1.5 rounded-full bg-brand" />
                        </span>
                        <span className="text-ink-2">{s.title}</span>
                      </li>
                    ))}
                    <li className="relative grid grid-cols-[22px_minmax(0,1fr)] gap-x-3">
                      <span aria-hidden="true" className="relative z-10 mt-[3px] grid size-[18px] place-items-center rounded-full bg-time">
                        <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden="true">
                          <path d="M3 6.2l2 2 4-4.4" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="font-medium text-time">Une personne valide les exceptions</span>
                    </li>
                  </ol>
                </Reveal>
              </li>
            ))}
          </ol>

          {/* Processus hors liste */}
          <Reveal className="theme-dark mt-[clamp(28px,4vw,48px)] grid items-center gap-6 rounded-[24px] px-[clamp(24px,3.5vw,44px)] py-[clamp(28px,3.5vw,40px)] md:grid-cols-[minmax(0,1fr)_auto]" style={{ background: "#0b0d12" }}>
            <div>
              <p className="m-0 mb-2 text-[13px] font-semibold tracking-[0.02em] text-ink-2">Sur mesure</p>
              <h3 className="mb-2 text-[clamp(1.3rem,2vw,1.7rem)]">Votre processus n'est pas dans la liste ?</h3>
              <p className="m-0 max-w-[60ch] text-[15.5px] text-ink-2">
                Décrivez-nous la tâche qui mobilise le plus vos équipes : nous vous dirons si elle se prête à l'automatisation, en un échange de 30 minutes.
              </p>
            </div>
            <LinkButton href="/contact" variant="inverse" arrow>
              Nous écrire
            </LinkButton>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <Split>
          <Reveal>
            <Eyebrow>Cas d'usage techniques</Eyebrow>
            <h2>Le socle : vos données, organisées et branchées.</h2>
            <p className="lead">
              Derrière chaque automatisation, la même base : un cerveau d'entreprise construit à partir de vos données,
              des connexions propres avec votre système d'information et, quand le processus le demande, des workflows
              agentiques sous contrôle humain.
            </p>
            <ButtonRow className="mt-6">
              <LinkButton href="/cas-usage/cerveau-entreprise" arrow>
                Le cerveau d'entreprise
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
        lead="Un premier échange de 30 minutes pour estimer le gain sur vos volumes réels, et vous dire si l'automatisation est rentable."
      />
    </>
  )
}
