import Link from "next/link"
import { cn } from "@/lib/utils"

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("size-8", className)}>
      <path
        d="M32 10A22 22 0 1 1 10 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <circle cx="10" cy="32" r="5.5" fill="var(--brand)" />
      <circle cx="32" cy="32" r="3.4" fill="currentColor" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Jegsen, accueil"
      className={cn(
        "inline-flex items-center gap-2 font-display text-[21px] font-bold tracking-[-0.04em]",
        className
      )}
    >
      <LogoMark />
      Jegsen
    </Link>
  )
}
