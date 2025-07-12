import type { User, SwapRequest, PaginatedResponse } from '../types';

// Demo users data
export const demoUsers: User[] = [
  {
    _id: 'user1',
    username: 'jane_dev',
    email: 'jane@example.com',
    fullName: 'Jane Developer',
    bio: 'Full-stack developer with 5 years of experience. Love teaching and learning new technologies.',
    profilePhoto: '',
    skillsOffered: [
      { name: 'React', level: 'Expert', description: 'Building modern web applications with React and TypeScript' },
      { name: 'Node.js', level: 'Advanced', description: 'Backend development with Express and MongoDB' }
    ],
    skillsWanted: [
      { name: 'Machine Learning', level: 'Beginner', description: 'Want to learn Python ML libraries' },
      { name: 'DevOps', level: 'Intermediate', description: 'Docker, Kubernetes, CI/CD pipelines' }
    ],
    availability: 'Very Active',
    isPublic: true,
    location: 'San Francisco, CA',
    rating: { average: 4.8, count: 15 },
    completedSwaps: 8,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-07-10T14:30:00Z'
  },
  {
    _id: 'user2',
    username: 'mark_designer',
    email: 'mark@example.com',
    fullName: 'Mark Designer',
    bio: 'UI/UX designer passionate about creating beautiful and functional user experiences.',
    profilePhoto: '',
    skillsOffered: [
      { name: 'UI/UX Design', level: 'Expert', description: 'Design systems, prototyping, user research' },
      { name: 'Figma', level: 'Expert', description: 'Advanced Figma techniques and component design' }
    ],
    skillsWanted: [
      { name: 'Frontend Development', level: 'Intermediate', description: 'Want to implement my designs in code' },
      { name: 'Animation', level: 'Beginner', description: 'CSS and JavaScript animations' }
    ],
    availability: 'Active',
    isPublic: true,
    location: 'New York, NY',
    rating: { average: 4.6, count: 12 },
    completedSwaps: 6,
    createdAt: '2024-02-20T09:15:00Z',
    updatedAt: '2024-07-08T16:45:00Z'
  },
  {
    _id: 'user3',
    username: 'sarah_data',
    email: 'sarah@example.com',
    fullName: 'Sarah Data Scientist',
    bio: 'Data scientist with expertise in machine learning and statistical analysis.',
    profilePhoto: '',
    skillsOffered: [
      { name: 'Python', level: 'Expert', description: 'Data analysis, ML, web scraping with Python' },
      { name: 'Machine Learning', level: 'Expert', description: 'TensorFlow, PyTorch, scikit-learn' },
      { name: 'Statistics', level: 'Advanced', description: 'Statistical modeling and analysis' }
    ],
    skillsWanted: [
      { name: 'Web Development', level: 'Beginner', description: 'Want to build web apps for my ML models' },
      { name: 'Cloud Computing', level: 'Intermediate', description: 'AWS, Azure for ML deployments' }
    ],
    availability: 'Casual',
    isPublic: true,
    location: 'Austin, TX',
    rating: { average: 4.9, count: 20 },
    completedSwaps: 12,
    createdAt: '2024-03-10T11:30:00Z',
    updatedAt: '2024-07-09T13:20:00Z'
  }
];

// Demo swap requests
export const demoSwapRequests: SwapRequest[] = [
  {
    _id: 'swap1',
    requester: demoUsers[0],
    recipient: {
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
      rating: { average: 4.5, count: 10 },
      completedSwaps: 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    offeredSkill: { name: 'React', level: 'Expert', description: 'Advanced React patterns and hooks' },
    requestedSkill: { name: 'JavaScript', level: 'Advanced', description: 'Want to learn advanced JS concepts' },
    status: 'pending',
    message: 'Hi! I noticed you know JavaScript really well. I can teach you React in exchange for learning some advanced JS concepts. Let me know if you\'re interested!',
    meetingType: 'Online',
    duration: '2 hours',
    feedback: {},
    createdAt: '2024-07-11T10:00:00Z',
    updatedAt: '2024-07-11T10:00:00Z'
  },
  {
    _id: 'swap2',
    requester: {
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
      rating: { average: 4.5, count: 10 },
      completedSwaps: 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    recipient: demoUsers[1],
    offeredSkill: { name: 'JavaScript', level: 'Advanced', description: 'Modern JavaScript and ES6+' },
    requestedSkill: { name: 'UI/UX Design', level: 'Expert', description: 'Want to learn design principles' },
    status: 'accepted',
    message: 'Would love to learn design from you! I can teach you JavaScript fundamentals and modern features.',
    meetingType: 'In-Person',
    duration: '3 hours',
    scheduledDate: '2024-07-15T14:00:00Z',
    feedback: {},
    createdAt: '2024-07-10T09:30:00Z',
    updatedAt: '2024-07-11T15:30:00Z'
  }
];

// Demo API responses
export const getDemoUsers = (params: { page?: number; limit?: number } = {}): PaginatedResponse<User> & { users: User[] } => {
  const { page = 1, limit = 10 } = params;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = demoUsers.slice(startIndex, endIndex);

  return {
    users: paginatedUsers,
    items: paginatedUsers,
    totalPages: Math.ceil(demoUsers.length / limit),
    currentPage: page,
    total: demoUsers.length
  };
};

export const getDemoSwapRequests = (
  type: 'sent' | 'received',
  params: { status?: string; page?: number; limit?: number } = {}
): PaginatedResponse<SwapRequest> & { swapRequests: SwapRequest[] } => {
  const { status, page = 1, limit = 10 } = params;
  
  let filteredRequests = demoSwapRequests.filter(request => {
    if (type === 'sent') {
      return request.requester._id === 'demo-user-id';
    } else {
      return request.recipient._id === 'demo-user-id';
    }
  });

  if (status) {
    filteredRequests = filteredRequests.filter(request => request.status === status);
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedRequests = filteredRequests.slice(startIndex, endIndex);

  return {
    swapRequests: paginatedRequests,
    items: paginatedRequests,
    totalPages: Math.ceil(filteredRequests.length / limit),
    currentPage: page,
    total: filteredRequests.length
  };
};
