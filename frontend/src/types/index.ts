export interface User {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  bio: string;
  profilePhoto: string;
  skillsOffered: Skill[];
  skillsWanted: Skill[];
  availability: 'Very Active' | 'Active' | 'Casual' | 'Rarely Available';
  isPublic: boolean;
  location: string;
  rating: {
    average: number;
    count: number;
  };
  completedSwaps: number;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  description?: string;
}

export interface SwapRequest {
  _id: string;
  requester: User;
  recipient: User;
  offeredSkill: Skill;
  requestedSkill: Skill;
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
  message?: string;
  scheduledDate?: string;
  duration?: string;
  meetingType: 'Online' | 'In-Person' | 'Flexible';
  feedback: {
    requesterFeedback?: {
      rating: number;
      comment: string;
      submittedAt: string;
    };
    recipientFeedback?: {
      rating: number;
      comment: string;
      submittedAt: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message: string;
}

export interface ApiResponse<T> {
  data?: T;
  message: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalPages: number;
  currentPage: number;
  total: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  fullName: string;
}

export interface UpdateProfileData {
  fullName?: string;
  bio?: string;
  skillsOffered?: Skill[];
  skillsWanted?: Skill[];
  availability?: 'Very Active' | 'Active' | 'Casual' | 'Rarely Available';
  isPublic?: boolean;
  location?: string;
}

export interface CreateSwapRequestData {
  recipientId: string;
  offeredSkill: Skill;
  requestedSkill: Skill;
  message?: string;
  scheduledDate?: string;
  duration?: string;
  meetingType: 'Online' | 'In-Person' | 'Flexible';
}

export interface FeedbackData {
  rating: number;
  comment: string;
}
