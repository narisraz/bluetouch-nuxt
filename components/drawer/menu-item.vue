<template>
  <li>
    <NuxtLink :to="path" class="flex space-x-4 p-4 rounded-md hover:bg-primary-container hover:text-on-primary-container">
      <div class="w-6">
        <slot name="icon"></slot>
      </div>
      <div>
        <slot></slot>
      </div>
    </NuxtLink>
  </li>
</template>

<script setup>
defineProps({
  path: {
    type: String,
    required: true
  }
})
</script>

<style>
.router-link-active {
  @apply bg-primary text-on-primary
}
</style>