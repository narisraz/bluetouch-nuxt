<template>
  <div class="space-y-4">
    <ContainerCard title="Encaissement">
      <form class="flex space-x-4 items-end" @submit.prevent="rechercherClient">
        <FormTextfield v-model="contrat" type="text" name="contract" label="N° contrat" placeholder="Entrez un numéro de contrat" />
        <FormTextfield v-model="nom" type="text" name="name" label="Nom" placeholder="Entrez un nom" />
        <FormTextfield v-model="prenom" type="text" name="firstName" label="Prénom" placeholder="Entrez un prénom" />
        <FormTextfield v-model="tel" type="text" name="tel" label="Téléphone" placeholder="Entrez un numéro" />
        <Button class="bg-secondary text-on-secondary" type="submit">Rechercher</Button>
      </form>
    </ContainerCard>
    <Table v-if="clients?.data">
      <TableThead>
        <tr>
          <TableTh>N° Contrat</TableTh>
          <TableTh>Abonné</TableTh>
          <TableTh>Tél. mobile</TableTh>
          <TableTh>Rue</TableTh>
          <TableTh>Adresse</TableTh>
          <TableTh>Reste à payer</TableTh>
          <TableTh is-last>Actions</TableTh>
        </tr>
      </TableThead>
      <tbody>
        <tr v-for="client in clients.data" :key="client.id">
          <TableTd>{{ client.attributes.num_contrat }}</TableTd>
          <TableTd>{{ client.attributes.nom }} {{ client.attributes.prenom }}</TableTd>
          <TableTd>{{ client.attributes.tel }}</TableTd>
          <TableTd>{{ displayRue(client.attributes.adresse) }}</TableTd>
          <TableTd>{{ displayAdresse(client.attributes.adresse) }}</TableTd>
          <TableTd>{{ calculerTotalAPayer(client.attributes.factures) }}</TableTd>
          <TableTd is-last>
            <Action @click="() => openDialog = true">
              <IconCreditCard />
            </Action>
          </TableTd>
        </tr>
      </tbody>
    </Table>
    
    <ContainerModal :is-open="openDialog" :close="closeModal">
      <ContainerCard>
        <form class="space-y-4" method="post">
          <div>
            <FormTextfield label="Montant" name="value" type="text" placeholder="Entrez le montant à encaisser" class="w-64">
              <template #prefixIcon>
                <IconCreditCard class="w-4 h-4" />
              </template>
            </FormTextfield>
          </div>
          <div class="flex space-x-2">
            <div @click="closeModal">
              <Button type="button" class="bg-primary-container text-on-primary-container">Annuler</Button>
            </div>
            <Button class="bg-secondary text-on-secondary">Valider</Button>
          </div>
        </form>
      </ContainerCard>
    </ContainerModal>
  </div>
</template>

<script setup lang="ts">
import { Strapi4ResponseMany, Strapi4ResponseSingle } from '@nuxtjs/strapi/dist/runtime/types';
import { useSaepStore } from '~~/store/saep';

definePageMeta({
  layout: 'client',
  middleware: 'auth'
})

useHead({
  title: "Encaissement"
})

const saepStore = useSaepStore()

const { find } = useStrapi()

const contrat = ref()
const nom = ref()
const prenom = ref()
const tel = ref()
const clients = ref<Strapi4ResponseMany<Client>>()

async function rechercherClient() {
  clients.value = await find<Client>('clients', {
    filters: {
      saep: saepStore.saep.id,
      $or: [
        {num_contrat: {
          $contains: contrat.value
        }},
        {nom: {
          $contains: nom.value
        }},
        {prenom: {
          $contains: prenom.value
        }},
        {tel: {
          $contains: tel.value
        }}
      ]
    },
    populate: {
      adresse: true,
      factures: true
    }
  })
}

function pay() {
  openDialog.value = true
}

function calculerTotalAPayer(factures: Strapi4ResponseMany<Facture> | number[]) {
  return (factures as Strapi4ResponseMany<Facture>).data
    .filter(facture => !facture.attributes.regle)
    .map(facture => facture.attributes.montant)
    .reduce((f1, f2) => f1 + f2, 0)
}

const openDialog = ref(false)

function closeModal() {
  openDialog.value = false
}

function displayRue(adresse: Strapi4ResponseSingle<Adresse> | number) {
  return (adresse as Strapi4ResponseSingle<Adresse>).data.attributes.rue
}

function displayAdresse(adresse: Strapi4ResponseSingle<Adresse> | number) {
  return (adresse as Strapi4ResponseSingle<Adresse>).data.attributes.adresse
}
</script>