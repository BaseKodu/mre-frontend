<template>
  <UApp class="min-h-screen bg-background">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup>
const colorMode = useColorMode()
colorMode.preference = 'light'
</script>
