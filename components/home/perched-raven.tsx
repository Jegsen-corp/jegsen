"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { RavenPixels } from "@/components/home/raven-pixels"
import { useReducedMotion } from "@/components/motion/use-reduced-motion"
import { RAVEN_FLIGHT, RAVEN_STANDING } from "@/lib/raven-sprite"

/*
 * Le corbeau arrive en vol depuis la droite et se pose sur le bord haut de la fenêtre brAIn.
 * Une fois posé, il cligne de l'œil de temps en temps. Sans animation (préférence du système), il est déjà posé.
 * Les deux dessins sont alignés sur la pointe du bec : rangée 8 debout, rangée 14 en vol.
 */

const FLIGHT = [RAVEN_FLIGHT.up, RAVEN_FLIGHT.mid, RAVEN_FLIGHT.down, RAVEN_FLIGHT.mid]
/** Œil fermé : le blanc et l'iris laissent place à une paupière. */
const BLINK = RAVEN_STANDING.map((row, y) =>
  y === 5 ? row.slice(0, 11) + "ll" + row.slice(13) : y === 6 ? row.slice(0, 11) + "KK" + row.slice(13) : row
)

const SW = RAVEN_STANDING[0].length
const SH = RAVEN_STANDING.length
const FW = RAVEN_FLIGHT.mid[0].length
const FH = RAVEN_FLIGHT.mid.length
const BEAK_SHIFT = 14 - 8

const FLY = 1.9 // durée du vol (s)
const BRAKE = 0.32 // ailes levées pour freiner, juste avant de se poser (s)

type Phase = "away" | "flying" | "landing" | "perched"

const px = (n: number) => `calc(var(--u) * ${n})`

function Sprite({ rows, w, h }: { rows: readonly string[]; w: number; h: number }) {
  return (
    <svg viewBox={`-1 -1 ${w + 2} ${h + 2}`} style={{ width: px(w + 2), height: px(h + 2) }} className="block overflow-visible">
      <RavenPixels rows={rows} rim="#3a4466" />
    </svg>
  )
}

export function PerchedRaven({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<Phase>("away")
  const [flap, setFlap] = useState(0)
  const [blink, setBlink] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const shown: Phase = reduce ? "perched" : phase

  // Battements d'ailes pendant le vol
  useEffect(() => {
    if (shown !== "flying") return
    const id = window.setInterval(() => setFlap((f) => (f + 1) % FLIGHT.length), 115)
    return () => window.clearInterval(id)
  }, [shown])

  // Clignement de l'œil, une fois posé
  useEffect(() => {
    if (shown !== "perched" || reduce) return
    let close: number | undefined
    const id = window.setInterval(() => {
      setBlink(true)
      close = window.setTimeout(() => setBlink(false), 140)
    }, 4200)
    return () => {
      window.clearInterval(id)
      window.clearTimeout(close)
    }
  }, [shown, reduce])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const start = () => {
    if (reduce || phase !== "away") return
    setPhase("flying")
    timer.current = window.setTimeout(() => setPhase("landing"), (FLY - BRAKE) * 1000)
  }

  const flying = shown === "flying" || shown === "landing"
  const rows = shown === "landing" ? RAVEN_FLIGHT.up : FLIGHT[flap]

  // Le déclencheur reste immobile à l'endroit du perchoir : l'oiseau, lui, part de hors champ
  return (
    <motion.div
      aria-hidden
      className={"pointer-events-none absolute [--u:2px] sm:[--u:3px] " + className}
      style={{ width: px(SW), height: px(SH) }}
      initial={reduce ? false : "away"}
      whileInView="perched"
      viewport={{ once: true, amount: 0.8 }}
      onViewportEnter={start}
    >
      <motion.div
        className="absolute inset-0"
        style={{ filter: "drop-shadow(0 0 12px #3355ff66)" }}
        onAnimationComplete={(def) => def === "perched" && setPhase("perched")}
        variants={{
          away: { x: 360, y: -260, opacity: 0 },
          perched: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
              // Il arrive presque à l'horizontale puis plonge vers le bord de la fenêtre
              x: { duration: FLY, ease: [0.2, 0.55, 0.35, 1] },
              y: { duration: FLY, ease: [0.5, 0, 0.25, 1] },
              opacity: { duration: 0.25 },
            },
          },
        }}
      >
        {flying ? (
          <div className="absolute" style={{ left: px(-1), top: px(-1 - BEAK_SHIFT) }}>
            <Sprite rows={rows} w={FW} h={FH} />
          </div>
        ) : (
          <div className="absolute" style={{ left: px(-1), top: px(-1) }}>
            <Sprite rows={blink ? BLINK : RAVEN_STANDING} w={SW} h={SH} />
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
