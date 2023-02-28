<template>
  <div>
    <label :for="name" class="font-semibold">{{ label }}</label>
    <select
      :value="modelValue"
      @change="change" 
      :name="name"
      class="bg-surface-variant px-2 py-2 mt-1 rounded-sm border-b-2 w-full focus:outline-0 focus:border-primary"
    >
      <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
      <option v-for="option in options" :value="option.value" :key="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])

defineProps({
  modelValue: String,
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
  },
  placeholder: {
    required: false,
    type: String
  },
})

function change($event: any) {
  emit('update:modelValue', $event.target.value)
}
</script>