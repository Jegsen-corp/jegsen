import Link from "next/link"
import type { Metadata } from "next"
import { HeroBackdrop, Ping } from "@/components/motion/ambient"
import { CountUp } from "@/components/motion/count-up"
import { Marquee } from "@/components/motion/marquee"
import { Reveal } from "@/components/motion/reveal"
import { SplitWords } from "@/components/motion/split-words"
import { Steps } from "@/components/motion/steps"
import { BrainDiagram } from "@/components/home/brain-diagram"
import { HeroVisual } from "@/components/home/hero-visual"
import { Pipeline } from "@/components/home/pipeline"
import { CtaBlock, Eyebrow, SectionHead } from "@/components/site/blocks"
import { Faq } from "@/components/site/faq"
import { Icon, icons } from "@/components/site/icon"
import { ButtonRow, LinkButton } from "@/components/site/links"
import { OfferCard } from "@/components/site/offer-card"
import { CardIcon, SiteCard } from "@/components/site/site-card"
import { offers } from "@/lib/content/offers"
import { pageMeta } from "@/lib/metadata"
import { site } from "@/lib/site"

export const metadata: Metadata = pageMeta({ title: site.title, description: site.description, path: "/" })

const tasks = [
  "Extraction de factures",
  "Tri des e-mails",
  "Bons de livraison",
  "Comptes rendus de réunion",
  "Qualification des demandes",
  "Saisie dans l'ERP",
  "Rapprochements comptables",
  "Rapports d'intervention",
  "Réponses aux appels d'offres",
  "Suivi des commandes",
]

const stats = [
  { value: 18, text: "des entreprises de 10 salariés ou plus utilisent au moins une technologie d'IA en 2025." },
  { value: 15, text: "seulement parmi celles de 10 à 49 salariés, contre 58 % au-delà de 250 salariés." },
  { value: 53, text: "des entreprises qui utilisent l'IA disent être freinées par un manque d'expertise." },
  { value: 73, text: "de ces utilisatrices s'en servent pour optimiser leurs coûts : temps, tâches répétitives." },
]

const method = [
  {
    title: "Identifier",
    text: "Nous analysons vos processus, vos volumes et vos coûts pour repérer ceux dont l'automatisation est réellement rentable.",
  },
  {
    title: "Intégrer",
    text: "Nous mettons la solution en production, branchée sur vos outils existants, avec des contrôles et une validation humaine des exceptions.",
  },
  {
    title: "Former",
    text: "Nous formons vos équipes par métier et posons des règles d'utilisation claires pour que les gains se matérialisent.",
  },
  {
    title: "Mesurer",
    text: "Temps de traitement, erreurs, délais : nous comparons les indicateurs avant et après. Ce qui ne rapporte pas est arrêté.",
  },
]

const benefits = [
  { title: "Moins de saisie", text: "Les données arrivent déjà structurées dans vos outils." },
  { title: "Moins d'erreurs", text: "Chaque document est contrôlé selon vos règles métier." },
  { title: "Des délais plus courts", text: "Les dossiers avancent sans attendre une ressaisie." },
]

const commitments = [
  {
    icon: icons.euro,
    title: "Le ROI avant la technique",
    text: "Chaque projet part d'un chiffrage : gain attendu, coût, hypothèses. Si l'IA n'est pas rentable sur un processus, nous vous le disons.",
  },
  {
    icon: icons.plug,
    title: "Intégré à votre SI",
    text: "Nous nous branchons sur votre messagerie, votre GED et vos logiciels métiers. Vos équipes ne changent pas d'outil.",
  },
  {
    icon: icons.people,
    title: "L'humain garde la main",
    text: "Contrôles de cohérence automatiques, exceptions transmises à une personne, traçabilité de chaque action.",
  },
  {
    icon: icons.shield,
    title: "Sécurité et RGPD dès la conception",
    text: "Choix des modèles et de l'hébergement selon la sensibilité de vos données, droits d'accès, journalisation.",
  },
]

const faq = [
  {
    q: "Par quoi commencer ?",
    a: "Par le diagnostic de rentabilité : une à deux semaines pour identifier trois à cinq cas d'usage chiffrés. Si vous avez déjà un processus précis en tête, nous pouvons démarrer directement par un sprint d'intégration.",
  },
  {
    q: "Quelle taille d'entreprise accompagnez-vous ?",
    a: "Les PME et ETI, quel que soit le secteur. Les cas les plus rentables se trouvent souvent là où des documents et des e-mails sont traités à la main en volume : transport, distribution, maintenance, services, industrie.",
  },
  {
    q: "Combien de temps avant de voir des résultats ?",
    a: "Un sprint d'intégration met un processus en production en deux à six semaines. La mesure des gains commence dès la mise en production, par comparaison avec les indicateurs relevés au cadrage.",
  },
  {
    q: "Nos données sont-elles en sécurité ?",
    a: "Le choix des modèles, de l'hébergement et des accès fait partie du cadrage, en fonction de la sensibilité des données et de vos obligations (RGPD, secret professionnel, engagements contractuels).",
  },
  {
    q: "Qu'est-ce qu'un workflow agentique ?",
    a: "Un enchaînement d'étapes confié à un agent IA : comprendre une demande, chercher l'information, agir dans vos logiciels, puis rendre la main à une personne quand une décision l'exige. Nous le réservons aux processus où les demandes sont trop variées pour une automatisation classique.",
  },
  {
    q: "Intervenez-vous hors de Nantes ?",
    a: "Oui. Nous sommes basés à Nantes et intervenons partout en France, sur site ou à distance selon les étapes.",
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[min(100svh,980px)] items-center overflow-hidden pt-[112px] pb-[70px] lg:pt-[140px]">
        <HeroBackdrop blobs={[1, 2, 3]} />
        <div className="container-site grid items-center gap-[clamp(24px,4vw,64px)] lg:grid-cols-[1fr_1.08fr]">
          <div>
            <Reveal as="p" className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-2.5 text-[13px] text-ink-3 tabular-nums">
              <Ping />
              <Link
                href="/intelligence-artificielle-nantes"
                className="border-b border-transparent text-[12.5px] font-bold tracking-[0.16em] text-ink uppercase transition-colors hover:border-current"
              >
                Nantes
              </Link>
              <span aria-hidden="true" className="h-3.5 w-px flex-none bg-line-strong" />
              <span title="Coordonnées de Nantes">47°13′ N · 1°33′ O</span>
            </Reveal>
            <SplitWords
              text="L'IA qui fait gagner du temps à vos équipes."
              className="mb-6 text-[clamp(2.6rem,5.2vw,4.6rem)]"
            />
            <Reveal as="p" delay={0.35} className="lead mb-[34px]">
              Depuis Nantes, nous aidons les PME et ETI à repérer{" "}
              <Link href="/automatisation-ia-nantes" className="underline decoration-line-strong underline-offset-3 hover:decoration-current">
                les processus les plus rentables à automatiser
              </Link>
              , à les
              intégrer dans leur système d'information, à former leurs équipes et à{" "}
              <strong className="text-ink">mesurer les gains obtenus</strong>.
            </Reveal>
            <Reveal delay={0.5}>
              <ButtonRow>
                <LinkButton href="/contact" arrow>
                  Réserver un échange
                </LinkButton>
                <LinkButton href="#offres" variant="line">
                  Découvrir nos offres
                </LinkButton>
              </ButtonRow>
            </Reveal>
            <Reveal delay={0.65} className="mt-[34px] flex flex-wrap gap-x-[18px] gap-y-2 text-sm text-ink-3">
              {["Gains chiffrés avant de construire", "Intégré à vos outils", "Humain dans la boucle"].map((b) => (
                <span key={b} className="inline-flex items-center gap-2">
                  <Icon shapes={icons.check} className="size-4 text-time" />
                  {b}
                </span>
              ))}
            </Reveal>
          </div>
          <Reveal variant="scale" delay={0.2} className="mx-auto mt-2 w-full max-w-[520px] lg:mt-0 lg:max-w-none">
            <HeroVisual />
          </Reveal>
        </div>
      </section>

      <Marquee items={tasks} label="Exemples de tâches automatisables" />

      {/* Le constat */}
      <section className="section">
        <div className="container-site">
          <SectionHead
            eyebrow="Le constat"
            title="L'IA progresse vite. Les PME restent à la traîne."
            lead="L'usage de l'IA a triplé en deux ans dans les entreprises françaises, mais l'écart se creuse selon la taille. Le principal frein n'est pas la technologie : c'est l'expertise pour la mettre en œuvre."
          />
          <Reveal className="grid overflow-hidden rounded-[22px] border border-line bg-surface sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.value}
                className={[
                  "border-line p-[clamp(24px,3vw,36px)]",
                  "border-b last:border-b-0 sm:border-b-0 lg:border-r lg:last:border-r-0",
                  i % 2 === 0 ? "sm:border-r" : "",
                  i < 2 ? "sm:border-b lg:border-b-0" : "",
                ].join(" ")}
              >
                <div className="mb-3.5 font-display text-[clamp(2.6rem,5vw,3.8rem)] leading-none font-semibold tracking-[-0.05em]">
                  <CountUp to={s.value} />
                  <span className="ml-0.5 text-[0.55em] text-ink-3">%</span>
                </div>
                <p className="m-0 text-[15px] text-ink-2">{s.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Offres */}
      <section id="offres" className="section scroll-mt-20 pt-0">
        <div className="container-site">
          <SectionHead
            eyebrow="Nos offres"
            title="Trois façons de transformer l'IA en résultats."
            lead="Commencez petit, mesurez, puis étendez ce qui fonctionne."
          />
          <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((o, i) => (
              <OfferCard key={o.slug} offer={o} delay={i * 0.1} />
            ))}
          </div>
          <Reveal className="mt-8 flex justify-center">
            <LinkButton href="/cas-usage" variant="line" arrow>
              Voir les cas d'usage
            </LinkButton>
          </Reveal>
        </div>
      </section>

      {/* Cerveau d'entreprise */}
      <section className="section pt-0">
        <div className="container-site grid items-center gap-[clamp(32px,6vw,80px)] md:grid-cols-2">
          <Reveal>
            <Eyebrow>Cerveau d'entreprise</Eyebrow>
            <h2>Vos données deviennent le cerveau de votre entreprise.</h2>
            <p className="lead">
              Procédures, contrats, fiches produits, historique des échanges : nous rassemblons ce savoir dispersé dans
              un cerveau d'entreprise que vos équipes interrogent en langage courant, et sur lequel s'appuient toutes vos
              automatisations.
            </p>
            <ButtonRow className="mt-7">
              <LinkButton href="/cas-usage/cerveau-entreprise" arrow>
                Découvrir le cerveau d'entreprise
              </LinkButton>
            </ButtonRow>
          </Reveal>
          <BrainDiagram />
        </div>
      </section>

      {/* Méthode */}
      <section className="section pt-0">
        <div className="container-site grid items-start gap-[clamp(32px,6vw,96px)] md:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="md:sticky md:top-[120px]">
            <Eyebrow>Notre méthode</Eyebrow>
            <h2>Identifier. Intégrer. Former. Mesurer.</h2>
            <p className="lead">
              Pas de cahier des charges de cent pages ni de démonstration sans lendemain : un processus, des
              indicateurs, une mise en production.
            </p>
            <ButtonRow className="mt-7">
              <LinkButton href="/contact" variant="line" arrow>
                Parler de votre processus
              </LinkButton>
            </ButtonRow>
          </Reveal>
          <Steps steps={method} />
        </div>
      </section>

      {/* Produit (section sombre) */}
      <section
        id="produit"
        className="theme-dark section relative mx-[clamp(8px,1.5vw,20px)] overflow-hidden rounded-[clamp(24px,4vw,44px)] bg-[#06070a] before:pointer-events-none before:absolute before:inset-x-[-10%] before:top-[-40%] before:h-[80%] before:bg-[radial-gradient(closest-side,#6f8bff38,#6f8bff14_55%,#0000)]"
      >
        <div className="container-site relative">
          <SectionHead
            eyebrow="Notre produit · en développement"
            title="L'automatisation documentaire, de bout en bout."
            lead="Nous développons, à partir de projets réels, un outil qui récupère vos documents et e-mails, en extrait les données, vérifie leur cohérence, met à jour vos logiciels métiers et signale les exceptions à une personne. Un programme pilote est ouvert à quelques entreprises."
          />
          <Pipeline />
          <div className="mt-12 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <SiteCard key={b.title} delay={i * 0.1}>
                <h3>{b.title}</h3>
                <p className="m-0">{b.text}</p>
              </SiteCard>
            ))}
          </div>
          <Reveal className="mt-10">
            <LinkButton href="/contact?offre=pilote" variant="inverse" arrow>
              Candidater au programme pilote
            </LinkButton>
          </Reveal>
        </div>
      </section>

      {/* Engagements */}
      <section className="section">
        <div className="container-site">
          <SectionHead center eyebrow="Nos engagements" title="Une IA utile, mesurable et maîtrisée." />
          <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
            {commitments.map((c, i) => (
              <SiteCard key={c.title} delay={i * 0.08}>
                <CardIcon>
                  <Icon shapes={c.icon} />
                </CardIcon>
                <h3>{c.title}</h3>
                <p className="m-0">{c.text}</p>
              </SiteCard>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section pt-0">
        <div className="container-site grid gap-[clamp(32px,6vw,80px)] md:grid-cols-2">
          <Reveal>
            <Eyebrow>Questions fréquentes</Eyebrow>
            <h2>Ce que l'on nous demande le plus.</h2>
            <p className="lead">
              Une autre question ?{" "}
              <Link href="/contact" className="underline underline-offset-4">
                Écrivez-nous
              </Link>
              .
            </p>
          </Reveal>
          <Reveal>
            <Faq items={faq} />
          </Reveal>
        </div>
      </section>

      <CtaBlock />
    </>
  )
}
