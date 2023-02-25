<template>
  <div class="flex justify-center items-center h-screen">
    <ContainerCard class="w-2/6">
      <div class="text-5xl font-bold my-8">
        Login
      </div>
      <form @submit.prevent="onSubmit" method="post">
        <div class="space-y-4">
          <ContainerAlertError v-if="showAlert">
            Email ou mot de passe erroné
          </ContainerAlertError>

          <FormTextfield v-model="email" label="Email" name="email" type="email" placeholder="Entrez votre adresse email">
            <template #prefixIcon>
              <IconLockClosed class="w-4 h-4" />
            </template>
          </FormTextfield>
  
          <div>
            <FormTextfield v-model="password" label="Mot de passe" name="password" type="password" placeholder="Entrez votre mot de passe" :autocomplete=true>
              <template #prefixIcon>
                <IconPerson class="w-4 h-4" />
              </template>
            </FormTextfield>
            <NuxtLink to="/forgot-password">
              <div class="text-right text-primary">
                Mot de passe oublié ?
              </div>
            </NuxtLink>
          </div>
  
          <Button type="submit" class="bg-primary text-on-primary">
            Se connecter
          </Button>
        </div>
      </form>
    </ContainerCard>
  </div>
</template>

<script setup lang="ts">
import { useSaepStore } from "~/store/saep"

useHead({
  title: "Connexion"
})

const { login } = useStrapiAuth()

const email = ref('')
const password = ref('')
const showAlert = ref(false)

const onSubmit = async () => {
  try {
    await login({
      identifier: email.value,
      password: password.value
    })
    const { find, findOne } = useStrapi()
    const user = useStrapiUser()

    const userDetailResponse = await find<UserDetail>('user-details', {
      filters: {
        user: user.value?.id
      },
      populate: {
        saep: true,
      }
    })

    const saepId = userDetailResponse.data.at(0)?.attributes.saep.data.id

    const saep = await findOne<Saep>('saeps', saepId, {
      populate: {
        adresse: true,
        ressources_en_eau: true
      }
    })

    const saepStore = useSaepStore()
    saepStore.setSaep({ ...saep.data.attributes, id: saep.data.id})

    return navigateTo('/home')
  } catch (e) {
    showAlert.value = true
  }
}
</script>