<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div class="text-on-background uppercase font-bold">Liste des compteurs ({{ displayCount(compteurs.meta.pagination) }})</div>
      <NuxtLink to="/compteurs/new">
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
            <TableTh>Identifiant</TableTh>
            <TableTh is-last>Attribué à</TableTh>
          </tr>
        </TableThead>
        <tbody>
          <tr v-for="compteur in compteurs.data" :key="compteur.id">
            <TableTd>{{ compteur.attributes.identifiant }}</TableTd>
            <TableTd is-last>{{ displayClient(compteur.attributes.client) }}</TableTd>
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
  title: "Compteurs"
})

const { find } = useStrapi()
const saepStore = useSaepStore()

const compteurs = await find<Compteur>('compteurs', {
  filters: {
    saep: saepStore.saep.id
  },
  populate: {
    client: true
  }
})

function displayClient(client: Strapi4ResponseSingle<Client> | number) {
  const data = (client as Strapi4ResponseSingle<Client>).data
  if (!data) {
    return ''
  }
  return `${data.attributes.nom} ${data.attributes.prenom}`
}

function displayCount(pagination: any) {
  return pagination.total
}
</script>