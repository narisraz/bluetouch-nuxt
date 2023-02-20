<template>
  <div v-show="isOpen">
    <div class="fixed z-10 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 p-4">
      <slot></slot>
    </div>
    <div class="fixed inset-0 bg-on-surface-variant/50 h-screen transition-all duration-500" @click="close"></div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  close: {
    type: Function,
    required: true
  }
})
</script>