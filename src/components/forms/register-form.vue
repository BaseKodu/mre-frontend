<script setup lang="ts">
import { ref } from 'vue'
import { register } from '~/services/auth'
import Alert from '../ui/Alert.vue'

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined'

const form = ref({
  email: '',
  password: '',
  confirmPassword: '',
  first_name: '',
  last_name: '',
  organisation: ''
})

const emailError = ref('')
const password1Error = ref('')
const password2Error = ref('')
const nonFieldErrors = ref('')
const organisationError = ref('')

const registrationSuccess = ref(false)
const loading = ref(false)

const handleSubmit = async () => {
  if (!isBrowser) return
  
  loading.value = true
  // Reset all errors
  emailError.value = ''
  password1Error.value = ''
  password2Error.value = ''
  nonFieldErrors.value = ''
  organisationError.value = ''
  
  try {
    const response = await register({
      email: form.value.email,
      password1: form.value.password,
      password2: form.value.confirmPassword,
      first_name: form.value.first_name || '',
      last_name: form.value.last_name || '',
      company_name: form.value.organisation
    })
    console.log("Registration successful")
    console.log(response)
    registrationSuccess.value = true
  } catch (err: unknown) {
    console.error('Registration error:', err)
    const errorResponse = err as { 
      response?: { 
        status?: number;
        statusText?: string;
        _data?: { 
          email?: string | string[];
          password1?: string | string[];
          password2?: string | string[];
          non_field_errors?: string | string[];
          company_name?: string | string[];
        } 
      } 
    }
    
    if (errorResponse.response?._data) {
      const errors = errorResponse.response._data
      if (errors.email) emailError.value = Array.isArray(errors.email) ? errors.email[0] : errors.email
      if (errors.password1) password1Error.value = Array.isArray(errors.password1) ? errors.password1[0] : errors.password1
      if (errors.password2) password2Error.value = Array.isArray(errors.password2) ? errors.password2[0] : errors.password2
      if (errors.non_field_errors) nonFieldErrors.value = Array.isArray(errors.non_field_errors) ? errors.non_field_errors[0] : errors.non_field_errors
      if (errors.company_name) organisationError.value = Array.isArray(errors.company_name) ? errors.company_name[0] : errors.company_name
    } else if (errorResponse.response?.statusText) {
      nonFieldErrors.value = `${errorResponse.response.status}: ${errorResponse.response.statusText}`
    } else {
      nonFieldErrors.value = 'An error occurred during registration. Please try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div v-if="nonFieldErrors">
    <Alert :message="nonFieldErrors" type="error" />
  </div>
  <div v-if="registrationSuccess">
    <h1>Registration successful</h1>
    <p>Please check your email {{ form.email }} for verification</p>
  </div>
  <div v-else>
    <form class="space-y-4" @submit.prevent="handleSubmit">
      <UFormGroup
        name="email"
        label="Email"
        required
      >
        <div v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</div>
        <UInput
          v-model="form.email"
          type="email"
          placeholder="Enter your email"
          :disabled="loading"
          autocomplete="email"
          required
        />
      </UFormGroup>

      <UFormGroup
        name="first_name"
        label="First Name"
        required
      >
        <UInput
          v-model="form.first_name"
          type="text"
          placeholder="Enter your first name"
          :disabled="loading"
          autocomplete="given-name"
          required
        />
      </UFormGroup>

      <UFormGroup
        name="last_name"
        label="Last Name"
        required
      >
        <UInput
          v-model="form.last_name"
          type="text"
          placeholder="Enter your last name"
          :disabled="loading"
          autocomplete="family-name"
          required
        />
      </UFormGroup>

      <UFormGroup
        name="password"
        label="Password"
        required
      >
        <div v-if="password1Error" class="text-red-500 text-sm">{{ password1Error }}</div>
        <UInput
          v-model="form.password"
          type="password"
          placeholder="Enter your password"
          :disabled="loading"
          autocomplete="new-password"
          required
        />
      </UFormGroup>

      <UFormGroup
        name="confirmPassword"
        label="Confirm Password"
        required
      >
        <div v-if="password2Error" class="text-red-500 text-sm">{{ password2Error }}</div>
        <UInput
          v-model="form.confirmPassword"
          type="password"
          placeholder="Confirm your password"
          :disabled="loading"
          autocomplete="new-password"
          required
        />
      </UFormGroup>
      
      <UFormGroup
        name="organisation"
        label="Organisation Name"
        required
      >
        <div v-if="organisationError" class="text-red-500 text-sm">{{ organisationError }}</div>
        <UInput
          v-model="form.organisation"
          type="text"
          placeholder="Enter your organisation name"
          :disabled="loading"
          autocomplete="organization"
          required
        />
      </UFormGroup>

      <UButton
        type="submit"
        color="primary"
        block
        :loading="loading"
        :disabled="loading"
      >
        Create Account
      </UButton>
    </form>
  </div>
</template> 