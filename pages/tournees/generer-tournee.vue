<template>
  <div class="space-y-4">
    <ContainerCard title="Générer tournée">
      <form class="flex space-x-4 items-end" @submit.prevent="generate">
        <FormSelect v-model="tournee" name="tournee" label="Tournée" :options="tourneesOptions" placeholder="Sélectionnez une tournée" />
        <FormSelect v-model="responsable" placeholder="Choisissez le responsable" name="responsable" label="Responsable" :options="responsablesOptions" />
        <div>
          <Button type="submit" class="bg-secondary text-on-secondary">Générer</Button>
        </div>
      </form>
    </ContainerCard>

    <div class="w-full space-y-4" v-if="tourneesToDisplay?.length">
      <Table>
        <TableThead>
          <tr>
            <TableTh>Nom</TableTh>
            <TableTh>Adresse</TableTh>
            <TableTh>Date tournée</TableTh>
            <TableTh is-last>Dernier index</TableTh>
          </tr>
        </TableThead>
        <tbody>
          <tr v-for="tournee in tourneesToDisplay" :key="tournee.clientId">
            <TableTd>{{ tournee.nom }}</TableTd>
            <TableTd>{{ tournee.adresse }}</TableTd>
            <TableTd>{{ Intl.DateTimeFormat('fr-FR').format(tournee.dateTournee) }}</TableTd>
            <TableTd is-last>{{ tournee.ancienIndex }}</TableTd>
          </tr>
        </tbody>
      </Table>

      <Button class="bg-secondary text-on-secondary" @click="validate">Valider</Button>
    </div>
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
  title: "Générer tournée"
})

const { find, create, update } = useStrapi()
const saepStore = useSaepStore()

const tournees = await find<Tournee>('tournees', {
  filters: {
    saep: saepStore.saep.id
  }
})
const tourneesOptions: Option[] = tournees.data.map(t => ({
  label: t.attributes.label,
  value: '' + t.id
}))

const responsables = await find<UserDetail>('user-details', {
  filters: {
    saep: saepStore.saep.id,
  },
  populate: {
    user_role: true
  }
})
const responsablesOptions: Option[] = responsables.data.map(r => ({
  label: `${r.attributes.nom} ${r.attributes.prenom} (${(r.attributes.user_role as Strapi4ResponseSingle<Role>).data.attributes.label})`,
  value: '' + r.id
}))

const tournee = ref()
const responsable = ref()

interface TourneeToDisplay {
  clientId: number
  nom: string
  adresse: string
  dateTournee: number
  ancienIndex: number | undefined
}
const tourneesToDisplay = ref<TourneeToDisplay[]>()

async function generate() {
  if (!tournee.value || !responsable.value) {
    return;
  }

  const clients = await find<Client>('clients', {
    filters: {
      tournee: tournee.value,
    },
    pagination: {
      start: 0,
      limit: Number.MAX_SAFE_INTEGER
    },
    populate: {
      historique_indices: true,
      adresse: true
    }
  })

  const date = Date.now()

  tourneesToDisplay.value = clients.data.map(c => ({
    clientId: c.id,
    nom: `${c.attributes.nom} ${c.attributes.prenom}`,
    adresse: (c.attributes.adresse as Strapi4ResponseSingle<Adresse>).data.attributes.adresse,
    dateTournee: date,
    ancienIndex: (c.attributes.historique_indices as Strapi4ResponseMany<HistoriqueIndex>).data.at(-1)?.attributes.value
  }))
}

async function validate() {
  tourneesToDisplay.value?.map(async t => await create<HistoriqueIndex>('historique-indices', ({
    client: t.clientId,
    date_tournee: t.dateTournee,
    value: 0
  })))

  await update<Tournee>('tournees', tournee.value, {
    cloturee: false,
    terminee: false,
    facturee: false,
    user_detail: responsable.value
  })

  tournee.value = undefined
  responsable.value = undefined
  tourneesToDisplay.value = []
}
</script>