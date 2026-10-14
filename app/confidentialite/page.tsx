import type { Metadata } from "next"
import { pageMeta } from "@/lib/metadata"
import { legal, site } from "@/lib/site"

export const metadata: Metadata = pageMeta({
  title: "Politique de confidentialité | Jegsen IA",
  description:
    "Comment Jegsen traite les données personnelles transmises via le site : finalités, base légale, destinataires, durée de conservation, droits.",
  path: "/confidentialite",
})

const updated = "13 octobre 2026"

export default function PrivacyPage() {
  const mail = <a href={`mailto:${site.email}`}>{site.email}</a>
  return (
    <section className="pt-[150px] pb-[60px]">
      <div className="container-site prose-site">
        <h1 className="text-[clamp(2.2rem,4.6vw,3.4rem)]">Politique de confidentialité</h1>
        <p className="text-sm text-ink-3">Dernière mise à jour : {updated}</p>

        <h2>Responsable du traitement</h2>
        <p>
          {legal.company}
          {legal.address && `, ${legal.address}`}. Pour toute question sur vos données : {mail}.
        </p>

        <h2>Données collectées</h2>
        <p>
          Par le formulaire de contact : nom et prénom, entreprise, adresse e-mail, téléphone (facultatif), effectif de
          l’entreprise, sujet et contenu de votre message.
        </p>
        <p>
          Le site ne dépose aucun cookie publicitaire ni traceur de mesure d’audience. Les polices de caractères sont
          hébergées avec le site, sans appel à un service tiers. Comme tout serveur web, celui qui héberge le site peut
          enregistrer des journaux techniques (adresse IP, date, page demandée) pour assurer sa sécurité et son bon
          fonctionnement.
        </p>

        <h2>Finalités et base légale</h2>
        <p>
          Vos données servent à répondre à votre demande et, si vous le souhaitez, à préparer une proposition
          commerciale. Ce traitement repose sur les mesures précontractuelles prises à votre demande (article 6.1.b du
          RGPD). Elles ne sont ni vendues, ni louées, ni utilisées pour entraîner des modèles d’intelligence
          artificielle.
        </p>

        <h2>Destinataires</h2>
        <p>
          Vos données sont lues uniquement par les personnes de {legal.company} chargées de traiter votre demande. Pour
          l’acheminer, nous faisons appel à deux prestataires techniques :
        </p>
        <ul>
          <li>
            <strong>FormSubmit</strong> (formsubmit.co), qui reçoit le formulaire et le transmet par e-mail.
          </li>
          <li>
            <strong>Google</strong>, au titre du service Gmail, qui héberge notre boîte de réception.
          </li>
        </ul>
        <p>
          Ces prestataires peuvent traiter les données en dehors de l’Union européenne. Si vous préférez éviter ce
          circuit, écrivez-nous directement à l’adresse ci-dessus.
        </p>

        <h2>Durée de conservation</h2>
        <p>
          Trois ans à compter de notre dernier échange, si aucune relation commerciale ne s’engage. Si vous devenez
          client, vos données sont conservées pendant la durée de la relation, puis pendant les délais imposés par la
          loi, notamment en matière comptable.
        </p>

        <h2>Vos droits</h2>
        <p>
          Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de
          portabilité. Pour les exercer, écrivez à {mail}. Nous répondons dans un délai d’un mois. Vous pouvez aussi
          introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr">cnil.fr</a>).
        </p>
      </div>
    </section>
  )
}
