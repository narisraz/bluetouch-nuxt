<template>
  <div class="flex flex-col w-full">
    <label :for="name" class="font-semibold">{{ label }}</label>
    <div class="relative">
      <div class="absolute left-4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black/25" v-if="$slots.prefixIcon">
        <slot name="prefixIcon"></slot>
      </div>
      <input :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)" 
        :id="name" 
        :type="type" 
        :name="name" 
        :placeholder="placeholder" 
        :class="[ $slots.prefixIcon ? 'pl-8' : 'px-2' ]" class="bg-surface-variant rounded-t-sm border-b-2 py-2 mt-1 w-full focus:outline-0 focus:border-primary"
        :autocomplete=autocomplete
        />
    </div>
  </div>
</template>

<script setup>
defineEmits(['update:modelValue'])

defineProps({
  modelValue: String,
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
  },
  autocomplete: {
    type: Boolean,
    default: false
  }
})
</script>