<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div class="text-on-background uppercase font-bold">Liste des clients (1)</div>
      <NuxtLink to="/clients/new">
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
            <th class="border-b-2 border-background text-left p-2">N° Contrat</th>
            <th class="border-b-2 border-background text-left p-2">Abonné</th>
            <th class="border-b-2 border-background text-left p-2">Groupe tarifaire</th>
            <th class="border-b-2 border-background text-left p-2">Compteur</th>
            <th class="border-b-2 border-background text-left p-2">Tél. mobile</th>
            <th class="border-b-2 border-background text-left p-2">Rue</th>
            <th class="border-b-2 border-background text-left p-2">Adresse</th>
            <th class="border-b-2 border-background text-left p-2">Taille de ménage</th>
            <th class="border-b-2 border-background text-left p-2">Rang dans la tournée</th>
            <th class="border-b-2 border-background text-left p-2">Etat du branchement</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border-b-2 border-background p-2">004</td>
            <td class="border-b-2 border-background p-2">Eric Faneva</td>
            <td class="border-b-2 border-background p-2">Branchement privée</td>
            <td class="border-b-2 border-background p-2">111324</td>
            <td class="border-b-2 border-background p-2">0341101223</td>
            <td class="border-b-2 border-background p-2">Fokontany</td>
            <td class="border-b-2 border-background p-2">Lot b 01 Idiambola</td>
            <td class="border-b-2 border-background p-2">7</td>
            <td class="border-b-2 border-background p-2">14</td>
            <td class="border-b-2 border-background p-2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'client',
})

useHead({
  title: "Clients"
})
</script>