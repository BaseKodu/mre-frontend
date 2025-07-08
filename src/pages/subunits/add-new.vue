<script setup lang="ts">
import PropertyFormWizard from '~/components/forms/Property';
definePageMeta({
  layout: 'default'
})
</script> 

<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-2xl font-bold">Add New Estate</h1>
    <PropertyFormWizard property-type-selection="subunit" />
  </div>
</template>