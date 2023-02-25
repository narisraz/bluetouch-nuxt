<template>
  <table class="table-auto border-spacing-3 w-full bg-surface text-on-surface">
    <tbody>
      <tr>
        <td class="border-b-2 border-background py-2 px-3 font-semibold">Nom de la commune</td>
        <td class="border-b-2 border-background">{{ adresse.commune }}</td>
      </tr>
      <tr>
        <td class="border-b-2 border-background py-2 px-3 font-semibold">Nombre de population</td>
        <td class="border-b-2 border-background">{{ Intl.NumberFormat().format(saep.nombre_population) }}</td>
      </tr>
      <tr>
        <td class="border-b-2 border-background py-2 px-3 font-semibold">District</td>
        <td class="border-b-2 border-background">{{ adresse.district }}</td>
      </tr>
      <tr>
        <td class="border-b-2 border-background py-2 px-3 font-semibold">Région</td>
        <td class="border-b-2 border-background">{{ adresse.region }}</td>
      </tr>
      <tr>
        <td class="border-b-2 border-background py-2 px-3 font-semibold">Localisation sur la carte</td>
        <td class="border-b-2 border-background">
          <NuxtLink :to="`https://www.google.com/maps/search/?api=1&query=${adresse.latitude},${adresse.longitude}`" target="_blank" class="text-primary">
            <IconArrowTopRightOnSquare />
          </NuxtLink>
        </td>
      </tr>
      <tr>
        <td class="border-b-2 border-background py-2 px-3 font-semibold">Ressources en eau</td>
        <td class="border-b-2 border-background">{{ ressourcesEnEau }}</td>
      </tr>
      <tr>
        <td class="border-b-2 border-background py-2 px-3 font-semibold">Nombre de réservoir</td>
        <td class="border-b-2 border-background">{{ saep.nombre_reservoir }}</td>
      </tr>
      <tr>
        <td class="border-b-2 border-background py-2 px-3 font-semibold">Capacité total réservoir (m3)</td>
        <td class="border-b-2 border-background">{{ saep.capacite }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { useSaepStore } from "~/store/saep"

definePageMeta({
  middleware: 'auth',
  layout: 'client'
})

useHead({
  title: "Système d'Alimentation en Eau Potable (SAEP)"
})

const saepStore = useSaepStore()
const saep = saepStore.saep

const ressourcesEnEau = saep.ressources_en_eau.data
  .map(val => val.attributes.label)
  .join(', ')

const adresse = saep.adresse.data.attributes
</script>