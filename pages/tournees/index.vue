<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div class="text-on-background uppercase font-bold">Liste des tournées ({{ displayCount(tournees.meta.pagination) }})</div>
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
            <TableTh is-last>Libellé</TableTh>
          </tr>
        </TableThead>
        <tbody>
          <tr v-for="tournee in tournees.data" :key="tournee.id">
            <TableTd is-last>{{ tournee.attributes.label }}</TableTd>
          </tr>
        </tbody>
      </Table>
    </div>
  </div>
</template>

<script setup lang="ts">
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

const tournees = await find<Tournee>('tournees', {
  filters: {
    saep: saepStore.saep.id
  }
})

function displayCount(pagination: any) {
  return pagination.total
}
</script>