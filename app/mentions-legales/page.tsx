import Link from "next/link"
import type { Metadata } from "next"
import { pageMeta } from "@/lib/metadata"
import { site } from "@/lib/site"

export const metadata: Metadata = pageMeta({
  title: "Mentions légales | Jegsen",
  description:
    "Mentions légales du site Jegsen : éditeur, directeur de la publication, hébergeur, propriété intellectuelle.",
  path: "/mentions-legales",
})

const Todo = ({ children }: { children: React.ReactNode }) => <span className="todo">{children}</span>

export default function LegalNoticePage() {
  return (
    <section className="pt-[150px] pb-[60px]">
      <div className="container-site prose-site">
        <h1 className="text-[clamp(2.2rem,4.6vw,3.4rem)]">Mentions légales</h1>
        <p className="note">Modèle à compléter : les champs surlignés doivent être renseignés avant la mise en ligne.</p>
        <h2>Éditeur du site</h2>
        <p>
          {site.name}, <Todo>forme juridique</Todo> au capital de <Todo>montant</Todo> €
          <br />
          Siège social : <Todo>adresse</Todo>, {site.postalCode} {site.city}
          <br />
          RCS <Todo>ville</Todo> <Todo>n° SIREN</Todo>
          <br />
          TVA intracommunautaire : <Todo>numéro</Todo>
          <br />
          E-mail : <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <h2>Directeur de la publication</h2>
        <p>
          <Todo>Prénom Nom</Todo>, en qualité de <Todo>fonction</Todo>.
        </p>
        <h2>Hébergeur</h2>
        <p>
          <Todo>Raison sociale de l’hébergeur</Todo>, <Todo>adresse</Todo>, <Todo>téléphone</Todo>.
        </p>
        <h2>Propriété intellectuelle</h2>
        <p>
          L’ensemble des contenus de ce site (textes, visuels, logo, code) est la propriété de {site.name}, sauf mention
          contraire. Toute reproduction sans autorisation préalable est interdite.
        </p>
        <h2>Données personnelles</h2>
        <p>
          Voir notre <Link href="/confidentialite">politique de confidentialité</Link>.
        </p>
      </div>
    </section>
  )
}
