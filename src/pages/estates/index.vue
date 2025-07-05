<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-primary">Properties</h1>
      <p class="text-gray-600 mt-2">Manage your real estate portfolio</p>
    </div>

    <div class="rounded-lg shadow-sm p-6">
      <PropertyListTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import PropertyListTable from '~/components/PropertyListTable.vue'

definePageMeta({
  layout: 'default'
})


</script>
