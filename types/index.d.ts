import { Strapi4ResponseMany, Strapi4ResponseSingle } from "@nuxtjs/strapi/dist/runtime/types"

export { }

declare global {
  interface Saep {
    id: number
    capacite: number
    nombre_reservoir: number
    nombre_population: number
    ressources_en_eau: Strapi4ResponseMany<RessourceEnEau>
    adresse: Strapi4ResponseSingle<Adresse>
  }
  
  interface RessourceEnEau {
    label: string
    code: CodeRessourceEnEau
  }
  
  interface Adresse {
    region: string
    district: string
    commune: string
    longitude: string
    latitude: string
    rue: string
    adresse: string
  }

  interface UserDetail {
    saep: Strapi4ResponseSingle<Saep>
  }

  interface Branchement {
    id: string
    label: string
    code: CodeBranchement
  }

  interface Tarif {
    prix_base: number
    prix_1: number
    volume_1: number
    prix_2: number
    volume_2: number
    prix_3: number
    volume_3: number
    branchement: Strapi4ResponseSingle<Branchement> | number
    saep: Strapi4ResponseSingle<Saep> | number
  }

  interface Tournee {
    label: string
    saep: Strapi4ResponseSingle<Saep> | number
  }

  interface EtatBranchement {
    label: string
    code: string
  }

  interface Client {
    num_contrat: string
    nom: string
    prenom: string
    tel: string
    email: string
    taille_menage: number
    etat_branchement: Strapi4ResponseSingle<EtatBranchement> | number
    branchement: Strapi4ResponseSingle<Branchement> | number
    adresse: Strapi4ResponseSingle<Adresse> | number
    compteur: Strapi4ResponseSingle<Compteur> | number
    tournee: Strapi4ResponseSingle<Tournee> | number
  }

  interface Compteur {
    identifiant: string
    client: Strapi4ResponseSingle<Client> | number
    saep: Strapi4ResponseSingle<Saep> | number
  }

  interface Option {
    label: string,
    value: string
  }

  enum CodeBranchement {
    PRIVE, SOCIAL
  }

  enum CodeRessourceEnEau {
    RIVIERE, RESERVOIR, MONTAGNE
  }
}
