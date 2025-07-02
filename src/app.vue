<template>
  <UApp class="min-h-screen bg-background">
    <div class="flex flex-col items-center justify-center h-screen">
      <h1 class="text-4xl font-bold text-primary">Hello World</h1>
    </div>
  </UApp>
</template>

<script setup>
const colorMode = useColorMode()
colorMode.preference = 'light'
</script>
