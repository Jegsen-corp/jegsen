import type { Metadata } from "next"
import { HeroBackdrop } from "@/components/motion/ambient"
import { Eyebrow } from "@/components/site/blocks"
import { ButtonRow, LinkButton } from "@/components/site/links"

export const metadata: Metadata = {
  title: { absolute: "Page introuvable | Jegsen" },
  robots: { index: false },
}

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden pt-[150px] pb-[60px]">
      <HeroBackdrop blobs={[1]} />
      <div className="container-site">
        <Eyebrow>Erreur 404</Eyebrow>
        <h1 className="max-w-[18ch] text-[clamp(2.4rem,5.4vw,4.4rem)]">Cette page s’est perdue en chemin.</h1>
        <p className="lead">Pas de panique, le temps gagné ailleurs compense.</p>
        <ButtonRow className="mt-6">
          <LinkButton href="/" arrow>
            Retour à l’accueil
          </LinkButton>
          <LinkButton href="/contact" variant="line">
            Nous contacter
          </LinkButton>
        </ButtonRow>
      </div>
    </section>
  )
}
