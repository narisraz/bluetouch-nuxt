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
            <TableTh>Libellé</TableTh>
            <TableTh>Terminée</TableTh>
            <TableTh>Cloturée</TableTh>
            <TableTh is-last>Actions</TableTh>
          </tr>
        </TableThead>
        <tbody>
          <tr v-for="tournee in tournees.data" :key="tournee.id">
            <TableTd>{{ tournee.attributes.label }}</TableTd>
            <TableTd>{{ tournee.attributes.terminee }}</TableTd>
            <TableTd>{{ tournee.attributes.cloturee ? "Oui" : "Non" }}</TableTd>
            <TableTd is-last>
              <Action v-if="tournee.attributes.cloturee" @click="() => cloturerTournee(tournee.id, false)">
                <IconPlay />
              </Action>
              <Action v-else @click="() => cloturerTournee(tournee.id, true)">
                <IconStop />
              </Action>
            </TableTd>
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
  title: "Tournées"
})

const { find, update } = useStrapi()
const saepStore = useSaepStore()

const tournees = ref(await findTournees())

async function findTournees() {
  return await find<Tournee>('tournees', {
    filters: {
      saep: saepStore.saep.id
    }
  })
}

function displayCount(pagination: any) {
  return pagination.total
}

async function cloturerTournee(id: number, value: boolean) {
  await update<Tournee>('tournees', id, {
    cloturee: value
  })

  tournees.value = await findTournees()
}
</script>