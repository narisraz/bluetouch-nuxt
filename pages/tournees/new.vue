<template>
  <div>
    <ContainerCard title="Crétion de tournée">
      <form @submit.prevent="onSave" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <FormTextfield v-model="tournee" type="text" name="tournee" label="Libellé de la tournée" placeholder="Entrée le libellé de la tournée" />
        </div>
        <div>
          <Button class="bg-secondary text-on-secondary">Sauvegarder</Button>
        </div>
      </form>
    </ContainerCard>
  </div>
</template>

<script setup lang="ts">
import { useSaepStore } from '~~/store/saep';

definePageMeta({
  layout: 'client',
  middleware: 'auth'
})

useHead({
  title: "Nouvelle tournée"
})

const { create } = useStrapi()
const saepStore = useSaepStore()

const tournee = ref()

const onSave = async () => {
  await create<Tournee>('tournees', {
    label: tournee.value,
    saep: saepStore.saep.id
  })

  await navigateTo('/tournees')
}
</script>