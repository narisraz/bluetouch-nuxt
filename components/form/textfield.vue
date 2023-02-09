<template>
  <div class="flex flex-col w-full">
    <label :for="name" class="font-semibold">{{ label }}</label>
    <div class="relative">
      <div class="absolute left-4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black/25" v-if="$slots.prefixIcon">
        <slot name="prefixIcon"></slot>
      </div>
      <input :id="name" :type="type" :name="name" :placeholder="placeholder" :class="{ 'pl-8': $slots.prefixIcon }" class="border-b-2 py-2 mt-1 w-full focus:outline-0 focus:border-primary" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: "text"
  },
  label: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  }
})
</script>