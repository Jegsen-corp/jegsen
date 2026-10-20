/**
 * Titre dont les mots apparaissent un à un (opacité et translation).
 * Animation CSS : elle démarre dès le premier affichage, sans attendre le JavaScript,
 * et reste composée par le navigateur (pas de filtre flou).
 */
export function SplitWords({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ")
  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true">
          <span className="word-in" style={{ animationDelay: `${50 + i * 45}ms` }}>
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </h1>
  )
}
