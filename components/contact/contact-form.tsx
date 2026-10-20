"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState, type FormEvent, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const subjects = [
  { value: "diagnostic-rentabilite-ia", label: "Diagnostic de rentabilité IA" },
  { value: "sprint-integration-ia", label: "Sprint d'intégration IA" },
  { value: "programme-formation-ia", label: "Programme IA et adoption" },
  { value: "pilote", label: "Programme pilote (automatisation documentaire)" },
  { value: "autre", label: "Autre demande" },
]

const sizes = [
  { value: "1-9", label: "1 à 9 salariés" },
  { value: "10-49", label: "10 à 49 salariés" },
  { value: "50-249", label: "50 à 249 salariés" },
  { value: "250-4999", label: "250 à 4 999 salariés" },
  { value: "5000+", label: "5 000 salariés et plus" },
]

const fieldClass =
  "h-auto min-w-0 w-full rounded-[14px] border-line-strong bg-surface px-[15px] py-[13px] text-base! text-ink shadow-none transition-[border-color,box-shadow] focus-visible:border-brand focus-visible:ring-4 focus-visible:ring-brand-soft"

function Field({ id, label, children, className }: { id: string; label: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("grid min-w-0 gap-[7px]", className)}>
      <Label htmlFor={id} className="text-sm font-semibold">
        {label}
      </Label>
      {children}
    </div>
  )
}

function Row({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>
}

/** Formulaire relié au paramètre `?offre=` de l'URL (à placer sous un Suspense). */
export function ContactFormFields() {
  const params = useSearchParams()
  const initial = params.get("offre")
  const [subject, setSubject] = useState(
    subjects.some((s) => s.value === initial) ? (initial as string) : subjects[0].value
  )
  const [size, setSize] = useState(sizes[0].value)
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState("")
  const [sending, setSending] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (String(data.get("hp") || "").trim()) return // piège à robots
    data.set("subject", subject)
    data.set("size", size)
    const subjectLabel = subjects.find((s) => s.value === subject)?.label ?? "Contact"
    const sizeLabel = sizes.find((s) => s.value === size)?.label ?? size

    if (!site.formEndpoint) {
      const body = [
        `Nom : ${data.get("name")}`,
        `Entreprise : ${data.get("company")}`,
        `Taille : ${sizeLabel}`,
        `E-mail : ${data.get("email")}`,
        `Téléphone : ${data.get("phone") || "non renseigné"}`,
        "",
        String(data.get("message") || ""),
      ].join("\n")
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`[Site] ${subjectLabel}`)}&body=${encodeURIComponent(body)}`
      setStatus("Votre messagerie s'ouvre avec le message pré-rempli. Il ne reste qu'à l'envoyer.")
      return
    }

    setSending(true)
    data.delete("hp")
    data.set("size", sizeLabel)
    data.set("subject", subjectLabel)
    data.set("_subject", `[Site Jegsen] ${subjectLabel}`)
    data.set("_replyto", String(data.get("email") || ""))
    data.set("_template", "table")
    data.set("_captcha", "false")
    try {
      const res = await fetch(site.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || json.success === false || json.success === "false") throw new Error(String(res.status))
      form.reset()
      setConsent(false)
      setStatus("Merci, votre message est bien parti.")
    } catch {
      setStatus(`L'envoi a échoué. Écrivez-nous directement à ${site.email}.`)
    } finally {
      setSending(false)
    }
  }

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <Row>
        <Field id="name" label="Nom et prénom">
          <Input id="name" name="name" required autoComplete="name" className={fieldClass} />
        </Field>
        <Field id="company" label="Entreprise">
          <Input id="company" name="company" required autoComplete="organization" className={fieldClass} />
        </Field>
      </Row>
      <Row>
        <Field id="email" label="E-mail professionnel">
          <Input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
        </Field>
        <Field id="phone" label="Téléphone (facultatif)">
          <Input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
        </Field>
      </Row>
      <Row>
        <Field id="subject" label="Sujet">
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger id="subject" className={cn(fieldClass, "data-[size=default]:h-auto")}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper" className="rounded-[14px]">
              {subjects.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field id="size" label="Effectif">
          <Select value={size} onValueChange={setSize}>
            <SelectTrigger id="size" className={cn(fieldClass, "data-[size=default]:h-auto")}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper" className="rounded-[14px]">
              {sizes.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </Row>
      <Field id="message" label="Votre besoin">
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Quel processus vous prend le plus de temps ? Quels outils utilisez-vous ? Quels volumes (documents, e-mails, demandes) par mois ?"
          className={cn(fieldClass, "min-h-[150px] resize-y")}
        />
      </Field>
      <input
        type="text"
        name="hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        defaultValue=""
        className="pointer-events-none absolute -left-[9999px] size-0 opacity-0"
      />
      <div className="grid grid-cols-[20px_1fr] gap-2.5 text-sm text-ink-2">
        <Checkbox
          id="consent"
          name="consent"
          required
          checked={consent}
          onCheckedChange={(v) => setConsent(v === true)}
          className="mt-0.5 border-line-strong data-[state=checked]:border-brand data-[state=checked]:bg-brand"
        />
        <label htmlFor="consent">
          J'accepte que mes données soient utilisées pour répondre à ma demande, conformément à la{" "}
          <Link href="/confidentialite" className="underline underline-offset-3">
            politique de confidentialité
          </Link>
          .
        </label>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button type="submit" variant="ink" size="xl" disabled={sending} className="group">
          Envoyer
          <span aria-hidden="true" className="transition-transform duration-350 ease-brand group-hover:translate-x-1">
            →
          </span>
        </Button>
      </div>
      <p role="status" className="m-0 min-h-[1.4em] text-[15px] text-ink-2">
        {status}
      </p>
    </form>
  )
}
