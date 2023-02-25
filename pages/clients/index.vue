<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div class="text-on-background uppercase font-bold">Liste des clients ({{ displayCount(clients.meta.pagination) }})</div>
      <NuxtLink to="/clients/new">
        <Button class="bg-secondary text-on-secondary flex space-x-2 hover:bg-secondary/75">
          <IconPlus />
          <div>
            Nouveau
          </div>
        </Button>
      </NuxtLink>
    </div>

    <div class="w-full">
      <table class="table-auto w-full rounded-md bg-surface text-on-surface overflow-scroll">
        <thead class="bg-surface-variant text-on-surface-variant rounded-md">
          <tr>
            <th class="border-b-2 border-background text-left p-2">N° Contrat</th>
            <th class="border-b-2 border-background text-left p-2">Abonné</th>
            <th class="border-b-2 border-background text-left p-2">Groupe tarifaire</th>
            <th class="border-b-2 border-background text-left p-2">Compteur</th>
            <th class="border-b-2 border-background text-left p-2">Tél. mobile</th>
            <th class="border-b-2 border-background text-left p-2">Rue</th>
            <th class="border-b-2 border-background text-left p-2">Adresse</th>
            <th class="border-b-2 border-background text-left p-2">Taille de ménage</th>
            <th class="border-b-2 border-background text-left p-2">Rang dans la tournée</th>
            <th class="border-b-2 border-background text-left p-2">Etat du branchement</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in clients.data" :key="client.id">
            <td class="border-b-2 border-background p-2">{{ client.attributes.num_contrat }}</td>
            <td class="border-b-2 border-background p-2">{{ client.attributes.nom }} {{ client.attributes.prenom }}</td>
            <td class="border-b-2 border-background p-2">{{ displayBranchement(client.attributes.branchement) }}</td>
            <td class="border-b-2 border-background p-2">{{ displayCompteur(client.attributes.compteur) }}</td>
            <td class="border-b-2 border-background p-2">{{ client.attributes.tel }}</td>
            <td class="border-b-2 border-background p-2">{{ displayRue(client.attributes.adresse) }}</td>
            <td class="border-b-2 border-background p-2">{{ displayAdresse(client.attributes.adresse) }}</td>
            <td class="border-b-2 border-background p-2">{{ client.attributes.taille_menage }}</td>
            <td class="border-b-2 border-background p-2"></td>
            <td class="border-b-2 border-background p-2">{{ displayEtatBranchement(client.attributes.etat_branchement) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Strapi4ResponseSingle } from '@nuxtjs/strapi/dist/runtime/types';
import { useSaepStore } from '~~/store/saep';

definePageMeta({
  layout: 'client',
  middleware: 'auth'
})

useHead({
  title: "Clients"
})

const { find } = useStrapi()
const saepStore = useSaepStore()

const clients = await find<Client>('clients', {
  filters: {
    saep: saepStore.saep.id
  },
  populate: {
    branchement: true,
    compteur: true,
    adresse: true,
    etat_branchement: true
  }
})

function displayBranchement(branchement: Strapi4ResponseSingle<Branchement> | number) {
  return (branchement as Strapi4ResponseSingle<Branchement>).data.attributes.label
}

function displayCompteur(compteur: Strapi4ResponseSingle<Compteur> | number) {
  return (compteur as Strapi4ResponseSingle<Compteur>).data.attributes.identifiant
}

function displayRue(adresse: Strapi4ResponseSingle<Adresse> | number) {
  return (adresse as Strapi4ResponseSingle<Adresse>).data.attributes.rue
}

function displayAdresse(adresse: Strapi4ResponseSingle<Adresse> | number) {
  return (adresse as Strapi4ResponseSingle<Adresse>).data.attributes.adresse
}

function displayEtatBranchement(etatBranchement: Strapi4ResponseSingle<EtatBranchement> | number) {
  return (etatBranchement as Strapi4ResponseSingle<EtatBranchement>).data.attributes.label
}

function displayCount(pagination: any) {
  return pagination.total
}
</script>