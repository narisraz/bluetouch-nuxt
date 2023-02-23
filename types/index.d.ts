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
}
