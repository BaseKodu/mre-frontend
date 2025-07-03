export default defineNuxtRouteMiddleware((to) => {
  // List of routes that should use the default layout
  const protectedRoutes = [
    '/dashboard',
    '/estates',
    '/buildings',
    '/units',
    '/subunits'
  ]

  // Check if the current route should use the default layout
  const shouldUseDefaultLayout = protectedRoutes.some(route => 
    to.path.startsWith(route)
  )

  // If not a protected route, let it use its specified layout
  if (!shouldUseDefaultLayout) {
    return
  }

  // For now, just allow access to protected routes
  // You can add authentication logic here later
  return
}) 