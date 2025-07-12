import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, LoginData, RegisterData } from '../types';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
  isDemoMode: boolean;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      // Check if user is in demo mode or has valid stored credentials
      if (storedToken && storedUser) {
        try {
          if (storedToken.startsWith('demo-jwt-token-')) {
            setIsDemoMode(true);
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
          } else {
            // For regular users, just use stored data
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
            setIsDemoMode(false);
          }
        } catch (error) {
          // Invalid stored data, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setToken(null);
          setUser(null);
          setIsDemoMode(false);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (data: LoginData) => {
    try {
      // Demo credentials for temporary testing
      if (data.email === 'demo@demo.com' && data.password === '123456') {
        const demoUser: User = {
          _id: 'demo-user-id',
          username: 'demo_user',
          email: 'demo@demo.com',
          fullName: 'Demo User',
          bio: 'This is a demo account for testing purposes.',
          profilePhoto: '',
          skillsOffered: [
            { name: 'JavaScript', level: 'Advanced', description: 'Frontend and backend development' },
            { name: 'React', level: 'Expert', description: 'Building modern web applications' }
          ],
          skillsWanted: [
            { name: 'Python', level: 'Intermediate', description: 'Data science and automation' },
            { name: 'Design', level: 'Beginner', description: 'UI/UX design principles' }
          ],
          availability: 'Active',
          isPublic: true,
          location: 'Demo City',
          rating: {
            average: 4.5,
            count: 10
          },
          completedSwaps: 5,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        const demoToken = 'demo-jwt-token-' + Date.now();
        
        localStorage.setItem('token', demoToken);
        localStorage.setItem('user', JSON.stringify(demoUser));
        setToken(demoToken);
        setUser(demoUser);
        setIsDemoMode(true);
        toast.success('Logged in with demo account!');
        return;
      }

      // For any other credentials, create a generic user and show success
      const genericUser: User = {
        _id: 'user-' + Date.now(),
        username: data.email.split('@')[0] || 'user',
        email: data.email,
        fullName: data.email.split('@')[0] || 'User',
        bio: 'Welcome to SkillSwap!',
        profilePhoto: '',
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

      const genericToken = 'user-jwt-token-' + Date.now();
      
      localStorage.setItem('token', genericToken);
      localStorage.setItem('user', JSON.stringify(genericUser));
      setToken(genericToken);
      setUser(genericUser);
      setIsDemoMode(false);
      toast.success('Login successful!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      // Create a generic user for any registration
      const newUser: User = {
        _id: 'user-' + Date.now(),
        username: data.username,
        email: data.email,
        fullName: data.fullName,
        bio: '',
        profilePhoto: '',
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

      const newToken = 'user-jwt-token-' + Date.now();

      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      setToken(newToken);
      setUser(newUser);
      setIsDemoMode(false);
      toast.success('Account created successfully!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsDemoMode(false);
    toast.success('Logged out successfully!');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!token && !!user,
    isDemoMode,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
