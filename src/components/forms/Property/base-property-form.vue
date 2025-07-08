<script setup>
import EstateForm from './Forms/estate-form.vue'
import BuildingForm from './Forms/building-form.vue'
import UnitForm from './Forms/unit-form.vue'
import SubUnitForm from './Forms/sub-unit-form.vue'

defineProps({
  propertyType: {
    type: String,
    required: true,
    validator: (value) => ['estate', 'building', 'unit', 'subunit'].includes(value)
  }
})

const estateTypes = [
  { value: 'R', label: 'Residential' },
  { value: 'C', label: 'Commercial' },
  { value: 'M', label: 'Mixed Use' }
]

const buildingTypes = [
  { value: 'M', label: 'Multi Unit' },
  { value: 'S', label: 'Single Unit' },
  { value: 'C', label: 'Complex' }
]

const unitTypes = [
  { value: 'A', label: 'Apartment' },
  { value: 'H', label: 'House' },
  { value: 'O', label: 'Office' }
]

const subUnitTypes = [
  { value: 'R', label: 'Room' },
  { value: 'S', label: 'Store' },
  { value: 'O', label: 'Office' }
]


</script>

<template>
  <div class="flex flex-col gap-4">
      <!-- Estate Form -->
      <div v-if="propertyType === 'estate'">
        <EstateForm />
      </div>

      <!-- Building Form -->
      <div v-if="propertyType === 'building'">
        <BuildingForm />
      </div>

      <div v-if="propertyType === 'unit'">
        <UnitForm />
      </div>

      <div v-if="propertyType === 'subunit'">
        <SubUnitForm />
      </div>


      <!-- Sub Unit Form -->
      

    <div class="flex justify-end p-4">
      <UButton color="primary">
        <template #leading>
          <UIcon name="i-heroicons-arrow-right" />
        </template>
        Save {{ propertyType.charAt(0).toUpperCase() + propertyType.slice(1) }}
      </UButton>
    </div>
  </div>
</template>