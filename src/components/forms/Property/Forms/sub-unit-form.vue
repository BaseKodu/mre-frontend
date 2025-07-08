<script setup lang="js">
const formData = ref({
    subunit: {
    number: '',
    subunit_type: 'R',
    furnished: false,
    available_from: null,
    base_rent: null,
    deposit_amount: null,
    is_vacant: true
    }
})

</script>

<template>
    <div class="flex flex-col gap-4 p-4">
      <UFormField label="Sub Unit Number">
        <UInput v-model="formData.subunit.number" placeholder="Enter sub unit number" />
      </UFormField>

      <UFormField label="Sub Unit Type">
        <USelect v-model="formData.subunit.subunit_type" :options="subUnitTypes" />
      </UFormField>

      <div class="grid grid-cols-2 gap-4">
        <UFormField label="Base Rent">
          <UInput 
            v-model="formData.subunit.base_rent" 
            type="number" 
            placeholder="Enter base rent"
            min="0"
          />
        </UFormField>

        <UFormField label="Deposit Amount">
          <UInput 
            v-model="formData.subunit.deposit_amount" 
            type="number" 
            placeholder="Enter deposit amount"
            min="0"
          />
        </UFormField>
      </div>

      <UFormField label="Available From">
        <UDatePicker v-model="formData.subunit.available_from" />
      </UFormField>

      <div class="grid grid-cols-2 gap-4">
        <UFormField>
          <UCheckbox v-model="formData.subunit.furnished" label="Furnished" />
        </UFormField>
        <UFormField>
          <UCheckbox v-model="formData.subunit.is_vacant" label="Is Vacant" />
        </UFormField>
      </div>
    </div>
  </template>
