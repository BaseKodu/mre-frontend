import { useAuthStore } from '~/stores/authStore'

// Plugin to handle client-only operations
export default defineNuxtPlugin((_nuxtApp) => {
  // Only run on client-side
  if (import.meta.client) {
    // Initialize auth from localStorage on client-side
    const authStore = useAuthStore()
    
    // Start refresh token timer if user is logged in
    if (authStore.user?.access) {
      authStore.startRefreshTokenTimer()
    }
  }
}) 