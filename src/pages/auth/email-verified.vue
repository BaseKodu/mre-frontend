<template>
    <NuxtLayout name="auth-layout">
        <template #title>{{ title }}</template>
        <template #description>{{ description }}</template>

        <UButton v-if="success" @click="goToLogin">Go to Login</UButton>
        <UButton v-else @click="goToLogin">Go to Login</UButton>
    </NuxtLayout>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router'

    definePageMeta({
    layout: false,
    name: 'EmailVerified'
    })


    const route = useRoute()
    const router = useRouter()
    const success = ref(false)

    const title = ref('Email Verified Successfully!')
    const description = ref('Your email has been verified. You can now log in to your account.')

    onMounted(() => {
    // Get the success parameter from the URL
    success.value = route.query.success === 'true'
    })

    const goToLogin = () => {
    router.push('/auth/login')
    }

</script>
