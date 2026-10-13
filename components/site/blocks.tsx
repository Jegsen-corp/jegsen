import { Fragment, type ReactNode } from "react"
import Link from "next/link"
import { HeroBackdrop, SpinGlow } from "@/components/motion/ambient"
import { Reveal } from "@/components/motion/reveal"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"
import { ButtonRow, LinkButton } from "./links"
import { JsonLd, breadcrumbLd } from "./json-ld"

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("eyebrow", className)}>{children}</span>
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  center,
  className,
}: {
  eyebrow: ReactNode
  title?: ReactNode
  lead?: ReactNode
  center?: boolean
  className?: string
}) {
  return (
    <Reveal
      className={cn(
        "mb-[clamp(40px,6vw,72px)] max-w-[760px]",
        center && "mx-auto text-center [&_.lead]:mx-auto",
        className
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      {title && <h2>{title}</h2>}
      {lead && <p className="lead">{lead}</p>}
    </Reveal>
  )
}

export type Crumb = { label: string; href?: string }

export function Crumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: "Accueil", href: "/" }, ...items]
  return (
    <>
      <JsonLd data={breadcrumbLd(all)} />
      <Breadcrumb aria-label="Fil d'Ariane" className="mb-[26px]">
        <BreadcrumbList className="gap-2 text-sm text-ink-3 sm:gap-2">
          {all.map((c, i) => (
            <Fragment key={c.label}>
              <BreadcrumbItem>
                {c.href && i < all.length - 1 ? (
                  <BreadcrumbLink asChild className="hover:text-ink">
                    <Link href={c.href}>{c.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="text-ink-3">{c.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {i < all.length - 1 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  )
}

/** En-tête des pages intérieures. */
export function PageHero({
  crumbs,
  blobs,
  className,
  containerClassName,
  children,
}: {
  crumbs?: Crumb[]
  blobs?: (1 | 2 | 3)[]
  className?: string
  containerClassName?: string
  children: ReactNode
}) {
  return (
    <section className={cn("relative isolate overflow-hidden pt-[150px] pb-[60px]", className)}>
      {blobs && <HeroBackdrop blobs={blobs} />}
      <div className={cn("container-site", containerClassName)}>
        {crumbs && <Crumbs items={crumbs} />}
        {children}
      </div>
    </section>
  )
}

export function Facts({ facts, delay }: { facts: { label: string; value: string }[]; delay?: number }) {
  return (
    <Reveal delay={delay} className="mt-[30px] flex flex-wrap gap-2.5">
      {facts.map((f) => (
        <div key={f.value} className="min-w-[180px] rounded-2xl border border-line bg-surface px-[18px] py-3.5">
          <small className="block text-xs font-semibold tracking-[0.06em] text-ink-3 uppercase">{f.label}</small>
          <strong className="font-display text-[19px] tracking-[-0.02em]">{f.value}</strong>
        </div>
      ))}
    </Reveal>
  )
}

export function Checklist({ items, className }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={cn("checklist", className)}>
      {items.map((item, i) => (
        <li key={i}>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Deux colonnes : titre à gauche, contenu à droite. */
export function Split({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("container-site grid gap-[clamp(32px,6vw,80px)] md:grid-cols-2", className)}>{children}</div>
  )
}

export function CtaBlock({
  title = "Combien l’IA peut-elle vous faire gagner ?",
  lead = "Un premier échange de 30 minutes pour regarder un de vos processus et vous dire, chiffres à l’appui, si l’automatisation en vaut la peine.",
}: {
  title?: string
  lead?: string
}) {
  return (
    <section className="section-tight">
      <div className="container-site">
        <Reveal
          variant="scale"
          className="relative isolate overflow-hidden rounded-[clamp(24px,4vw,44px)] border border-line bg-surface px-(--gutter) py-[clamp(56px,8vw,110px)] text-center"
        >
          <SpinGlow />
          <Eyebrow>Premier échange offert</Eyebrow>
          <h2 className="mx-auto max-w-[16ch]">{title}</h2>
          <p className="lead mx-auto mb-8">{lead}</p>
          <ButtonRow className="justify-center">
            <LinkButton href="/contact" arrow>
              Réserver un échange
            </LinkButton>
            <LinkButton href="/offres/diagnostic-rentabilite-ia" variant="line">
              Voir le diagnostic
            </LinkButton>
          </ButtonRow>
        </Reveal>
      </div>
    </section>
  )
}

/** Espace réservé pendant le chargement d’une page dépendant de l’URL. */
export function PageFallback() {
  return <div aria-hidden="true" className="min-h-svh" />
}
