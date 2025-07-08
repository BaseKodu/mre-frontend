<script setup lang="js">
const formData = ref({
  unit: {
    number: '',
    unit_type: 'A',
    square_footage: null,
    bedrooms: 1,
    bathrooms: 1,
    furnished: false,
    available_from: null,
    base_rent: null,
    deposit_amount: null,
    parking_spots: 0,
    is_vacant: true
  }
})
</script>
<template>
    <div class="flex flex-col gap-4 p-4">
      <UFormField label="Unit Number">
        <UInput v-model="formData.unit.number" placeholder="Enter unit number" />
      </UFormField>

      <UFormField label="Unit Type">
        <USelect v-model="formData.unit.unit_type" :options="unitTypes" />
      </UFormField>

      <div class="grid grid-cols-2 gap-4">
        <UFormField label="Square Footage">
          <UInput 
            v-model="formData.unit.square_footage" 
            type="number" 
            placeholder="Enter square footage"
            min="0"
          />
        </UFormField>

        <UFormField label="Base Rent">
          <UInput 
            v-model="formData.unit.base_rent" 
            type="number" 
            placeholder="Enter base rent"
            min="0"
          />
        </UFormField>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <UFormField label="Number of Bathrooms">
          <UInput 
            v-model="formData.unit.bathrooms" 
            type="number" 
            placeholder="Enter number of bathrooms"
            min="0"
            step="0.5"
          />
        </UFormField>

        <UFormField label="Number of Bedrooms">
          <UInput 
            v-model="formData.unit.bedrooms" 
            type="number"
            placeholder="Enter number of bedrooms"
            min="0"
          />
        </UFormField>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <UFormField label="Deposit Amount">
          <UInput 
            v-model="formData.unit.deposit_amount" 
            type="number" 
            placeholder="Enter deposit amount"
            min="0"
          />
        </UFormField>

        <UFormField label="Parking Spots">
          <UInput 
            v-model="formData.unit.parking_spots" 
            type="number" 
            placeholder="Enter number of parking spots"
            min="0"
          />
        </UFormField>
      </div>

      <UFormField label="Available From">
        <UDatePicker v-model="formData.unit.available_from" />
      </UFormField>

      <div class="grid grid-cols-2 gap-4">
        <UFormField>
          <UCheckbox v-model="formData.unit.furnished" label="Furnished" />
        </UFormField>
        <UFormField>
          <UCheckbox v-model="formData.unit.is_vacant" label="Is Vacant" />
        </UFormField>
      </div>
    </div>
  </template>