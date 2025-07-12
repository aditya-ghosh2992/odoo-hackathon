import { api, isDemoMode } from '../lib/api';
import { getDemoUsers, getDemoSwapRequests } from './demoData';
import type {
  AuthResponse,
  LoginData,
  RegisterData,
  User,
  UpdateProfileData,
  PaginatedResponse,
  SwapRequest,
  CreateSwapRequestData,
  FeedbackData,
} from '../types';

// Auth APIs
export const authAPI = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  getMe: async (): Promise<{ user: User }> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  changePassword: async (data: { currentPassword: string; newPassword: string }) => {
    const response = await api.post('/auth/change-password', data);
    return response.data;
  },
};

// User APIs
export const userAPI = {
  getProfile: async (): Promise<{ user: User }> => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (data: UpdateProfileData): Promise<{ user: User; message: string }> => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },

  uploadPhoto: async (file: File): Promise<{ profilePhoto: string; message: string }> => {
    const formData = new FormData();
    formData.append('profilePhoto', file);
    const response = await api.post('/users/upload-photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  searchUsers: async (params: {
    skill?: string;
    level?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<User> & { users: User[] }> => {
    const response = await api.get('/users/search', { params });
    return response.data;
  },

  getUsers: async (params: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<User> & { users: User[] }> => {
    // Return demo data if in demo mode
    if (isDemoMode()) {
      return getDemoUsers(params);
    }
    
    const response = await api.get('/users', { params });
    return response.data;
  },

  getUserById: async (id: string): Promise<{ user: User }> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
};

// Swap APIs
export const swapAPI = {
  createRequest: async (data: CreateSwapRequestData): Promise<{ swapRequest: SwapRequest; message: string }> => {
    const response = await api.post('/swaps/request', data);
    return response.data;
  },

  getSentRequests: async (params: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<SwapRequest> & { swapRequests: SwapRequest[] }> => {
    // Return demo data if in demo mode
    if (isDemoMode()) {
      return getDemoSwapRequests('sent', params);
    }
    
    const response = await api.get('/swaps/sent', { params });
    return response.data;
  },

  getReceivedRequests: async (params: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<SwapRequest> & { swapRequests: SwapRequest[] }> => {
    // Return demo data if in demo mode
    if (isDemoMode()) {
      return getDemoSwapRequests('received', params);
    }
    
    const response = await api.get('/swaps/received', { params });
    return response.data;
  },

  acceptRequest: async (id: string): Promise<{ swapRequest: SwapRequest; message: string }> => {
    const response = await api.put(`/swaps/${id}/accept`);
    return response.data;
  },

  rejectRequest: async (id: string): Promise<{ swapRequest: SwapRequest; message: string }> => {
    const response = await api.put(`/swaps/${id}/reject`);
    return response.data;
  },

  completeSwap: async (id: string): Promise<{ swapRequest: SwapRequest; message: string }> => {
    const response = await api.put(`/swaps/${id}/complete`);
    return response.data;
  },

  submitFeedback: async (id: string, data: FeedbackData): Promise<{ swapRequest: SwapRequest; message: string }> => {
    const response = await api.put(`/swaps/${id}/feedback`, data);
    return response.data;
  },

  cancelRequest: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/swaps/${id}`);
    return response.data;
  },

  getRequestById: async (id: string): Promise<{ swapRequest: SwapRequest }> => {
    const response = await api.get(`/swaps/${id}`);
    return response.data;
  },
};
