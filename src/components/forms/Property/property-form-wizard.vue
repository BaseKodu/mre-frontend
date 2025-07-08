<script setup>
import { ref, computed } from 'vue'
import BasePropertyForm from './base-property-form.vue'
import PropertyImageUpload from './property-image-upload.vue'
import AmenitiesFeaturesSelector from './amenities-features-selector.vue'


const props = defineProps({
  propertyTypeSelection: {
    type: String,
    required: true,
    validator: (value) => ['estate', 'building', 'unit', 'subunit'].includes(value)
  }
})

const propertyType = ref(props.propertyTypeSelection)
const propertyId = ref(null) // This would be set after saving

const propertyTypeOptions = [
  { value: 'estate', label: 'Estate' },
  { value: 'building', label: 'Building' },
  { value: 'unit', label: 'Unit' },
  { value: 'subunit', label: 'Sub Unit' }
]

const activeTab = ref('basic')
const tabs = [
  { key: 'basic', label: 'Basic Info', icon: 'i-heroicons-information-circle', slot: 'basic' },
  { key: 'amenities', label: 'Amenities & Features', icon: 'i-heroicons-sparkles', slot: 'amenities' },
  { key: 'images', label: 'Images', icon: 'i-heroicons-photo', slot: 'images' },
  { key: 'review', label: 'Review', icon: 'i-heroicons-clipboard-document-check', slot: 'review' }
]

// Mock function for saving data
const saveProperty = () => {
  // In a real app, this would save to your backend
  console.log('Saving property data...')
  // Set a mock property ID for demonstration
  propertyId.value = 123
}

const submitForm = () => {
  if (activeTab.value === 'review') {
    // Final submission
    console.log('Final submission')
    // Redirect or show success message
  } else {
    // Save current step and proceed to next tab
    saveProperty()
    const currentIndex = tabs.findIndex(tab => tab.key === activeTab.value)
    if (currentIndex < tabs.length - 1) {
      activeTab.value = tabs[currentIndex + 1].key
    }
  }
}

const goToTab = (tabKey) => {
  // In a real app, you might want to validate the current tab before allowing navigation
  activeTab.value = tabKey
}

const isLastTab = computed(() => {
  return activeTab.value === tabs[tabs.length - 1].key
})

const displayPropertyTypeSelector = ref(false)
</script>

<template>
  <div class="property-form-wizard">
    <UCard v-if="displayPropertyTypeSelector" class="mb-6">
      <div class="p-4">
        <UFormField label="Property Type">
          <USelect
            v-model="propertyType"
            :items="propertyTypeOptions"
            placeholder="Select property type"
          />
        </UFormField>
        <p class="text-sm text-gray-500 mt-2">
          Select the type of property you want to add. This will determine the fields shown below.
        </p>
      </div>
    </UCard>
    
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">Add {{ propertyType?.charAt(0).toUpperCase() + propertyType?.slice(1) }}</h2>
        </div>
      </template>
      
      <UTabs :items="tabs" variant="link">
        <!-- Basic Info Tab -->
        <template #basic>
          <div class="p-4">
            <BasePropertyForm :property-type="propertyType" />
          </div>
        </template>
        
        <!-- Amenities & Features Tab -->
        <template #amenities>
          <div class="p-4">
            <AmenitiesFeaturesSelector :property-type="propertyType" />
          </div>
        </template>
        
        <!-- Images Tab -->
        <template #images>
          <div class="p-4">
            <PropertyImageUpload 
              :property-type="propertyType" 
              :property-id="propertyId || 'temp'" 
            />
          </div>
        </template>
        
        <!-- Review Tab -->
        <template #review>
          <div class="p-4">
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="text-lg font-medium mb-4">Review Your {{ propertyType?.charAt(0).toUpperCase() + propertyType?.slice(1) }} Information</h3>
              <p class="text-gray-600 mb-4">
                In a real application, this would show a summary of all the information
                you've entered in the previous tabs for final review before submission.
              </p>
              
              <UAlert
                icon="i-heroicons-information-circle"
                color="blue"
                variant="soft"
                title="Ready to Submit"
                :ui="{ padding: 'p-4' }"
              >
                Please review all the information before submitting. Once submitted, you'll still be able to edit this property later.
              </UAlert>
            </div>
          </div>
        </template>
      </UTabs>
      
      <!-- Navigation buttons -->
      <template #footer>
        <div class="flex justify-between">
          <UButton
            v-if="activeTab !== tabs[0].key"
            @click="goToTab(tabs[tabs.findIndex(tab => tab.key === activeTab) - 1].key)"
            variant="ghost"
          >
            <template #leading>
              <UIcon name="i-heroicons-arrow-left" />
            </template>
            Back
          </UButton>
          <div v-else></div>
          
          <UButton
            color="primary"
            @click="submitForm"
          >
            <template #trailing v-if="!isLastTab">
              <UIcon name="i-heroicons-arrow-right" />
            </template>
            {{ isLastTab ? 'Submit' : 'Continue' }}
          </UButton>
        </div>
      </template>
    </UCard>
  </div>
</template> 