// src/services/auth.service.ts
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    User,
    updateProfile
  } from 'firebase/auth';
  import { auth } from '../config/firebase';
  import { UserCredentials, AuthResponse, UserProfile, AuthStateChange } from '../types/auth.types';
  
  export class AuthService {
    private formatUser(user: User | null): UserProfile | null {
      if (!user) return null;
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      };
    }
  
    async register(credentials: UserCredentials): Promise<AuthResponse> {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        );
        return {
          success: true,
          user: this.formatUser(user),
          message: 'User successfully registered'
        };
      } catch (error: any) {
        return {
          success: false,
          error,
          message: error.message
        };
      }
    }
  
    async login(credentials: UserCredentials): Promise<AuthResponse> {
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        );
        return {
          success: true,
          user: this.formatUser(user),
          message: 'User successfully logged in'
        };
      } catch (error: any) {
        return {
          success: false,
          error,
          message: error.message
        };
      }
    }
  
    async loginWithGoogle(): Promise<AuthResponse> {
      try {
        const provider = new GoogleAuthProvider();
        const { user } = await signInWithPopup(auth, provider);
        return {
          success: true,
          user: this.formatUser(user),
          message: 'User successfully logged in with Google'
        };
      } catch (error: any) {
        return {
          success: false,
          error,
          message: error.message
        };
      }
    }
  
    async logout(): Promise<AuthResponse> {
      try {
        await signOut(auth);
        return {
          success: true,
          message: 'User successfully logged out'
        };
      } catch (error: any) {
        return {
          success: false,
          error,
          message: error.message
        };
      }
    }
  
    onAuthStateChanged(callback: AuthStateChange) {
      return onAuthStateChanged(auth, (user) => {
        callback(this.formatUser(user));
      });
    }
  
    getCurrentUser(): UserProfile | null {
      return this.formatUser(auth.currentUser);
    }
  
    async updateUserProfile(profile: Partial<UserProfile>): Promise<AuthResponse> {
      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error('No user logged in');
        }
  
        await updateProfile(user, {
          displayName: profile.displayName || null,
          photoURL: profile.photoURL || null
        });
  
        return {
          success: true,
          user: this.formatUser(user),
          message: 'Profile updated successfully'
        };
      } catch (error: any) {
        return {
          success: false,
          error,
          message: error.message
        };
      }
    }
  }