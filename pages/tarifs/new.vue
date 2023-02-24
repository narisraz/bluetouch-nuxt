<template>
  <div>
    <ContainerCard title="Nouveau tarif">
      <form class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <FormSelect name="branchement" :options="branchements" label="Branchement" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <FormTextfield type="text" name="basePrice" label="Prix de base" placeholder="Entrez le prix de base" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <FormTextfield type="text" name="volume1" label="Volume max 1er tranche" placeholder="Entrez le volume max 1er tranche" />
          <FormTextfield type="text" name="price1" label="Prix / tr.1" placeholder="Entrez le prix / tr.1" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <FormTextfield type="text" name="volume2" label="Volume max 2e tranche" placeholder="Entrez le volume max 2e tranche" />
          <FormTextfield type="text" name="price2" label="Prix / tr.2" placeholder="Entrez le prix / tr.2" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <FormTextfield type="text" name="volume3" label="Volume max 3e tranche" placeholder="Entrez le volume max 3e tranche" />
          <FormTextfield type="text" name="price3" label="Prix / tr.3" placeholder="Entrez le prix / tr.3" />
        </div>
        <div>
          <Button class="bg-secondary text-on-secondary">Sauvegarder</Button>
        </div>
      </form>
    </ContainerCard>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'client',
  middleware: 'auth'
})

useHead({
  title: "Nouveau tarif"
})


const branchements = [
  { label: "Branchement privé", value: 1 },
  { label: "Branchement social", value: 2 },
  { label: "Borne fontaire", value: 3 },
  { label: "Autres", value: 3 }
]
</script>