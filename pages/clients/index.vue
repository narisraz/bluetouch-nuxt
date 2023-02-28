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
      <Table>
        <TableThead>
          <tr>
            <TableTh>N° Contrat</TableTh>
            <TableTh>Abonné</TableTh>
            <TableTh>Groupe tarifaire</TableTh>
            <TableTh>Compteur</TableTh>
            <TableTh>Tél. mobile</TableTh>
            <TableTh>Rue</TableTh>
            <TableTh>Adresse</TableTh>
            <TableTh>Taille de ménage</TableTh>
            <TableTh>Tournée</TableTh>
            <TableTh is-last>Etat du branchement</TableTh>
          </tr>
        </TableThead>
        <tbody>
          <tr v-for="client in clients.data" :key="client.id">
            <TableTd>{{ client.attributes.num_contrat }}</TableTd>
            <TableTd>{{ client.attributes.nom }} {{ client.attributes.prenom }}</TableTd>
            <TableTd>{{ displayBranchement(client.attributes.branchement) }}</TableTd>
            <TableTd>{{ displayCompteur(client.attributes.compteur) }}</TableTd>
            <TableTd>{{ client.attributes.tel }}</TableTd>
            <TableTd>{{ displayRue(client.attributes.adresse) }}</TableTd>
            <TableTd>{{ displayAdresse(client.attributes.adresse) }}</TableTd>
            <TableTd>{{ client.attributes.taille_menage }}</TableTd>
            <TableTd>{{ displayTournee(client.attributes.tournee) }}</TableTd>
            <TableTd is-last>{{ displayEtatBranchement(client.attributes.etat_branchement) }}</TableTd>
          </tr>
        </tbody>
      </Table>
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
    etat_branchement: true,
    tournee: true
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

function displayTournee(tournee: Strapi4ResponseSingle<Tournee> | number) {
  return (tournee as Strapi4ResponseSingle<Tournee>).data.attributes.label
}

function displayCount(pagination: any) {
  return pagination.total
}
</script>