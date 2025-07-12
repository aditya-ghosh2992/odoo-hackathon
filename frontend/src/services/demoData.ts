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
  },
  {
    _id: 'user4',
    username: 'alex_mobile',
    email: 'alex@example.com',
    fullName: 'Alex Mobile Developer',
    bio: 'Mobile app developer specializing in React Native and Flutter. Love building cross-platform apps.',
    profilePhoto: '',
    skillsOffered: [
      { name: 'React Native', level: 'Expert', description: 'Cross-platform mobile app development' },
      { name: 'Flutter', level: 'Advanced', description: 'Dart and Flutter for mobile apps' },
      { name: 'Mobile UI/UX', level: 'Advanced', description: 'Mobile-first design principles' }
    ],
    skillsWanted: [
      { name: 'Backend Development', level: 'Intermediate', description: 'Node.js, API design' },
      { name: 'DevOps', level: 'Beginner', description: 'App deployment and CI/CD' }
    ],
    availability: 'Very Active',
    isPublic: true,
    location: 'Seattle, WA',
    rating: { average: 4.7, count: 18 },
    completedSwaps: 9,
    createdAt: '2024-04-05T08:45:00Z',
    updatedAt: '2024-07-10T12:15:00Z'
  },
  {
    _id: 'user5',
    username: 'emma_cloud',
    email: 'emma@example.com',
    fullName: 'Emma Cloud Engineer',
    bio: 'Cloud infrastructure specialist with expertise in AWS and Azure. Passionate about scalable systems.',
    profilePhoto: '',
    skillsOffered: [
      { name: 'AWS', level: 'Expert', description: 'EC2, Lambda, S3, RDS, CloudFormation' },
      { name: 'DevOps', level: 'Expert', description: 'Docker, Kubernetes, Jenkins, Terraform' },
      { name: 'System Architecture', level: 'Advanced', description: 'Microservices, serverless, scalability' }
    ],
    skillsWanted: [
      { name: 'Frontend Development', level: 'Beginner', description: 'Want to learn React and modern JS' },
      { name: 'Data Engineering', level: 'Intermediate', description: 'Data pipelines and ETL' }
    ],
    availability: 'Active',
    isPublic: true,
    location: 'Denver, CO',
    rating: { average: 4.8, count: 14 },
    completedSwaps: 7,
    createdAt: '2024-05-12T14:20:00Z',
    updatedAt: '2024-07-11T09:30:00Z'
  },
  {
    _id: 'user6',
    username: 'carlos_security',
    email: 'carlos@example.com',
    fullName: 'Carlos Security Expert',
    bio: 'Cybersecurity professional with focus on web application security and penetration testing.',
    profilePhoto: '',
    skillsOffered: [
      { name: 'Cybersecurity', level: 'Expert', description: 'Web app security, penetration testing' },
      { name: 'Ethical Hacking', level: 'Expert', description: 'OWASP, vulnerability assessment' },
      { name: 'Network Security', level: 'Advanced', description: 'Firewalls, intrusion detection' }
    ],
    skillsWanted: [
      { name: 'Blockchain', level: 'Beginner', description: 'Smart contracts and DeFi security' },
      { name: 'Machine Learning', level: 'Intermediate', description: 'AI for threat detection' }
    ],
    availability: 'Casual',
    isPublic: true,
    location: 'Miami, FL',
    rating: { average: 4.9, count: 11 },
    completedSwaps: 5,
    createdAt: '2024-06-01T16:10:00Z',
    updatedAt: '2024-07-09T11:45:00Z'
  },
  {
    _id: 'user7',
    username: 'lisa_product',
    email: 'lisa@example.com',
    fullName: 'Lisa Product Manager',
    bio: 'Product manager with technical background. Love bridging the gap between business and engineering.',
    profilePhoto: '',
    skillsOffered: [
      { name: 'Product Management', level: 'Expert', description: 'Product strategy, roadmaps, user research' },
      { name: 'Agile/Scrum', level: 'Expert', description: 'Agile methodologies, sprint planning' },
      { name: 'Business Analysis', level: 'Advanced', description: 'Requirements gathering, stakeholder management' }
    ],
    skillsWanted: [
      { name: 'Data Analysis', level: 'Intermediate', description: 'SQL, analytics tools, metrics' },
      { name: 'Technical Writing', level: 'Beginner', description: 'Documentation and technical communication' }
    ],
    availability: 'Active',
    isPublic: true,
    location: 'Boston, MA',
    rating: { average: 4.6, count: 13 },
    completedSwaps: 8,
    createdAt: '2024-04-18T10:25:00Z',
    updatedAt: '2024-07-08T15:20:00Z'
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
  },
  {
    _id: 'swap3',
    requester: demoUsers[2], // Sarah Data Scientist
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
    offeredSkill: { name: 'Python', level: 'Expert', description: 'Data analysis and machine learning with Python' },
    requestedSkill: { name: 'React', level: 'Expert', description: 'Want to build web apps for my ML models' },
    status: 'completed',
    message: 'Hi! I can teach you Python for data science in exchange for learning React. I want to build web interfaces for my ML models.',
    meetingType: 'Online',
    duration: '4 hours',
    scheduledDate: '2024-07-05T10:00:00Z',
    feedback: {
      requesterFeedback: {
        rating: 5,
        comment: 'Excellent teacher! Very clear explanations and practical examples.',
        submittedAt: '2024-07-05T15:00:00Z'
      },
      recipientFeedback: {
        rating: 5,
        comment: 'Great student! Quick learner and asked great questions.',
        submittedAt: '2024-07-05T15:30:00Z'
      }
    },
    createdAt: '2024-07-01T14:20:00Z',
    updatedAt: '2024-07-05T15:30:00Z'
  },
  {
    _id: 'swap4',
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
    recipient: demoUsers[4], // Emma Cloud Engineer
    offeredSkill: { name: 'React', level: 'Expert', description: 'Modern React development and best practices' },
    requestedSkill: { name: 'AWS', level: 'Expert', description: 'Want to learn cloud deployment for my apps' },
    status: 'pending',
    message: 'Hi Emma! I\'d love to learn AWS from you. I can teach you React in exchange. Let me know if you\'re interested!',
    meetingType: 'Online',
    duration: '3 hours',
    feedback: {},
    createdAt: '2024-07-12T08:00:00Z',
    updatedAt: '2024-07-12T08:00:00Z'
  },
  {
    _id: 'swap5',
    requester: demoUsers[3], // Alex Mobile Developer
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
    offeredSkill: { name: 'React Native', level: 'Expert', description: 'Mobile app development with React Native' },
    requestedSkill: { name: 'JavaScript', level: 'Advanced', description: 'Advanced JavaScript concepts and patterns' },
    status: 'rejected',
    message: 'Hey! I can teach you React Native mobile development. Would love to learn advanced JavaScript from you!',
    meetingType: 'In-Person',
    duration: '2 hours',
    feedback: {},
    createdAt: '2024-07-08T12:15:00Z',
    updatedAt: '2024-07-09T16:20:00Z'
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
