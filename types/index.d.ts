import { Strapi4ResponseMany, Strapi4ResponseSingle, StrapiUser } from "@nuxtjs/strapi/dist/runtime/types"

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
    nom: string
    prenom: string
    tel: string
    email: string
    saep: Strapi4ResponseSingle<Saep> | number
    user_role: Strapi4ResponseSingle<Role> | number
    user: Strapi4ResponseSingle<StrapiUser> | number
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
    cloturee: boolean
    terminee: boolean
    facturee: boolean
    saep: Strapi4ResponseSingle<Saep> | number
    user_detail: Strapi4ResponseSingle<UserDetail> | number
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
    solde: number
    etat_branchement: Strapi4ResponseSingle<EtatBranchement> | number
    branchement: Strapi4ResponseSingle<Branchement> | number
    adresse: Strapi4ResponseSingle<Adresse> | number
    compteur: Strapi4ResponseSingle<Compteur> | number
    tournee: Strapi4ResponseSingle<Tournee> | number
    historique_indices: Strapi4ResponseMany<HistoriqueIndex> | number[]
    factures: Strapi4ResponseMany<Facture> | number[]
  }

  interface Facture {
    numero: string
    montant: number
    encaisse: number
    date: number
    regle: boolean
    client: Strapi4ResponseSingle<Client> | number
    tournee: Strapi4ResponseSingle<Tournee> | number
  }

  interface HistoriqueIndex {
    value: number
    date_tournee: number
    client: Strapi4ResponseSingle<Client> | number
  }

  interface HistoriqueEncaissement {
    montant: number
    date: number
    client: Strapi4ResponseSingle<Client> | number
  }

  interface Role {
    label: string,
    code: string
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
