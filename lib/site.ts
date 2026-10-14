export const site = {
  name: "Jegsen IA",
  url: "https://www.jegsen.fr",
  title: "Jegsen IA | Intégration IA et automatisation pour PME à Nantes",
  description:
    "Jegsen rend l'IA rentable pour les PME et ETI : diagnostic chiffré, automatisation intégrée à votre SI, formation des équipes et gains mesurés. Basé à Nantes.",
  email: "jegsencorp@gmail.com", // adresse temporaire, à remplacer par contact@jegsen.fr une fois le domaine en place
  city: "Nantes",
  postalCode: "44000",
  region: "Pays de la Loire",
  /**
   * Envoi du formulaire : FormSubmit (formsubmit.co) relaie le message par e-mail vers l’adresse ci-dessus.
   * Le premier envoi déclenche un e-mail d’activation à confirmer dans la boîte de réception.
   * Vide : ouverture de la messagerie du visiteur.
   */
  formEndpoint: "https://formsubmit.co/ajax/jegsencorp@gmail.com",
}

/**
 * Identité légale de l’éditeur (mentions légales, politique de confidentialité).
 * Les champs vides ne s’affichent pas, mais les champs marqués « obligatoire » doivent être remplis
 * (loi n° 2004-575 du 21 juin 2004, article 6 III) : le build les signale tant qu’ils manquent.
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
  { href: "/cas-usage", label: "Cas d’usage" },
  { href: "/ressources", label: "Ressources" },
]

export const companyNav = [
  { href: "/a-propos", label: "À propos" },
  { href: "/intelligence-artificielle-nantes", label: "IA à Nantes" },
  { href: "/ressources", label: "Ressources" },
  { href: "/contact", label: "Contact" },
]
