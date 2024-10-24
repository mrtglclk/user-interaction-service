// src/types/auth.types.ts
export interface UserCredentials {
    email: string;
    password: string;
  }
  
  export interface UserProfile {
    uid?: string;
    email?: string | null;
    displayName?: string | null;
    photoURL?: string | null;
  }
  
  export interface AuthResponse {
    success: boolean;
    message?: string;
    user?: UserProfile;
    error?: any;
  }
  
  export type AuthStateChange = (user: UserProfile | null) => void;