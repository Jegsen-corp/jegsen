import type { Metadata } from "next"
import { Suspense } from "react"
import { ContactFormFields } from "@/components/contact/contact-form"
import { Reveal } from "@/components/motion/reveal"
import { Checklist, Crumbs, Eyebrow } from "@/components/site/blocks"
import { HeroBackdrop } from "@/components/motion/ambient"
import { ArrowIcon } from "@/components/site/icon"
import { SiteCard } from "@/components/site/site-card"
import { pageMeta } from "@/lib/metadata"
import { site } from "@/lib/site"

export const metadata: Metadata = pageMeta({
  title: "Contact : parlons de vos processus | Jegsen IA, Nantes",
  description:
    "Un premier échange sur l'automatisation de vos processus par l'IA, un diagnostic ou une formation. Jegsen est basé à Nantes et intervient dans toute la France.",
  path: "/contact",
})

export default function ContactPage() {
  return (
    <section className="relative isolate overflow-hidden pt-[150px] pb-[60px]">
      <HeroBackdrop blobs={[1, 3]} />
      <div className="container-site grid gap-[clamp(32px,6vw,80px)] md:grid-cols-2">
        <div>
          <Crumbs items={[{ label: "Contact" }]} />
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
          </Reveal>
          <Reveal as="h1" className="max-w-[18ch] text-[clamp(2.4rem,5.4vw,4.4rem)]">
            Parlons de vos processus.
          </Reveal>
          <Reveal as="p" className="lead">
            Décrivez-nous en quelques lignes la tâche qui mobilise le plus vos équipes. Nous vous proposons un premier
            échange de 30 minutes pour évaluer si l’automatisation en vaut la peine.
          </Reveal>
          <Reveal className="mt-7">
            <Checklist
              items={[
                "Réponse sous deux jours ouvrés",
                "Échange sans engagement",
                "Basé à Nantes, interventions partout en France",
              ]}
            />
          </Reveal>
          <Reveal className="mt-8 grid gap-2.5">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-2 text-[15px] font-semibold text-ink hover:[&_svg]:translate-x-1"
            >
              <ArrowIcon /> {site.email}
            </a>
          </Reveal>
        </div>
        <SiteCard still className="self-start">
          <Suspense fallback={<div className="min-h-[640px]" />}>
            <ContactFormFields />
          </Suspense>
        </SiteCard>
      </div>
    </section>
  )
}
