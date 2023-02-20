<template>
  <div>
    <div class="text-on-background uppercase font-bold mb-4">{{ title }}</div>
    <div class="p-4 bg-surface text-on-surface">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: false
  }
})
</script>