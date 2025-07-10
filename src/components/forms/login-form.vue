<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAuthStore } from '~/stores/authStore'
import { navigateTo } from '#app'

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined'

const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
  remember: false
})

const loading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  if (!isBrowser) return
  
  loading.value = true
  error.value = ''
  
  try {
    const result = await authStore.login(form.email, form.password)
    if (result) {
      navigateTo('/dashboard')
    } else {
      error.value = 'Login failed. Server returned no data.'
    }
  } catch (err: unknown) {
    const errorResponse = err as { 
      response?: { 
        status?: number;
        statusText?: string;
        _data?: { 
          detail?: string;
          non_field_errors?: string[];
        }
      }
    }
    
    if (errorResponse.response?._data?.detail) {
      error.value = errorResponse.response._data.detail
    } else if (errorResponse.response?._data?.non_field_errors?.length) {
      error.value = errorResponse.response._data.non_field_errors[0]
    } else if (errorResponse.response?.statusText) {
      error.value = `${errorResponse.response.status}: ${errorResponse.response.statusText}`
    } else {
      error.value = 'Login failed. Please check your credentials.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <UFormGroup label="Email" name="email">
      <UInput
        v-model="form.email"
        type="email"
        placeholder="Enter your email"
        autocomplete="email"
        :disabled="loading"
        required
      />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput
        v-model="form.password"
        type="password"
        placeholder="Enter your password"
        autocomplete="current-password"
        :disabled="loading"
        required
      />
    </UFormGroup>

    <div class="flex justify-between items-center">
      <UCheckbox v-model="form.remember" label="Remember me" name="remember" :disabled="loading" />
      <UButton variant="link" to="/auth/forgot-password" color="primary" :disabled="loading">
        Forgot password?
      </UButton>
    </div>

    <div v-if="error" class="text-red-500 text-sm">
      {{ error }}
    </div>

    <UButton
      type="submit"
      color="primary"
      block
      :loading="loading"
      :disabled="loading"
    >
      Sign in
    </UButton>
  </form>
</template> 