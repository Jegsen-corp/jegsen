"use client"

import { useEffect, useState } from "react"
import { MascotPixels } from "@/components/home/mascot-pixels"
import { useReducedMotion } from "@/components/motion/use-reduced-motion"
import { MASCOT_BLINK, MASCOT_STANDING } from "@/lib/mascot-sprite"

/*
 * Page 404 : la mésange, perdue, posée sur un « 404 » en pixels. Elle regarde à gauche, à droite,
 * cligne de l'œil, et un point d'interrogation apparaît au-dessus d'elle.
 * Tout est dessiné sur la même grille de pixels que la mascotte, avec ses couleurs.
 */

const FONT: Record<string, string[]> = {
  "4": ["...#.", "..##.", ".#.#.", "#..#.", "#####", "...#.", "...#."],
  "0": [".###.", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."],
  "?": [".###.", "#...#", "....#", "..##.", "..#..", ".....", "..#.."],
}

/** Dessine un texte en pixels (chaque point de la police fait `scale` pixels), avec un contour bleu nuit. */
function pixelText(text: string, scale: number, gap: number, fill = "B") {
  const glyphs = [...text].map((c) => FONT[c])
  const w = glyphs.length * 5 * scale + (glyphs.length - 1) * gap + 2
  const h = 7 * scale + 2
  const grid = Array.from({ length: h }, () => Array<string>(w).fill("."))
  glyphs.forEach((g, i) => {
    const ox = 1 + i * (5 * scale + gap)
    g.forEach((row, y) =>
      [...row].forEach((c, x) => {
        if (c !== "#") return
        for (let dy = 0; dy < scale; dy++) for (let dx = 0; dx < scale; dx++) grid[1 + y * scale + dy][ox + x * scale + dx] = fill
      })
    )
  })
  // Contour d'un pixel autour des formes
  const out = grid.map((r) => [...r])
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      if (grid[y][x] !== ".") continue
      const near = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => grid[y + dy]?.[x + dx] && grid[y + dy][x + dx] !== ".")
      if (near) out[y][x] = "N"
    }
  // Reflet clair sur le haut de chaque bloc
  for (let y = 1; y < h; y++) for (let x = 0; x < w; x++) if (grid[y][x] === fill && grid[y - 1][x] === ".") out[y][x] = "b"
  return out.map((r) => r.join(""))
}

const DIGITS = pixelText("404", 2, 3)
const QUESTION = pixelText("?", 1, 0)
const DW = DIGITS[0].length // 38
const SW = MASCOT_STANDING[0].length // 20
const SH = MASCOT_STANDING.length // 20
const TOP = 10 // place réservée au point d'interrogation
const BIRD_X = (DW - SW) / 2 // centrée sur le « 0 »
const W = DW
const H = TOP + SH + DIGITS.length - 1

export function LostMascot() {
  const reduce = useReducedMotion()
  const [right, setRight] = useState(false)
  const [blink, setBlink] = useState(false)
  const [asking, setAsking] = useState(true)

  useEffect(() => {
    if (reduce) return
    let t = 0
    const id = window.setInterval(() => {
      t++
      // Toutes les 1,4 s elle tourne la tête, et le point d'interrogation apparaît une fois sur deux
      if (t % 4 === 0) setRight((r) => !r)
      if (t % 8 === 2) setAsking(true)
      if (t % 8 === 6) setAsking(false)
      if (t % 11 === 5) {
        setBlink(true)
        window.setTimeout(() => setBlink(false), 140)
      }
    }, 350)
    return () => window.clearInterval(id)
  }, [reduce])

  const qx = right ? BIRD_X + SW - 2 : BIRD_X - 4
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-[calc(var(--u)*38)] overflow-visible [--u:6px] sm:[--u:8px]"
      role="img"
      aria-label="La mésange de Jegsen, perdue, posée sur le chiffre 404."
    >
      {/* Le « 404 » */}
      <g transform={`translate(0 ${TOP + SH - 1})`}>
        <MascotPixels rows={DIGITS} />
      </g>
      {/* La mésange, qui regarde d'un côté puis de l'autre */}
      <g transform={right ? `translate(${BIRD_X + SW} ${TOP}) scale(-1 1)` : `translate(${BIRD_X} ${TOP})`}>
        <MascotPixels rows={blink ? MASCOT_BLINK : MASCOT_STANDING} />
      </g>
      {/* Le point d'interrogation */}
      <g
        transform={`translate(${qx} 0)`}
        style={{ opacity: asking || reduce ? 1 : 0, transition: reduce ? undefined : "opacity 200ms steps(2)" }}
      >
        <MascotPixels rows={QUESTION} />
      </g>
    </svg>
  )
}
