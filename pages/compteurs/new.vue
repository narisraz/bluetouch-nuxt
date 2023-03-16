<template>
  <div>
    <ContainerCard title="Nouveau compteur">
      <form class="space-y-4" @submit.prevent="onSave">
        <div class="grid grid-cols-2 gap-4">
          <FormTextfield v-model="identifiant" type="text" name="identifiant" label="Identifiant" placeholder="Entrez l'identifiant du compteur" />
        </div>
        <div>
          <Button class="bg-secondary text-on-secondary">Sauvegarder</Button>
        </div>
      </form>
    </ContainerCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'client',
  middleware: 'auth'
})

useHead({
  title: "Nouveau compteur"
})

const { create } = useStrapi()
const saep = useSaep()

const identifiant = ref()

const onSave = async () => {
  await create<Compteur>('compteurs', {
    identifiant: identifiant.value,
    saep: saep.id
  })

  await navigateTo('/compteurs')
}
</script>