<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div class="text-on-background uppercase font-bold">Liste des collaborateurs ({{ displayCount(collaborateurs.meta.pagination) }})</div>
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
            <TableTh>Email</TableTh>
            <TableTh>Nom</TableTh>
            <TableTh>Prénom</TableTh>
            <TableTh>Tel</TableTh>
            <TableTh is-last>Rôle</TableTh>
          </tr>
        </TableThead>
        <tbody>
          <tr v-for="collaborateur in collaborateurs.data" :key="collaborateur.id">
            <TableTd>{{ collaborateur.attributes.email }}</TableTd>
            <TableTd>{{ collaborateur.attributes.nom }}</TableTd>
            <TableTd>{{ collaborateur.attributes.prenom }}</TableTd>
            <TableTd>{{ collaborateur.attributes.tel }}</TableTd>
            <TableTd is-last>{{ displayRole(collaborateur.attributes.user_role) }}</TableTd>
          </tr>
        </tbody>
      </Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Strapi4ResponseSingle, StrapiUser } from '@nuxtjs/strapi/dist/runtime/types';
definePageMeta({
  layout: 'client',
  middleware: 'auth'
})

useHead({
  title: "Collaborateurs"
})

const { find } = useStrapi()
const saep = useSaep()

const collaborateurs = await find<UserDetail>('user-details', {
  filters: {
    saep: saep.id
  },
  populate: {
    user_role: true,
  }
})

function displayRole(userRole: Strapi4ResponseSingle<Role> | number) {
  return (userRole as Strapi4ResponseSingle<Role>).data.attributes.label
}

function displayCount(pagination: any) {
  return pagination.total
}
</script>