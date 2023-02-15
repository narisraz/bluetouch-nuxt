<template>
  <div>
    <label :for="name" class="font-semibold">{{ label }}</label>
    <select class="bg-surface-variant px-2 py-2 mt-1 rounded-sm border-b-2 w-full focus:outline-0 focus:border-primary">
      <option v-for="option in options" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
interface Option {
  label: string,
  value: object
}

defineProps({
  options: {
    required: true,
    type: Array<Option>
  },
  label: {
    required: true,
    type: String
  },
  name: {
    required: true,
    type: String
  }
})
</script>