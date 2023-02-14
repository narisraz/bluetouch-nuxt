<template>
  <div class="space-y-4">
    <div class="grid grid-cols-3 gap-4">
      <div class="flex bg-surface rounded-md space-x-4 items-center">
        <div class="p-4 font-bold bg-surface-variant text-on-surface-variant rounded-l-md">4</div>
        <div class="uppercase">Bornes fontaines</div>
      </div>
      <div class="flex bg-surface rounded-md space-x-4 items-center">
        <div class="p-4 font-bold bg-surface-variant text-on-surface-variant rounded-l-md">4</div>
        <div class="uppercase">Branchements privés</div>
      </div>
      <div class="flex bg-surface rounded-md space-x-4 items-center">
        <div class="p-4 font-bold bg-surface-variant text-on-surface-variant rounded-l-md">4</div>
        <div class="uppercase">Branchements sociaux</div>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4">
      <div class="flex bg-surface rounded-md space-x-4 items-center">
        <div class="p-4 font-bold bg-surface-variant text-on-surface-variant rounded-l-md">4</div>
        <div class="uppercase">Factures émises</div>
      </div>
      <div class="flex bg-surface rounded-md space-x-4 items-center">
        <div class="p-4 font-bold bg-surface-variant text-on-surface-variant rounded-l-md">4</div>
        <div class="uppercase">Volume relevé</div>
      </div>
      <div class="flex bg-surface rounded-md space-x-4 items-center">
        <div class="p-4 font-bold bg-surface-variant text-on-surface-variant rounded-l-md">4</div>
        <div class="uppercase">Volume facturé</div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'client',
})

useHead({
  title: "Indicateurs techniques et financiers"
})
</script>