# 🏆 Odoo Hackathon 2025 - SkillSwap Platform

## 👥 Team Information
- *Team Name*: Coding Aura
- *Team Lead*: Anish Sarkar
- *Team Menber*: Aditya Ghosh , Indraneel Bose, Aniruddha Dewanjee
- *Team Lead Email*: anishisanish27@gmail.com
- *Team Lead Phone.No*: 6290903598
- *Hackathon*: Odoo Hackathon 2025
- *Hackathon Problem Statement*: Skill Swap Platform

## 🎯 Problem Statement Description

In today's rapidly evolving digital landscape, professionals and enthusiasts often find themselves with skills they want to share and simultaneously need to learn new skills to advance their careers or pursue their passions. Traditional learning methods can be expensive, impersonal, and lack the practical, hands-on experience that comes from peer-to-peer learning.

*The Challenge:*
- Skill acquisition is expensive and time-consuming
- Limited access to mentors and experts
- Lack of platforms for skill bartering/exchange
- Difficulty in finding people with complementary skills
- No community-driven learning solutions

*Our Solution:*
SkillSwap Platform - A modern, community-driven skill exchange platform where users can trade their expertise with others, fostering a collaborative learning environment while building meaningful professional connections.

## 🎥 Project Demo
*Video Demo Link*: [Insert your demo video link here]

## 📋 Project Overview

SkillSwap is a comprehensive platform that enables users to exchange skills and knowledge through a structured, secure, and user-friendly interface. Users can offer their expertise in certain areas while seeking to learn from others, creating a mutually beneficial learning ecosystem.

### 🌟 Key Features

#### 🔐 Authentication & User Management
- *Multi-Modal Authentication*: Demo mode, email/password registration
- *Secure Authentication*: JWT-based authentication system
- *Profile Management*: Comprehensive user profiles with skills, bio, and ratings
- *Privacy Controls*: Public/private profile visibility settings

#### 🎯 Skill Discovery & Matching
- *Advanced Search*: Filter users by skills, experience level, and location
- *Skill Categories*: Organized skill offerings and requirements
- *User Ratings*: Community-driven rating and review system
- *Smart Recommendations*: AI-powered skill matching suggestions

#### 🤝 Swap Management System
- *Request System*: Send and receive skill exchange requests
- *Status Tracking*: Real-time status updates (Pending, Accepted, Rejected, Completed)
- *Communication Tools*: Built-in messaging for coordination
- *Feedback System*: Post-swap rating and review mechanism

#### 🎨 User Experience
- *Modern UI/UX*: Clean, intuitive interface with Tailwind CSS
- *Responsive Design*: Works seamlessly across all devices
- *Real-time Notifications*: Toast notifications for all actions
- *Demo Mode*: Try before you commit with populated demo data

#### 📊 Analytics & Insights
- *User Dashboard*: Personal analytics and swap history
- *Skill Progress*: Track learning journey and achievements
- *Community Stats*: Platform-wide engagement metrics

## 🛠 Technology Stack

### Frontend
- *Framework*: React 19 with TypeScript
- *Build Tool*: Vite for fast development and building
- *Styling*: Tailwind CSS for modern, responsive design
- *State Management*: React Context API + TanStack Query for server state
- *Routing*: React Router v6 with future compatibility
- *Forms*: React Hook Form with comprehensive validation
- *Icons*: Lucide React for beautiful, consistent icons
- *Notifications*: React Hot Toast for user feedback

### Backend
- *Runtime*: Node.js with Express.js framework
- *Database*: MongoDB with Mongoose ODM
- *Authentication*: JWT tokens with bcrypt password hashing
- *File Upload*: Multer for handling profile photos
- *Validation*: Express-validator for API input validation
- *Security*: CORS, helmet, rate limiting middleware

### Development Tools
- *Version Control*: Git & GitHub
- *Code Quality*: ESLint for code linting
- *Package Management*: npm
- *Environment*: Environment variables for configuration

## 📁 Project Structure

```
skill-swap-platform/
├── backend/                    # Node.js Backend
│   ├── models/                # Database models
│   │   ├── User.js           # User schema & model
│   │   └── SwapRequest.js    # Swap request schema & model
│   ├── routes/               # API route handlers
│   │   ├── auth.js          # Authentication routes
│   │   ├── users.js         # User management routes
│   │   └── swaps.js         # Swap request routes
│   ├── middleware/          # Custom middleware
│   │   ├── auth.js         # JWT authentication middleware
│   │   └── upload.js       # File upload middleware
│   ├── uploads/             # File upload directory
│   ├── .env                # Environment variables
│   ├── server.js           # Express server setup
│   └── package.json        # Backend dependencies
│
├── frontend/                  # React Frontend
│   ├── public/               # Static assets
│   ├── src/                  # Source code
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Navbar.tsx   # Navigation component
│   │   │   └── ProtectedRoute.tsx # Route protection
│   │   ├── contexts/         # React contexts
│   │   │   └── AuthContext.tsx # Authentication context
│   │   ├── pages/            # Page components
│   │   │   ├── HomePage.tsx     # Landing page
│   │   │   ├── LoginPage.tsx    # Login interface
│   │   │   ├── RegisterPage.tsx # Registration interface
│   │   │   ├── DashboardPage.tsx # User dashboard
│   │   │   ├── ProfilePage.tsx   # Profile management
│   │   │   ├── BrowsePage.tsx    # Skill discovery
│   │   │   ├── SwapsPage.tsx     # Swap management
│   │   │   └── UserProfilePage.tsx # Other user profiles
│   │   ├── services/         # API service layers
│   │   │   ├── api.ts        # HTTP client & API calls
│   │   │   └── demoData.ts   # Demo data for testing
│   │   ├── types/            # TypeScript type definitions
│   │   │   └── index.ts      # All application types
│   │   ├── lib/              # Utility libraries
│   │   │   ├── api.ts        # Axios configuration
│   │   │   └── utils.ts      # Helper functions
│   │   ├── App.tsx           # Root application component
│   │   ├── main.tsx          # Application entry point
│   │   └── index.css         # Global styles
│   ├── .env                  # Environment variables
│   ├── package.json          # Frontend dependencies
│   ├── tailwind.config.js    # Tailwind configuration
│   └── vite.config.ts        # Vite configuration
│
├── README.md                  # Project documentation
└── .gitignore                # Git ignore rules
```

## 🚀 Installation & Setup

### Prerequisites
- **Node.js**: v16.0.0 or higher
- **npm**: v7.0.0 or higher  
- **MongoDB**: v4.4 or higher (local or cloud)
- **Git**: For version control

### Step 1: Clone Repository
```bash
git clone https://github.com/aditya-ghosh2992/odoo-hackathon.git
cd odoo-hackathon
```

### Step 2: Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configurations:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/skillswap
# JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_complex
# NODE_ENV=development
```

### Step 3: Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file:
# VITE_API_URL=http://localhost:5000/api
```

### Step 4: Database Setup
```bash
# Start MongoDB service (if running locally)
mongosh

# Or use MongoDB Atlas for cloud database
# Update MONGODB_URI in backend/.env accordingly
```

### Step 5: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Server will start on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Application will start on http://localhost:5173
```

### Step 6: Access Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Demo Account**: demo@demo.com / 123456

## 🎮 How to Use

### 1. **Getting Started**
- Visit the application URL
- Use demo account (demo@demo.com / 123456) or register new account
- Complete your profile with skills and preferences

### 2. **Finding Skills**
- Navigate to "Browse Skills" page
- Use search filters to find users with desired skills
- View detailed user profiles and ratings

### 3. **Making Swap Requests**
- Click "Request Skill Swap" on user profiles
- Fill out the swap request form with details
- Specify what you offer and what you want to learn

### 4. **Managing Swaps**
- Check "My Swaps" for sent and received requests
- Accept/reject incoming requests
- Track ongoing and completed swaps

### 5. **Building Reputation**
- Complete skill swaps successfully
- Provide honest feedback and ratings
- Build your profile with testimonials

## 🔧 API Documentation

### Authentication Endpoints
```http
POST /api/auth/register       # Register new user
POST /api/auth/login          # Login user
GET /api/auth/me              # Get current user
POST /api/auth/change-password # Change password
```

### User Management Endpoints
```http
GET /api/users                # Get all users
GET /api/users/:id            # Get user by ID
PUT /api/users/profile        # Update user profile
POST /api/users/upload-photo  # Upload profile photo
GET /api/users/search         # Search users by skills
```

### Swap Request Endpoints
```http
POST /api/swaps/request       # Create swap request
GET /api/swaps/sent           # Get sent requests
GET /api/swaps/received       # Get received requests
PUT /api/swaps/:id/accept     # Accept request
PUT /api/swaps/:id/reject     # Reject request
PUT /api/swaps/:id/complete   # Mark as completed
PUT /api/swaps/:id/feedback   # Submit feedback
DELETE /api/swaps/:id         # Cancel request
```


### Test Credentials
- **Demo Account**: demo@demo.com / 123456
- **Regular Login**: Any email/password combination works for testing

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend Deployment (Railway/Render/DigitalOcean)
```bash
# Set environment variables on your hosting platform
# Deploy using Git or Docker
```

### Environment Variables for Production
```bash
# Backend
PORT=5000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
NODE_ENV=production

# Frontend
VITE_API_URL=your_production_api_url
```


## 🤝 Contributing

1. Fork the repository
2. Create feature branch (git checkout -b feature/AmazingFeature)
3. Commit changes (git commit -m 'Add AmazingFeature')
4. Push to branch (git push origin feature/AmazingFeature)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- *Odoo Hackathon* for providing the platform and opportunity
- *Open Source Community* for the amazing tools and libraries
- *Team Members* for their dedication and hard work
- *Mentors and Reviewers* for their valuable guidance

## 📞 Contact

- *Team Menber*: Aditya Ghosh
- *Email*: aditya.ghosh2992@gmail.com
- *GitHub*: [@aditya-ghosh2992](https://github.com/aditya-ghosh2992)
- *Project Repository*: [SkillSwap Platform](https://github.com/aditya-ghosh2992/odoo-hackathon)

---

<p align="center">
  <strong>Built with ❤ for Odoo Hackathon 2025</strong>
</p>
