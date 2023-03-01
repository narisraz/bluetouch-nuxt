<template>
  <div class="space-y-4">
    <ContainerCard title="Générer tournée">
      <form class="flex space-x-4 items-end">
        <FormSelect name="tournee" label="Tournée" :options="tourneesOptions" placeholder="Sélectionnez une tournée" />
        <FormSelect name="responsable" label="Responsable" :options="responsables" />
        <div>
          <Button class="bg-secondary text-on-secondary">Générer</Button>
        </div>
      </form>
    </ContainerCard>

    <div class="w-full space-y-4">
      <Table>
        <TableThead>
          <tr>
            <TableTh>N° Contrat</TableTh>
            <TableTh>Abonné</TableTh>
            <TableTh>Compteur</TableTh>
            <TableTh>Tél. mobile</TableTh>
            <TableTh>Rue</TableTh>
            <TableTh>Adresse</TableTh>
            <TableTh>Rang dans la tournée</TableTh>
            <TableTh is-last>Etat du branchement</TableTh>
          </tr>
        </TableThead>
        <tbody>
          <tr v-for="client in clients.data" :key="client.id">
            <TableTd>{{ client.attributes.num_contrat }}</TableTd>
            <TableTd>{{ client.attributes.nom }} {{ client.attributes.prenom }}</TableTd>
            <TableTd>{{ displayCompteur(client.attributes.compteur) }}</TableTd>
            <TableTd>{{ client.attributes.tel }}</TableTd>
            <TableTd>{{ displayRue(client.attributes.adresse) }}</TableTd>
            <TableTd>{{ displayAdresse(client.attributes.adresse) }}</TableTd>
            <TableTd></TableTd>
            <TableTd is-last>{{ displayEtatBranchement(client.attributes.etat_branchement) }}</TableTd>
          </tr>
        </tbody>
      </Table>

      <Button class="bg-secondary text-on-secondary">Valider</Button>
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
  title: "Générer tournée"
})

const { find } = useStrapi()
const saepStore = useSaepStore()

const tournees = find<Tournee>('tournees', {
  filters: {
    saep: saepStore.saep.id
  }
})
const tourneesOptions: Option[] = (await tournees).data.map(t => ({
  label: t.attributes.label,
  value: '' + t.id
}))

const responsables: Option[] = []

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
</script>