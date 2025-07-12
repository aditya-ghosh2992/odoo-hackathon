import React, { createContext, useContext, useEffect, useState } from 'react';
import { authAPI } from '../services/api';
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

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        try {
          // Verify token is still valid
          const response = await authAPI.getMe();
          setUser(response.user);
          setToken(storedToken);
        } catch (error) {
          // Token is invalid, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setToken(null);
          setUser(null);
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
        toast.success('Logged in with demo account!');
        return;
      }

      const response = await authAPI.login(data);
      const { token: newToken, user: newUser } = response;

      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      setToken(newToken);
      setUser(newUser);
      toast.success('Logged in successfully!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await authAPI.register(data);
      const { token: newToken, user: newUser } = response;

      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      setToken(newToken);
      setUser(newUser);
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
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
