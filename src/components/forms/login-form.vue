<script setup lang="js">
import { ref } from 'vue'

defineOptions({
  name: 'LoginForm'
})

const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  try {
    // TODO: Implement login logic
    console.log('Login attempt:', form.value)
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

    <div class="flex items-center justify-between">
      <UCheckbox label="Remember me" name="remember" />
      <UButton variant="link" to="/forgot-password" color="primary">
        Forgot password?
      </UButton>
    </div>

    <div class="pt-2">
      <UButton
        type="submit"
        color="primary"
        block
        :loading="loading"
        width="full"
      >
        Sign In
      </UButton>
    </div>
  </form>
</template> 