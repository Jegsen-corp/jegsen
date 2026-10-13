"use client"

import { motion } from "framer-motion"
import { EASE } from "./reveal"

/** Titre dont les mots apparaissent un à un, flou vers net. */
export function SplitWords({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ")
  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: "0.4em", filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.06 }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </h1>
  )
}
