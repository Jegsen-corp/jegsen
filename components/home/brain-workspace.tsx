"use client"

import { motion, type Variants } from "framer-motion"
import { EASE } from "@/components/motion/reveal"
import { useReducedMotion } from "@/components/motion/use-reduced-motion"
import { PerchedRaven } from "@/components/home/perched-raven"
import { product } from "@/lib/content/product"

/*
 * Illustration centrale du produit : une décision de CODIR préparée par brAIn.
 * Volontairement épurée : la question, trois options, la recommandation, un contre-argument,
 * et la main laissée au CODIR. Données fictives, signalées dans la fenêtre.
 */

const sources = ["Ventes", "Prévisionnel", "Comptes rendus du CODIR"]

const options = [
  { key: "A", title: "Ouvrir l'agence en mars 2027", verdict: "Fort potentiel, risque élevé", pick: false },
  { key: "B", title: "Tester avec un commercial itinérant", verdict: "Investissement limité, réversible", pick: true },
  { key: "C", title: "Reporter à 2028", verdict: "Aucun risque, occasion manquée", pick: false },
]

const appear = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { delay, duration: 0.6, ease: EASE } },
})

const T = { question: 0.1, sources: 0.35, options: 0.6, pick: 1.25, counter: 1.55, codir: 1.85 }

function Mark() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden>
      <circle cx="12" cy="12" r="9" fill="none" stroke="var(--line-strong)" strokeWidth="2" />
      <path d="M12 3 A9 9 0 1 1 3.3 14.3" fill="none" stroke="var(--brand)" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2.4" fill="var(--brand)" />
    </svg>
  )
}

function Option({ o, i }: { o: (typeof options)[number]; i: number }) {
  return (
    <motion.li
      variants={appear(T.options + i * 0.1)}
      className={
        "relative flex items-center gap-4 rounded-[16px] border px-4 py-3.5 sm:px-5 " +
        (o.pick ? "border-[color:var(--brand)] bg-[#141a33]" : "border-line")
      }
    >
      {o.pick && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-[16px]"
          style={{ boxShadow: "0 0 0 1px var(--brand), 0 20px 60px -20px #7d96ffaa" }}
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: T.pick, duration: 0.8 } } }}
        />
      )}
      <span
        className={
          "grid size-7 shrink-0 place-items-center rounded-full text-[12.5px] font-semibold " +
          (o.pick ? "bg-[color:var(--brand)] text-[#0b0d12]" : "border border-line-strong text-ink-3")
        }
      >
        {o.key}
      </span>
      <span className="grid min-w-0 gap-0.5">
        <span className={"text-[15px] leading-snug font-medium " + (o.pick ? "text-ink" : "text-ink-2")}>{o.title}</span>
        <span className="text-[12.5px] text-ink-3">{o.verdict}</span>
      </span>
      {o.pick && (
        <motion.span
          variants={appear(T.pick + 0.1)}
          className="ml-auto hidden shrink-0 rounded-full bg-[color:var(--brand)]/15 px-2.5 py-1 text-[12px] font-medium text-[color:var(--brand)] sm:inline"
        >
          Recommandée
        </motion.span>
      )}
    </motion.li>
  )
}

export function BrainWorkspace() {
  const reduce = useReducedMotion()

  return (
    <figure className="relative m-0 mt-14">
      <figcaption className="sr-only">
        Exemple fictif d&apos;une décision préparée par {product.name} : faut-il ouvrir une agence à Angers en
        2027 ? À partir des ventes, du prévisionnel et des comptes rendus du CODIR, {product.name} compare trois
        options et recommande de tester avec un commercial itinérant. Il rappelle qu&apos;une agence ouverte à
        Rennes en 2023 a mis 18 mois à être rentable. La décision revient au CODIR.
      </figcaption>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[12%] -top-8 h-[70%] rounded-full bg-[radial-gradient(closest-side,#7d96ff2e,#0000)] blur-2xl"
      />

      <div className="relative mx-auto max-w-[1000px]">
        {/* Le corbeau de Jegsen se pose sur le bord haut de la fenêtre */}
        <PerchedRaven className="right-[9%] bottom-[calc(100%-2px)] z-10" />
        <motion.div
          aria-hidden
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative overflow-hidden rounded-[22px] border border-line-strong bg-[linear-gradient(180deg,#10131b,#0b0d12)] shadow-[0_40px_120px_-40px_#000]"
        >
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6">
            <div className="flex items-center gap-2.5 text-[13px]">
              <Mark />
              <b className="font-semibold tracking-tight text-ink">{product.name}</b>
            </div>
            <span className="text-[12px] text-ink-3">Exemple fictif</span>
          </div>

          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 lg:p-10">
            {/* La question et ce sur quoi elle s'appuie */}
            <div className="grid content-start gap-6">
              <motion.div variants={appear(T.question)} className="grid gap-2.5">
                <span className="text-[12.5px] text-ink-3">Décision à prendre</span>
                <p className="m-0 font-display text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.15] font-semibold tracking-[-0.02em] text-ink">
                  Faut-il ouvrir une agence à Angers en 2027 ?
                </p>
              </motion.div>

              <motion.ul variants={appear(T.sources)} className="m-0 flex list-none flex-wrap items-center gap-2 p-0">
                <li className="pr-1 text-[12.5px] text-ink-3">Sources</li>
                {sources.map((s) => (
                  <li key={s} className="rounded-full border border-line px-3 py-1 text-[12.5px] text-ink-3">
                    {s}
                  </li>
                ))}
              </motion.ul>

              <motion.p
                variants={appear(T.counter)}
                className="m-0 border-l-2 border-[color:var(--warn)] pl-4 text-[14px] leading-relaxed text-ink-2"
              >
                <span className="block text-[12.5px] text-[color:var(--warn)]">Contre-argument</span>
                L&apos;agence de Rennes a mis 18 mois à être rentable, contre 12 prévus.
              </motion.p>
            </div>

            {/* Les options, la recommandation, et la main au CODIR */}
            <div className="grid content-start gap-4">
              <ul className="m-0 grid list-none gap-2.5 p-0">
                {options.map((o, i) => (
                  <Option key={o.key} o={o} i={i} />
                ))}
              </ul>
              <motion.p variants={appear(T.codir)} className="m-0 flex items-center gap-2.5 pl-1 text-[13px] text-ink-3">
                <svg viewBox="0 0 16 16" className="size-4 shrink-0" aria-hidden>
                  <circle cx="8" cy="8" r="7" fill="none" stroke="var(--line-strong)" strokeWidth="1.4" />
                  <path d="M5 8.2l2 2 4-4.4" fill="none" stroke="var(--ink-3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {product.name} recommande. Le CODIR tranche.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </figure>
  )
}
