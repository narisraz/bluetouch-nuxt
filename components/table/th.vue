<template>
  <th class="border-b-2 border-background text-left p-2" :class="{'border-r-2 border-r-on-primary': !isLast}">
    <slot />
  </th>
</template>

<script setup lang="ts">
defineProps({
  isLast: {
    type: Boolean,
    default: false
  }
})
</script>