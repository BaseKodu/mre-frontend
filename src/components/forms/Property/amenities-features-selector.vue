<script setup>
import { ref, computed } from 'vue'

defineProps({
  propertyType: {
    type: String,
    required: true,
    validator: (value) => ['estate', 'building', 'unit', 'subunit'].includes(value)
  }
})

// Mock data - in a real app, these would come from an API
const amenities = ref([
  { id: 1, name: 'Swimming Pool', description: 'Outdoor swimming pool', icon: 'i-heroicons-water', category: 'Recreation' },
  { id: 2, name: 'Gym', description: 'Fitness center', icon: 'i-heroicons-trophy', category: 'Recreation' },
  { id: 3, name: 'Parking', description: 'Covered parking', icon: 'i-heroicons-truck', category: 'Convenience' },
  { id: 4, name: 'Security', description: '24/7 security', icon: 'i-heroicons-shield-check', category: 'Safety' },
  { id: 5, name: 'Playground', description: 'Children\'s playground', icon: 'i-heroicons-puzzle-piece', category: 'Recreation' },
  { id: 6, name: 'Laundry', description: 'On-site laundry', icon: 'i-heroicons-sparkles', category: 'Convenience' }
])

const features = ref([
  { id: 1, name: 'Air Conditioning', description: 'Central AC', icon: 'i-heroicons-sun', category: 'Comfort' },
  { id: 2, name: 'Heating', description: 'Central heating', icon: 'i-heroicons-fire', category: 'Comfort' },
  { id: 3, name: 'Dishwasher', description: 'Built-in dishwasher', icon: 'i-heroicons-beaker', category: 'Appliances' },
  { id: 4, name: 'Hardwood Floors', description: 'Throughout unit', icon: 'i-heroicons-square-2x2', category: 'Interior' },
  { id: 5, name: 'Balcony', description: 'Private balcony', icon: 'i-heroicons-home-modern', category: 'Exterior' },
  { id: 6, name: 'High Ceilings', description: '10+ ft ceilings', icon: 'i-heroicons-arrow-up', category: 'Interior' }
])

const selectedAmenities = ref([])
const selectedFeatures = ref([])
const amenityDetails = ref({})
const featureDetails = ref({})

const amenitiesByCategory = computed(() => {
  const grouped = {}
  amenities.value.forEach(amenity => {
    if (!grouped[amenity.category]) {
      grouped[amenity.category] = []
    }
    grouped[amenity.category].push(amenity)
  })
  return grouped
})

const featuresByCategory = computed(() => {
  const grouped = {}
  features.value.forEach(feature => {
    if (!grouped[feature.category]) {
      grouped[feature.category] = []
    }
    grouped[feature.category].push(feature)
  })
  return grouped
})

const toggleAmenity = (amenityId) => {
  const index = selectedAmenities.value.indexOf(amenityId)
  if (index === -1) {
    selectedAmenities.value.push(amenityId)
  } else {
    selectedAmenities.value.splice(index, 1)
  }
}

const toggleFeature = (featureId) => {
  const index = selectedFeatures.value.indexOf(featureId)
  if (index === -1) {
    selectedFeatures.value.push(featureId)
  } else {
    selectedFeatures.value.splice(index, 1)
  }
}

const updateAmenityDetails = (amenityId, details) => {
  amenityDetails.value[amenityId] = details
}

const updateFeatureDetails = (featureId, details) => {
  featureDetails.value[featureId] = details
}
</script>

<template>
  <div class="amenities-features-selector">
    <UTabs :items="[
      { label: 'Amenities', slot: 'amenities' },
      { label: 'Features', slot: 'features' }
    ]">
      <!-- Amenities Tab -->
      <template #amenities>
        <div class="p-4">
          <p class="text-sm text-gray-600 mb-4">
            Select amenities available for this {{ propertyType }}
          </p>
          
          <div v-for="(items, category) in amenitiesByCategory" :key="category" class="mb-6">
            <h4 class="font-medium text-lg mb-2">{{ category }}</h4>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="amenity in items" :key="amenity.id" class="border rounded-lg p-3 hover:bg-gray-50">
                <div class="flex items-center">
                  <UCheckbox 
                    :model-value="selectedAmenities.includes(amenity.id)" 
                    @update:model-value="toggleAmenity(amenity.id)" 
                  />
                  
                  <div class="ml-3 flex-grow">
                    <div class="flex items-center">
                      <UIcon :name="amenity.icon" class="mr-2 text-primary-500" />
                      <span class="font-medium">{{ amenity.name }}</span>
                    </div>
                    <p class="text-sm text-gray-500">{{ amenity.description }}</p>
                  </div>
                </div>
                
                <div v-if="selectedAmenities.includes(amenity.id)" class="mt-2">
                  <UInput 
                    :model-value="amenityDetails[amenity.id] || ''" 
                    @update:model-value="updateAmenityDetails(amenity.id, $event)" 
                    placeholder="Additional details (optional)" 
                    size="sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      
      <!-- Features Tab -->
      <template #features>
        <div class="p-4">
          <p class="text-sm text-gray-600 mb-4">
            Select features available for this {{ propertyType }}
          </p>
          
          <div v-for="(items, category) in featuresByCategory" :key="category" class="mb-6">
            <h4 class="font-medium text-lg mb-2">{{ category }}</h4>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="feature in items" :key="feature.id" class="border rounded-lg p-3 hover:bg-gray-50">
                <div class="flex items-center">
                  <UCheckbox 
                    :model-value="selectedFeatures.includes(feature.id)" 
                    @update:model-value="toggleFeature(feature.id)" 
                  />
                  
                  <div class="ml-3 flex-grow">
                    <div class="flex items-center">
                      <UIcon :name="feature.icon" class="mr-2 text-primary-500" />
                      <span class="font-medium">{{ feature.name }}</span>
                    </div>
                    <p class="text-sm text-gray-500">{{ feature.description }}</p>
                  </div>
                </div>
                
                <div v-if="selectedFeatures.includes(feature.id)" class="mt-2">
                  <UInput 
                    :model-value="featureDetails[feature.id] || ''" 
                    @update:model-value="updateFeatureDetails(feature.id, $event)" 
                    placeholder="Additional details (optional)" 
                    size="sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </UTabs>
  </div>
</template> 