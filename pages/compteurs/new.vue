<template>
  <div>
    <ContainerCard title="Nouveau compteur">
      <form class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <FormTextfield type="text" name="identifiant" label="Identifiant" placeholder="Entrez l'identifiant du compteur" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <FormSelect :options="clients" label="Clients" />
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
})

useHead({
  title: "Nouveau compteur"
})

const clients = [
  { label: "Sélectionner un client", value: "" },
  { label: "Client 1", value: 1 },
  { label: "Client 2", value: 2 },
  { label: "Client 3", value: 3 }
]
</script>