"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Suspense, useState } from "react"
import { useMotionValueEvent, useScroll } from "framer-motion"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { mainNav } from "@/lib/site"
import { cn } from "@/lib/utils"
import { LinkButton } from "./links"
import { Logo } from "./logo"

function NavLinks({ pathname }: { pathname?: string }) {
  return (
    <>
      {mainNav.map((item) => {
        const active = pathname === item.href || pathname?.startsWith(`${item.href}/`)
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className="rounded-full px-3.5 py-2 text-[15px] font-medium whitespace-nowrap text-ink-2 transition-colors hover:bg-brand-soft hover:text-ink aria-[current=page]:bg-brand-soft aria-[current=page]:text-ink"
          >
            {item.label}
          </Link>
        )
      })}
    </>
  )
}

function ActiveNavLinks() {
  return <NavLinks pathname={usePathname()} />
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8))

  return (
    <header
      data-open={open || undefined}
      className={cn(
        "fixed inset-x-0 top-0 z-[60] border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled && "border-line bg-bg/80 backdrop-blur-[18px] backdrop-saturate-[1.8]",
        open && "bg-bg"
      )}
    >
      <div className="container-site flex h-[72px] items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Navigation principale" className="hidden items-center gap-1 xl:flex">
          <Suspense fallback={<NavLinks />}>
            <ActiveNavLinks />
          </Suspense>
        </nav>
        <div className="flex items-center gap-2.5">
          <LinkButton href="/contact" size="md" arrow className="hidden xl:inline-flex">
            Parlons-en
          </LinkButton>
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
            className="block size-11 rounded-xl border border-line-strong bg-surface text-ink xl:hidden"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cn(
                  "mx-auto my-1 block h-[1.5px] w-[18px] bg-current transition-[translate,rotate,opacity] duration-300 ease-brand",
                  open && i === 0 && "translate-y-[5.5px] rotate-45",
                  open && i === 1 && "opacity-0",
                  open && i === 2 && "-translate-y-[5.5px] -rotate-45"
                )}
              />
            ))}
          </button>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen} modal={false}>
        <SheetContent
          id="mobile-nav"
          side="top"
          showCloseButton={false}
          aria-describedby={undefined}
          onInteractOutside={(e) => {
            // Le bouton burger gère lui-même l’ouverture et la fermeture.
            if ((e.target as Element | null)?.closest("header")) e.preventDefault()
          }}
          className="z-[55] gap-0 data-[side=top]:top-[72px] rounded-none border-b border-line bg-bg px-(--gutter) pt-3 pb-7 shadow-none xl:hidden"
        >
          <SheetTitle className="sr-only">Navigation mobile</SheetTitle>
          <nav
            aria-label="Navigation mobile"
            className="grid"
            onClick={(e) => (e.target as Element).closest("a") && setOpen(false)}
          >
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-line px-1 py-3.5 text-xl font-semibold tracking-[-0.02em]"
              >
                {item.label}
              </Link>
            ))}
            <LinkButton href="/contact" arrow className="mt-[18px] justify-center">
              Réserver un échange
            </LinkButton>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}
