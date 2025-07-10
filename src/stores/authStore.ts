// src/stores/authStore.ts
import { defineStore } from 'pinia';
import { login, logout, refreshToken } from '../services/auth';
import TokenService from '../services/token';
import { navigateTo } from '#app';

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined';

// Define error type for better type safety
interface ApiError {
  response?: {
    _data?: {
      message?: string;
      detail?: string;
      [key: string]: unknown;
    };
    status?: number;
  };
  message?: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: TokenService.getUser(),
    loading: false,
    error: null as string | null,
    refreshTokenTimeout: null as ReturnType<typeof setTimeout> | null
  }),
  
  actions: {
    async login(email: string, password: string) {
      this.loading = true;
      this.error = null;
      
      try {
        const data = await login(email, password);
        this.user = data;
        if (isBrowser) {
          this.startRefreshTokenTimer();
        }
        return data;
      } catch (error: unknown) {
        const apiError = error as ApiError;
        this.error = apiError.response?._data?.detail || apiError.response?._data?.message || 'Login failed';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async logout() {
      try {
        await logout();
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        if (isBrowser) {
          this.stopRefreshTokenTimer();
        }
        this.user = null;
        
        if (isBrowser) {
          navigateTo('/auth/login');
        }
      }
    },
    
    async refreshToken() {
      try {
        const data = await refreshToken();
        if (this.user && data) {
          this.user = { ...this.user, access: data.access };
          if (isBrowser) {
            this.startRefreshTokenTimer();
          }
          return data;
        }
        return null;
      } catch (error) {
        this.logout();
        throw error;
      }
    },
    
    startRefreshTokenTimer() {
      if (!this.user?.access || !isBrowser) return;
      
      // Parse token to get expiry time
      const jwtToken = JSON.parse(atob(this.user.access.split('.')[1]));
      const expires = new Date(jwtToken.exp * 1000);
      
      // Set a timeout to refresh the token 1 minute before it expires
      const timeout = expires.getTime() - Date.now() - (60 * 1000);
      this.stopRefreshTokenTimer(); // Clear any existing timer
      this.refreshTokenTimeout = setTimeout(() => this.refreshToken(), timeout);
    },
    
    stopRefreshTokenTimer() {
      if (this.refreshTokenTimeout) {
        clearTimeout(this.refreshTokenTimeout);
        this.refreshTokenTimeout = null;
      }
    }
  }
}); 