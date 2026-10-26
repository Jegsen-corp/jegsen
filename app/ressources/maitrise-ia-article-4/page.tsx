import Link from "next/link"
import type { Metadata } from "next"
import { ArticleLayout, articleMetadata } from "@/components/site/article-layout"

export const metadata: Metadata = articleMetadata("maitrise-ia-article-4")

export default function MaitriseIaArticleArticle() {
  return (
    <ArticleLayout slug="maitrise-ia-article-4">
      <div className="note mb-8"><strong>En bref.</strong> Depuis le 2 février 2025, les entreprises qui utilisent des systèmes d'IA dans un cadre professionnel doivent prendre des mesures pour développer la maîtrise de l'IA de leurs équipes. Le règlement « omnibus » de juillet 2026 a assoupli la formulation de cette obligation, sans la supprimer.</div>
      <h2>Ce que prévoit l'article 4</h2>
      <p>Le règlement (UE) 2024/1689, dit règlement sur l'intelligence artificielle, consacre son article 4 à la <em>maîtrise de l'IA</em> (le terme retenu dans la version française officielle, aussi appelé « littératie en IA »). Dans sa rédaction d'origine, il demandait aux fournisseurs et aux déployeurs de systèmes d'IA de prendre des mesures pour garantir, autant que possible, un niveau suffisant de maîtrise de l'IA à leur personnel et aux personnes qui utilisent ces systèmes pour leur compte, en tenant compte de leurs connaissances, de leur expérience, de leur formation et du contexte d'utilisation.</p>
      <p>Cette disposition fait partie du chapitre I du règlement, applicable depuis le 2 février 2025, avant la plupart des autres obligations.</p>
      <h2>Qui est concerné ?</h2>
      <p>Le règlement définit le <em>déployeur</em> comme toute personne physique ou morale qui utilise un système d'IA sous sa propre autorité, sauf pour une activité personnelle non professionnelle (considérant 13). Une PME dont les salariés utilisent un assistant conversationnel, un outil de traduction automatique ou un logiciel d'extraction de documents dans leur travail est donc, en principe, déployeur au sens du texte.</p>
      <h2>Ce qui a changé en juillet 2026</h2>
      <p>Le règlement (UE) 2026/1744, dit « omnibus numérique sur l'IA », a été adopté le 8 juillet 2026, publié au Journal officiel de l'Union européenne le 24 juillet et est entré en vigueur le 27 juillet 2026. Il modifie notamment l'article 4.</p>
      <p>Selon les analyses concordantes publiées depuis, la nouvelle rédaction remplace l'obligation de <em>garantir</em> un niveau suffisant de maîtrise par une obligation de <em>prendre des mesures pour en favoriser le développement</em>, précise qu'aucun niveau individuel spécifique n'a à être garanti, et charge la Commission et les États membres d'accompagner les organisations, en particulier les PME. La date d'application, elle, reste le 2 février 2025.</p>
      <p>Autrement dit : l'obligation de résultat s'efface au profit d'une obligation de moyens, mais l'inaction n'est pas une option.</p>
      <h2>Concrètement, que peut faire une PME ?</h2>
      <ul>
        <li><strong>Recenser les usages</strong> : quels outils d'IA sont utilisés, par qui, pour quelles tâches et avec quelles données.</li>
        <li><strong>Fixer des règles</strong> : une charte d'utilisation courte qui précise les outils autorisés, les données à ne pas y saisir et la vérification attendue des résultats.</li>
        <li><strong>Former selon le contexte</strong> : le texte demande de tenir compte du profil des personnes et du contexte d'utilisation. Une formation par métier y répond mieux qu'un module générique.</li>
        <li><strong>Garder des traces</strong> : charte, supports, listes de participation. Elles documentent les mesures prises.</li>
      </ul>
      <p>C'est précisément l'objet de notre <Link href="/offres/programme-formation-ia">programme IA et adoption</Link>.</p>
      <h2>Sources</h2>
      <ul>
        <li><a href="https://eur-lex.europa.eu/eli/reg/2024/1689/oj/fra" target="_blank" rel="noopener noreferrer">Règlement (UE) 2024/1689 sur l'intelligence artificielle, JOUE 12.7.2024</a> : article 4, considérant 13, article 113</li>
        <li><a href="https://eur-lex.europa.eu/eli/reg/2026/1744/oj/fra" target="_blank" rel="noopener noreferrer">Règlement (UE) 2026/1744 « omnibus numérique sur l'IA », JOUE 24.7.2026</a> : entrée en vigueur le 27 juillet 2026</li>
      </ul>
    </ArticleLayout>
  )
}
