<template>
  <div class="grid gap-4">
    <div class="grid gap-4 md:grid-cols-3">
      <div class="rounded-xl border bg-card p-6">
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-users" class="h-4 w-4 text-muted-foreground" />
          <h3 class="text-sm font-medium">Total Users</h3>
        </div>
        <div class="mt-3">
          <p class="text-2xl font-bold">10,531</p>
          <p class="text-xs text-muted-foreground">+180 from last month</p>
        </div>
      </div>
      <div class="rounded-xl border bg-card p-6">
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-chart-bar" class="h-4 w-4 text-muted-foreground" />
          <h3 class="text-sm font-medium">Active Projects</h3>
        </div>
        <div class="mt-3">
          <p class="text-2xl font-bold">245</p>
          <p class="text-xs text-muted-foreground">+35 from last month</p>
        </div>
      </div>
      <div class="rounded-xl border bg-card p-6">
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-currency-dollar" class="h-4 w-4 text-muted-foreground" />
          <h3 class="text-sm font-medium">Revenue</h3>
        </div>
        <div class="mt-3">
          <p class="text-2xl font-bold">$45,231</p>
          <p class="text-xs text-muted-foreground">+20.1% from last month</p>
        </div>
      </div>
    </div>
    <div class="rounded-xl border bg-card p-6">
      <h3 class="font-semibold">Recent Activity</h3>
      <div class="mt-4 space-y-4">
        <div v-for="i in 5" :key="i" class="flex items-center gap-4">
          <div class="h-8 w-8 rounded-full bg-muted" />
          <div>
            <p class="text-sm">User completed task #{{ i }}</p>
            <p class="text-xs text-muted-foreground">2 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script> 