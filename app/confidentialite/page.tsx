import type { Metadata } from "next"
import { pageMeta } from "@/lib/metadata"
import { site } from "@/lib/site"

export const metadata: Metadata = pageMeta({
  title: "Politique de confidentialité | Jegsen",
  description:
    "Comment Jegsen traite les données personnelles transmises via le site : finalités, base légale, durée de conservation, droits.",
  path: "/confidentialite",
})

const Todo = ({ children }: { children: React.ReactNode }) => <span className="todo">{children}</span>

export default function PrivacyPage() {
  const mail = <a href={`mailto:${site.email}`}>{site.email}</a>
  return (
    <section className="pt-[150px] pb-[60px]">
      <div className="container-site prose-site">
        <h1 className="text-[clamp(2.2rem,4.6vw,3.4rem)]">Politique de confidentialité</h1>
        <p className="note">
          Modèle à valider : adaptez-le à vos traitements réels (outil de formulaire, CRM, hébergeur) avant la mise en
          ligne.
        </p>
        <h2>Responsable du traitement</h2>
        <p>
          {site.name}, <Todo>adresse du siège</Todo>. Contact : {mail}.
        </p>
        <h2>Données collectées</h2>
        <p>
          Via le formulaire de contact : nom, entreprise, adresse e-mail, téléphone (facultatif), effectif de
          l’entreprise et contenu du message. Aucune autre donnée n’est collectée à des fins commerciales sur ce site.
        </p>
        <h2>Finalité et base légale</h2>
        <p>
          Ces données servent uniquement à répondre à votre demande et, le cas échéant, à établir une proposition
          commerciale. Le traitement repose sur des mesures précontractuelles prises à votre demande (article 6.1.b du
          RGPD).
        </p>
        <h2>Destinataires</h2>
        <p>
          Les données sont destinées aux seules personnes de {site.name} chargées de traiter votre demande, ainsi qu’à
          nos sous-traitants techniques : <Todo>outil de formulaire / messagerie / CRM</Todo>.
        </p>
        <h2>Durée de conservation</h2>
        <p>
          <Todo>Durée</Todo> à compter du dernier contact, sauf relation contractuelle en cours.
        </p>
        <h2>Vos droits</h2>
        <p>
          Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation et d’opposition, ainsi que du
          droit à la portabilité de vos données. Pour les exercer : {mail}. Vous pouvez également introduire une
          réclamation auprès de la CNIL (<a href="https://www.cnil.fr">cnil.fr</a>).
        </p>
        <h2>Cookies et mesure d’audience</h2>
        <p>
          Ce site ne dépose aucun cookie publicitaire ni traceur de mesure d’audience. Les polices de caractères sont
          hébergées sur nos propres serveurs : aucune donnée n’est transmise à un service tiers lors de votre visite.
        </p>
      </div>
    </section>
  )
}
