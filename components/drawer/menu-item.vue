<template>
  <li>
    <div @click="toggleChild">
      <NuxtLink :to="path" class="flex cursor-pointer justify-between p-4 rounded-md hover:bg-primary-container hover:text-on-primary-container">
        <div class="flex space-x-4">
          <div class="w-6" v-if="$slots.icon">
            <slot name="icon"></slot>
          </div>
          <div>
            <slot></slot>
          </div>
        </div>
        <div :class="{ 'hidden': !$slots.child }">
          <IconChevronDown v-if="!showChild" />
          <IconChevronUp v-else />
        </div>
      </NuxtLink>
    </div>
    <div class="ml-7 pl-4 border-l-2 border-surface-variant" :class="{ 'hidden' : !showChild }">
      <slot name="child"></slot>
    </div>
  </li>
</template>

<script setup>
defineProps({
  path: {
    type: String,
    required: true
  }
})

const showChild = ref(false)

function toggleChild() {
  showChild.value = !showChild.value
}
</script>

<style>
.router-link-active, .router-link-exact-active {
  @apply bg-primary text-on-primary hover:bg-primary hover:text-on-primary hover:cursor-default
}
</style>