<template>
  <div class="w-full space-y-4">
    <ContainerCard>
      <form class="flex space-x-4 items-end" @submit.prevent="startTournee">
        <FormSelect v-model="tournee" placeholder="Sélectionnez la tournée" name="tournee" :options="tourneesOptions" label="Tournée" />
        <Button class="bg-secondary text-on-secondary">Commencer</Button>
      </form>
    </ContainerCard>

    <div class="w-full space-y-4" v-if="clients?.data">
      <Table>
        <TableThead>
          <tr>
            <TableTh>N° Contrat</TableTh>
            <TableTh>Abonné</TableTh>
            <TableTh>Compteur</TableTh>
            <TableTh>Tél. mobile</TableTh>
            <TableTh>Rue</TableTh>
            <TableTh>Adresse</TableTh>
            <TableTh>Dernier index</TableTh>
            <TableTh>Nouvel index</TableTh>
            <TableTh is-last>Actions</TableTh>
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
            <TableTd>{{ displayDernierIndex(client.attributes.historique_indices) }}</TableTd>
            <TableTd>{{ displayNouvelIndex(client.attributes.historique_indices) }}</TableTd>
            <TableTd is-last>
              <Action @click="() => addNewIndex(client.id, getIdDerniereIndex(client.attributes.historique_indices))">
                <IconCircleAdd />
              </Action>
            </TableTd>
          </tr>
        </tbody>
      </Table>
  
      <Button class="bg-secondary text-on-secondary" @click="terminerTournee">Terminer</Button>
    </div>

    <ContainerModal :is-open="openDialog" :close="closeModal">
      <ContainerCard>
        <form action="/releve-index" class="space-y-4" method="post">
          <div>
            <FormTextfield v-model="newIndex" label="Nouvel index" name="value" type="number" placeholder="Entrez le nouvel index" class="w-64">
              <template #prefixIcon>
                <IconCreditCard class="w-4 h-4" />
              </template>
            </FormTextfield>
          </div>
          <div class="flex space-x-2">
            <Button @click="closeModal" type="button" class="bg-primary-container text-on-primary-container">Annuler</Button>
            <Button @click="saveNewIndex" type="button" class="bg-secondary text-on-secondary">Valider</Button>
          </div>
        </form>
      </ContainerCard>
    </ContainerModal>
  </div>
</template>

<script setup lang="ts">
import { Strapi4ResponseMany, Strapi4ResponseSingle } from "@nuxtjs/strapi/dist/runtime/types"

definePageMeta({
  layout: 'client',
  middleware: 'auth'
})

useHead({
  title: "Relevé index"
})

const { find, update } = useStrapi()
const saep = useSaep()
const selectedClientId = ref()
const selectedDernierIndexId = ref()
const newIndex = ref()
const tournee = ref()

const tournees = ref(await findTournee())
const tourneesOptions: Option[] = tournees.value.data.map(t => ({
  label: t.attributes.label,
  value: '' + t.id
}))

const clients = ref<Strapi4ResponseMany<Client>>()

function displayCompteur(compteur: Strapi4ResponseSingle<Compteur> | number) {
  return (compteur as Strapi4ResponseSingle<Compteur>).data.attributes.identifiant
}

function displayRue(adresse: Strapi4ResponseSingle<Adresse> | number) {
  return (adresse as Strapi4ResponseSingle<Adresse>).data.attributes.rue
}

function displayAdresse(adresse: Strapi4ResponseSingle<Adresse> | number) {
  return (adresse as Strapi4ResponseSingle<Adresse>).data.attributes.adresse
}

function displayDernierIndex(historiqueIndices: Strapi4ResponseMany<HistoriqueIndex> | number[]) {
  return (historiqueIndices as Strapi4ResponseMany<HistoriqueIndex>).data.at(-2)?.attributes.value
}

function getIdDerniereIndex(historiqueIndices: Strapi4ResponseMany<HistoriqueIndex> | number[]) {
  return (historiqueIndices as Strapi4ResponseMany<HistoriqueIndex>).data.at(-1)?.id
}

function displayNouvelIndex(historiqueIndices: Strapi4ResponseMany<HistoriqueIndex> | number[]) {
  return (historiqueIndices as Strapi4ResponseMany<HistoriqueIndex>).data.at(-1)?.attributes.value
}

async function findTournee() {
  return await find<Tournee>('tournees', {
    filters: {
      saep: saep.id,
      cloturee: false
    }
  })
}

async function findClient() {
  if (!tournee.value) {
    return;
  }
  return await find<Client>('clients', {
    filters: {
      saep: saep.id,
      tournee: tournee.value
    },
    populate: {
      branchement: true,
      compteur: true,
      adresse: true,
      historique_indices: true,
    }
  })
}

const openDialog = ref(false)

function addNewIndex(clientId: number, indexId: number | undefined) {
  selectedClientId.value = clientId
  selectedDernierIndexId.value = indexId
  openDialog.value = true
}

function closeModal() {
  openDialog.value = false
  newIndex.value = undefined
}

async function saveNewIndex() {
  await update<HistoriqueIndex>('historique-indices', selectedDernierIndexId.value, {
    value: newIndex.value
  })

  clients.value = await findClient()
  closeModal()
}

async function startTournee() {
  clients.value = await findClient()
}

async function terminerTournee() {
  await update<Tournee>('tournees', tournee.value, {
    terminee: true
  })

  tournees.value = await findTournee()
  tournee.value = undefined
  clients.value = undefined
}
</script>