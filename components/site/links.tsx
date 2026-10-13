import Link from "next/link"
import type { ComponentProps, ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowIcon } from "./icon"

type LinkButtonProps = {
  href: string
  children: ReactNode
  variant?: "ink" | "line" | "inverse"
  size?: "xl" | "md"
  arrow?: boolean
  className?: string
}

/** Lien stylé en bouton (Button shadcn + next/link), flèche qui glisse au survol. */
export function LinkButton({ href, children, variant = "ink", size = "xl", arrow, className }: LinkButtonProps) {
  return (
    <Button asChild variant={variant} size={size} className={cn("group", className)}>
      <Link href={href}>
        {children}
        {arrow && (
          <span aria-hidden="true" className="transition-transform duration-350 ease-brand group-hover:translate-x-1">
            →
          </span>
        )}
      </Link>
    </Button>
  )
}

export function ButtonRow({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-wrap gap-3", className)} {...props} />
}

/** Lien « Détails → » ; avec `stretched`, toute la carte devient cliquable. */
export function ArrowLink({
  href,
  children,
  stretched,
  className,
  ...props
}: ComponentProps<typeof Link> & { stretched?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex items-center gap-2 text-[15px] font-semibold text-ink",
        "group-hover/card:[&_svg]:translate-x-1 group-hover/link:[&_svg]:translate-x-1",
        stretched && "stretched",
        className
      )}
      {...props}
    >
      {children}
      <ArrowIcon />
    </Link>
  )
}
