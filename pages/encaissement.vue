<template>
  <div class="space-y-4">
    <ContainerCard title="Encaissement">
      <form class="flex space-x-4 items-end">
        <FormTextfield type="text" name="contract" label="N° contrat" placeholder="Entrez un numéro de contrat" />
        <FormTextfield type="text" name="name" label="Nom" placeholder="Entrez un nom" />
        <FormTextfield type="text" name="firstName" label="Prénom" placeholder="Entrez un prénom" />
        <FormTextfield type="text" name="tel" label="Téléphone" placeholder="Entrez un numéro" />
        <div>
          <Button class="bg-secondary text-on-secondary">Rechercher</Button>
        </div>
      </form>
    </ContainerCard>
    <div class="w-full">
      <table class="table-auto w-full rounded-md bg-surface text-on-surface overflow-scroll">
        <thead class="bg-surface-variant text-on-surface-variant rounded-md">
          <tr>
            <th class="border-b-2 border-background text-left p-2">N° Contrat</th>
            <th class="border-b-2 border-background text-left p-2">Abonné</th>
            <th class="border-b-2 border-background text-left p-2">Tél. mobile</th>
            <th class="border-b-2 border-background text-left p-2">Rue</th>
            <th class="border-b-2 border-background text-left p-2">Adresse</th>
            <th class="border-b-2 border-background text-left p-2">Reste à payer</th>
            <th class="border-b-2 border-background text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border-b-2 border-background p-2">004</td>
            <td class="border-b-2 border-background p-2">Eric Faneva</td>
            <td class="border-b-2 border-background p-2">0341101223</td>
            <td class="border-b-2 border-background p-2">Fokontany</td>
            <td class="border-b-2 border-background p-2">Lot b 01 Idiambola</td>
            <td class="border-b-2 border-background p-2">1 000 Ar</td>
            <td class="border-b-2 border-background p-2 flex space-x-2">
              <div class="hover:cursor-pointer hover:text-primary" @click="pay">
                <IconCreditCard />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ContainerModal :is-open="openDialog" :close="closeModal">
      <ContainerCard>
        <form class="space-y-4" method="post">
          <div>
            <FormTextfield label="Montant" name="value" type="text" placeholder="Entrez le montant à encaisser" class="w-64">
              <template #prefixIcon>
                <IconCreditCard class="w-4 h-4" />
              </template>
            </FormTextfield>
          </div>
          <div class="flex space-x-2">
            <div @click="closeModal">
              <Button type="button" class="bg-primary-container text-on-primary-container">Annuler</Button>
            </div>
            <Button class="bg-secondary text-on-secondary">Valider</Button>
          </div>
        </form>
      </ContainerCard>
    </ContainerModal>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'client',
})

useHead({
  title: "Encaissement"
})

const openDialog = ref(false)

function pay() {
  openDialog.value = true
}

function closeModal() {
  openDialog.value = false
}
</script>