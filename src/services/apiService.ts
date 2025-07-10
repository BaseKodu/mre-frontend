import TokenService from './token';
import { refreshToken } from './auth';

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined';

// Export a function to make API calls
export const apiCall = async (config) => {
  // Skip API calls during SSR
  if (import.meta.server) {
    console.log('[SSR] Skipping API call:', config);
    return null;
  }
  
  try {
    // Dynamically import axios only on client side
    const { default: axios } = await import('axios');
    
    const instance = axios.create({
      baseURL: 'http://localhost:8000/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add a request interceptor
    instance.interceptors.request.use(
      (config) => {
        const token = TokenService.getAccessToken();
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalConfig = error.config;
        
        // If no response or error is not 401 or request already retried, reject
        if (!error.response || error.response.status !== 401 || originalConfig._retry) {
          return Promise.reject(error);
        }

        originalConfig._retry = true;
        
        try {
          // Try to refresh the token
          const rs = await refreshToken();
          const { access } = rs;
          
          // Update user in storage with new token
          const user = TokenService.getUser();
          if (user) {
            user.access = access;
            TokenService.setUser(user);
          }
          
          // Retry the original request with new token
          return instance(originalConfig);
        } catch (_error) {
          // If refresh token fails, logout user
          TokenService.removeUser();
          if (isBrowser) {
            window.location.href = '/auth/login';
          }
          return Promise.reject(_error);
        }
      }
    );
    
    const response = await instance(config);
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

export default { apiCall };