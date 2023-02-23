<template>
  <div class="flex justify-center items-center h-screen">
    <ContainerCard class="w-2/6">
      <div class="text-3xl font-bold my-4">
        Mot de passe oublié
      </div>
      <form @submit.prevent="onSubmit" method="post">
        <div class="space-y-4">
          <ContainerAlertInformation v-if="showAlert">
            Un message a été envoyé à votre adresse email. <NuxtLink to="/login">Revenir à la page de connexion</NuxtLink>
          </ContainerAlertInformation>

          <FormTextfield v-model="email" label="Email" name="email" type="email" placeholder="Entrez votre adresse email">
            <template #prefixIcon>
              <IconLockClosed class="w-4 h-4" />
            </template>
          </FormTextfield>
  
          <Button type="submit" class="bg-primary text-on-primary">
            Envoyer
          </Button>
        </div>
      </form>
    </ContainerCard>
  </div>
</template>

<script setup>
const { forgotPassword } = useStrapiAuth()
const showAlert = ref(false)
const email = ref('')

const onSubmit = async () => {
  try {
    await forgotPassword({ email: email })

    showAlert.value = true
  } catch(e) {}
}
</script>