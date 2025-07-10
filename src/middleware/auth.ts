import { useAuthStore } from '~/stores/authStore'
import { defineNuxtRouteMiddleware, navigateTo } from '#app'

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined'

export default defineNuxtRouteMiddleware((to) => {
  // List of routes that should use the default layout and require authentication
  const protectedRoutes = [
    '/dashboard',
    '/estates',
    '/buildings',
    '/units',
    '/subunits'
  ]

  // List of auth routes that should not be accessible when logged in
  const authRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password'
  ]

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    to.path.startsWith(route)
  )

  // Check if the current route is an auth route
  const isAuthRoute = authRoutes.some(route => 
    to.path === route || to.path.startsWith(route)
  )

  // Skip auth checks during SSR for auth routes
  if (!isBrowser && isAuthRoute) {
    return
  }

  // Get the auth store
  const authStore = useAuthStore()
  const isAuthenticated = !!authStore.user

  // If trying to access a protected route while not authenticated, redirect to login
  if (isProtectedRoute && !isAuthenticated) {
    return navigateTo('/auth/login')
  }

  // If trying to access an auth route while authenticated, redirect to dashboard
  if (isAuthRoute && isAuthenticated) {
    return navigateTo('/dashboard')
  }
}) 