import Link from "next/link"
import type { Metadata } from "next"
import { ArticleLayout, articleMetadata } from "@/components/site/article-layout"

export const metadata: Metadata = articleMetadata("roi-projet-ia")

export default function RoiProjetIaArticle() {
  return (
    <ArticleLayout slug="roi-projet-ia">
      <div className="note mb-8"><strong>En bref.</strong> Le gain d'une automatisation se calcule à partir de vos volumes, du temps réellement économisé et du coût horaire chargé. Il faut en retrancher le coût de mise en place, les coûts récurrents et le temps passé sur les exceptions. Un gain de temps ne devient un gain financier que si ce temps est réaffecté.</div>
      <p>Selon l'Insee, 73 % des entreprises françaises qui utilisent l'IA déclarent le faire pour optimiser leurs coûts : gain de temps, de main-d'œuvre, automatisation de tâches répétitives. Encore faut-il pouvoir chiffrer ce gain avant d'investir. Voici la méthode que nous appliquons.</p>
      <h2>1. Le gain annuel brut</h2>
      <p><strong>Gain brut = volume annuel × temps économisé par unité × coût horaire chargé</strong></p>
      <ul>
        <li><strong>Volume annuel</strong> : nombre de factures, d'e-mails, de demandes ou de comptes rendus traités par an. Partez de vos chiffres réels, pas d'une estimation de tête.</li>
        <li><strong>Temps économisé par unité</strong> : temps actuel moins temps résiduel. Le temps résiduel inclut la relecture et le traitement des exceptions : il n'est jamais nul.</li>
        <li><strong>Coût horaire chargé</strong> : salaire brut, charges patronales et frais de poste, rapportés aux heures réellement travaillées.</li>
      </ul>
      <h2>2. Les coûts</h2>
      <ul>
        <li><strong>Mise en place</strong> : cadrage, développement, intégration, tests, formation des utilisateurs.</li>
        <li><strong>Coûts récurrents</strong> : licences, consommation des modèles d'IA, hébergement, maintenance et évolutions.</li>
        <li><strong>Coûts cachés</strong> : préparation des données, temps des équipes pendant le projet, supervision des exceptions.</li>
      </ul>
      <h2>3. Le retour sur investissement</h2>
      <p><strong>Gain net mensuel = (gain brut annuel − coûts récurrents annuels) ÷ 12</strong></p>
      <p><strong>Délai de retour = coût de mise en place ÷ gain net mensuel</strong></p>
      <h2>Exemple chiffré</h2>
      <p>Exemple fictif, à titre d'illustration : une PME reçoit 1 500 factures fournisseurs par mois. Leur traitement prend 6 minutes par facture. Après automatisation, il reste 1,5 minute en moyenne (relecture et exceptions comprises). Le coût horaire chargé est de 35 €.</p>
      <div className="overflow-x-auto">
        <table className="mt-2 mb-5 w-full border-collapse text-[15px]">
          <tbody>
            <tr>
              <td className="border-b border-line px-3 py-2">Factures par an</td>
              <td className="border-b border-line px-3 py-2 text-right whitespace-nowrap tabular-nums">18 000</td>
            </tr>
            <tr>
              <td className="border-b border-line px-3 py-2">Temps économisé par facture</td>
              <td className="border-b border-line px-3 py-2 text-right whitespace-nowrap tabular-nums">4,5 min</td>
            </tr>
            <tr>
              <td className="border-b border-line px-3 py-2">Heures économisées par an</td>
              <td className="border-b border-line px-3 py-2 text-right whitespace-nowrap tabular-nums">1 350 h</td>
            </tr>
            <tr>
              <td className="border-b border-line px-3 py-2">Gain brut annuel (× 35 €)</td>
              <td className="border-b border-line px-3 py-2 text-right whitespace-nowrap tabular-nums font-bold text-ink">47 250 €</td>
            </tr>
            <tr>
              <td className="border-b border-line px-3 py-2">Mise en place</td>
              <td className="border-b border-line px-3 py-2 text-right whitespace-nowrap tabular-nums">12 000 €</td>
            </tr>
            <tr>
              <td className="border-b border-line px-3 py-2">Coûts récurrents (300 € par mois)</td>
              <td className="border-b border-line px-3 py-2 text-right whitespace-nowrap tabular-nums">3 600 € par an</td>
            </tr>
            <tr>
              <td className="border-b border-line px-3 py-2">Gain net mensuel</td>
              <td className="border-b border-line px-3 py-2 text-right whitespace-nowrap tabular-nums">3 637,50 €</td>
            </tr>
            <tr>
              <td className="border-b border-line px-3 py-2">Délai de retour</td>
              <td className="border-b border-line px-3 py-2 text-right whitespace-nowrap tabular-nums font-bold text-ink">environ 3,3 mois</td>
            </tr>
            <tr>
              <td className="border-b border-line px-3 py-2">Résultat net la première année</td>
              <td className="border-b border-line px-3 py-2 text-right whitespace-nowrap tabular-nums font-bold text-ink">31 650 €</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Ces chiffres ne valent que pour leurs hypothèses. Avec 300 factures par mois au lieu de 1 500, le gain brut tombe à 9 450 € par an et le délai de retour passe à plus de deux ans : le même projet n'est alors plus prioritaire.</p>
      <h2>Les erreurs qui faussent le calcul</h2>
      <ul>
        <li><strong>Supposer 100 % d'automatisation.</strong> Il reste toujours une part d'exceptions à traiter à la main. Elle doit figurer dans le temps résiduel.</li>
        <li><strong>Compter du temps qui ne sera pas réaffecté.</strong> Si les heures libérées ne servent à rien d'autre, le gain financier est nul. Décidez à l'avance de leur usage : absorber la croissance, réduire les délais, traiter des tâches à plus forte valeur.</li>
        <li><strong>Oublier les coûts récurrents.</strong> Consommation des modèles, maintenance, évolutions des outils connectés.</li>
        <li><strong>Négliger l'adoption.</strong> Un outil peu utilisé ne produit pas le gain prévu. La formation fait partie du coût et de la réussite.</li>
        <li><strong>Ne pas mesurer avant.</strong> Sans indicateur de départ (temps, erreurs, délais), aucun gain ne pourra être démontré après la mise en production.</li>
      </ul>
      <p>C'est la démarche de notre <Link href="/offres/diagnostic-rentabilite-ia">diagnostic de rentabilité IA</Link> : appliquer ce calcul à vos propres volumes, sur plusieurs cas d'usage, et ne retenir que ceux qui sont rentables.</p>
      <h2>Sources</h2>
      <ul>
        <li><a href="https://www.insee.fr/fr/statistiques/9025878" target="_blank" rel="noopener noreferrer">Insee Première n° 2120, C. Lefebvre, juillet 2026</a> : motifs d'usage de l'IA par les entreprises en 2025</li>
      </ul>
    </ArticleLayout>
  )
}
