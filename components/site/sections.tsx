import type { ReactNode } from "react"
import Link from "next/link"
import { Reveal } from "@/components/motion/reveal"
import { Steps } from "@/components/motion/steps"
import { caseHref, useCases } from "@/lib/content/cases"
import type { FaqItem, Step } from "@/lib/content/types"
import { Checklist, Eyebrow, Split } from "./blocks"
import { Faq } from "./faq"

/** Titre collant à gauche, étapes numérotées à droite. */
export function MethodSection({
  eyebrow,
  title,
  lead,
  steps,
  aside,
  className = "section",
}: {
  eyebrow: string
  title: string
  lead?: ReactNode
  steps: Step[]
  aside?: ReactNode
  className?: string
}) {
  return (
    <section className={className}>
      <div className="container-site grid items-start gap-[clamp(32px,6vw,96px)] md:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="md:sticky md:top-[120px]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2>{title}</h2>
          {lead && <p className="lead">{lead}</p>}
          {aside}
        </Reveal>
        <Steps steps={steps} />
      </div>
    </section>
  )
}

/** Section deux colonnes : en-tête à gauche, contenu libre à droite. */
export function SplitSection({
  eyebrow,
  title,
  lead,
  children,
  className = "section-tight",
}: {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section className={className}>
      <Split>
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2>{title}</h2>
          {lead && <p className="lead">{lead}</p>}
        </Reveal>
        <Reveal>{children}</Reveal>
      </Split>
    </section>
  )
}

export function FaqSection({ title, items, eyebrow = "Questions" }: { title: string; items: FaqItem[]; eyebrow?: string }) {
  return (
    <SplitSection eyebrow={eyebrow} title={title}>
      <Faq items={items} />
    </SplitSection>
  )
}

/** Liste de tous les cas d’usage détaillés. */
export function CaseLinks() {
  return (
    <Checklist
      items={useCases.map((c) => (
        <Link key={c.slug} href={caseHref(c.slug)} className="underline underline-offset-3">
          {c.title}
        </Link>
      ))}
    />
  )
}
