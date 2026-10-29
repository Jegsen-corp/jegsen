// Contenu extrait du site d'origine. Les chaînes acceptent **gras** et [liens](/chemin).
import type { UseCase } from "./types"

export const useCases: UseCase[] = [
  {
    slug: "cerveau-entreprise",
    technical: true,
    metaTitle: "Cerveau d'entreprise : une IA nourrie de vos données | Jegsen IA",
    metaDescription: "Procédures, contrats, fiches produits, historique : nous rassemblons le savoir de votre entreprise dans un cerveau d'entreprise interrogeable, qui cite ses sources et respecte vos droits d'accès.",
    title: "Construire le cerveau de votre entreprise à partir de vos données",
    shortTitle: "Cerveau d'entreprise",
    lead: "Procédures, contrats, fiches produits, historique des échanges : le savoir de votre entreprise est dispersé. Nous le rassemblons dans un cerveau d'entreprise que vos équipes interrogent en langage courant, et sur lequel s'appuient vos automatisations.",
    summary: "Procédures, contrats, fiches produits, historique des échanges : le savoir de votre entreprise est dispersé. Nous le rassemblons dans un cerveau d'entreprise que vos équipes interrogent en langage courant, et sur lequel s'appuient vos automatisations.",
    audiences: [
      "Directions et managers",
      "Équipes support et ADV",
      "Nouveaux arrivants",
      "Entreprises multi-sites",
    ],
    today: [
      "Le savoir d'une entreprise vit dans des dossiers partagés, des boîtes e-mail, des logiciels métiers et la mémoire de quelques personnes. Retrouver la bonne procédure ou le bon contrat prend du temps, et la réponse dépend souvent de qui est présent.",
      "Quand une personne expérimentée part, une partie de ce savoir part avec elle. Quand une personne arrive, il lui faut des semaines pour savoir où chercher.",
      "Un assistant d'IA générique ne connaît pas vos données. Pour qu'il réponde juste, il faut lui donner accès à vos documents, de façon organisée, sécurisée et à jour : c'est le rôle du cerveau d'entreprise.",
    ],
    howTitle: "Comment nous le construisons.",
    steps: [
      {
        title: "Inventaire des sources",
        text: "GED, SharePoint ou serveur de fichiers, CRM, ERP, messagerie, intranet : nous recensons ce qui contient le savoir utile, et qui en est responsable.",
      },
      {
        title: "Préparation",
        text: "Documents nettoyés, découpés et décrits, versions obsolètes écartées, droits d'accès repris tels qu'ils existent dans vos outils.",
      },
      {
        title: "Indexation",
        text: "Le contenu est indexé pour une recherche par le sens et non par mots exacts (recherche augmentée par la génération, ou RAG).",
      },
      {
        title: "Interrogation",
        text: "Vos équipes posent leurs questions en langage courant. Chaque réponse cite les documents dont elle provient.",
      },
      {
        title: "Mise à jour continue",
        text: "Les sources sont synchronisées : un document modifié ou supprimé l'est aussi dans le cerveau d'entreprise.",
      },
      {
        title: "Socle des automatisations",
        text: "Le même cerveau alimente vos autres automatisations : tri des e-mails, qualification des demandes, brouillons de réponse.",
      },
    ],
    cards: [
      {
        title: "Garde-fous",
        icon: [
          {
            d: "M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6L12 3z",
          },
          {
            d: "M8.8 12l2.2 2.2 4.3-4.4",
          },
        ],
        items: [
          "Respect des droits existants : chacun n'accède qu'à ce qu'il pouvait déjà consulter",
          "Réponses accompagnées de leurs sources, vérifiables en un clic",
          "Réponse « je ne sais pas » quand l'information n'est pas dans vos documents",
          "Modèles et hébergement choisis selon la sensibilité des données",
          "Journal des questions et des documents consultés",
        ],
      },
      {
        title: "Ce que nous mesurons",
        icon: [
          {
            d: "M4 20V4M4 20h16",
          },
          {
            d: "M8 15l3.5-4 3 2.5L20 7",
          },
        ],
        items: [
          "Temps passé à chercher une information",
          "Part des questions résolues sans solliciter un collègue",
          "Temps de prise de poste des nouveaux arrivants",
          "Taux de réponses jugées utiles",
        ],
      },
      {
        title: "Prérequis",
        icon: [
          {
            d: "M9 3v5M15 3v5M6.5 8h11v3a5.5 5.5 0 01-11 0V8zM12 16.5V21",
          },
        ],
        items: [
          "Des documents accessibles sous forme numérique",
          "Des droits d'accès à jour dans vos outils (sinon, nous commençons par les remettre d'aplomb)",
          "Un responsable par grande source de contenu, pour arbitrer ce qui fait foi",
        ],
      },
    ],
    faq: [
      {
        q: "Quelle différence avec ChatGPT ou Copilot ?",
        a: "Un assistant générique ne connaît pas vos documents. Le cerveau d'entreprise est relié à vos sources, respecte vos droits d'accès et cite les documents sur lesquels repose chaque réponse.",
      },
      {
        q: "Nos données servent-elles à entraîner des modèles ?",
        a: "Nous retenons des modèles et des conditions d'utilisation qui excluent la réutilisation de vos données pour l'entraînement, ou des modèles hébergés dans un environnement que vous maîtrisez. Ce choix est fait au cadrage.",
      },
      {
        q: "Et si un document est faux ou obsolète ?",
        a: "La réponse cite sa source : l'erreur se voit et se corrige à la source. Le cadrage prévoit aussi d'écarter les versions périmées.",
      },
    ],
  },
  {
    slug: "workflows-agentiques",
    technical: true,
    metaTitle: "Workflows agentiques (agentic workflows) pour PME | Jegsen IA",
    metaDescription: "Des agents IA qui enchaînent les étapes d'un processus dans vos outils : lire, décider, agir, avec des règles claires et une validation humaine aux points sensibles.",
    title: "Mettre en place des workflows agentiques dans vos outils",
    shortTitle: "Workflows agentiques",
    lead: "Un workflow agentique (agentic workflow) confie à un agent IA un enchaînement d'étapes : comprendre une demande, chercher l'information, agir dans vos logiciels, puis rendre la main à une personne quand une décision l'exige. Nous les concevons pour des processus précis, avec des règles et des garde-fous.",
    summary: "Un workflow agentique (agentic workflow) confie à un agent IA un enchaînement d'étapes : comprendre une demande, chercher l'information, agir dans vos logiciels, puis rendre la main à une personne quand une décision l'exige. Nous les concevons pour des processus précis, avec des règles et des garde-fous.",
    audiences: [
      "ADV et service client",
      "Support et exploitation",
      "Achats et comptabilité",
      "Équipes commerciales",
    ],
    today: [
      "Beaucoup de processus ne se résument pas à une seule tâche. Il faut lire une demande, consulter deux ou trois logiciels, appliquer une règle, puis créer ou mettre à jour un enregistrement. Une automatisation classique bloque dès que la demande sort du format prévu.",
      "Un agent IA sait interpréter une demande rédigée librement, choisir l'outil à utiliser et enchaîner les actions. Sans cadre, il peut aussi se tromper avec aplomb. Tout l'enjeu est de définir ce qu'il a le droit de faire seul, et ce qui doit être validé.",
    ],
    howTitle: "Comment nous le construisons.",
    steps: [
      {
        title: "Cartographie du processus",
        text: "Étapes, décisions, logiciels concernés, volumes et exceptions : nous décrivons le processus tel qu'il se déroule vraiment.",
      },
      {
        title: "Périmètre de l'agent",
        text: "Ce que l'agent peut lire, ce qu'il peut modifier, et les actions qui demandent toujours une validation humaine.",
      },
      {
        title: "Connexion aux outils",
        text: "L'agent agit via les API et les connecteurs de vos logiciels (messagerie, CRM, ERP, outil de tickets), avec des droits limités au nécessaire.",
      },
      {
        title: "Décisions encadrées",
        text: "Vos règles métier et le cerveau d'entreprise guident ses choix. Chaque étape est tracée.",
      },
      {
        title: "Validation humaine",
        text: "Les actions sensibles ou incertaines sont présentées à une personne, avec leur contexte, avant d'être exécutées.",
      },
      {
        title: "Mesure et ajustement",
        text: "Actions validées sans correction, exceptions, délais : le périmètre de l'agent ne s'élargit que lorsque les chiffres le justifient.",
      },
    ],
    cards: [
      {
        title: "Garde-fous",
        icon: [
          {
            d: "M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6L12 3z",
          },
          {
            d: "M8.8 12l2.2 2.2 4.3-4.4",
          },
        ],
        items: [
          "Droits limités au strict nécessaire, sur un compte de service dédié",
          "Validation humaine obligatoire pour toute action irréversible ou engageante",
          "Journal complet des décisions et des actions",
          "Arrêt possible à tout moment",
          "Tests sur des cas réels avant la mise en production",
        ],
      },
      {
        title: "Ce que nous mesurons",
        icon: [
          {
            d: "M4 20V4M4 20h16",
          },
          {
            d: "M8 15l3.5-4 3 2.5L20 7",
          },
        ],
        items: [
          "Délai de traitement de bout en bout",
          "Part des dossiers traités sans intervention",
          "Taux de corrections lors des validations",
          "Volume d'exceptions par semaine",
        ],
      },
      {
        title: "Prérequis",
        icon: [
          {
            d: "M9 3v5M15 3v5M6.5 8h11v3a5.5 5.5 0 01-11 0V8zM12 16.5V21",
          },
        ],
        items: [
          "Un processus répétitif que l'on peut décrire",
          "Des logiciels qui offrent un moyen d'intégration (API, connecteur, import de fichiers)",
          "Une personne référente pour valider les règles et les exceptions",
        ],
      },
    ],
    faq: [
      {
        q: "Quelle différence avec une automatisation classique ?",
        a: "Une automatisation classique suit un chemin fixé à l'avance. Un workflow agentique interprète la demande et choisit les étapes à suivre parmi celles qu'on lui autorise. Il est utile quand les demandes sont variées. Pour un flux parfaitement régulier, une automatisation classique reste souvent plus simple et moins coûteuse.",
      },
      {
        q: "L'agent peut-il agir sans contrôle ?",
        a: "Seulement pour les actions que vous avez explicitement autorisées. Tout ce qui est irréversible, engageant ou incertain passe par une validation humaine.",
      },
      {
        q: "Faut-il un cerveau d'entreprise au préalable ?",
        a: "Pas toujours. Il devient utile dès que l'agent doit s'appuyer sur vos procédures, vos contrats ou votre historique pour décider.",
      },
    ],
  },
  {
    slug: "factures-fournisseurs",
    technical: false,
    metaTitle: "Automatiser les factures fournisseurs avec l'IA | Jegsen IA",
    metaDescription: "Lecture des factures, rapprochement avec les commandes et livraisons, imputation comptable et détection d'anomalies par l'IA, avec validation humaine des exceptions.",
    title: "Automatiser le traitement des factures fournisseurs avec l'IA",
    shortTitle: "Factures fournisseurs",
    lead: "Lire chaque facture, retrouver la commande, vérifier les montants, imputer, relancer en cas d'écart : nous automatisons ce circuit et ne laissons à vos équipes que les cas qui demandent un jugement.",
    summary: "Lire chaque facture, retrouver la commande, vérifier les montants, imputer, relancer en cas d'écart : nous automatisons ce circuit et ne laissons à vos équipes que les cas qui demandent un jugement.",
    audiences: [
      "Services comptables et financiers",
      "Distributeurs et négoces",
      "PME industrielles",
      "Sociétés de services multi-sites",
    ],
    today: [
      "Le traitement d'une facture fournisseur enchaîne des gestes simples mais nombreux : ouvrir la pièce, identifier le fournisseur, retrouver le bon de commande et le bon de livraison, contrôler quantités, prix et TVA, saisir ou imputer, puis transmettre pour validation.",
      "Chaque étape manuelle ajoute du délai et des risques d'erreur : double saisie, facture payée deux fois, écart de prix non vu, coordonnées bancaires modifiées sans contrôle.",
      "Depuis le 1er septembre 2026, toutes les entreprises doivent pouvoir recevoir des factures électroniques. Les factures structurées réduisent la lecture de documents, mais le rapprochement, l'imputation et la gestion des écarts restent à faire.",
    ],
    howTitle: "Comment l'automatisation fonctionne.",
    steps: [
      {
        title: "Réception",
        text: "Factures électroniques de votre plateforme agréée, PDF reçus par e-mail ou scans : tout arrive dans un seul flux.",
      },
      {
        title: "Lecture et extraction",
        text: "Fournisseur, numéro, dates, lignes, montants HT, TVA et TTC sont extraits et structurés, y compris pour les factures étrangères ou non structurées.",
      },
      {
        title: "Rapprochement",
        text: "Chaque facture est comparée à la commande et à la réception correspondantes : quantités, prix unitaires, remises.",
      },
      {
        title: "Imputation proposée",
        text: "Compte, axe analytique et code TVA sont proposés à partir de l'historique de vos écritures et de vos règles.",
      },
      {
        title: "Exceptions",
        text: "Écart, doublon, fournisseur inconnu ou coordonnées bancaires modifiées : la facture est mise de côté avec le motif, pour décision humaine.",
      },
    ],
    cards: [
      {
        title: "Garde-fous",
        icon: [
          {
            d: "M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6L12 3z",
          },
          {
            d: "M8.8 12l2.2 2.2 4.3-4.4",
          },
        ],
        items: [
          "Détection des doublons (même fournisseur, même numéro ou même montant à date proche)",
          "Alerte en cas de changement de coordonnées bancaires d'un fournisseur",
          "Seuils de tolérance sur les écarts de prix et de quantités, fixés avec vous",
          "Aucune écriture validée sans règle explicite, et un journal de chaque action",
        ],
      },
      {
        title: "Ce que nous mesurons",
        icon: [
          {
            d: "M4 20V4M4 20h16",
          },
          {
            d: "M8 15l3.5-4 3 2.5L20 7",
          },
        ],
        items: [
          "Temps de traitement par facture",
          "Part des factures traitées sans intervention",
          "Délai entre réception et validation",
          "Nombre d'anomalies détectées",
        ],
      },
      {
        title: "Prérequis",
        icon: [
          {
            d: "M9 3v5M15 3v5M6.5 8h11v3a5.5 5.5 0 01-11 0V8zM12 16.5V21",
          },
        ],
        items: [
          "Un volume mensuel de factures suffisant pour justifier l'automatisation (chiffré lors du diagnostic)",
          "Un accès à vos commandes et réceptions (ERP, logiciel de gestion ou exports)",
          "Un moyen d'intégrer les écritures : API, import de fichier ou connecteur de votre logiciel comptable",
        ],
      },
    ],
    faq: [
      {
        q: "La facture électronique rend-elle l'IA inutile ?",
        a: "Non. Les factures structurées facilitent la lecture, mais le rapprochement avec les commandes, l'imputation, le contrôle des écarts et le traitement des factures hors réforme (fournisseurs étrangers, pièces annexes) restent des tâches à automatiser.",
      },
      {
        q: "Faut-il changer de logiciel comptable ?",
        a: "Non. Nous nous branchons sur votre logiciel existant. Si aucun moyen d'intégration n'existe, nous le signalons avant tout développement.",
      },
      {
        q: "Qui valide les factures ?",
        a: "Vos règles de validation restent les mêmes. L'automatisation prépare le travail et signale les anomalies. La décision de payer reste humaine.",
      },
    ],
  },
  {
    slug: "bons-de-livraison",
    technical: false,
    metaTitle: "Extraction des bons de livraison par IA | Jegsen IA",
    metaDescription: "Bons de livraison, lettres de voiture, preuves de livraison : extraction automatique des données, contrôle des réserves et mise à jour du TMS ou de l'ERP.",
    title: "Extraire automatiquement les données des bons de livraison et lettres de voiture",
    shortTitle: "Bons de livraison",
    lead: "Signés, tamponnés, photographiés au smartphone : vos documents de transport arrivent sous toutes les formes. Nous en extrayons les données utiles et mettons à jour vos outils, réserves comprises.",
    summary: "Signés, tamponnés, photographiés au smartphone : vos documents de transport arrivent sous toutes les formes.",
    audiences: [
      "Transporteurs et logisticiens",
      "Distributeurs",
      "Services ADV et facturation",
      "Sociétés de maintenance avec livraisons sur site",
    ],
    today: [
      "Les preuves de livraison conditionnent la facturation. Tant qu'elles ne sont pas saisies, la facture attend, et le délai de paiement s'allonge.",
      "Les documents sont souvent hétérogènes : modèles différents selon les donneurs d'ordre, annotations manuscrites, photos de qualité variable. La ressaisie est lente et les réserves notées à la main passent facilement inaperçues.",
    ],
    howTitle: "Comment l'automatisation fonctionne.",
    steps: [
      {
        title: "Collecte",
        text: "Photos des chauffeurs, scans d'agence, e-mails de partenaires : les documents sont centralisés automatiquement.",
      },
      {
        title: "Lecture",
        text: "Numéro d'expédition, destinataire, date et heure, nombre de colis ou de palettes, signature et cachet sont repérés et extraits.",
      },
      {
        title: "Réserves",
        text: "Les mentions de réserve (colis endommagé, manquant, retard) sont détectées, y compris manuscrites, et remontées en priorité.",
      },
      {
        title: "Mise à jour",
        text: "Les livraisons confirmées sont soldées dans votre TMS ou votre ERP et deviennent facturables.",
      },
      {
        title: "Exceptions",
        text: "Document illisible, numéro introuvable ou écart de quantité : le dossier est transmis à une personne avec l'image et le motif.",
      },
    ],
    cards: [
      {
        title: "Garde-fous",
        icon: [
          {
            d: "M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6L12 3z",
          },
          {
            d: "M8.8 12l2.2 2.2 4.3-4.4",
          },
        ],
        items: [
          "Vérification que le numéro d'expédition existe et n'est pas déjà soldé",
          "Contrôle de cohérence entre quantités annoncées et livrées",
          "Remontée systématique des réserves, sans seuil",
          "Conservation de l'image d'origine liée à chaque donnée extraite",
        ],
      },
      {
        title: "Ce que nous mesurons",
        icon: [
          {
            d: "M4 20V4M4 20h16",
          },
          {
            d: "M8 15l3.5-4 3 2.5L20 7",
          },
        ],
        items: [
          "Délai entre livraison et facturation",
          "Part des documents traités sans intervention",
          "Nombre de réserves détectées",
          "Temps de saisie économisé",
        ],
      },
      {
        title: "Prérequis",
        icon: [
          {
            d: "M9 3v5M15 3v5M6.5 8h11v3a5.5 5.5 0 01-11 0V8zM12 16.5V21",
          },
        ],
        items: [
          "Un accès aux documents (boîte e-mail, dossier partagé, application des chauffeurs)",
          "Un moyen de mettre à jour le TMS ou l'ERP (API, import, base de données)",
          "Quelques centaines d'exemples récents pour paramétrer et tester",
        ],
      },
    ],
    faq: [
      {
        q: "Les photos prises au smartphone sont-elles exploitables ?",
        a: "Généralement oui, si le document est entier et lisible à l'œil. Les cas illisibles sont classés en exception plutôt que devinés.",
      },
      {
        q: "Et les annotations manuscrites ?",
        a: "Elles sont lues et, quand elles signalent une réserve, remontées en priorité. En cas de doute, le document est soumis à une personne.",
      },
      {
        q: "Combien de temps pour démarrer ?",
        a: "Un sprint d'intégration dure de deux à six semaines selon le nombre de modèles de documents et d'outils à connecter.",
      },
    ],
  },
  {
    slug: "tri-emails",
    technical: false,
    metaTitle: "Tri automatique des e-mails par IA | Jegsen IA",
    metaDescription: "Classement, extraction des informations, routage vers la bonne personne et brouillons de réponse : l'IA traite vos boîtes partagées (contact@, commandes@, sav@).",
    title: "Trier et traiter automatiquement les e-mails de vos boîtes partagées",
    shortTitle: "Tri des e-mails",
    lead: "contact@, commandes@, sav@ : chaque matin, quelqu'un lit, classe et transfère. Nous automatisons ce tri, extrayons les informations utiles et préparons les réponses courantes.",
    summary: "contact@, commandes@, sav@ : chaque matin, quelqu'un lit, classe et transfère.",
    audiences: [
      "Services clients et SAV",
      "Administration des ventes",
      "Accueil et standard",
      "Cabinets de services",
    ],
    today: [
      "Une boîte partagée mélange demandes de devis, commandes, réclamations, factures, relances et sollicitations commerciales. Le tri manuel prend du temps et dépend de la personne présente.",
      "Les messages importants se perdent dans le volume, les délais de réponse varient, et les informations utiles (numéro de commande, référence client) sont ressaisies à la main.",
    ],
    howTitle: "Comment l'automatisation fonctionne.",
    steps: [
      {
        title: "Classement",
        text: "Chaque message est rangé par type de demande selon vos catégories : devis, commande, réclamation, facture, autre.",
      },
      {
        title: "Extraction",
        text: "Numéro de commande, référence client, produit, urgence : les informations utiles sont extraites des messages et des pièces jointes.",
      },
      {
        title: "Routage",
        text: "Le message est transmis à la bonne équipe ou créé directement dans votre outil (CRM, outil de tickets, ERP).",
      },
      {
        title: "Brouillon de réponse",
        text: "Pour les demandes courantes, un brouillon est préparé à partir de vos modèles et de vos données. Une personne relit avant envoi.",
      },
      {
        title: "Suivi",
        text: "Les messages non traités dans le délai prévu sont signalés.",
      },
    ],
    cards: [
      {
        title: "Garde-fous",
        icon: [
          {
            d: "M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6L12 3z",
          },
          {
            d: "M8.8 12l2.2 2.2 4.3-4.4",
          },
        ],
        items: [
          "Aucun envoi automatique sans validation, sauf règle explicite décidée avec vous (accusé de réception, par exemple)",
          "Seuil de confiance : en dessous, le message reste en tri manuel",
          "Traitement limité aux boîtes et aux dossiers autorisés",
          "Traçabilité du classement et des modifications",
        ],
      },
      {
        title: "Ce que nous mesurons",
        icon: [
          {
            d: "M4 20V4M4 20h16",
          },
          {
            d: "M8 15l3.5-4 3 2.5L20 7",
          },
        ],
        items: [
          "Délai de première réponse",
          "Part des messages classés sans intervention",
          "Temps de tri quotidien",
          "Messages en retard",
        ],
      },
      {
        title: "Prérequis",
        icon: [
          {
            d: "M9 3v5M15 3v5M6.5 8h11v3a5.5 5.5 0 01-11 0V8zM12 16.5V21",
          },
        ],
        items: [
          "Une messagerie accessible par API (Microsoft 365, Google Workspace ou serveur compatible)",
          "Une liste de catégories et de destinataires, même approximative au départ",
          "Des exemples de messages représentatifs pour tester",
        ],
      },
    ],
    faq: [
      {
        q: "L'IA répond-elle seule aux clients ?",
        a: "Par défaut, non : elle prépare un brouillon qu'une personne relit. Des réponses automatiques peuvent être activées pour des cas simples, sur décision explicite.",
      },
      {
        q: "Nos e-mails contiennent des données personnelles. Est-ce un problème ?",
        a: "Cela impose des précautions : choix du modèle et de l'hébergement, limitation des données traitées, durée de conservation, information des personnes. Ces points sont traités au cadrage.",
      },
      {
        q: "Fonctionne-t-il avec Outlook ?",
        a: "Oui, via Microsoft 365. Gmail et Google Workspace sont également compatibles.",
      },
    ],
  },
  {
    slug: "comptes-rendus",
    technical: false,
    metaTitle: "Comptes rendus de réunion automatiques par IA | Jegsen IA",
    metaDescription: "Comptes rendus de réunion, de visite ou d'intervention générés à partir de notes ou d'enregistrements, structurés selon vos modèles et enregistrés dans vos outils.",
    title: "Générer des comptes rendus de réunion et d'intervention avec l'IA",
    shortTitle: "Comptes rendus",
    lead: "À partir de notes rapides, d'un enregistrement ou d'une dictée, l'IA produit un compte rendu structuré selon votre modèle, avec décisions, actions et responsables, prêt à relire.",
    summary: "À partir de notes rapides, d'un enregistrement ou d'une dictée, l'IA produit un compte rendu structuré selon votre modèle, avec décisions, actions et responsables, prêt à relire.",
    audiences: [
      "Techniciens de maintenance",
      "Commerciaux terrain",
      "Chefs de projet",
      "Comités de direction",
    ],
    today: [
      "Rédiger un compte rendu prend souvent autant de temps que la réunion ou l'intervention elle-même. Résultat : il est rédigé tard, de façon inégale, ou pas du tout.",
      "Les informations utiles (pièces changées, actions décidées, prochaines étapes) restent dans les notes de chacun au lieu d'arriver dans vos outils.",
    ],
    howTitle: "Comment l'automatisation fonctionne.",
    steps: [
      {
        title: "Captation",
        text: "Notes saisies sur le terrain, dictée vocale ou enregistrement d'une réunion, selon ce qui convient à vos équipes.",
      },
      {
        title: "Transcription",
        text: "Les enregistrements sont convertis en texte.",
      },
      {
        title: "Structuration",
        text: "Le compte rendu suit votre modèle : contexte, constats, décisions, actions avec responsables et échéances.",
      },
      {
        title: "Relecture",
        text: "L'auteur relit et corrige en quelques minutes au lieu de rédiger.",
      },
      {
        title: "Enregistrement",
        text: "Le compte rendu et ses actions sont enregistrés dans le bon dossier ou le bon outil (GMAO, CRM, gestion de projet).",
      },
    ],
    cards: [
      {
        title: "Garde-fous",
        icon: [
          {
            d: "M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6L12 3z",
          },
          {
            d: "M8.8 12l2.2 2.2 4.3-4.4",
          },
        ],
        items: [
          "Information des participants avant tout enregistrement",
          "Relecture humaine avant diffusion",
          "Durée de conservation des enregistrements définie et appliquée",
          "Pas de réutilisation des contenus pour entraîner des modèles tiers",
        ],
      },
      {
        title: "Ce que nous mesurons",
        icon: [
          {
            d: "M4 20V4M4 20h16",
          },
          {
            d: "M8 15l3.5-4 3 2.5L20 7",
          },
        ],
        items: [
          "Temps de rédaction par compte rendu",
          "Délai de diffusion après la réunion ou l'intervention",
          "Part des actions effectivement saisies dans les outils",
        ],
      },
      {
        title: "Prérequis",
        icon: [
          {
            d: "M9 3v5M15 3v5M6.5 8h11v3a5.5 5.5 0 01-11 0V8zM12 16.5V21",
          },
        ],
        items: [
          "Un modèle de compte rendu, même simple",
          "Un moyen de capter les notes ou l'audio (application, téléphone, outil de visioconférence)",
          "Une règle claire sur l'enregistrement des réunions",
        ],
      },
    ],
    faq: [
      {
        q: "Faut-il enregistrer les réunions ?",
        a: "Non. Des notes rapides ou une dictée après coup suffisent souvent. Si vous enregistrez, les participants doivent en être informés.",
      },
      {
        q: "Le résultat est-il fiable ?",
        a: "Le compte rendu est un premier jet de bonne qualité, mais il doit être relu : l'IA peut mal attribuer une décision ou mal comprendre un terme technique.",
      },
      {
        q: "Peut-on l'utiliser pour des rapports d'intervention ?",
        a: "Oui, c'est un cas fréquent en maintenance : le technicien dicte, le rapport est structuré et enregistré dans la GMAO.",
      },
    ],
  },
  {
    slug: "qualification-demandes",
    technical: false,
    metaTitle: "Qualifier et router les demandes entrantes avec l'IA | Jegsen IA",
    metaDescription: "Formulaires, e-mails, appels retranscrits : l'IA analyse chaque demande entrante, la qualifie, la priorise et la transmet à la bonne personne dans votre CRM.",
    title: "Qualifier et router automatiquement les demandes entrantes",
    shortTitle: "Qualification des demandes",
    lead: "Demandes de devis, prises de contact, demandes d'intervention : chaque demande est analysée, complétée, priorisée et transmise à la bonne personne, avec les informations nécessaires pour répondre vite.",
    summary: "Demandes de devis, prises de contact, demandes d'intervention : chaque demande est analysée, complétée, priorisée et transmise à la bonne personne, avec les informations nécessaires pour répondre vite.",
    audiences: [
      "Équipes commerciales",
      "Services techniques et SAV",
      "Entreprises multi-agences",
      "Cabinets de services",
    ],
    today: [
      "Les demandes arrivent par plusieurs canaux et dans des formats libres. Avant de pouvoir y répondre, quelqu'un doit les lire, comprendre le besoin, vérifier s'il s'agit d'un client existant et décider qui s'en charge.",
      "Une demande mal orientée ou traitée tard est souvent une demande perdue.",
    ],
    howTitle: "Comment l'automatisation fonctionne.",
    steps: [
      {
        title: "Collecte",
        text: "Formulaires du site, e-mails et transcriptions d'appels sont regroupés.",
      },
      {
        title: "Analyse",
        text: "Besoin, produit ou service concerné, localisation, urgence et budget éventuel sont extraits du texte libre.",
      },
      {
        title: "Enrichissement",
        text: "La demande est rapprochée de votre CRM : client existant, historique, interlocuteur habituel.",
      },
      {
        title: "Priorisation et routage",
        text: "Selon vos règles (secteur, agence, montant, urgence), la demande est attribuée et créée dans votre outil.",
      },
      {
        title: "Suivi",
        text: "Les demandes sans réponse dans le délai prévu sont relancées en interne.",
      },
    ],
    cards: [
      {
        title: "Garde-fous",
        icon: [
          {
            d: "M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6L12 3z",
          },
          {
            d: "M8.8 12l2.2 2.2 4.3-4.4",
          },
        ],
        items: [
          "Règles d'attribution définies et modifiables par vous",
          "Demandes ambiguës laissées en file manuelle",
          "Aucune décision commerciale automatique : la qualification aide, elle ne refuse pas",
          "Journal de chaque attribution",
        ],
      },
      {
        title: "Ce que nous mesurons",
        icon: [
          {
            d: "M4 20V4M4 20h16",
          },
          {
            d: "M8 15l3.5-4 3 2.5L20 7",
          },
        ],
        items: [
          "Délai de première réponse",
          "Part des demandes correctement attribuées du premier coup",
          "Taux de demandes sans suite",
        ],
      },
      {
        title: "Prérequis",
        icon: [
          {
            d: "M9 3v5M15 3v5M6.5 8h11v3a5.5 5.5 0 01-11 0V8zM12 16.5V21",
          },
        ],
        items: [
          "Un CRM ou un outil de suivi accessible par API ou import",
          "Des règles d'attribution, même informelles, à formaliser ensemble",
          "Un historique de demandes pour paramétrer et tester",
        ],
      },
    ],
    faq: [
      {
        q: "Faut-il un CRM ?",
        a: "C'est préférable mais pas indispensable : un tableur partagé ou un outil de tickets peut suffire pour démarrer.",
      },
      {
        q: "L'IA peut-elle refuser une demande ?",
        a: "Non. Elle classe et priorise. Toute décision commerciale reste humaine.",
      },
      {
        q: "Et les demandes par téléphone ?",
        a: "Si vos appels sont retranscrits (ou résumés par l'accueil), ils entrent dans le même flux.",
      },
    ],
  },
  {
    slug: "reponse-appel-offres",
    technical: false,
    metaTitle: "Répondre aux appels d'offres avec l'IA | Jegsen IA",
    metaDescription: "Lecture du dossier de consultation, grille des exigences, mémoire technique préparé à partir de vos réponses passées, contrôle des pièces : l'IA accélère la réponse, vous gardez la décision et le dépôt.",
    title: "Répondre plus vite aux appels d'offres avec l'IA",
    shortTitle: "Réponse à appel d'offres",
    lead: "Lire le dossier de consultation, relever chaque exigence, retrouver vos réponses passées et préparer le mémoire technique : nous automatisons la préparation, vos équipes gardent la stratégie, les prix et le dépôt.",
    summary: "Lire le dossier de consultation, relever chaque exigence, retrouver vos réponses passées et préparer le mémoire technique : nous automatisons la préparation, vos équipes gardent la stratégie, les prix et le dépôt.",
    audiences: [
      "Entreprises du BTP et de services",
      "Bureaux d'études et cabinets",
      "Équipes commerciales grands comptes",
      "Prestataires des collectivités",
    ],
    today: [
      "Un dossier de consultation fait souvent plusieurs dizaines de pages réparties entre le règlement, le cahier des charges et les annexes. Avant d'écrire une ligne, quelqu'un doit tout lire, relever les critères et les pièces demandées, puis vérifier la date et le mode de dépôt.",
      "Le mémoire technique se reconstruit à chaque fois, en recopiant des réponses déjà écrites pour d'autres consultations, avec le risque d'oublier une exigence ou de laisser une référence qui ne correspond plus.",
      "Résultat : des réponses décidées tard, des nuits avant la date limite, et des consultations auxquelles on renonce faute de temps.",
    ],
    howTitle: "Comment l'automatisation fonctionne.",
    steps: [
      {
        title: "Lecture du dossier",
        text: "Règlement de consultation, cahier des charges et annexes sont lus en entier : objet, lots, critères et leur pondération, pièces à fournir, date et mode de dépôt.",
      },
      {
        title: "Grille des exigences",
        text: "Chaque exigence devient une ligne d'une grille de conformité, avec sa source dans le dossier. Vous décidez en connaissance de cause de répondre ou non.",
      },
      {
        title: "Préparation du mémoire",
        text: "Pour chaque exigence, l'IA propose un paragraphe à partir de vos réponses passées et de vos documents (cerveau d'entreprise), en citant d'où il vient.",
      },
      {
        title: "Contrôle des pièces",
        text: "Pièces administratives, attestations et références demandées sont listées et vérifiées : présentes, à jour, au bon format.",
      },
      {
        title: "Relecture et dépôt",
        text: "Vos équipes relisent, fixent les prix, ajustent la stratégie et déposent. Rien ne part sans une personne.",
      },
    ],
    cards: [
      {
        title: "Garde-fous",
        icon: [
          {
            d: "M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6L12 3z",
          },
          {
            d: "M8.8 12l2.2 2.2 4.3-4.4",
          },
        ],
        items: [
          "Chaque paragraphe proposé cite le document interne dont il vient",
          "Aucune référence, aucun chiffre inventé : ce qui manque est signalé, pas comblé",
          "Les prix, la stratégie et la décision de répondre restent humains",
          "Le dépôt est fait par vos équipes, jamais par l'automatisation",
        ],
      },
      {
        title: "Ce que nous mesurons",
        icon: [
          {
            d: "M4 20V4M4 20h16",
          },
          {
            d: "M8 15l3.5-4 3 2.5L20 7",
          },
        ],
        items: [
          "Temps entre la réception du dossier et la décision de répondre",
          "Temps de préparation d'un mémoire technique",
          "Part des exigences couvertes avant relecture",
          "Nombre de consultations traitées à effectif constant",
        ],
      },
      {
        title: "Prérequis",
        icon: [
          {
            d: "M9 3v5M15 3v5M6.5 8h11v3a5.5 5.5 0 01-11 0V8zM12 16.5V21",
          },
        ],
        items: [
          "Vos réponses passées et vos documents de présentation, même dispersés",
          "Une personne référente qui tranche sur le contenu",
          "L'accès aux dossiers de consultation (plateformes, e-mails)",
        ],
      },
    ],
    faq: [
      {
        q: "L'IA rédige-t-elle le mémoire à notre place ?",
        a: "Elle prépare une première version, exigence par exigence, à partir de ce que vous avez déjà écrit. Vos équipes la relisent, la complètent et décident de ce qui est envoyé. Sans relecture, rien ne part.",
      },
      {
        q: "Cela fonctionne-t-il pour les appels d'offres privés ?",
        a: "Oui. La méthode est la même : un dossier à lire, des exigences à relever, des réponses à préparer. Seuls les formats et les pièces demandées changent.",
      },
      {
        q: "Nos réponses passées sont confidentielles. Où sont-elles traitées ?",
        a: "Le choix des modèles et de l'hébergement fait partie du cadrage, selon la sensibilité de vos documents. Vos réponses ne servent qu'à vous : elles ne sont ni partagées, ni utilisées pour entraîner un modèle.",
      },
      {
        q: "Et si une exigence n'a pas de réponse dans nos documents ?",
        a: "La grille le signale clairement, avec la ligne du dossier concernée. C'est à vos équipes d'y répondre, l'IA ne comble pas les trous.",
      },
    ],
  },
]
