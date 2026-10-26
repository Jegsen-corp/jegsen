import Link from "next/link"
import type { Metadata } from "next"
import { ArticleLayout, articleMetadata } from "@/components/site/article-layout"

export const metadata: Metadata = articleMetadata("facture-electronique-ia")

export default function FactureElectroniqueIaArticle() {
  return (
    <ArticleLayout slug="facture-electronique-ia">
      <div className="note mb-8"><strong>En bref.</strong> Toutes les entreprises doivent pouvoir recevoir des factures électroniques depuis le 1er septembre 2026. Les PME devront en émettre à partir du 1er septembre 2027. Les données arrivent désormais structurées, mais le rapprochement, l'imputation et le contrôle restent à faire : c'est là que l'automatisation garde tout son intérêt.</div>
      <h2>Le calendrier</h2>
      <ul>
        <li><strong>Depuis le 1er septembre 2026</strong> : toutes les entreprises assujetties à la TVA doivent être en mesure de recevoir des factures électroniques. Les grandes entreprises et les ETI doivent aussi les émettre sous ce format.</li>
        <li><strong>À partir du 1er septembre 2027</strong> : l'obligation d'émission s'étend aux PME et aux micro-entreprises.</li>
      </ul>
      <p>Les factures transitent par des plateformes agréées par l'administration, dont la liste est publiée sur impots.gouv.fr. L'administration fiscale indique que la généralisation est effective depuis le 1er septembre 2026.</p>
      <h2>Facturation électronique et e-reporting : deux obligations distinctes</h2>
      <p>La facturation électronique concerne les transactions entre entreprises assujetties à la TVA établies en France. Les opérations avec des entreprises étrangères ou avec des particuliers relèvent d'une autre obligation, l'e-reporting : la transmission de données de transaction à l'administration.</p>
      <p>Conséquence pratique : une partie de vos achats continuera d'arriver hors du circuit des plateformes, notamment les factures de fournisseurs établis à l'étranger.</p>
      <h2>Ce que la réforme automatise, et ce qu'elle laisse à faire</h2>
      <p>Une facture électronique arrive avec des données structurées : fournisseur, montants, TVA, lignes. La lecture du document, qui demandait une saisie ou un outil de reconnaissance de caractères, devient donc beaucoup plus simple pour les factures concernées.</p>
      <p>En revanche, la réforme ne fait pas à votre place :</p>
      <ul>
        <li><strong>le rapprochement</strong> avec le bon de commande et la réception : la quantité facturée a-t-elle été livrée, au prix convenu ?</li>
        <li><strong>l'imputation</strong> : compte comptable, axe analytique, centre de coût.</li>
        <li><strong>le contrôle des anomalies</strong> : doublons, écarts de prix, changement de coordonnées bancaires d'un fournisseur.</li>
        <li><strong>le traitement des pièces hors circuit</strong> : factures étrangères, bons de livraison, notes et justificatifs.</li>
        <li><strong>le circuit de validation</strong> interne avant paiement.</li>
      </ul>
      <p>Ce sont précisément des tâches de vérification et de rapprochement, répétitives et à fort volume, que l'IA et l'automatisation traitent bien, à condition de laisser à une personne les cas qui sortent des règles.</p>
      <h2>Par où commencer</h2>
      <ol>
        <li>Vérifier avec votre expert-comptable et votre éditeur de logiciel que la réception via une plateforme agréée est opérationnelle.</li>
        <li>Mesurer votre circuit actuel : nombre de factures par mois, temps de traitement, part des factures avec écart.</li>
        <li>Identifier ce qui reste manuel une fois les données reçues structurées : c'est le périmètre utile de l'automatisation.</li>
      </ol>
      <p>Nous détaillons ce circuit dans notre page <Link href="/cas-usage/factures-fournisseurs">automatisation des factures fournisseurs</Link>, et la façon d'en estimer la rentabilité dans notre article sur <Link href="/ressources/roi-projet-ia">le calcul du retour sur investissement</Link>.</p>
      <h2>Sources</h2>
      <ul>
        <li><a href="https://www.impots.gouv.fr/professionnel/je-passe-la-facturation-electronique" target="_blank" rel="noopener noreferrer">impots.gouv.fr : « Je passe à la facturation électronique »</a> : réforme effective depuis le 1er septembre 2026, liste des plateformes agréées</li>
        <li><a href="https://www.entreprises.cci-paris-idf.fr/actualites/facturation-electronique-une-obligation-pour-toutes-les-entreprises" target="_blank" rel="noopener noreferrer">CCI Paris Île-de-France : « Facturation électronique, une obligation pour toutes les entreprises », 27 mars 2026</a> : calendrier de réception et d'émission</li>
        <li><a href="https://www.cegid.com/fr/facture-electronique-obligatoire/calendrier-facture-electronique/" target="_blank" rel="noopener noreferrer">Cegid : « Comprendre le calendrier de la facture électronique 2026 et 2027 », mis à jour le 25 août 2026</a> : distinction entre facturation électronique et e-reporting</li>
      </ul>
    </ArticleLayout>
  )
}
