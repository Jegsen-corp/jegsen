import { MASCOT_PALETTE } from "@/lib/mascot-sprite"

/*
 * La mascotte en pixel art, en SVG. Les pixels voisins de même couleur sont fusionnés par ligne.
 * « rim » ajoute un liseré d'un pixel autour de la silhouette, pour la détacher d'un fond sombre.
 */

type Run = { x: number; y: number; w: number; fill: string }

function runs(rows: readonly string[], rim?: string): Run[] {
  const h = rows.length
  const w = rows[0].length
  const at = (x: number, y: number) => (y >= 0 && y < h && x >= 0 && x < w ? rows[y][x] : ".")
  const cell = (x: number, y: number) => {
    const c = at(x, y)
    if (MASCOT_PALETTE[c]) return MASCOT_PALETTE[c]
    if (rim && [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => MASCOT_PALETTE[at(x + dx, y + dy)])) return rim
    return null
  }
  const out: Run[] = []
  for (let y = -1; y <= h; y++) {
    let x = -1
    while (x <= w) {
      const fill = cell(x, y)
      if (!fill) {
        x++
        continue
      }
      let end = x + 1
      while (end <= w && cell(end, y) === fill) end++
      out.push({ x, y, w: end - x, fill })
      x = end
    }
  }
  return out
}

export function MascotPixels({ rows, rim }: { rows: readonly string[]; rim?: string }) {
  return (
    <g shapeRendering="crispEdges">
      {runs(rows, rim).map((r) => (
        <rect key={`${r.x}.${r.y}`} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />
      ))}
    </g>
  )
}
