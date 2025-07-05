<script setup lang="js">
import { ref } from 'vue'

defineOptions({
  name: 'RegisterForm'
})

const form = ref({
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  try {
    // TODO: Implement registration logic
    console.log('Registration attempt:', form.value)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <UFormField
      name="email"
      label="Email"
      required
    >
      <UInput
        v-model="form.email"
        type="email"
        placeholder="Enter your email"
        :disabled="loading"
        class="w-full"
      />
    </UFormField>

    <UFormField
      name="password"
      label="Password"
      required
    >
      <UInput
        v-model="form.password"
        type="password"
        placeholder="Enter your password"
        :disabled="loading"
        class="w-full"
      />
    </UFormField>

    <UFormField
      name="confirmPassword"
      label="Confirm Password"
      required
    >
      <UInput
        v-model="form.confirmPassword"
        type="password"
        placeholder="Confirm your password"
        :disabled="loading"
        class="w-full"
      />
    </UFormField>

    <div class="pt-2">
      <UButton
        type="submit"
        color="primary"
        block
        :loading="loading"
      >
        Create Account
      </UButton>
    </div>
  </form>
</template> 