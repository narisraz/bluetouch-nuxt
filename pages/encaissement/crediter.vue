<template>
  <div class="space-y-4">
    <ContainerCard title="Encaissement">
      <form class="flex space-x-4 items-end" @submit.prevent="findClients">
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
          <TableTh>Solde</TableTh>
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
          <TableTd>{{ Intl.NumberFormat().format(client.attributes.solde) }}</TableTd>
          <TableTd>{{ Intl.NumberFormat().format(calculerTotalAPayer(client.attributes.factures)) }}</TableTd>
          <TableTd is-last>
            <Action @click="() => encaisser(client)">
              <IconCreditCard />
            </Action>
          </TableTd>
        </tr>
      </tbody>
    </Table>
    
    <ContainerModal :is-open="openDialog" :close="closeModal">
      <ContainerCard>
        <form class="space-y-4" method="post" @submit.prevent="encaisserSomme">
          <div class="font-bold">Solde : {{ Intl.NumberFormat().format(clientSelectionne?.attributes.solde as number) }}</div>
          <div class="space-y-2">
            <div class="font-bold">Historique des factures non réglés</div>
            <Table>
              <TableThead>
                <tr>
                  <TableTh>N° facture</TableTh>
                  <TableTh>Date</TableTh>
                  <TableTh>Montant</TableTh>
                  <TableTh>Encaissé</TableTh>
                  <TableTh is-last>Reste à payer</TableTh>
                </tr>
              </TableThead>
              <tbody>
                <tr v-for="facture in facturesNonRegles" :key="facture.id">
                  <TableTd>{{ facture.attributes.numero }}</TableTd>
                  <TableTd>{{ Intl.DateTimeFormat('fr-FR').format(facture.attributes.date) }}</TableTd>
                  <TableTd>
                    {{ Intl.NumberFormat('fr-FR').format(facture.attributes.montant) }}
                  </TableTd>
                  <TableTd>
                    {{ Intl.NumberFormat('fr-FR').format(facture.attributes.encaisse) }}
                  </TableTd>
                  <TableTd is-last>
                    {{ Intl.NumberFormat('fr-FR').format(facture.attributes.montant - facture.attributes.encaisse) }}
                  </TableTd>
                </tr>
                <tr>
                  <TableTd :col-span="4" class="text-right font-semibold">
                    Total
                  </TableTd>
                  <TableTd is-last>
                    {{ Intl.NumberFormat('fr-FR').format(getTotalHistorique()) }}
                  </TableTd>
                </tr>
              </tbody>
            </Table>
          </div>
          <div>
            <FormTextfield v-model="montantAEncaisser" label="Montant à encaisser" name="value" type="text" placeholder="Entrez le montant à encaisser" class="w-64">
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
import { Strapi4ResponseData, Strapi4ResponseMany, Strapi4ResponseSingle } from '@nuxtjs/strapi/dist/runtime/types';
definePageMeta({
  layout: 'client',
  middleware: 'auth'
})

useHead({
  title: "Encaissement"
})

const saep = useSaep()

const { find, update, create } = useStrapi()

const contrat = ref()
const nom = ref()
const prenom = ref()
const tel = ref()
const montantAEncaisser = ref()
const clients = ref<Strapi4ResponseMany<Client>>()
const facturesNonRegles = ref<Strapi4ResponseData<Facture>[]>()

async function findClients() {
  clients.value = await find<Client>('clients', {
    filters: {
      saep: saep.id,
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
      factures: true,
      tournee: true
    }
  })
}

function calculerTotalAPayer(factures: Strapi4ResponseMany<Facture> | number[]) {
  return (factures as Strapi4ResponseMany<Facture>).data
    .filter(facture => !facture.attributes.regle)
    .map(facture => facture.attributes.montant - facture.attributes.encaisse)
    .reduce((f1, f2) => f1 + f2, 0)
}

function getTotalHistorique() {
  return facturesNonRegles.value
    ?.map(facture => facture.attributes.montant - facture.attributes.encaisse)
    .reduce((f1, f2) => f1 + f2, 0) ?? 0
}

const openDialog = ref(false)
const clientSelectionne = ref<Strapi4ResponseData<Client>>()

function encaisser(client: Strapi4ResponseData<Client>) {
  openDialog.value = true
  clientSelectionne.value = client
  facturesNonRegles.value = (client.attributes.factures as Strapi4ResponseMany<Facture>).data
    .filter(facture => !facture.attributes.regle)
}

async function encaisserSomme() {
  if (!montantAEncaisser.value) {
    closeModal()
  }
  let aEncaisser = Math.abs(montantAEncaisser.value)

  const user = useStrapiUser()
  const responsable = (await find<UserDetail>('user-details', {
    filters: {
      saep: saep.id,
      user: user.value?.id
    },
    populate: {
      user_role: true
    }
  })).data.at(0)

  await create<HistoriqueEncaissement>('historique-encaissements', {
    client: clientSelectionne.value?.id,
    date: Date.now(),
    montant: aEncaisser,
    saep: saep.id,
    tournee: (clientSelectionne.value?.attributes.tournee as Strapi4ResponseSingle<Tournee>).data.id,
    user_detail: responsable?.id
  })

  for (let facture of facturesNonRegles.value as Strapi4ResponseData<Facture>[]) {
    const montant = facture.attributes.montant
    const encaisse = facture.attributes.encaisse
    if (aEncaisser > 0) {
      await update<Facture>('factures', facture.id, {
        encaisse: Math.min(montant, aEncaisser + encaisse),
        regle: aEncaisser + encaisse - montant >= 0
      })
      aEncaisser -= montant + encaisse
    }
  }

  await update<Client>('clients', clientSelectionne.value?.id as number, {
    solde: Math.max(0, aEncaisser)
  })

  await findClients()
  closeModal()
}

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