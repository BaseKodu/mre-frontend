<script setup lang="js">
const formData = ref({
  estate: {
    name: '',
    address: '',
    estate_type: 'R',
    managing: false
  }
})

</script>

<template>
    <div class="flex flex-col gap-4 p-4">
      <UFormField label="Estate Name">
        <UInput v-model="formData.estate.name" placeholder="Enter estate name" />
      </UFormField>

      <UFormField label="Address">
        <UTextarea v-model="formData.estate.address" placeholder="Enter estate address" />
      </UFormField>

      <UFormField label="Estate Type">
        <USelect v-model="formData.estate.estate_type" :options="estateTypes" />
      </UFormField>

      <UFormField>
        <UCheckbox v-model="formData.estate.managing" label="We are managing this estate" />
      </UFormField>
    </div>
  </template>