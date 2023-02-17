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
        <DrawerMenuItem>
          <template #icon>
            <IconHome />
          </template>
          Relevé indexe
        </DrawerMenuItem>
        <DrawerMenuItem>
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
        </DrawerMenuItem>
      </ul>
    </div>

    <div class="w-full">
      <div class="flex justify-between py-4 px-4 w-full bg-surface text-on-surface">
        <div class="font-bold">
          SAEP Sabotsy Namehana
        </div>
        <div>
          Naris Razafimahatratra
        </div>
      </div>
  
      <div class="m-4">
        <slot />
      </div>
    </div>
  </div>
</template>