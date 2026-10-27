"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { MascotPixels } from "@/components/home/mascot-pixels"
import { useReducedMotion } from "@/components/motion/use-reduced-motion"
import { MASCOT_FLIGHT, MASCOT_STANDING } from "@/lib/mascot-sprite"

/*
 * Message envoyé : la mésange apparaît à côté du bouton, une enveloppe au bec, puis s'envole vers le haut
 * de la page. Tournée vers la droite (dessin retourné), dans le sens de son envol.
 * Sans animation (préférence du système), elle reste posée avec l'enveloppe.
 */

const ENVELOPE = [
  "NNNNNNNNN",
  "NbWWWWWbN",
  "NWbWWWbWN",
  "NWWbWbWWN",
  "NWWWBWWWN",
  "NWWWWWWWN",
  "NNNNNNNNN",
]

const FLIGHT = [MASCOT_FLIGHT.up, MASCOT_FLIGHT.mid, MASCOT_FLIGHT.down, MASCOT_FLIGHT.mid]
const HOLD = 700 // posée, enveloppe au bec (ms)
const FLY = 1.6 // durée de l'envol (s)

/** Retourne le dessin pour qu'elle regarde à droite : le bec, à gauche du dessin, passe à droite (x = 20). */
const FACE_RIGHT = "translate(20 0) scale(-1 1)"

export function MascotSend() {
  const reduce = useReducedMotion()
  const [flying, setFlying] = useState(false)
  const [flap, setFlap] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = window.setTimeout(() => setFlying(true), HOLD)
    return () => window.clearTimeout(id)
  }, [reduce])

  useEffect(() => {
    if (!flying) return
    const id = window.setInterval(() => setFlap((f) => (f + 1) % FLIGHT.length), 100)
    return () => window.clearInterval(id)
  }, [flying])

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none relative h-[66px] w-[96px] shrink-0 self-center"
      initial={reduce ? false : { scale: 0.6, opacity: 0 }}
      animate={
        flying
          ? { x: [0, 40, 320], y: [0, -30, -260], opacity: [1, 1, 0], scale: 1 }
          : { x: 0, y: 0, opacity: 1, scale: 1 }
      }
      transition={
        flying
          ? { duration: FLY, times: [0, 0.25, 1], ease: [0.45, 0, 0.6, 1] }
          : { type: "spring", stiffness: 420, damping: 18 }
      }
    >
      <svg viewBox="-2 -2 32 22" className="absolute inset-0 size-full overflow-visible" shapeRendering="crispEdges">
        <g transform={FACE_RIGHT}>
          <MascotPixels rows={flying ? FLIGHT[flap] : MASCOT_STANDING} />
        </g>
        {/* L'enveloppe, tenue au bec */}
        <g transform="translate(19 5)">
          <MascotPixels rows={ENVELOPE} />
        </g>
      </svg>
    </motion.div>
  )
}
