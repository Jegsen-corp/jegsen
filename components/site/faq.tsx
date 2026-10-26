import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { FaqItem } from "@/lib/content/types"
import { RichText } from "./rich-text"
import { JsonLd, faqLd } from "./json-ld"
import { keepHyphenated } from "./typo"

/** Questions fréquentes (Accordion shadcn), avec données structurées FAQPage. */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <>
      <JsonLd data={faqLd(items)} />
      <Accordion type="multiple" className="border-t border-line">
        {items.map((item) => (
          <AccordionItem key={item.q} value={item.q} className="border-b border-line not-last:border-b">
            <AccordionTrigger
              className="group/faq items-center gap-6 rounded-none py-[26px] font-display text-[clamp(1.1rem,1.8vw,1.3rem)] font-semibold tracking-[-0.02em] hover:no-underline focus-visible:ring-0 **:data-[slot=accordion-trigger-icon]:hidden"
            >
              <span>{keepHyphenated(item.q)}</span>
              <span
                aria-hidden="true"
                className="relative size-[34px] flex-none rounded-full border border-line-strong transition-[transform,background-color,color] duration-400 ease-brand group-aria-expanded/faq:rotate-180 group-aria-expanded/faq:bg-ink group-aria-expanded/faq:text-bg before:absolute before:top-1/2 before:left-1/2 before:h-[1.5px] before:w-3 before:-translate-1/2 before:bg-current after:absolute after:top-1/2 after:left-1/2 after:h-[1.5px] after:w-3 after:-translate-1/2 after:rotate-90 after:bg-current after:transition-transform after:duration-400 group-aria-expanded/faq:after:rotate-0"
              />
            </AccordionTrigger>
            <AccordionContent className="pb-[26px] text-base text-ink-2 sm:pr-[60px]">
              <RichText text={item.a} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}
