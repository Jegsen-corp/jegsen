/**
 * Produit Jegsen : aide à la décision des comités de direction.
 * Le nom est centralisé ici. Le changer ici le change partout sur le site.
 */
export const product = {
  name: "brAIn",
  tagline: "L'aide à la décision de votre comité de direction.",
  lead:
    "Nous développons brAIn pour préparer chaque décision de votre CODIR à partir des données de l'entreprise : options comparées, chiffres sourcés, précédents et contre-arguments. Le CODIR tranche. brAIn suit ensuite la décision jusqu'au résultat et apprend de chaque revue. Un programme pilote est ouvert à quelques comités de direction.",
  benefits: [
    {
      motif: "facts",
      title: "Décider sur des faits",
      text: "Chaque option est chiffrée à partir de vos ventes, de vos comptes et de vos comptes rendus, sources citées.",
    },
    {
      motif: "debate",
      title: "Entendre la contradiction",
      text: "Avant de trancher, brAIn donne le meilleur argument contraire et rappelle ce qui s'est passé dans des cas proches.",
    },
    {
      motif: "seal",
      title: "Garder la main",
      text: "brAIn éclaire et recommande. La décision reste celle du CODIR, notée avec son pourquoi.",
    },
    {
      motif: "loop",
      title: "Apprendre de chaque décision",
      text: "Hypothèses surveillées, revue à 90 jours : chaque résultat éclaire la décision suivante.",
    },
  ],
  pilotLabel: "Rejoindre le programme pilote",
} as const

export type ProductMotif = (typeof product.benefits)[number]["motif"]
