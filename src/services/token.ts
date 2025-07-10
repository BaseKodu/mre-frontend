/**
 * User response interface matching the backend response
 */
export interface UserResponse {
  access: string;
  refresh: string;
  user: {
    pk: number;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    company_accesses: Array<{
      company_id: number;
      company_name: string;
      access_level: string;
      access_level_display: string;
      created_at: string;
    }>;
    full_name: string;
    owned_companies: Array<{
      id: number;
      name: string;
      created_at: string;
    }>;
    created_at: string;
    updated_at: string;
  };
}

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined';

/**
 * Service to manage authentication tokens and user data in local storage
 */
class TokenService {
  /**
   * Get user data from local storage
   */
  getUser(): UserResponse | null {
    if (!isBrowser) return null;
    
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Save user data to local storage
   */
  setUser(user: UserResponse): void {
    if (!isBrowser) return;
    
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Remove user data from local storage
   */
  removeUser(): void {
    if (!isBrowser) return;
    
    localStorage.removeItem('user');
  }

  /**
   * Get access token from user data
   */
  getAccessToken(): string | undefined {
    const user = this.getUser();
    return user?.access;
  }

  /**
   * Get refresh token from user data
   */
  getRefreshToken(): string | undefined {
    const user = this.getUser();
    return user?.refresh;
  }
}

export default new TokenService();