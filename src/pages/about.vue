<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-4xl font-bold text-primary">About Page</h1>
    <UButton
      class="mt-4"
      to="/"
    >
      Back to Home
    </UButton>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'blank'
})
</script> 
<script>
export default {
  name: 'AboutPage'
}
</script> 