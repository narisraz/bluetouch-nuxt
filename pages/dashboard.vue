<template>
  <div class="grid grid-cols-4 gap-4">
    <div class="flex bg-surface rounded-md space-x-4 items-center">
      <div class="p-4 font-bold bg-primary-container text-on-primary-container rounded-l-md">4</div>
      <div>Clients</div>
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