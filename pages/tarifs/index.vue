<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div class="text-on-background uppercase font-bold">Liste des tarifs ({{ displayCount(tarifs.meta.pagination) }})</div>
      <NuxtLink to="/tarifs/new">
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
            <TableTh>Groype tarifaire</TableTh>
            <TableTh>Prix de base</TableTh>
            <TableTh>Volume max 1er tranche</TableTh>
            <TableTh>Prix / tr.1</TableTh>
            <TableTh>Volume max 2e tranche</TableTh>
            <TableTh>Prix / tr.2</TableTh>
            <TableTh>Volume max 3e tranche</TableTh>
            <TableTh is-last>Prix / tr.3</TableTh>
          </tr>
        </TableThead>
        <tbody>
          <tr v-for="tarif in tarifs.data" :key="tarif.id">
            <TableTd>{{ tarif.attributes.prix_base }}</TableTd>
            <TableTd>{{ tarif.attributes.prix_1 }}</TableTd>
            <TableTd>{{ tarif.attributes.volume_1 }}</TableTd>
            <TableTd>{{ tarif.attributes.prix_2 }}</TableTd>
            <TableTd>{{ tarif.attributes.volume_2 }}</TableTd>
            <TableTd>{{ tarif.attributes.prix_3 }}</TableTd>
            <TableTd is-last>{{ tarif.attributes.volume_3 }}</TableTd>
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
  title: "Liste des tarifs"
})

const saepStore = useSaepStore()
const { find } = useStrapi()

const tarifs = await find<Tarif>('tarifs', {
  filters: {
    saep: saepStore.saep.id
  },
  populate: {
    branchement: true
  }
})

function displayBranchement(branchement: Strapi4ResponseSingle<Branchement> | number) {
  return (branchement as Strapi4ResponseSingle<Branchement>).data.attributes.label
}

function displayCount(pagination: any) {
  return pagination.total
}
</script>