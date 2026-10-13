import type { IconShape } from "@/lib/content/types"
import { cn } from "@/lib/utils"

/** Icônes au trait de la charte (24 × 24, trait 1,8). */
export function Icon({ shapes, className }: { shapes: IconShape[]; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-[22px]", className)}
    >
      {shapes.map((s, i) => ("d" in s ? <path key={i} d={s.d} /> : <circle key={i} cx={s.cx} cy={s.cy} r={s.r} />))}
    </svg>
  )
}

export const icons = {
  check: [{ d: "M5 12.5l4.5 4.5L19 7.5" }],
  clock: [{ cx: "12", cy: "12", r: "8.5" }, { d: "M12 7.5V12l3 2" }],
  arrow: [{ d: "M5 12h14M13 6l6 6-6 6" }],
  euro: [{ d: "M17.5 6.5A6.5 6.5 0 007 12a6.5 6.5 0 0010.5 5.5M5 10.5h8M5 13.5h8" }],
  plug: [{ d: "M9 3v5M15 3v5M6.5 8h11v3a5.5 5.5 0 01-11 0V8zM12 16.5V21" }],
  people: [
    { cx: "9", cy: "8.5", r: "3.5" },
    { d: "M3 20c.8-3.3 3.2-5 6-5s5.2 1.7 6 5" },
    { cx: "17", cy: "9.5", r: "2.5" },
    { d: "M16.5 14.5c2.3.2 3.9 1.7 4.5 4" },
  ],
  shield: [
    { d: "M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6L12 3z" },
    { d: "M8.8 12l2.2 2.2 4.3-4.4" },
  ],
  chart: [{ d: "M4 20V4M4 20h16" }, { d: "M8 15l3.5-4 3 2.5L20 7" }],
  bolt: [{ d: "M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z" }],
} satisfies Record<string, IconShape[]>

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <Icon
      shapes={icons.arrow}
      className={cn("size-4 transition-transform duration-350 ease-brand", className)}
    />
  )
}
