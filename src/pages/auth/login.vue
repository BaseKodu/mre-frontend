<template>
  <NuxtLayout name="auth-layout">
    <template #title>Welcome Back</template>
    <template #description>Sign in to your account</template>

    <LoginForm />

    <template #footer>
      Don't have an account?
      <UButton variant="link" to="/auth/register" color="primary">
        Sign up
      </UButton>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import LoginForm from '~/components/forms/login-form.vue'

definePageMeta({
  layout: false,
  name: 'LoginPage'
})
</script> 
<script lang="ts">
export default {
  name: 'AuthLogin'
}
</script>