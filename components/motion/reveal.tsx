"use client"

import { createContext, useContext } from "react"
import { motion, type HTMLMotionProps } from "framer-motion"

export const EASE = [0.2, 0.7, 0.1, 1] as const

/**
 * Haut de page (hero) : le contenu est visible dès le premier affichage, sans fondu depuis l'opacité 0.
 * Un texte rendu à opacité 0 n'est pas compté comme affiché par le navigateur, ce qui retarde le
 * Largest Contentful Paint (LCP) jusqu'à la fin de l'animation.
 */
const AboveFoldContext = createContext(false)

export function AboveFold({ children }: { children: React.ReactNode }) {
  return <AboveFoldContext.Provider value={true}>{children}</AboveFoldContext.Provider>
}

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number
  /** "up" : glisse vers le haut ; "scale" : léger zoom. */
  variant?: "up" | "scale"
  as?: "div" | "section" | "article" | "ul" | "dl" | "p" | "span" | "h1" | "header"
}

/** Apparition au défilement, une seule fois. En haut de page : léger glissement, sans fondu. */
export function Reveal({
  delay = 0,
  variant = "up",
  as = "div",
  children,
  ...props
}: RevealProps) {
  const aboveFold = useContext(AboveFoldContext)
  const Comp = motion[as] as typeof motion.div

  if (aboveFold) {
    const from = variant === "scale" ? { scale: 0.98 } : { y: 12 }
    return (
      <Comp
        initial={from}
        animate={{ y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: delay * 0.5 }}
        {...props}
      >
        {children}
      </Comp>
    )
  }

  const hidden = variant === "scale" ? { opacity: 0, scale: 0.96 } : { opacity: 0, y: 26 }
  return (
    <Comp
      initial={hidden}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...props}
    >
      {children}
    </Comp>
  )
}
