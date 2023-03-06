<template>
  <td :colspan="colSpan" class="border-b-2 border-background p-2" :class="{'border-r-2 border-r-surface-variant': !isLast}">
    <slot />
  </td>
</template>

<script setup lang="ts">
defineProps({
  isLast: {
    type: Boolean,
    default: false
  },
  colSpan: {
    type: Number,
    required: false
  }
})
</script>