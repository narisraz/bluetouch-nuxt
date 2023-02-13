<template>
  <table class="table-auto border-spacing-3 w-full bg-surface text-on-surface">
    <tbody>
      <tr class="p-8">
        <td class="border-b-[1px] py-2 px-3 font-semibold">Nom de la commune</td>
        <td class="border-b-[1px]">Sabotsy Namehana</td>
      </tr>
      <tr>
        <td class="border-b-[1px] py-2 px-3 font-semibold">Nombre de population</td>
        <td class="border-b-[1px]">20 000</td>
      </tr>
      <tr>
        <td class="border-b-[1px] py-2 px-3 font-semibold">District</td>
        <td class="border-b-[1px]">Avaradrano</td>
      </tr>
      <tr>
        <td class="border-b-[1px] py-2 px-3 font-semibold">Région</td>
        <td class="border-b-[1px]">Analamanga</td>
      </tr>
      <tr>
        <td class="border-b-[1px] py-2 px-3 font-semibold">Localisation sur la carte</td>
        <td class="border-b-[1px]">
          <NuxtLink to="/" class="text-primary">
            <IconArrowTopRightOnSquare />
          </NuxtLink>
        </td>
      </tr>
      <tr>
        <td class="border-b-[1px] py-2 px-3 font-semibold">Ressource en eau</td>
        <td class="border-b-[1px]">source de montagne, réservoir, rivière</td>
      </tr>
      <tr>
        <td class="border-b-[1px] py-2 px-3 font-semibold">Nombre de réservoir</td>
        <td class="border-b-[1px]">2</td>
      </tr>
      <tr>
        <td class="border-b-[1px] py-2 px-3 font-semibold">Capacité total réservoir (m3)</td>
        <td class="border-b-[1px]">150</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
definePageMeta({
  layout: 'client',
})

useHead({
  title: "Système d'Alimentation en Eau Potable (SAEP)"
})
</script>