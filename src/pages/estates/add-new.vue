<script setup lang="ts">
import BasePropertyForm from '~/components/forms/Property/base-property-form.vue' 
definePageMeta({
  layout: 'default'
})
</script> 

<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-2xl font-bold">Add New Estate</h1>
    <BasePropertyForm />
  </div>
</template>
  
