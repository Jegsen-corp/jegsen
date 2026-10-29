import Link from "next/link"
import type { Metadata } from "next"
import { AgentsScene, BrainScene, CustomScene, DeliveryScene, InvoicesScene, MailScene, MinutesScene, RequestsScene, TenderScene } from "@/components/cas-usage/scenes"
import { AboveFold, Reveal } from "@/components/motion/reveal"
import { CtaBlock, Crumbs } from "@/components/site/blocks"
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
 * Page des cas d'usage : on montre, on n'écrit pas, et on change de surface pour casser la monotonie.
 * Encre en ouverture (le grand arc du logo), les processus en pleine largeur, scène et texte en
 * alternance, le sur-mesure en bande encre, le socle sur papier, l'appel à l'action en bleu.
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
      {/* Ouverture en encre : le grand arc du logo, le titre, le sommaire */}
      <section data-hero="ink" className="theme-dark relative isolate overflow-hidden bg-[#0b0d12] pt-[clamp(112px,14vw,150px)] pb-[clamp(48px,6vw,80px)]">
        <svg aria-hidden="true" viewBox="0 0 64 64" className="pointer-events-none absolute -top-[18vw] -right-[16vw] -z-10 size-[min(70vw,900px)]">
          <path d="M32 10A22 22 0 1 1 10 32" fill="none" stroke="#ffffff" strokeOpacity="0.055" strokeWidth="7" strokeLinecap="round" />
          <circle cx="10" cy="32" r="5.5" fill="#3355ff" opacity="0.9" />
        </svg>
        <div className="container-site">
          <Crumbs items={[{ label: "Cas d'usage" }]} />
          <AboveFold>
            <Reveal as="h1" className="max-w-[12ch] text-[clamp(2.8rem,7vw,6.4rem)] leading-[0.95] text-ink">
              Ce que l'IA fait à votre place.
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-6 max-w-[40ch] text-[clamp(1.05rem,1.5vw,1.3rem)] leading-relaxed text-ink-2">
              Lire, vérifier, ressaisir, trier. Vous gardez les décisions.
            </Reveal>
            <Reveal delay={0.2} className="mt-[clamp(40px,6vw,80px)] border-t border-line pt-6">
              <ol className="m-0 grid list-none gap-x-8 gap-y-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
                {processCases.map((c, i) => (
                  <li key={c.slug}>
                    <Link href={`#${c.slug}`} className="group inline-flex items-baseline gap-3 py-1 text-ink-2 transition-colors hover:text-ink">
                      <span className="font-display text-[12px] font-semibold tracking-[0.08em] text-ink-3">{pad(i + 1)}</span>
                      <span className="font-display text-[clamp(1rem,1.3vw,1.15rem)] font-semibold tracking-[-0.02em]">{c.shortTitle}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </Reveal>
          </AboveFold>
        </div>
      </section>

      {/* Les processus : scène et texte en alternance, séparés par des filets épais */}
      <section className="pt-[clamp(24px,4vw,56px)] pb-[clamp(56px,7vw,90px)]">
        <div className="container-site">
          <ol className="m-0 list-none p-0">
            {processCases.map((c, i) => {
              const o = ONE_LINERS[c.slug]
              const SceneComp = o?.scene ?? InvoicesScene
              const flip = i % 2 === 1
              return (
                <li key={c.slug} id={c.slug} className="scroll-mt-24 border-t-[1.5px] border-ink last:border-b-[1.5px]">
                  <Reveal className={`grid items-center gap-x-[clamp(32px,5vw,80px)] gap-y-6 py-[clamp(28px,4vw,56px)] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] ${flip ? "md:[&>*:first-child]:order-2" : ""}`}>
                    {/* La scène, posée sur un pavé papier */}
                    <div className="relative rounded-[28px] bg-[#efeee8] px-[clamp(16px,3vw,40px)] py-[clamp(12px,2vw,24px)]">
                      <span aria-hidden="true" className="absolute top-4 left-5 font-display text-[clamp(2.4rem,4vw,3.6rem)] leading-none font-bold tracking-[-0.05em] text-ink/[0.08]">
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

      {/* Votre processus : bande encre */}
      <section className="theme-dark bg-[#0b0d12]">
        <div className="container-site grid items-center gap-x-[clamp(32px,5vw,80px)] gap-y-6 py-[clamp(40px,5vw,72px)] md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <Reveal className="mx-auto w-full max-w-[400px]">
            <CustomScene />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="m-0 mb-3 text-[13px] font-semibold tracking-[0.02em] text-ink-3">Sur mesure</p>
            <h2 className="mb-3 max-w-[14ch] text-[clamp(1.9rem,3.6vw,3.2rem)] leading-[1] text-ink">Votre processus n'est pas dans la liste ?</h2>
            <p className="m-0 max-w-[46ch] text-[clamp(1rem,1.3vw,1.15rem)] leading-relaxed text-ink-2">Décrivez la tâche qui mobilise le plus vos équipes. On vous dit si elle se prête à l'automatisation, en un échange de 30 minutes.</p>
            <div className="mt-7">
              <LinkButton href="/contact" variant="inverse" arrow>
                Nous écrire
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Le socle : sur papier */}
      <section className="bg-[#efeee8] py-[clamp(64px,8vw,120px)]">
        <div className="container-site">
          <Reveal className="mb-[clamp(32px,5vw,56px)] grid items-end gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <h2 className="m-0 max-w-[12ch] text-[clamp(2rem,4vw,3.4rem)] leading-[1]">Le socle : vos données, organisées et branchées.</h2>
            <p className="m-0 max-w-[40ch] text-[clamp(1rem,1.3vw,1.15rem)] leading-relaxed text-ink-2 md:justify-self-end">Derrière chaque automatisation, la même base.</p>
          </Reveal>
          <div className="grid gap-[18px] md:grid-cols-2">
            {[
              { href: "/cas-usage/cerveau-entreprise", title: "Cerveau d'entreprise", what: "Vos documents rassemblés, interrogeables, qui citent leurs sources.", Scene: BrainScene },
              { href: "/cas-usage/workflows-agentiques", title: "Workflows agentiques", what: "Des agents qui agissent dans vos outils, sous contrôle humain.", Scene: AgentsScene },
            ].map((t, i) => (
              <Reveal key={t.href} delay={i * 0.08} className="group relative overflow-hidden rounded-[28px] bg-surface">
                <div className="px-6 pt-5 pb-1">
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
          <Reveal as="ul" className="m-0 mt-[18px] grid list-none gap-x-8 gap-y-4 border-t-[1.5px] border-ink p-0 pt-6 sm:grid-cols-2 lg:grid-cols-3">
            {TECH.map((t) => (
              <li key={t.title} className="flex items-center gap-3 text-[15px] font-medium text-ink">
                <span className="grid size-9 flex-none place-items-center rounded-xl bg-surface text-brand">
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
