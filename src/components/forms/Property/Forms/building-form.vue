<script setup lang="js">
    const formData = ref({
    building: {
        name: '',
        address: '',
        building_type: 'R',
        managing: false
    }
    })
</script>

<template>
<div class="flex flex-col gap-4 p-4">
    <UFormField label="Building Name">
      <UInput v-model="formData.building.name" placeholder="Enter building name" />
    </UFormField>

    <UFormField label="Address">
      <UTextarea v-model="formData.building.address" placeholder="Enter building address" />
    </UFormField>

    <UFormField label="Building Type">
      <USelect v-model="formData.building.building_type" :options="buildingTypes" />
    </UFormField>

    <UFormField>
      <UCheckbox v-model="formData.building.managing" label="We are managing this building" />
    </UFormField>
  </div>
</template>
