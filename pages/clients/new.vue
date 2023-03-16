<template>
  <div>
    <div class="text-on-background uppercase font-bold mb-4">Nouveau client</div>
    <ContainerCard>
      <div v-if="!compteur">
        il n'y a plus de compteur disponible. 
        <NuxtLink to="/compteurs/new" class="text-right text-primary">
          Ajouter un nouveau compteur
        </NuxtLink>
      </div>
      <form v-else class="space-y-4" @submit.prevent="onSave">
        <div class="grid grid-cols-3 gap-4">
          <FormTextfield v-model="numContrat" type="text" name="contract" label="N° Contrat" placeholder="Entrez le numéro du contrat" />
        </div>
        <div class="grid grid-cols-3 gap-4">
          <FormTextfield v-model="nom" type="text" name="name" label="Nom" placeholder="Entrez le nom" />
          <FormTextfield v-model="prenom" type="text" name="firstName" label="Prénom" placeholder="Entrez les prénoms" />
          <FormTextfield v-model="tailleMenage" type="number" name="tailleMenage" label="Taille du ménage" placeholder="Entrez la taille ménage" />
        </div>
        <div class="grid grid-cols-4 gap-4">
          <FormTextfield v-model="rue" type="text" name="rue" label="Rue" placeholder="Entrez le nom de la rue" />
          <FormTextfield v-model="adresse" type="text" name="adresse" label="Adresse" placeholder="Entrez l'adresse" />
          <FormTextfield v-model="longitude" type="text" name="longitude" label="Longitude" placeholder="Entrez le longitude" />
          <FormTextfield v-model="latitude" type="text" name="latitude" label="Latitude" placeholder="Entrez la latitude" />
        </div>
        <div class="grid grid-cols-3 gap-4">
          <FormTextfield v-model="tel" type="text" name="tel" label="N° tel" placeholder="Entrez le numéro du téléphone" />
          <FormTextfield v-model="email" type="text" name="email" label="Email" placeholder="Entrez l'adresse email" />
        </div>
        <div class="grid grid-cols-3 gap-4">
          <FormSelect placeholder="Sélectionnez une tournée" :name="tournee" v-model="tournee" :options="tourneesOptions" label="Tournée" />
          <FormSelect :name="compteur" v-model="compteur" :options="compteursOptions" label="Compteur" />
          <FormSelect :name="branchement" v-model="branchement" :options="branchementsOptions" label="Branchement" />
        </div>
        <div class="grid grid-cols-4 gap-4">
          <FormSelect :name="branchement" v-model="etatBranchement" :options="etatBranchementOptions" label="Etat du branchement" />
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
  title: "Nouveau client"
})

const { find } = useStrapi()
const saep = useSaep()

const compteurs = await find<Compteur>('compteurs', {
  filters: {
    client: {
      id: {
        $null: true
      }
    },
    saep: saep.id
  },
  populate: {
    client: true
  }
})
const compteursOptions: Option[] = compteurs.data.map(c => ({
  label: c.attributes.identifiant,
  value: '' + c.id
}))

const branchements = await find<Branchement>('branchements')
const branchementsOptions: Option[] = branchements.data.map(b => ({
  label: b.attributes.label,
  value: '' + b.id
}))

const etatBranchements = await find<EtatBranchement>('etat-branchements')
const etatBranchementOptions: Option[] = etatBranchements.data.map(e => ({
  label: e.attributes.label,
  value: '' + e.id
}))

const tournees = await find<Tournee>('tournees', {
  filters: {
    saep: saep.id
  }
})
const tourneesOptions: Option[] = tournees.data.map(t => ({
  label: t.attributes.label,
  value: '' + t.id
})) 

const compteur = ref(compteursOptions[0]?.value)
const branchement = ref(branchementsOptions[0]?.value)
const tournee = ref(tourneesOptions[0]?.value)
const etatBranchement = ref('1')
const numContrat = ref()
const nom = ref()
const prenom = ref()
const tailleMenage = ref()
const rue = ref()
const adresse = ref()
const latitude = ref()
const longitude = ref()
const tel = ref()
const email = ref()

const onSave = async () => {
  const { create } = useStrapi()
  const saep = useSaep()

  const savedAdresse = await create<Adresse>('adresses', {
    ...saep.adresse.data.attributes,
    rue: rue.value,
    adresse: adresse.value,
  })

  await create<Client>('clients', {
    adresse: savedAdresse.data.id,
    branchement: Number(branchement.value),
    compteur: Number(compteur.value),
    email: email.value,
    nom: nom.value,
    num_contrat: numContrat.value,
    prenom: prenom.value,
    tel: tel.value,
    etat_branchement: Number(etatBranchement.value),
    taille_menage: Number(tailleMenage.value),
    tournee: Number(tournee.value),
    saep: saep.id,
  })

  await navigateTo('/clients')
}
</script>