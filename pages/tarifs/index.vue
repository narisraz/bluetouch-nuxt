<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div class="text-on-background uppercase font-bold">Liste des tarifs (1)</div>
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
          <tr>
            <td class="border-b-2 border-background p-2">Branchement privé</td>
            <td class="border-b-2 border-background p-2 text-center">1 000</td>
            <td class="border-b-2 border-background p-2 text-center">2</td>
            <td class="border-b-2 border-background p-2 text-center">1 500</td>
            <td class="border-b-2 border-background p-2 text-center">3</td>
            <td class="border-b-2 border-background p-2 text-center">2 000</td>
            <td class="border-b-2 border-background p-2 text-center">4</td>
            <td class="border-b-2 border-background p-2 text-center">2 500</td>
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
  title: "Liste des tarifs"
})
</script>