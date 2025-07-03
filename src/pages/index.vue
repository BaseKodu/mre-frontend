<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-4xl font-bold text-primary">Hello World</h1>
    <UButton
      class="mt-4"
      to="/about"
    >
      Go to About
    </UButton>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'blank'
})
</script> 

<script lang="ts">
export default {
  name: 'HomePage'
}
</script>