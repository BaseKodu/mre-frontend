<script setup lang="js">

defineOptions({
  name: 'BasePropertyForm'
})

</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <UFormGroup label="Property Name">
        <UInput  placeholder="Enter property name" />
      </UFormGroup>

      <UFormGroup label="Address">
        <UTextarea  placeholder="Enter property address" />
      </UFormGroup>

      <div class="grid grid-cols-2 gap-4">
        <UFormGroup label="Number of Bathrooms">
          <UInput 
            type="number" 
            placeholder="Enter number of bathrooms"
            min="0"
          />
        </UFormGroup>

        <UFormGroup label="Number of Bedrooms">
          <UInput 
            type="number"
            placeholder="Enter number of bedrooms"
            min="0"
          />
        </UFormGroup>
      </div>
    </div>
    <div class="flex justify-end">
      <UButton>
        <template #leading>
          <UIcon name="i-heroicons-arrow-right" />
        </template>
        Next
      </UButton>
    </div>
  </div>
</template>