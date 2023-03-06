<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div class="text-on-background uppercase font-bold">Suivi des encaissements</div>
    </div>

    <div class="w-full">
      <Table>
        <TableThead>
          <tr>
            <TableTh>Date</TableTh>
            <TableTh>Abonné</TableTh>
            <TableTh>Tel</TableTh>
            <TableTh>Responsable</TableTh>
            <TableTh is-last>Montant</TableTh>
          </tr>
        </TableThead>
        <tbody>
          <tr v-for="historiqueEncaissement in historiqueEncaissements.data" :key="historiqueEncaissement.id">
            <TableTd>{{ Intl.DateTimeFormat('fr-FR').format(historiqueEncaissement.attributes.date) }}</TableTd>
            <TableTd>{{ displayClient(historiqueEncaissement.attributes.client) }}</TableTd>
            <TableTd>{{ displayTelClient(historiqueEncaissement.attributes.client) }}</TableTd>
            <TableTd>{{ displayResponsable(historiqueEncaissement.attributes.user_detail) }}</TableTd>
            <TableTd is-last>
              {{ Intl.NumberFormat().format(historiqueEncaissement.attributes.montant) }}
            </TableTd>
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
  title: "Créditer un compte"
})

const { find } = useStrapi()
const saepStore = useSaepStore()

const historiqueEncaissements = ref(await findHistoriqueEncaissements())

async function findHistoriqueEncaissements() {
  return await find<HistoriqueEncaissement>('historique-encaissements', {
    filters: {
      saep: saepStore.saep.id
    },
    populate: {
      client: true,
      tournee: true,
      user_detail: true
    },
    sort: 'date:desc'
  })
}

function displayClient(client: Strapi4ResponseSingle<Client> | number) {
  const data = (client as Strapi4ResponseSingle<Client>).data
  if (!data) {
    return ''
  }
  return `${data.attributes.nom} ${data.attributes.prenom}`
}

function displayTelClient(client: Strapi4ResponseSingle<Client> | number) {
  return (client as Strapi4ResponseSingle<Client>).data.attributes.tel
}

function displayResponsable(userDetail: Strapi4ResponseSingle<UserDetail> | number) {
  const attributes = (userDetail as Strapi4ResponseSingle<UserDetail>).data.attributes
  return `${attributes.nom} ${attributes.prenom}`
}
</script>