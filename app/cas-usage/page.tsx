import Link from "next/link"
import type { Metadata } from "next"
import { AgentsScene, BrainScene, CustomScene, DeliveryScene, InvoicesScene, MailScene, MinutesScene, RequestsScene, TenderScene } from "@/components/cas-usage/scenes"
import { Reveal } from "@/components/motion/reveal"
import { CtaBlock, Eyebrow, PageHero, SectionHead } from "@/components/site/blocks"
import { Icon } from "@/components/site/icon"
import { LinkButton } from "@/components/site/links"
import { caseHref, processCases } from "@/lib/content/cases"
import type { IconShape } from "@/lib/content/types"
import { pageMeta } from "@/lib/metadata"

export const metadata: Metadata = pageMeta({
  title: "Cas d'usage de l'IA en entreprise | Jegsen IA",
  description:
    "Factures, bons de livraison, e-mails, comptes rendus, demandes entrantes, appels d'offres, cerveau d'entreprise, workflows agentiques : les processus et usages techniques que nous mettons en production.",
  path: "/cas-usage",
})

/*
 * Page des cas d'usage : on montre, on n'écrit pas. Les processus en pleine largeur, scène et texte
 * en alternance gauche / droite, puis le sur-mesure et le socle technique, dans la charte du site.
 */

const ONE_LINERS: Record<string, { what: string; scene: React.ComponentType }> = {
  "factures-fournisseurs": { what: "Lues, rapprochées, imputées. Les écarts remontent à une personne.", scene: InvoicesScene },
  "bons-de-livraison": { what: "Photographiés, lus, enregistrés dans vos outils, réserves comprises.", scene: DeliveryScene },
  "tri-emails": { what: "Classés, routés, réponses courantes préparées. Vous gardez la main.", scene: MailScene },
  "comptes-rendus": { what: "Notes et enregistrements, transformés en décisions et actions.", scene: MinutesScene },
  "qualification-demandes": { what: "Analysées, priorisées, remises à la bonne personne.", scene: RequestsScene },
  "reponse-appel-offres": { what: "Le dossier lu, les exigences relevées, le mémoire préparé. Vous déposez.", scene: TenderScene },
}

type Tech = { title: string; icon: IconShape[] }
const TECH: Tech[] = [
  { title: "Assistant interne dans Teams", icon: [{ d: "M4 5h16v11H9l-5 4z" }, { d: "M8 9h8M8 12.5h5" }] },
  { title: "Recherche sémantique dans la GED", icon: [{ cx: "10.5", cy: "10.5", r: "6.5" }, { d: "M15.5 15.5L21 21" }] },
  { title: "Connecteurs vers votre SI", icon: [{ d: "M9 3v5M15 3v5M6.5 8h11v3a5.5 5.5 0 01-11 0V8zM12 16.5V21" }] },
  { title: "Tri des tickets de support", icon: [{ d: "M4 7h16v10H4z" }, { d: "M4 11h16M9 7v10" }] },
  { title: "Données pour vos tableaux de bord", icon: [{ d: "M4 20V4M4 20h16" }, { d: "M8 15l3.5-4 3 2.5L20 7" }] },
  { title: "Choix et hébergement des modèles", icon: [{ d: "M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6L12 3z" }, { d: "M8.8 12l2.2 2.2 4.3-4.4" }] },
]

const pad = (n: number) => String(n).padStart(2, "0")

export default function UseCasesPage() {
  return (
    <>
      <PageHero blobs={[2]} crumbs={[{ label: "Cas d'usage" }]}>
        <Reveal>
          <Eyebrow>Cas d'usage</Eyebrow>
        </Reveal>
        <Reveal as="h1" className="max-w-[16ch] text-[clamp(2.4rem,5vw,4.2rem)]">
          Ce que l'IA fait à votre place.
        </Reveal>
        <Reveal as="p" delay={0.1} className="lead max-w-[44ch]">
          Lire, vérifier, ressaisir, trier. Vous gardez les décisions.
        </Reveal>
      </PageHero>

      {/* Les processus : scène et texte en alternance */}
      <section className="section-tight pt-4">
        <div className="container-site">
          <ol className="m-0 list-none p-0">
            {processCases.map((c, i) => {
              const o = ONE_LINERS[c.slug]
              const SceneComp = o?.scene ?? InvoicesScene
              const flip = i % 2 === 1
              return (
                <li key={c.slug} id={c.slug} className="scroll-mt-24 border-t border-line last:border-b">
                  <Reveal className={`grid items-center gap-x-[clamp(32px,5vw,80px)] gap-y-6 py-[clamp(28px,4vw,56px)] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] ${flip ? "md:[&>*:first-child]:order-2" : ""}`}>
                    {/* La scène */}
                    <div className="relative overflow-hidden rounded-[24px] border border-line bg-[radial-gradient(120%_90%_at_50%_0%,#eef0ff_0%,#ffffff_70%)] px-[clamp(16px,3vw,40px)] py-[clamp(12px,2vw,24px)]">
                      <span aria-hidden="true" className="absolute top-4 left-5 font-display text-[clamp(2.4rem,4vw,3.6rem)] leading-none font-bold tracking-[-0.05em] text-brand/[0.1]">
                        {pad(i + 1)}
                      </span>
                      <SceneComp />
                    </div>
                    <div className={flip ? "md:pr-[clamp(0px,3vw,40px)]" : "md:pl-[clamp(0px,3vw,40px)]"}>
                      <p className="m-0 mb-3 text-[13px] font-semibold tracking-[0.02em] text-brand">{c.audiences[0]}</p>
                      <h2 className="mb-3 text-[clamp(1.8rem,3.2vw,2.8rem)] leading-[1]">
                        <Link href={caseHref(c.slug)} className="transition-colors hover:text-brand">
                          {c.shortTitle}
                        </Link>
                      </h2>
                      <p className="m-0 max-w-[36ch] text-[clamp(1rem,1.3vw,1.15rem)] leading-relaxed text-ink-2">{o?.what ?? c.summary}</p>
                      <Link href={caseHref(c.slug)} className="group mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-ink">
                        Voir le cas
                        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* Votre processus */}
      <section className="section-tight pt-0">
        <div className="container-site">
          <Reveal className="theme-dark grid items-center gap-x-[clamp(32px,5vw,80px)] gap-y-6 overflow-hidden rounded-[clamp(24px,4vw,44px)] px-[clamp(24px,4vw,56px)] py-[clamp(32px,4vw,56px)] md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]" style={{ background: "#0b0d12" }}>
            <div className="mx-auto w-full max-w-[400px]">
              <CustomScene />
            </div>
            <div>
              <Eyebrow>Sur mesure</Eyebrow>
              <h2 className="max-w-[16ch]">Votre processus n'est pas dans la liste ?</h2>
              <p className="lead">Décrivez la tâche qui mobilise le plus vos équipes. On vous dit si elle se prête à l'automatisation, en un échange de 30 minutes.</p>
              <div className="mt-7">
                <LinkButton href="/contact" variant="inverse" arrow>
                  Nous écrire
                </LinkButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Le socle technique */}
      <section className="section">
        <div className="container-site">
          <SectionHead eyebrow="Le socle" title="Vos données, organisées et branchées." lead="Derrière chaque automatisation, la même base." />
          <div className="grid gap-[18px] md:grid-cols-2">
            {[
              { href: "/cas-usage/cerveau-entreprise", title: "Cerveau d'entreprise", what: "Vos documents rassemblés, interrogeables, qui citent leurs sources.", Scene: BrainScene },
              { href: "/cas-usage/workflows-agentiques", title: "Workflows agentiques", what: "Des agents qui agissent dans vos outils, sous contrôle humain.", Scene: AgentsScene },
            ].map((t, i) => (
              <Reveal key={t.href} delay={i * 0.08} className="group relative overflow-hidden rounded-[24px] border border-line bg-surface transition-[border-color,box-shadow] duration-500 hover:border-line-strong hover:shadow-[var(--shadow)]">
                <div className="bg-[radial-gradient(120%_90%_at_50%_0%,#eef0ff_0%,#ffffff_70%)] px-6 pt-5 pb-1">
                  <t.Scene />
                </div>
                <div className="px-7 pt-3 pb-7">
                  <h3 className="mb-1.5 text-[1.4rem]">
                    <Link href={t.href} className="after:absolute after:inset-0 after:content-['']">
                      {t.title}
                    </Link>
                  </h3>
                  <p className="m-0 text-[15px] text-ink-2">{t.what}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal as="ul" className="m-0 mt-[18px] grid list-none gap-x-6 gap-y-3 rounded-[24px] border border-line bg-surface p-6 sm:grid-cols-2 lg:grid-cols-3">
            {TECH.map((t) => (
              <li key={t.title} className="flex items-center gap-3 text-[15px] font-medium text-ink">
                <span className="grid size-9 flex-none place-items-center rounded-xl bg-brand-soft text-brand">
                  <Icon shapes={t.icon} className="size-[18px]" />
                </span>
                {t.title}
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBlock
        title="Un processus vous coûte du temps ?"
        lead="Un premier échange de 30 minutes pour estimer le gain sur vos volumes réels, et vous dire si l'automatisation est rentable."
      />
    </>
  )
}
