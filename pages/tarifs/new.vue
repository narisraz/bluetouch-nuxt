<template>
  <div>
    <ContainerCard title="Nouveau tarif">
      <form @submit.prevent="onSave" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <FormSelect v-model="branchement" name="branchement" :options="branchementsOptions" label="Branchement" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <FormTextfield v-model="basePrice" type="text" name="basePrice" label="Prix de base" placeholder="Entrez le prix de base" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <FormTextfield v-model="price1" type="text" name="volume1" label="Volume max 1er tranche" placeholder="Entrez le volume max 1er tranche" />
          <FormTextfield v-model="volume1" type="text" name="price1" label="Prix / tr.1" placeholder="Entrez le prix / tr.1" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <FormTextfield v-model="price2" type="text" name="volume2" label="Volume max 2e tranche" placeholder="Entrez le volume max 2e tranche" />
          <FormTextfield v-model="volume2" type="text" name="price2" label="Prix / tr.2" placeholder="Entrez le prix / tr.2" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <FormTextfield v-model="price3" type="text" name="volume3" label="Volume max 3e tranche" placeholder="Entrez le volume max 3e tranche" />
          <FormTextfield v-model="volume3" type="text" name="price3" label="Prix / tr.3" placeholder="Entrez le prix / tr.3" />
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
  title: "Nouveau tarif"
})

const { find } = useStrapi()

const branchements = await find<Branchement>('branchements')
const branchementsOptions: Option[] = branchements.data.map(b => ({
  label: b.attributes.label,
  value: '' + b.id
}))

const branchement = ref(branchementsOptions[0].value)
const basePrice = ref()
const price1 = ref()
const volume1 = ref()
const price2 = ref()
const volume2 = ref()
const price3 = ref()
const volume3 = ref()

const { create } = useStrapi()
const saepStore = useSaepStore()

const onSave = async () => {
  await create<Tarif>('tarifs', {
    prix_base: basePrice.value,
    prix_1: price1.value,
    volume_1: volume1.value,
    prix_2: price2.value,
    volume_2: volume2.value,
    prix_3: price3.value,
    volume_3: volume3.value,
    branchement: Number(branchement.value),
    saep: saepStore.saep.id
  })

  await navigateTo('/tarifs')
}
</script>