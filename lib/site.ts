export const site = {
  name: "Jegsen IA",
  /**
   * Adresse canonique unique du site : canoniques, sitemap, robots, Open Graph, données structurées.
   * Le site est servi et indexé sur le domaine nu (jegsen.fr). La variante www doit rediriger (301) ici.
   */
  url: "https://jegsen.fr",
  title: "Automatisation et intégration IA pour PME à Nantes | Jegsen",
  description:
    "Automatisation IA pour PME et ETI à Nantes : diagnostic chiffré, intégration à votre SI, formation des équipes et gains mesurés.",
  email: "contact@jegsen.fr",
  /** Page entreprise LinkedIn : pied de page, page contact et données structurées (sameAs). */
  linkedin: "https://www.linkedin.com/company/jegsen",
  city: "Nantes",
  postalCode: "44000",
  region: "Pays de la Loire",
  /**
   * Envoi du formulaire : FormSubmit (formsubmit.co) relaie le message par e-mail vers l'adresse ci-dessus.
   * Le premier envoi déclenche un e-mail d'activation à confirmer dans la boîte de réception.
   * Vide : ouverture de la messagerie du visiteur.
   */
  formEndpoint: "https://formsubmit.co/ajax/contact@jegsen.fr",
}

/**
 * Identité légale de l'éditeur (mentions légales, politique de confidentialité).
 * Les champs vides ne s'affichent pas, mais les champs marqués « obligatoire » doivent être remplis
 * (loi n° 2004-575 du 21 juin 2004, article 6 III) : le build les signale tant qu'ils manquent.
 */
export const legal = {
  company: "Jegsen", // dénomination, obligatoire
  legalForm: "", // ex. "SAS", obligatoire pour une société
  capital: "", // ex. "1 000 €", obligatoire pour une société
  address: "", // siège social, obligatoire
  registration: "", // ex. "RCS Nantes 123 456 789", obligatoire une fois immatriculée
  vat: "", // TVA intracommunautaire
  director: "", // directeur de la publication, obligatoire
  directorRole: "", // ex. "Président"
  host: { name: "", address: "", phone: "" }, // hébergeur, obligatoire
}

/** Équipe présentée sur la page À propos. Vide : section masquée. */
export const team: { name: string; role: string; bio: string }[] = []

export const mainNav = [
  { href: "/offres/diagnostic-rentabilite-ia", label: "Diagnostic" },
  { href: "/offres/sprint-integration-ia", label: "Intégration" },
  { href: "/offres/programme-formation-ia", label: "Formation" },
  { href: "/cas-usage", label: "Cas d'usage" },
  { href: "/ressources", label: "Ressources" },
]

/** Fondateurs, repris dans les données structurées de l'organisation. */
export const founders = [
  { name: "Matéo Mesguen", jobTitle: "Co-fondateur, CEO" },
  { name: "Tom Jegou", jobTitle: "Co-fondateur, CTO" },
]

export const companyNav = [
  { href: "/a-propos", label: "À propos" },
  { href: "/automatisation-ia-nantes", label: "Automatisation IA à Nantes" },
  { href: "/intelligence-artificielle-nantes", label: "IA à Nantes" },
  { href: "/ressources", label: "Ressources" },
  { href: "/contact", label: "Contact" },
]
