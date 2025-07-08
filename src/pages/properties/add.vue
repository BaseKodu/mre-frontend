<script setup>
import { PropertyFormWizard } from '~/components/forms/Property'

definePageMeta({
  title: 'Add Property',
  layout: 'default'
})
</script>

<template>
  <div>
    <UContainer class="py-8">
      <UBreadcrumb :items="[
        { label: 'Dashboard', to: '/' },
        { label: 'Properties', to: '/properties' },
        { label: 'Add Property', to: '/properties/add' }
      ]" />
      
      <div class="my-6">
        <h1 class="text-2xl font-bold">Add New Property</h1>
        <p class="text-gray-500">Create a new property in your portfolio</p>
      </div>
      
      <PropertyFormWizard />
    </UContainer>
  </div>
</template> 