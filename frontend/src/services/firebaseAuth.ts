import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import type { User } from '../types';

export interface FirebaseAuthService {
  signInWithGoogle: () => Promise<FirebaseUser>;
  signInWithEmail: (email: string, password: string) => Promise<FirebaseUser>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<FirebaseUser>;
  signOut: () => Promise<void>;
  convertFirebaseUserToAppUser: (firebaseUser: FirebaseUser) => User;
}

// Convert Firebase user to our app's user format
const convertFirebaseUserToAppUser = (firebaseUser: FirebaseUser): User => {
  return {
    _id: firebaseUser.uid,
    username: firebaseUser.displayName?.toLowerCase().replace(/\s+/g, '_') || firebaseUser.email?.split('@')[0] || 'user',
    email: firebaseUser.email || '',
    fullName: firebaseUser.displayName || 'User',
    bio: '',
    profilePhoto: firebaseUser.photoURL || '',
    skillsOffered: [],
    skillsWanted: [],
    availability: 'Active',
    isPublic: true,
    location: '',
    rating: {
      average: 0,
      count: 0
    },
    completedSwaps: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

export const firebaseAuthService: FirebaseAuthService = {
  signInWithGoogle: async (): Promise<FirebaseUser> => {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  },

  signInWithEmail: async (email: string, password: string): Promise<FirebaseUser> => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  },

  signUpWithEmail: async (email: string, password: string, displayName: string): Promise<FirebaseUser> => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update the user's display name
    await updateProfile(result.user, {
      displayName: displayName
    });
    
    return result.user;
  },

  signOut: async (): Promise<void> => {
    await signOut(auth);
  },

  convertFirebaseUserToAppUser
};
