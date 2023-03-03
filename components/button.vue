<template>
  <button class="shadow-md px-3 py-2 uppercase hover:shadow-xl rounded-md transition duration-200" @click="onClick">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  onClick: Function
})
</script>