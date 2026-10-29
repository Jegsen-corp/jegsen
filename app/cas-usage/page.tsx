import Link from "next/link"
import type { Metadata } from "next"
import { AgentsScene, BrainScene, CustomScene, DeliveryScene, InvoicesScene, MailScene, MinutesScene, RequestsScene, TenderScene } from "@/components/cas-usage/scenes"
import { Reveal } from "@/components/motion/reveal"
import { CtaBlock, Eyebrow, PageHero, SectionHead } from "@/components/site/blocks"
import { Icon } from "@/components/site/icon"
import type { IconShape } from "@/lib/content/types"
import { LinkButton } from "@/components/site/links"
import { caseHref, processCases } from "@/lib/content/cases"
import { pageMeta } from "@/lib/metadata"

export const metadata: Metadata = pageMeta({
  title: "Cas d'usage de l'IA en entreprise | Jegsen IA",
  description:
    "Factures, bons de livraison, e-mails, comptes rendus, demandes entrantes, cerveau d'entreprise, workflows agentiques : les processus et usages techniques que nous mettons en production.",
  path: "/cas-usage",
})

/*
 * Page des cas d'usage : on montre, on n'écrit pas. Chaque processus en une scène animée et une ligne,
 * le sixième emplacement pour votre processus, puis le socle technique en deux scènes et une rangée de
 * pictogrammes. Le détail de chaque cas reste sur sa propre page.
 */

/** Une ligne par processus : ce qui entre, ce qui sort. */
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

export default function UseCasesPage() {
  return (
    <>
      <PageHero blobs={[2]} crumbs={[{ label: "Cas d'usage" }]} className="pb-[20px]">
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

      {/* Six scènes : cinq processus, et le vôtre */}
      <section className="section-tight pt-6">
        <div className="container-site">
          <ul className="m-0 grid list-none gap-[18px] p-0 sm:grid-cols-2 lg:grid-cols-3">
            {processCases.map((c, i) => {
              const o = ONE_LINERS[c.slug]
              const SceneComp = o?.scene ?? InvoicesScene
              return (
                <li key={c.slug} className="group relative">
                  <Reveal delay={(i % 3) * 0.08} className="flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-surface transition-[border-color,box-shadow] duration-500 group-hover:border-line-strong group-hover:shadow-[var(--shadow)]">
                    <div className="bg-[radial-gradient(120%_80%_at_50%_0%,#eef0ff_0%,#f8f8f6_70%)] px-5 pt-5 pb-1">
                      <SceneComp />
                    </div>
                    <div className="flex flex-1 flex-col px-6 pt-4 pb-6">
                      <p className="m-0 mb-1.5 text-[12.5px] font-semibold tracking-[0.02em] text-brand">{c.audiences[0]}</p>
                      <h2 className="mb-2 text-[1.3rem] leading-tight">
                        <Link href={caseHref(c.slug)} className="after:absolute after:inset-0 after:rounded-[24px] after:content-['']">
                          {c.shortTitle}
                        </Link>
                      </h2>
                      <p className="m-0 text-[14.5px] leading-relaxed text-ink-2">{o?.what ?? c.summary}</p>
                      <span aria-hidden="true" className="mt-auto inline-flex items-center gap-2 pt-5 text-[14px] font-semibold text-ink transition-colors group-hover:text-brand">
                        Voir le cas
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </Reveal>
                </li>
              )
            })}
            {/* Votre processus */}
            <li className="group relative sm:col-span-2 lg:col-span-3">
              <Reveal delay={0.16} className="theme-dark grid items-center overflow-hidden rounded-[24px] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]" style={{ background: "#0b0d12" }}>
                <div className="mx-auto w-full max-w-[380px] px-5 pt-5 pb-1 md:py-6">
                  <CustomScene />
                </div>
                <div className="flex flex-col px-6 pt-4 pb-6 md:py-8 md:pr-10">
                  <p className="m-0 mb-1.5 text-[12.5px] font-semibold tracking-[0.02em] text-ink-2">Sur mesure</p>
                  <h2 className="mb-2 text-[1.3rem] leading-tight">Votre processus</h2>
                  <p className="m-0 max-w-[48ch] text-[14.5px] leading-relaxed text-ink-2">Décrivez la tâche qui mobilise le plus vos équipes. On vous dit si elle se prête à l'automatisation.</p>
                  <div className="pt-5">
                    <LinkButton href="/contact" variant="inverse" size="md" arrow>
                      Nous écrire
                    </LinkButton>
                  </div>
                </div>
              </Reveal>
            </li>
          </ul>
        </div>
      </section>

      {/* Le socle technique : deux scènes, puis des pictogrammes */}
      <section className="section">
        <div className="container-site">
          <SectionHead eyebrow="Le socle" title="Vos données, organisées et branchées." lead="Derrière chaque automatisation, la même base." />
          <div className="grid gap-[18px] md:grid-cols-2">
            {[
              { href: "/cas-usage/cerveau-entreprise", title: "Cerveau d'entreprise", what: "Vos documents rassemblés, interrogeables, qui citent leurs sources.", Scene: BrainScene },
              { href: "/cas-usage/workflows-agentiques", title: "Workflows agentiques", what: "Des agents qui agissent dans vos outils, sous contrôle humain.", Scene: AgentsScene },
            ].map((t, i) => (
              <Reveal key={t.href} delay={i * 0.08} className="group relative overflow-hidden rounded-[24px] border border-line bg-surface transition-[border-color,box-shadow] duration-500 hover:border-line-strong hover:shadow-[var(--shadow)]">
                <div className="bg-[radial-gradient(120%_80%_at_50%_0%,#eef0ff_0%,#f8f8f6_70%)] px-6 pt-5 pb-1">
                  <t.Scene />
                </div>
                <div className="px-6 pt-4 pb-6">
                  <h3 className="mb-1.5 text-[1.3rem]">
                    <Link href={t.href} className="after:absolute after:inset-0 after:content-['']">
                      {t.title}
                    </Link>
                  </h3>
                  <p className="m-0 text-[14.5px] text-ink-2">{t.what}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal as="ul" className="m-0 mt-[18px] grid list-none gap-x-6 gap-y-3 rounded-[24px] border border-line bg-surface/70 p-6 sm:grid-cols-2 lg:grid-cols-3">
            {TECH.map((t) => (
              <li key={t.title} className="flex items-center gap-3 text-[14.5px] font-medium text-ink">
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
