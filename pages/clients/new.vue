<template>
  <div>
    <div class="text-on-background uppercase font-bold mb-4">Nouveau client</div>
    <ContainerCard>
      <form class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <FormTextfield type="text" name="contract" label="N° Contrat" placeholder="Entrez le numéro du contrat" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <FormTextfield type="text" name="name" label="Nom" placeholder="Entrez le nom" />
          <FormTextfield type="text" name="firstName" label="Prénom" placeholder="Entrez les prénoms" />
        </div>
        <div class="grid grid-cols-4 gap-4">
          <FormTextfield type="text" name="rue" label="Rue" placeholder="Entrez le nom de la rue" />
          <FormTextfield type="text" name="adresse" label="Adresse" placeholder="Entrez l'adresse" />
          <FormTextfield type="text" name="longitude" label="Longitude" placeholder="Entrez le longitude" />
          <FormTextfield type="text" name="latitude" label="Latitude" placeholder="Entrez la latitude" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <FormTextfield type="text" name="tel" label="N° tel" placeholder="Entrez le numéro du téléphone" />
          <FormTextfield type="text" name="email" label="Email" placeholder="Entrez l'adresse email" />
        </div>
        <div class="grid grid-cols-3 gap-4">
          <FormSelect :options="compteurs" label="Compteur" />
          <FormSelect :options="branchements" label="Branchement" />
          <FormSelect :options="groupeTarifaire" label="Groupe tarifaire" />
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
  title: "Nouveau client"
})

const compteurs = [
  { label: "Compteur 1", value: 1 },
  { label: "Compteur 2", value: 2 },
  { label: "Compteur 3", value: 3 }
]

const branchements = [
  { label: "Actif", value: 1 },
  { label: "Inactif", value: 2 }
]

const groupeTarifaire = [
  { label: "Branchement privée", value: 1 },
  { label: "Branchement publique", value: 2 },
]
</script>