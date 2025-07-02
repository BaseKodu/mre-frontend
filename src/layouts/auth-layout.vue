<template>
  <div class="min-h-screen bg-background flex items-center justify-center p-4">
    <UCard class="w-full max-w-md">
      <div class="space-y-6">
        <div class="text-center">
          <h1 class="text-2xl font-bold text-primary">
            <slot name="title">Welcome</slot>
          </h1>
          <p class="text-gray-500 mt-2">
            <slot name="description">Please sign in to continue</slot>
          </p>
        </div>
        
        <slot />

        <div class="text-center text-sm text-gray-500">
          <slot name="footer" />
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
defineSlots<{
  title(): string
  description(): string
  default(): unknown
  footer(): unknown
}>()
</script> 