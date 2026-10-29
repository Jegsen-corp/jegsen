import { Reveal } from "@/components/motion/reveal"

/*
 * Exemples de processus mis en production : un pictogramme dessiné pour chacun (document lu,
 * e-mails triés, compte rendu, demandes priorisées, saisies contrôlées, agents, base de connaissances).
 */

type Ex = { title: string; text: string }

const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }

/** Pictogrammes 28 × 28, choisis d'après le titre de l'exemple. */
function Pictogram({ title }: { title: string }) {
  const t = title.toLowerCase()
  let g: React.ReactNode
  if (t.includes("extraction")) {
    g = (
      <>
        <path d="M7 3.5h9l5 5v16H7z" {...P} />
        <path d="M16 3.5v5h5" {...P} />
        <path d="M3.5 13.5h21" {...P} stroke="var(--brand)" />
        <path d="M10.5 18h7M10.5 21h4" {...P} />
      </>
    )
  } else if (t.includes("e-mail")) {
    g = (
      <>
        <rect x="3.5" y="6.5" width="16" height="12" rx="2" {...P} />
        <path d="M4.5 8l7 5 7-5" {...P} />
        <path d="M18 21.5h6.5M21.5 18.5l3 3-3 3" {...P} stroke="var(--brand)" />
      </>
    )
  } else if (t.includes("compte")) {
    g = (
      <>
        <rect x="4" y="3.5" width="7" height="11" rx="3.5" {...P} />
        <path d="M2 11a5.5 5.5 0 0 0 11 0M7.5 16.5v3" {...P} />
        <path d="M15.5 8h9M15.5 12.5h9M15.5 17h9M10 23h14.5" {...P} stroke="var(--brand)" />
      </>
    )
  } else if (t.includes("qualification")) {
    g = (
      <>
        <path d="M3.5 5h21l-8 9v7.5l-5 2.5v-10z" {...P} />
        <circle cx="22" cy="21" r="3.2" {...P} stroke="var(--brand)" />
      </>
    )
  } else if (t.includes("administratives")) {
    g = (
      <>
        <rect x="3.5" y="4.5" width="21" height="19" rx="2.5" {...P} />
        <path d="M3.5 10.5h21M11 10.5v13" {...P} />
        <path d="M14.5 17.2l2.2 2.2 4.3-4.6" {...P} stroke="var(--brand)" />
      </>
    )
  } else if (t.includes("agentique")) {
    g = (
      <>
        <circle cx="6" cy="7" r="2.8" {...P} />
        <circle cx="22" cy="7" r="2.8" {...P} />
        <circle cx="14" cy="21" r="2.8" {...P} stroke="var(--brand)" />
        <path d="M8.8 7h10.4M7.4 9.4l5.2 9.2M20.6 9.4l-5.2 9.2" {...P} />
      </>
    )
  } else {
    // Cerveau d'entreprise : documents rassemblés et interrogés
    g = (
      <>
        <path d="M5 8.5h11v15H5z" {...P} />
        <path d="M8 5h11v3.5M11 2v3" {...P} />
        <path d="M8 13h5M8 16.5h3" {...P} />
        <circle cx="19.5" cy="18.5" r="3.6" {...P} stroke="var(--brand)" />
        <path d="M22.2 21.2l2.6 2.6" {...P} stroke="var(--brand)" />
      </>
    )
  }
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" className="size-7 text-ink">
      {g}
    </svg>
  )
}

export function ExamplesList({ examples }: { examples: Ex[] }) {
  return (
    <ul className="m-0 grid list-none gap-x-[clamp(32px,5vw,72px)] p-0 md:grid-cols-2">
      {examples.map((ex, i) => (
        <li key={ex.title} className="border-t border-line">
          <Reveal delay={(i % 2) * 0.06} className="grid grid-cols-[52px_minmax(0,1fr)] gap-x-5 py-6">
            <span className="grid size-[52px] place-items-center rounded-2xl border border-line bg-surface shadow-[var(--shadow)]">
              <Pictogram title={ex.title} />
            </span>
            <div>
              <h3 className="mt-0.5 mb-1.5 text-[1.15rem]">{ex.title}</h3>
              <p className="m-0 text-[15px] leading-relaxed text-ink-2">{ex.text}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  )
}
