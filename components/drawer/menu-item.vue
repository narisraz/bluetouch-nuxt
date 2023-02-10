<template>
  <NuxtLink :to="path">
    <li class="flex space-x-4 p-4 rounded-md hover:bg-primary-container hover:text-on-primary-container" :class="{ 'bg-primary text-on-primary': selected }">
      <div class="w-6">
        <slot name="icon"></slot>
      </div>
      <div>
        <slot></slot>
      </div>
    </li>
  </NuxtLink>
</template>

<script setup>
defineProps({
  selected: {
    type: Boolean,
    default: false
  },
  path: {
    type: String,
    required: true
  }
})
</script>