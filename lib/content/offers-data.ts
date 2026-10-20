// Contenu extrait du site d'origine. Les chaînes acceptent **gras** et [liens](/chemin).
import type { OfferDetail } from "./types"

export const offerDetails: OfferDetail[] = [
  {
    slug: "diagnostic-rentabilite-ia",
    metaTitle: "Diagnostic IA pour PME et ETI, ROI chiffré | Jegsen IA",
    metaDescription: "Diagnostic IA en 1 à 2 semaines : 3 à 5 cas d'usage chiffrés, hypothèses de ROI, risques et feuille de route priorisée. PME et ETI, Nantes et toute la France.",
    kicker: "Pour commencer",
    title: "Diagnostic de rentabilité IA",
    crumb: "Diagnostic IA",
    lead: "En une à deux semaines, nous identifions où l'IA rapporte vraiment dans votre entreprise, et où elle ne rapporte pas.",
    facts: [
      {
        label: "Durée",
        value: "1 à 2 semaines",
      },
      {
        label: "Prix indicatif",
        value: "1 500 € à 3 500 € HT",
      },
      {
        label: "Livrable",
        value: "Plan d'action chiffré",
      },
    ],
    forWho: [
      "Vous savez que l'IA peut vous faire gagner du temps, sans savoir par où commencer.",
      "Vous avez des équipes qui ressaisissent, trient, contrôlent ou reformulent toute la journée.",
      "Vous voulez un chiffrage avant d'engager un budget de développement.",
    ],
    stepsLead: "1 à 2 semaines, avec des points d'étape réguliers et des décisions prises sur la base de vos chiffres.",
    steps: [
      {
        title: "Cartographie",
        text: "Entretiens avec les équipes, observation des processus, inventaire des outils et des flux de documents.",
      },
      {
        title: "Mesure",
        text: "Volumes, temps passés, coûts, taux d'erreur et délais : nous partons de vos chiffres, pas de moyennes de marché.",
      },
      {
        title: "Sélection",
        text: "Trois à cinq cas d'usage retenus, chacun avec un gain estimé, un coût de mise en œuvre et un niveau de risque.",
      },
      {
        title: "Feuille de route",
        text: "Priorisation par rentabilité et faisabilité, hypothèses explicites, prochaines étapes concrètes.",
      },
    ],
    deliverablesLead: "Prix indicatif de 1 500 € à 3 500 € HT, selon le périmètre. Devis ferme après un premier échange.",
    deliverables: [
      "Cartographie des processus étudiés",
      "3 à 5 cas d'usage détaillés et chiffrés",
      "Hypothèses de ROI explicites et vérifiables",
      "Analyse des risques : données, sécurité, conformité, adoption",
      "Feuille de route priorisée",
      "Restitution orale à la direction",
    ],
    showCases: true,
    faq: [
      {
        q: "Que se passe-t-il si aucun cas d'usage n'est rentable ?",
        a: "Nous vous le disons. Un diagnostic qui conclut qu'il ne faut pas investir maintenant vous évite une dépense inutile. C'est un résultat aussi utile qu'une feuille de route.",
      },
      {
        q: "De quelles données avez-vous besoin ?",
        a: "D'un accès aux personnes qui font le travail, d'exemples de documents et, si possible, de quelques indicateurs : volumes mensuels, temps de traitement, coûts. Nous travaillons avec ce qui existe.",
      },
      {
        q: "Le diagnostic engage-t-il la suite ?",
        a: "Non. Le plan d'action vous appartient : vous pouvez le réaliser en interne, avec nous ou avec un autre prestataire.",
      },
    ],
  },
  {
    slug: "sprint-integration-ia",
    metaTitle: "Intégration IA et automatisation des processus | Jegsen IA",
    metaDescription: "Un processus automatisé par l'IA mis en production en 2 à 6 semaines : documents, e-mails, comptes rendus, demandes. Intégré à votre SI, gains mesurés.",
    kicker: "Automatisez un processus",
    title: "Sprint d'intégration IA",
    crumb: "Intégration IA",
    lead: "Nous prenons un processus précis et nous le mettons en production, branché sur vos outils, avec des gains mesurés.",
    facts: [
      {
        label: "Durée",
        value: "2 à 6 semaines",
      },
      {
        label: "Prix indicatif",
        value: "5 000 € à 15 000 € HT",
      },
      {
        label: "Livrable",
        value: "Workflow opérationnel",
      },
    ],
    forWho: [
      "Un processus répétitif mobilise vos équipes et ralentit vos délais.",
      "Vous avez identifié un cas d'usage (avec ou sans diagnostic préalable).",
      "Vous voulez une solution en production, pas une démonstration.",
    ],
    examples: [
      {
        title: "Extraction de données",
        text: "Factures, bons de livraison, commandes, contrats : les données utiles extraites et contrôlées.",
        icon: [
          {
            d: "M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z",
          },
        ],
      },
      {
        title: "Traitement des e-mails",
        text: "Tri, classement, routage et brouillons de réponse pour les boîtes partagées.",
        icon: [
          {
            d: "M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z",
          },
        ],
      },
      {
        title: "Comptes rendus",
        text: "Réunions, visites, interventions : un compte rendu structuré à partir de notes ou d'enregistrements.",
        icon: [
          {
            d: "M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z",
          },
        ],
      },
      {
        title: "Qualification de demandes",
        text: "Demandes entrantes analysées, priorisées et transmises à la bonne personne.",
        icon: [
          {
            d: "M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z",
          },
        ],
      },
      {
        title: "Tâches administratives",
        text: "Saisies, rapprochements et contrôles répétitifs automatisés, avec validation humaine.",
        icon: [
          {
            d: "M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z",
          },
        ],
      },
      {
        title: "Workflows agentiques",
        text: "Des agents IA qui enchaînent les étapes d'un processus dans vos outils, avec validation humaine des actions sensibles.",
        icon: [
          {
            d: "M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z",
          },
        ],
      },
      {
        title: "Cerveau d'entreprise",
        text: "Vos documents et procédures rassemblés dans une base de connaissances interrogeable, qui cite ses sources.",
        icon: [
          {
            d: "M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z",
          },
        ],
      },
    ],
    stepsLead: "2 à 6 semaines, avec des points d'étape réguliers et des décisions prises sur la base de vos chiffres.",
    steps: [
      {
        title: "Cadrage",
        text: "Périmètre, données, indicateurs de référence (temps, erreurs, délais) mesurés avant toute automatisation.",
      },
      {
        title: "Construction",
        text: "Workflow branché sur vos outils existants : messagerie, GED, ERP, CRM, logiciels métiers.",
      },
      {
        title: "Tests & sécurisation",
        text: "Jeux de tests sur vos vrais documents, gestion des exceptions, droits d'accès et journalisation.",
      },
      {
        title: "Mise en production & mesure",
        text: "Déploiement, documentation, transfert aux équipes, puis comparaison des indicateurs avant / après.",
      },
    ],
    deliverablesLead: "Prix indicatif de 5 000 € à 15 000 € HT, selon le périmètre. Devis ferme après un premier échange.",
    deliverables: [
      "Workflow opérationnel en production",
      "Jeux de tests et rapport de recette",
      "Documentation technique et guide d'utilisation",
      "Sécurisation : accès, journalisation, gestion des données",
      "Tableau de mesure des gains avant / après",
    ],
    showCases: true,
    faq: [
      {
        q: "Faut-il changer nos logiciels ?",
        a: "Non. Nous nous branchons sur vos outils existants. Si un logiciel n'offre aucun moyen d'intégration, nous le signalons au cadrage, avant d'engager le développement.",
      },
      {
        q: "Que se passe-t-il quand l'IA se trompe ?",
        a: "Le workflow est conçu pour cela : contrôles de cohérence automatiques et, en cas de doute, transmission à un humain. Les exceptions sont tracées et mesurées.",
      },
      {
        q: "Où sont traitées nos données ?",
        a: "Le choix des modèles et de l'hébergement fait partie du cadrage, en fonction de la sensibilité de vos données et de vos obligations (RGPD, secret professionnel, contrats clients).",
      },
    ],
  },
  {
    slug: "programme-formation-ia",
    metaTitle: "Formation IA en entreprise et adoption | Jegsen IA, Nantes",
    metaDescription: "Formation IA des équipes, charte d'utilisation, ateliers par métier et accompagnement à l'adoption sur 1 à 3 semaines, avec indicateurs et bilan des gains.",
    kicker: "Formez vos équipes",
    title: "Programme IA et adoption",
    crumb: "Formation IA",
    lead: "Un outil que personne n'utilise ne rapporte rien. Nous formons vos équipes et encadrons les usages pour que les gains se matérialisent.",
    facts: [
      {
        label: "Durée",
        value: "1 à 3 semaines",
      },
      {
        label: "Prix indicatif",
        value: "2 000 € à 6 000 € HT",
      },
      {
        label: "Livrable",
        value: "Équipes formées",
      },
    ],
    forWho: [
      "Vos salariés utilisent déjà des outils d'IA, sans règles communes.",
      "Vous avez déployé une solution et voulez qu'elle soit réellement adoptée.",
      "Vous devez organiser la maîtrise de l'IA de vos équipes (article 4 du règlement européen sur l'IA).",
    ],
    stepsLead: "1 à 3 semaines, avec des points d'étape réguliers et des décisions prises sur la base de vos chiffres.",
    steps: [
      {
        title: "État des lieux",
        text: "Usages actuels, niveaux de maîtrise, outils autorisés ou non, risques identifiés.",
      },
      {
        title: "Règles d'utilisation",
        text: "Charte d'usage claire : données autorisées, outils validés, vérification des résultats, responsabilités.",
      },
      {
        title: "Ateliers par métier",
        text: "Comptabilité, commerce, RH, exploitation… chaque équipe travaille sur ses propres tâches.",
      },
      {
        title: "Accompagnement & bilan",
        text: "Suivi de l'adoption, réponses aux questions, indicateurs d'usage et bilan des gains.",
      },
    ],
    deliverablesLead: "Prix indicatif de 2 000 € à 6 000 € HT, selon le périmètre. Devis ferme après un premier échange.",
    deliverables: [
      "Équipes formées par métier",
      "Charte d'utilisation de l'IA",
      "Supports et cas pratiques réutilisables",
      "Indicateurs d'adoption",
      "Bilan des gains et recommandations",
    ],
    showCases: false,
    faq: [
      {
        q: "La formation peut-elle être financée par notre OPCO ?",
        a: "Une prise en charge par un OPCO suppose que l'organisme de formation soit certifié Qualiopi pour la catégorie d'actions concernée. Nous indiquons au devis si l'action est éligible.",
      },
      {
        q: "Faut-il des connaissances techniques ?",
        a: "Non. Les ateliers partent des tâches quotidiennes de chaque équipe, pas de la technologie.",
      },
      {
        q: "Est-ce que cela répond à l'obligation de maîtrise de l'IA ?",
        a: "Le programme constitue une mesure concrète de développement de la maîtrise de l'IA et produit des traces écrites (charte, supports, participation). L'appréciation de votre conformité reste de votre ressort ou de celui de votre conseil juridique.",
      },
    ],
  },
]
