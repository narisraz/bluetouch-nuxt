<template>
  <div class="flex">
    <div class="w-96 bg-surface text-on-surface h-screen p-4 border border-r-2 border-background overflow-y-auto">
      <div class="font-bold text-lg mb-4">Bluetouch</div>
      <ul>
        <DrawerMenuItem path="/home">
          <template #icon>
            <IconHome />
          </template>
          Système d'Alimentation en Eau Potable (SAEP)
        </DrawerMenuItem>
        <DrawerMenuItem path="/dashboard">
          <template #icon>
            <IconHome />
          </template>
          Indicateurs techniques et financiers
        </DrawerMenuItem>
        <DrawerMenuItem>
          <template #icon>
            <IconHome />
          </template>
          Clients
          <template #child>
            <ul>
              <DrawerMenuItem path="/clients" is-child>
              Liste des clients
              </DrawerMenuItem>
              <DrawerMenuItem path="/clients/new" is-child>
                Nouveau client
              </DrawerMenuItem>
            </ul>
          </template>
        </DrawerMenuItem>
        <DrawerMenuItem>
          <template #icon>
            <IconHome />
          </template>
          Compteurs
          <template #child>
            <ul>
              <DrawerMenuItem path="/compteurs" is-child>
                Liste des compteurs
              </DrawerMenuItem>
              <DrawerMenuItem path="/compteurs/new" is-child>
                Nouveau compteur
              </DrawerMenuItem>
            </ul>
          </template>
        </DrawerMenuItem>
        <DrawerMenuItem path="/releve-index">
          <template #icon>
            <IconHome />
          </template>
          Relevé indexe
        </DrawerMenuItem>
        <DrawerMenuItem path="/encaissement">
          <template #icon>
            <IconHome />
          </template>
          Encaissement
        </DrawerMenuItem>
        <DrawerMenuItem>
          <template #icon>
            <IconHome />
          </template>
          Facturation
        </DrawerMenuItem>
        <DrawerMenuItem>
          <template #icon>
            <IconHome />
          </template>
          Suivi envaissement
        </DrawerMenuItem>
        <DrawerMenuItem>
          <template #icon>
            <IconHome />
          </template>
          Tarifs
          <template #child>
            <ul>
              <DrawerMenuItem path="/tarifs" is-child>
                Liste des tarifs
              </DrawerMenuItem>
              <DrawerMenuItem path="/tarifs/new" is-child>
                Nouveau tarif
              </DrawerMenuItem>
            </ul>
          </template>
        </DrawerMenuItem>
      </ul>
    </div>

    <div class="w-full">
      <div class="flex justify-between py-4 px-4 w-full bg-surface text-on-surface">
        <div class="font-bold">
          SAEP {{ saep.data.attributes.adresse.data.attributes.commune }}
        </div>
        <div>
          {{ user?.username }}
        </div>
      </div>
  
      <div class="m-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
    adresse: true
  }
})
</script>