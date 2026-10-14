import Link from "next/link"
import type { Metadata } from "next"
import { pageMeta } from "@/lib/metadata"
import { legal, site } from "@/lib/site"

export const metadata: Metadata = pageMeta({
  title: "Mentions légales | Jegsen IA",
  description:
    "Mentions légales du site Jegsen : éditeur, directeur de la publication, hébergeur, propriété intellectuelle.",
  path: "/mentions-legales",
})

// Signale au build les mentions obligatoires encore vides (loi n° 2004-575 du 21 juin 2004, article 6 III).
const missing = [
  !legal.legalForm && "forme juridique",
  !legal.capital && "capital social",
  !legal.address && "siège social",
  !legal.registration && "immatriculation (RCS)",
  !legal.director && "directeur de la publication",
  !legal.host.name && "hébergeur",
].filter(Boolean)
if (missing.length) console.warn(`[mentions légales] À renseigner dans lib/site.ts (legal) : ${missing.join(", ")}`)

const updated = "13 octobre 2026"

export default function LegalNoticePage() {
  const identity = [legal.company, legal.legalForm, legal.capital && `au capital de ${legal.capital}`]
    .filter(Boolean)
    .join(", ")
  const host = [legal.host.name, legal.host.address, legal.host.phone].filter(Boolean).join(", ")
  return (
    <section className="pt-[150px] pb-[60px]">
      <div className="container-site prose-site">
        <h1 className="text-[clamp(2.2rem,4.6vw,3.4rem)]">Mentions légales</h1>
        <p className="text-sm text-ink-3">Dernière mise à jour : {updated}</p>

        <h2>Éditeur du site</h2>
        <p>
          Le site {site.url.replace("https://", "")} est édité par {identity}.
          {legal.address && (
            <>
              <br />
              Siège social : {legal.address}
            </>
          )}
          {legal.registration && (
            <>
              <br />
              {legal.registration}
            </>
          )}
          {legal.vat && (
            <>
              <br />
              TVA intracommunautaire : {legal.vat}
            </>
          )}
          <br />
          E-mail : <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>

        {legal.director && (
          <>
            <h2>Directeur de la publication</h2>
            <p>
              {legal.director}
              {legal.directorRole && `, ${legal.directorRole}`}.
            </p>
          </>
        )}

        {host && (
          <>
            <h2>Hébergement</h2>
            <p>{host}.</p>
          </>
        )}

        <h2>Propriété intellectuelle</h2>
        <p>
          Les textes, visuels, animations, le logo et le code de ce site sont la propriété de {legal.company}, sauf
          mention contraire. Toute reproduction, représentation ou adaptation, totale ou partielle, sans autorisation
          écrite préalable est interdite.
        </p>
        <p>
          Les polices de caractères Inter et Inter Tight sont l’œuvre de Rasmus Andersson et sont utilisées sous licence
          SIL Open Font License 1.1.
        </p>

        <h2>Responsabilité</h2>
        <p>
          Les informations publiées sur ce site sont fournies à titre indicatif. Elles ne constituent pas un conseil
          juridique, fiscal ou comptable. Les prix indiqués sont des prix de départ hors taxes, précisés dans chaque devis.
        </p>
        <p>
          Les liens vers des sites externes sont proposés pour faciliter la consultation de sources. {legal.company} n’est
          pas responsable de leur contenu.
        </p>

        <h2>Données personnelles</h2>
        <p>
          Le traitement des données transmises par le formulaire de contact est décrit dans notre{" "}
          <Link href="/confidentialite">politique de confidentialité</Link>.
        </p>
      </div>
    </section>
  )
}
