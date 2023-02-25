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
  }
  
  interface Adresse {
    region: string
    district: string
    commune: string
    longitude: string
    latitude: string
  }

  interface UserDetail {
    saep: Strapi4ResponseSingle<Saep>
  }

  interface Branchement {
    id: string
    label: string
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

  interface Compteur {
    identifiant: string
    saep: Strapi4ResponseSingle<Saep> | number
  }

  interface Option {
    label: string,
    value: string
  }
}
