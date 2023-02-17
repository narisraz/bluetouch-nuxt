<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div class="text-on-background uppercase font-bold">Liste des compteurs (1)</div>
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
      <table class="table-auto w-full rounded-md bg-surface text-on-surface overflow-scroll">
        <thead class="bg-surface-variant text-on-surface-variant rounded-md">
          <tr>
            <th class="border-b-2 border-background text-left p-2">Identifiant</th>
            <th class="border-b-2 border-background text-left p-2">Attribué à</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border-b-2 border-background p-2">004</td>
            <td class="border-b-2 border-background p-2">Naris Razafimahatratra</td>
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
  title: "Compteurs"
})
</script>