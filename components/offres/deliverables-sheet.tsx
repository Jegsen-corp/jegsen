import { Reveal } from "@/components/motion/reveal"
import { Icon, icons } from "@/components/site/icon"
import { LogoMark } from "@/components/site/logo"

/*
 * Livrables présentés comme la feuille qui vous est remise : en-tête au symbole Jegsen, une ligne par
 * livrable, coin replié. Le texte reste du texte (lisible, sélectionnable, indexable).
 */
export function DeliverablesSheet({ offerTitle, items }: { offerTitle: string; items: string[] }) {
  return (
    <Reveal variant="scale" className="relative">
      {/* Feuilles du dessous, légèrement décalées */}
      <span aria-hidden="true" className="absolute inset-x-5 -bottom-2.5 top-3 rotate-[1.4deg] rounded-[18px] border border-line bg-surface/70" />
      <div className="relative overflow-hidden rounded-[18px] border border-line bg-surface shadow-[var(--shadow-lg)] [clip-path:polygon(0_0,calc(100%-34px)_0,100%_34px,100%_100%,0_100%)]">
        {/* Coin replié */}
        <span aria-hidden="true" className="absolute top-0 right-0 size-[34px] rounded-bl-[10px] border-b border-l border-line bg-bg-2" />
        <div className="flex items-center gap-3 border-b border-line px-[clamp(22px,3vw,34px)] py-5 pr-14">
          <LogoMark className="size-7 flex-none" />
          <div className="min-w-0">
            <p className="m-0 text-[12.5px] text-ink-3">Livrables</p>
            <p className="m-0 truncate font-display text-[15px] font-semibold tracking-[-0.02em]">{offerTitle}</p>
          </div>
        </div>
        <ul className="m-0 list-none px-[clamp(22px,3vw,34px)] py-2">
          {items.map((d) => (
            <li key={d} className="grid grid-cols-[28px_minmax(0,1fr)] items-start gap-3 border-b border-dashed border-line-strong py-4 last:border-b-0">
              <span aria-hidden="true" className="mt-[1px] grid size-7 place-items-center rounded-lg bg-brand-soft text-brand">
                <Icon shapes={icons.check} className="size-4" />
              </span>
              <span className="pt-0.5 text-[15.5px] leading-snug text-ink">{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}
