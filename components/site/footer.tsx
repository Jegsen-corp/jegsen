import Link from "next/link"
import { offerHref, offers } from "@/lib/content/offers"
import { caseHref, useCases } from "@/lib/content/cases"
import { companyNav, site } from "@/lib/site"
import { Logo } from "./logo"

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-4 text-[13px] font-semibold tracking-[0.06em] text-ink-3 uppercase">{title}</p>
      <ul className="grid gap-2.5">{children}</ul>
    </div>
  )
}

// Marge interne compensée : la zone tactile atteint 33 px sans changer l'espacement visible.
const linkClass = "-my-1.5 inline-block py-1.5 text-[15px] text-ink-2 transition-colors hover:text-ink"

export function Footer() {
  return (
    <footer className="mt-10 pt-20 pb-10">
      <div className="container-site">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 border-b border-line pb-12 md:grid-cols-4 lg:grid-cols-[1.3fr_repeat(4,1fr)] lg:gap-8">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-[34ch] text-sm text-ink-3">
              L'IA comme levier de rentabilité pour les PME et ETI françaises. Formation, conseil et automatisation des
              processus, depuis {site.city}.
            </p>
          </div>
          <Column title="Offres">
            {offers.map((o) => (
              <li key={o.slug}>
                <Link href={offerHref(o.slug)} className={linkClass}>
                  {o.title}
                </Link>
              </li>
            ))}
          </Column>
          <Column title="Cas d'usage">
            {useCases.map((c) => (
              <li key={c.slug}>
                <Link href={caseHref(c.slug)} className={linkClass}>
                  {c.shortTitle}
                </Link>
              </li>
            ))}
          </Column>
          <Column title="Jegsen">
            {companyNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </Column>
          <Column title="Contact">
            <li>
              <a href={`mailto:${site.email}`} className={linkClass}>
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.linkedin} className={linkClass} target="_blank" rel="noopener">
                LinkedIn
              </a>
            </li>
            <li className="text-sm text-ink-3">
              {site.city}, {site.region}
            </li>
          </Column>
        </div>
        <div className="flex flex-wrap justify-between gap-3 pt-7 text-sm text-ink-3">
          <span>© 2026 Jegsen. Tous droits réservés.</span>
          <span className="flex flex-wrap gap-x-[18px]">
            <Link href="/mentions-legales" className={linkClass}>
              Mentions légales
            </Link>
            <Link href="/confidentialite" className={linkClass}>
              Confidentialité
            </Link>
          </span>
        </div>
        <div aria-hidden="true" className="footer-word">
          Jegsen
        </div>
      </div>
    </footer>
  )
}
