<script setup>
import { ref } from 'vue'

defineProps({
  propertyType: {
    type: String,
    required: true,
    validator: (value) => ['estate', 'building', 'unit', 'subunit'].includes(value)
  },
  propertyId: {
    type: [Number, String],
    required: true
  }
})

const images = ref([])
const uploading = ref(false)

const handleFileUpload = (event) => {
  const files = event.target.files
  if (!files.length) return
  
  // Preview images before upload
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const reader = new FileReader()
    
    reader.onload = (e) => {
      images.value.push({
        id: Date.now() + i,
        file: file,
        preview: e.target.result,
        caption: '',
        is_primary: images.value.length === 0, // First image is primary by default
        uploading: false,
        progress: 0
      })
    }
    
    reader.readAsDataURL(file)
  }
}

const setPrimaryImage = (imageId) => {
  images.value = images.value.map(img => ({
    ...img,
    is_primary: img.id === imageId
  }))
}

const removeImage = (imageId) => {
  images.value = images.value.filter(img => img.id !== imageId)
  
  // If we removed the primary image and there are other images, set a new primary
  if (images.value.length > 0 && !images.value.some(img => img.is_primary)) {
    images.value[0].is_primary = true
  }
}

const uploadImages = async () => {
  if (images.value.length === 0) return
  
  uploading.value = true
  
  // Here you would implement your actual upload logic
  // This is a placeholder for demonstration
  for (const image of images.value) {
    image.uploading = true
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      image.progress = i
      await new Promise(resolve => setTimeout(resolve, 200))
    }
    
    image.uploading = false
  }
  
  uploading.value = false
  
  // Clear uploaded images after successful upload
  // images.value = []
}
</script>

<template>
  <div class="property-image-upload">
    <h3 class="text-lg font-medium mb-4">Upload Images</h3>
    
    <div class="mb-4">
      <UInput
        type="file"
        accept="image/*"
        multiple
        @change="handleFileUpload"
        :disabled="uploading"
      />
      <p class="text-xs text-gray-500 mt-1">Max 50 images, 5MB per image</p>
    </div>
    
    <div v-if="images.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
      <div v-for="image in images" :key="image.id" class="relative border rounded-lg overflow-hidden">
        <img :src="image.preview" class="w-full h-32 object-cover" />
        
        <div class="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-2" 
             :class="{ 'opacity-100': true, 'border-2 border-yellow-400': image.is_primary }">
          
          <div class="flex justify-between">
            <UBadge v-if="image.is_primary" color="yellow" variant="solid" size="sm">Primary</UBadge>
            <UButton 
              v-else 
              color="yellow" 
              variant="ghost" 
              size="xs" 
              @click="setPrimaryImage(image.id)"
              :disabled="image.uploading"
            >
              Set as Primary
            </UButton>
            
            <UButton 
              color="red" 
              variant="ghost" 
              size="xs" 
              icon="i-heroicons-trash" 
              @click="removeImage(image.id)"
              :disabled="image.uploading"
            />
          </div>
          
          <div>
            <UInput 
              v-model="image.caption" 
              placeholder="Caption" 
              size="sm"
              class="bg-white bg-opacity-80 text-sm"
              :disabled="image.uploading"
            />
            
            <UProgress 
              v-if="image.uploading" 
              :value="image.progress" 
              color="primary" 
              class="mt-1"
            />
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="images.length > 0" class="flex justify-end">
      <UButton 
        color="primary" 
        @click="uploadImages" 
        :loading="uploading"
        :disabled="uploading"
      >
        <template #leading>
          <UIcon name="i-heroicons-cloud-arrow-up" />
        </template>
        Upload Images
      </UButton>
    </div>
  </div>
</template> 