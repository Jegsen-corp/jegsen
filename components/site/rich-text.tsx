import Link from "next/link"
import type { ReactNode } from "react"

const TOKEN = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)|\{\{(.+?)\}\}/g

/** Rend un texte court contenant **gras**, [liens](/chemin) et {{champs à compléter}}. */
export function RichText({ text }: { text: string }) {
  const out: ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(TOKEN)) {
    const i = m.index ?? 0
    if (i > last) out.push(text.slice(last, i))
    if (m[1]) out.push(<strong key={i}>{m[1]}</strong>)
    else if (m[2]) {
      const href = m[3]
      out.push(
        href.startsWith("/") ? (
          <Link key={i} href={href}>
            {m[2]}
          </Link>
        ) : (
          <a key={i} href={href}>
            {m[2]}
          </a>
        )
      )
    } else if (m[4]) out.push(<span key={i} className="todo">{m[4]}</span>)
    last = i + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return <>{out}</>
}
