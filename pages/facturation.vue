<template>
  <div class="w-full space-y-4">
    <ContainerCard :title="`Facture du ${Intl.DateTimeFormat('fr-FR').format(Date.now())}`">
      <form class="flex space-x-4 items-end" @submit.prevent="genererFactures">
        <FormSelect v-model="tournee" placeholder="Sélectionnez la tournée" name="tournee" :options="tourneesOptions" label="Tournée" />
        <Button class="bg-secondary text-on-secondary">Générer</Button>
      </form>
    </ContainerCard>

    <Table v-if="clients?.data">
      <TableThead>
        <tr>
          <TableTh>N° Contrat</TableTh>
          <TableTh>Abonné</TableTh>
          <TableTh>Compteur</TableTh>
          <TableTh>Tél. mobile</TableTh>
          <TableTh>Rue</TableTh>
          <TableTh>Adresse</TableTh>
          <TableTh>Dernier index</TableTh>
          <TableTh>Montant du mois</TableTh>
          <TableTh>Total impayé</TableTh>
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
          <TableTd>{{ Intl.NumberFormat().format(displayDernierIndex(client.attributes.historique_indices)) }}</TableTd>
          <TableTd>{{ Intl.NumberFormat().format(displayMontant(client.attributes.factures)) }}</TableTd>
          <TableTd>{{ Intl.NumberFormat().format(displayTotal(client.attributes.factures)) }}</TableTd>
          <TableTd is-last>
            <Action>
              <IconArrowDownTray />
            </Action>
          </TableTd>
        </tr>
      </tbody>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { Strapi4ResponseData, Strapi4ResponseMany, Strapi4ResponseSingle } from "@nuxtjs/strapi/dist/runtime/types"
import { useSaepStore } from "~~/store/saep";

definePageMeta({
  layout: 'client',
  middleware: 'auth'
})

useHead({
  title: "Facturation"
})

const saepStore = useSaepStore()

const { find, delete: _delete, create, update } = useStrapi()
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
  return (historiqueIndices as Strapi4ResponseMany<HistoriqueIndex>).data.at(-2)?.attributes.value ?? 0
}

function displayMontant(factures: Strapi4ResponseMany<Facture> | number[]) {
  return (factures as Strapi4ResponseMany<Facture>).data.at(-1)?.attributes.montant ?? 0
}

function displayTotal(factures: Strapi4ResponseMany<Facture> | number[]) {
  return (factures as Strapi4ResponseMany<Facture>).data
    .filter(facture => !facture.attributes.regle)
    .map(facture => facture.attributes.montant - facture.attributes.encaisse)
    .reduce((f1, f2) => f1 + f2, 0)
}

async function findTournee() {
  return await find<Tournee>('tournees', {
    filters: {
      saep: saepStore.saep.id,
      cloturee: true,
      facturee: false
    }
  })
}

async function findClient() {
  if (!tournee.value) {
    return;
  }
  return await find<Client>('clients', {
    filters: {
      saep: saepStore.saep.id,
      tournee: tournee.value
    },
    populate: {
      branchement: true,
      compteur: true,
      adresse: true,
      historique_indices: true,
      factures: true
    }
  })
}

async function findTarifs() {
  return await find<Tarif>('tarifs', {
    filters: {
      saep: saepStore.saep.id
    },
    populate: {
      branchement: true
    }
  })
}

async function genererFactures() {
  clients.value = await findClient()
  const tarifs = await findTarifs()

  const date = Date.now()

  for (let client of (clients.value?.data as Strapi4ResponseData<Client>[])) {
    const solde = client.attributes.solde
    const branchement = client.attributes.branchement as Strapi4ResponseSingle<Branchement>
    const tarif = tarifs.data.find(tarif => (tarif.attributes.branchement as Strapi4ResponseSingle<Branchement>).data.attributes.code == branchement.data.attributes.code)
    const lastIndex = (client.attributes.historique_indices as Strapi4ResponseMany<HistoriqueIndex>).data.at(-1)?.attributes.value
    
    let montant = tarif!.attributes.prix_base
    if (lastIndex! < tarif!.attributes.volume_1) {
      montant += tarif!.attributes.prix_1
    }
    if (lastIndex! < tarif!.attributes.volume_2) {
      montant += tarif!.attributes.prix_2
    }
    if (lastIndex! < tarif!.attributes.volume_3) {
      montant += tarif!.attributes.prix_3
    }
  
    await create<Facture>('factures', {
      client: client.id,
      date,
      montant,
      regle: false,
      tournee: tournee.value,
      encaisse: Math.min(montant, solde)
    })

    await update<Client>('clients', client.id, {
      solde: Math.max(0, solde - montant)
    })
  }

  await update<Tournee>('tournees', tournee.value, {
    facturee: true
  })

  tournee.value = await findTournee()
  clients.value = await findClient()
}
</script>