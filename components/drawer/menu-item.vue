<template>
  <li>
    <div @click="toggleChild">
      <div v-if="!path" class="flex cursor-pointer justify-between p-4 rounded-md hover:bg-primary-container hover:text-on-primary-container">
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
      </div>
      <div v-else class="relative">
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
        <div class="-left-[1.1rem] top-6 absolute w-[1.1rem] h-2 border-b-2 border-l-2 border-surface-variant rounded-bl-lg" :class="{ 'hidden': !isChild }" ></div>
      </div>
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
    required: false
  },
  isChild: {
    type: Boolean,
    default: false
  }
})

const showChild = ref(false)

function toggleChild() {
  showChild.value = !showChild.value
}
</script>

<style>
.router-link-active, .router-link-exact-active {
  @apply bg-surface-variant text-on-surface-variant hover:bg-surface-variant hover:text-on-surface-variant hover:cursor-default
}
</style>