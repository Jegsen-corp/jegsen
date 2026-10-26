import type { ReactNode } from "react"

/**
 * Garde les mots composés sur une seule ligne (« peut-elle », « e-mails », « Qu'est-ce »).
 * Les polices du site n'ont pas de trait d'union insécable : on passe par une balise sans retour à la ligne.
 */
export function keepHyphenated(text: ReactNode): ReactNode {
  if (typeof text !== "string" || !text.includes("-")) return text
  return text.split(/(\S*\p{L}-\p{L}\S*)/u).map((part, i) =>
    i % 2 ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    )
  )
}
