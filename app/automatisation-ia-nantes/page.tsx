import Link from "next/link"
import type { Metadata } from "next"
import { Ping } from "@/components/motion/ambient"
import { Reveal } from "@/components/motion/reveal"
import { CtaBlock, PageHero, SectionHead } from "@/components/site/blocks"
import { JsonLd } from "@/components/site/json-ld"
import { ArrowLink, ButtonRow, LinkButton } from "@/components/site/links"
import { OfferCardCompact } from "@/components/site/offer-card"
import { FaqSection, MethodSection, SplitSection } from "@/components/site/sections"
import { SiteCard } from "@/components/site/site-card"
import { caseHref, processCases } from "@/lib/content/cases"
import { entryOffers } from "@/lib/content/offers"
import { pageMeta } from "@/lib/metadata"
import { site } from "@/lib/site"

const path = "/automatisation-ia-nantes"
const title = "Automatisation IA à Nantes pour PME et ETI | Jegsen IA"
const description =
  "Automatisation des processus par l'IA à Nantes : factures, e-mails, bons de livraison, demandes clients. Branchée sur vos outils, avec validation humaine des exceptions."

export const metadata: Metadata = pageMeta({ title, description, path })

const steps = [
  {
    title: "Un échange sur un processus précis",
    text: "30 minutes, dans vos locaux à Nantes ou en visio. Nous regardons comment le travail se fait aujourd'hui : qui reçoit quoi, combien de fois, et où se perd le temps.",
  },
  {
    title: "Un chiffrage avant de construire",
    text: "Volumes, temps passé, taux d'erreur, gain attendu. Si l'automatisation n'est pas rentable sur ce processus, nous le disons et nous nous arrêtons là.",
  },
  {
    title: "Une mise en production dans vos outils",
    text: "Le workflow est branché sur votre messagerie, votre GED, votre ERP ou votre logiciel métier. Un sprint d'intégration dure de deux à six semaines.",
  },
  {
    title: "Des exceptions confiées à une personne",
    text: "Les cas incertains sont transmis à un collaborateur avec les éléments utiles. Chaque action est tracée, et les gains sont mesurés par rapport au point de départ.",
  },
]

const faq = [
  {
    q: "Quels processus peut-on automatiser avec l'IA ?",
    a: "Ceux qui reposent sur la lecture, le tri, la vérification et la ressaisie d'informations : factures fournisseurs, bons de livraison, e-mails entrants, demandes de devis, comptes rendus. Plus le volume est régulier et les règles claires, plus le gain est net.",
  },
  {
    q: "Quelle différence avec une automatisation classique ?",
    a: "Une automatisation classique suit des règles fixes et bute sur les documents ou les messages qui varient. L'IA sait lire un document non standard ou comprendre une demande formulée librement. Nous combinons les deux : des règles là où elles suffisent, l'IA là où le contenu varie.",
  },
  {
    q: "Combien coûte une automatisation par l'IA ?",
    a: "Un sprint d'intégration est établi sur devis, à partir de 5 000 € HT selon le processus et les outils à connecter. Le diagnostic de rentabilité, forfait de 1 900 € HT déduit du sprint si vous l'enchaînez, permet de chiffrer le gain avant d'engager ce budget.",
  },
  {
    q: "Faut-il changer de logiciels ?",
    a: "Non. L'automatisation se branche sur les outils que vos équipes utilisent déjà. Si un logiciel ne permet aucun échange de données, nous le signalons au moment du chiffrage.",
  },
  {
    q: "Que se passe-t-il quand l'IA se trompe ?",
    a: "Chaque workflow comporte des contrôles de cohérence. Ce qui ne passe pas les contrôles, ou ce qui engage l'entreprise (paiement, envoi à un client), est soumis à une validation humaine avant toute action.",
  },
  {
    q: "Intervenez-vous autour de Nantes ?",
    a: "Oui, dans toute la Loire-Atlantique et les Pays de la Loire, de Saint-Nazaire à Ancenis, sur site aux étapes qui le demandent. Ailleurs en France, le travail se fait à distance avec des déplacements ponctuels.",
  },
]

export default function AutomatisationNantesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${site.url}${path}#service`,
          name: "Automatisation des processus par l'IA à Nantes",
          serviceType: "Automatisation des processus métier par l'intelligence artificielle",
          description,
          url: `${site.url}${path}`,
          provider: { "@id": `${site.url}/#organisation` },
          areaServed: [
            { "@type": "City", name: "Nantes" },
            { "@type": "AdministrativeArea", name: "Loire-Atlantique" },
            { "@type": "AdministrativeArea", name: "Pays de la Loire" },
          ],
          audience: { "@type": "BusinessAudience", name: "PME et ETI" },
        }}
      />

      <PageHero blobs={[2, 3]} crumbs={[{ label: "Automatisation IA à Nantes" }]}>
        <Reveal as="p" className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-2.5 text-[13px] text-ink-3">
          <Ping />
          <span className="text-[12.5px] font-bold tracking-[0.16em] text-ink uppercase">Nantes</span>
          <span aria-hidden="true" className="h-3.5 w-px flex-none bg-line-strong" />
          <span>Automatisation des processus par l'IA</span>
        </Reveal>
        <Reveal as="h1" className="max-w-[20ch] text-[clamp(2.4rem,5.4vw,4.4rem)]">
          Automatisation IA à Nantes, branchée sur vos outils.
        </Reveal>
        <Reveal as="p" className="lead">
          Jegsen automatise les tâches de lecture, de tri et de ressaisie des PME et ETI nantaises : factures, bons de
          livraison, e-mails, demandes clients. L'IA traite le volume, vos équipes gardent les décisions.
        </Reveal>
        <Reveal className="mt-7">
          <ButtonRow>
            <LinkButton href="/contact?offre=sprint-integration-ia" arrow>
              Parler d'un processus
            </LinkButton>
            <LinkButton href="/offres/diagnostic-rentabilite-ia" variant="line">
              Chiffrer le gain d'abord
            </LinkButton>
          </ButtonRow>
        </Reveal>
      </PageHero>

      <section className="section">
        <div className="container-site">
          <SectionHead
            eyebrow="Ce que nous automatisons"
            title="Les processus qui coûtent le plus de temps."
            lead="Des tâches présentes dans la plupart des entreprises, quel que soit le secteur. Chaque fiche détaille le fonctionnement et les contrôles."
          />
          <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {processCases.map((c, i) => (
              <SiteCard key={c.slug} as="article" delay={i * 0.06} className="flex min-h-full flex-col">
                <h3>{c.shortTitle}</h3>
                <p className="mb-6">{c.summary}</p>
                <div className="mt-auto">
                  <ArrowLink href={caseHref(c.slug)} stretched>
                    Voir le cas d'usage
                  </ArrowLink>
                </div>
              </SiteCard>
            ))}
          </div>
        </div>
      </section>

      <MethodSection
        eyebrow="Méthode"
        title="Du premier échange à la mise en production."
        lead="Un processus à la fois, chiffré avant d'être construit, mesuré une fois en production."
        steps={steps}
      />

      <SplitSection
        eyebrow="Règles ou IA"
        title="L'IA là où le contenu varie, des règles là où elles suffisent."
      >
        <div className="prose-site">
          <p>
            Une automatisation classique enchaîne des règles fixes. Elle fonctionne tant que les documents et les
            messages arrivent toujours sous la même forme. Dès qu'un fournisseur change de modèle de facture ou qu'un
            client formule sa demande autrement, elle s'arrête.
          </p>
          <p>
            L'IA lève ce blocage : elle lit un document non standard, comprend une demande écrite librement, et en
            extrait les informations utiles. Nous la réservons aux étapes qui en ont besoin, et gardons des règles simples
            partout ailleurs, plus prévisibles et moins coûteuses.
          </p>
          <p>
            Quand les demandes sont trop variées pour un enchaînement fixe, nous concevons des{" "}
            <Link href={caseHref("workflows-agentiques")} className="underline underline-offset-3">
              workflows agentiques
            </Link>
            , toujours avec une validation humaine aux étapes qui engagent l'entreprise.
          </p>
        </div>
      </SplitSection>

      <SplitSection
        eyebrow="Pourquoi un partenaire nantais"
        title="Automatiser un processus commence par l'observer."
      >
        <div className="prose-site">
          <p>
            Les meilleures automatisations partent du travail réel : la boîte e-mail partagée, le dossier de factures, le
            tableur qui sert de relais. Ce repérage se fait mieux sur place, avec les personnes qui traitent ces tâches
            chaque jour.
          </p>
          <p>
            Basés à Nantes, nous venons dans vos locaux au lancement, pendant les tests et à la mise en production. Pour
            former vos équipes aux usages quotidiens de l'IA, voir aussi{" "}
            <Link href="/intelligence-artificielle-nantes" className="underline underline-offset-3">
              notre accompagnement IA à Nantes
            </Link>
            .
          </p>
        </div>
      </SplitSection>

      <section className="section">
        <div className="container-site">
          <SectionHead eyebrow="Démarrer" title="Trois façons de commencer." />
          <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {entryOffers.map((o, i) => (
              <OfferCardCompact key={o.slug} offer={o} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      <FaqSection title="Automatisation IA : les questions fréquentes." items={faq} />

      <CtaBlock
        title="Un processus à automatiser ?"
        lead="Décrivez-le en quelques lignes. Nous revenons vers vous pour un échange de 30 minutes, à Nantes ou en visio."
      />
    </>
  )
}
