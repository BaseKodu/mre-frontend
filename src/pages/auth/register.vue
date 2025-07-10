<template>
  <NuxtLayout name="auth-layout">
    <template #title>Create Account</template>
    <template #description>Sign up for a new account</template>
``
    <RegisterForm />

    <template #footer>
      Already have an account?
      <UButton variant="link" to="/auth/login" color="primary">
        Sign in
      </UButton>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import RegisterForm from '~/components/forms/register-form.vue'

definePageMeta({
  layout: false,
  name: 'RegisterPage'
})
</script> 

<script lang="ts">
export default {
  name: 'AuthRegister'
}
</script>