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
      <table class="table-auto w-full rounded-md bg-surface text-on-surface overflow-scroll">
        <thead class="bg-surface-variant text-on-surface-variant rounded-md">
          <tr>
            <th class="border-b-2 border-background text-left p-2">Groype tarifaire</th>
            <th class="border-b-2 border-background text-left p-2">Prix de base</th>
            <th class="border-b-2 border-background text-left p-2">Volume max 1er tranche</th>
            <th class="border-b-2 border-background text-left p-2">Prix / tr.1</th>
            <th class="border-b-2 border-background text-left p-2">Volume max 2e tranche</th>
            <th class="border-b-2 border-background text-left p-2">Prix / tr.2</th>
            <th class="border-b-2 border-background text-left p-2">Volume max 3e tranche</th>
            <th class="border-b-2 border-background text-left p-2">Prix / tr.3</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tarif in tarifs.data" :key="tarif.id">
            <td class="border-b-2 border-background p-2">{{ displayBranchement(tarif.attributes.branchement) }}</td>
            <td class="border-b-2 border-background p-2 text-center">{{ tarif.attributes.prix_base }}</td>
            <td class="border-b-2 border-background p-2 text-center">{{ tarif.attributes.prix_1 }}</td>
            <td class="border-b-2 border-background p-2 text-center">{{ tarif.attributes.volume_1 }}</td>
            <td class="border-b-2 border-background p-2 text-center">{{ tarif.attributes.prix_2 }}</td>
            <td class="border-b-2 border-background p-2 text-center">{{ tarif.attributes.volume_2 }}</td>
            <td class="border-b-2 border-background p-2 text-center">{{ tarif.attributes.prix_3 }}</td>
            <td class="border-b-2 border-background p-2 text-center">{{ tarif.attributes.volume_3 }}</td>
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