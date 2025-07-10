import TokenService from './token'
import type { UserResponse } from './token'
import { ofetch } from 'ofetch'

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined'

// Base API URL
const API_URL = '/api/auth'

interface UserRegistration {
  email: string
  password1: string
  password2: string
  first_name: string
  last_name: string
  company_name: string
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface FetchOptions {
  method?: HttpMethod
  body?: Record<string, unknown>
  credentials?: RequestCredentials
  headers?: Record<string, string>
}

// Helper function to make API requests safely
const safeApiFetch = async <T>(url: string, options: FetchOptions = {}): Promise<T | null> => {
  // Skip API calls during SSR
  if (import.meta.server) {
    console.log(`[SSR] Skipping API call: ${url}`)
    return null
  }
  
  try {
    // Use ofetch directly instead of $fetch to avoid SSR issues
    return await ofetch<T>(url, options)
  } catch (error) {
    console.error(`API error (${url}):`, error)
    throw error
  }
}

export const register = async (credentials: UserRegistration) => {
  return safeApiFetch<Record<string, unknown>>(`${API_URL}/api/auth/registration/`, {
    method: 'POST',
    body: {
      email: credentials.email,
      password1: credentials.password1,
      password2: credentials.password2,
      first_name: credentials.first_name,
      last_name: credentials.last_name,
      company_name: credentials.company_name
    }
  })
}

export const login = async (email: string, password: string) => {
  const data = await safeApiFetch<UserResponse>(`${API_URL}/api/auth/login/`, {
    method: 'POST',
    body: { email, password },
    credentials: 'include'
  })
  
  if (data?.access && isBrowser) {
    TokenService.setUser(data)
  }
  
  return data
}

export const logout = async () => {
  await safeApiFetch(`${API_URL}/api/auth/logout/`, {
    method: 'POST',
    credentials: 'include'
  })
  
  if (isBrowser) {
    TokenService.removeUser()
  }
}

export const refreshToken = async () => {
  const data = await safeApiFetch<UserResponse>(`${API_URL}/api/auth/token/refresh/`, {
    method: 'POST',
    credentials: 'include'
  })
  
  if (data?.access && isBrowser) {
    const user = TokenService.getUser()
    if (user) {
      user.access = data.access
      TokenService.setUser(user)
    }
  }
  
  return data
}