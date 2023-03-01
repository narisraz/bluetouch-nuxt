<template>
  <div>
    <ContainerCard title="Nouveau collaborateur">
      <form class="space-y-4" @submit.prevent="onSave">
        <div class="grid grid-cols-2 gap-4">
          <FormTextfield v-model="nom" type="text" name="nom" label="Nom" placeholder="Entrez le nom" />
          <FormTextfield v-model="prenom" type="text" name="prenom" label="Prénom" placeholder="Entrez le prénom" />
          <FormTextfield v-model="tel" type="text" name="tel" label="Tél" placeholder="Entrez le téléphone" />
          <FormSelect placeholder="Choisissez le rôle" v-model="userRole" name="branchement" :options="rolesOptions" label="Rôle" />
          <FormTextfield v-model="email" type="email" name="email" label="Email" placeholder="Entrez l'adresse email" />
          <FormTextfield v-model="password" type="password" name="password" label="Mot de passe" placeholder="Entrez le mot de passe" />
        </div>
        <div>
          <Button type="submit" class="bg-secondary text-on-secondary">Sauvegarder</Button>
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
  title: "Nouveau collaborateur"
})

const { create, find } = useStrapi()
const { register } = useStrapiAuth()
const saepStore = useSaepStore()

const roles = await find<Role>('user-roles')
const rolesOptions: Option[] = roles.data.map(r => ({
  label: r.attributes.label,
  value: '' + r.id
}))

const nom = ref()
const prenom = ref()
const tel = ref()
const userRole = ref()
const email = ref()
const password = ref()

const onSave = async () => {
  const auth = await register({
    username: email.value,
    email: email.value,
    password: password.value
  })

  await create<UserDetail>('user-details', {
    email: email.value,
    nom: nom.value,
    prenom: prenom.value,
    tel: tel.value,
    saep: saepStore.saep.id,
    user: auth.user.value?.id,
    user_role: userRole.value
  })

  await navigateTo('/collaborateurs')
}
</script>