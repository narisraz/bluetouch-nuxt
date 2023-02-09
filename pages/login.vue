<template>
  <div class="flex justify-center items-center h-screen">
    <ContainerCard class="w-2/6">
      <div class="text-5xl font-bold my-8">
        Login
      </div>
      <div class="space-y-4">
        <FormTextfield label="Email" name="email" type="email" placeholder="Entrez votre adresse email">
          <template #prefixIcon>
            <IconLockClosed class="w-4 h-4" />
          </template>
        </FormTextfield>

        <div>
          <FormTextfield label="Mot de passe" name="password" type="password" placeholder="Entrez votre mot de passe">
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

        <Button class="bg-primary text-on-primary">
        Se connecter
        </Button>
      </div>
    </ContainerCard>
  </div>
</template>