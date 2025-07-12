<<<<<<< HEAD
# Skill Swap Platform

A full-stack web application for exchanging skills between users, built with the MERN stack with Firebase Authentication.

## 🚀 Features

- **Multi-Authentication**: Email/password, Google OAuth via Firebase, and Demo mode
- **Profile Management**: Create and customize user profiles with skills and availability
- **Skill Matching**: Browse and search for users by skills
- **Swap Requests**: Send, receive, accept/reject skill exchange requests
- **Rating System**: Rate and provide feedback after skill exchanges
- **Real-time Updates**: Live updates for requests and notifications
- **Demo Mode**: Try the platform with demo@demo.com / 123456

## 🛠 Tech Stack

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Multer** for file uploads
- **Express Rate Limit** for API protection

### Frontend
- **React 19** with **TypeScript**
- **Firebase Authentication** (Google OAuth)
- **Vite** for fast development
- **React Router** for navigation
- **TanStack Query** for data fetching
- **React Hook Form** for form handling
- **Tailwind CSS** for styling
- **Lucide React** for icons

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- Firebase project (for Google authentication)
- Git

### Firebase Setup

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Authentication and configure Google sign-in provider
3. Get your Firebase config from Project Settings
4. Update the `.env` file in the frontend directory with your Firebase config

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/skillswap
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_complex
   NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The backend will be running on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_FIREBASE_API_KEY=your-api-key-here
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be running on http://localhost:5173

## 🔐 Authentication Options

The platform supports three authentication methods:

### 1. Demo Mode (Quickest Way to Try)
- **Email**: demo@demo.com
- **Password**: 123456
- Provides full access to demo data and features
- No registration required

### 2. Google Authentication
- Click "Continue with Google" on login/register pages
- Uses Firebase Authentication
- Requires Firebase project setup (see Firebase Setup section)

### 3. Email/Password Registration
- Traditional email/password registration
- Can use either Firebase (preferred) or backend authentication
- Secure password requirements enforced

## 📱 Usage

## 🏗 Project Structure

```
skill-swap-platform/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── SwapRequest.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   └── swaps.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── uploads/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── contexts/
    │   ├── services/
    │   ├── types/
    │   ├── lib/
    │   └── App.tsx
    ├── public/
    └── package.json
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/change-password` - Change password

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/upload-photo` - Upload profile photo
- `GET /api/users/search` - Search users by skills
- `GET /api/users/:id` - Get user by ID

### Swaps
- `POST /api/swaps/request` - Create swap request
- `GET /api/swaps/sent` - Get sent requests
- `GET /api/swaps/received` - Get received requests
- `PUT /api/swaps/:id/accept` - Accept request
- `PUT /api/swaps/:id/reject` - Reject request
- `PUT /api/swaps/:id/complete` - Mark as completed
- `PUT /api/swaps/:id/feedback` - Submit feedback
- `DELETE /api/swaps/:id` - Cancel request

## 🎯 Usage

1. **Register/Login**: Create an account or sign in
2. **Setup Profile**: Add your skills offered and wanted
3. **Browse Users**: Find people with skills you need
4. **Send Requests**: Propose skill exchanges
5. **Manage Swaps**: Accept/reject incoming requests
6. **Exchange Skills**: Meet and learn from each other
7. **Provide Feedback**: Rate your experience

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Use a cloud MongoDB service (MongoDB Atlas)
3. Deploy to services like Railway, Render, or DigitalOcean

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy to Vercel, Netlify, or similar services
3. Update the API URL in environment variables

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

Built for hackathon participants looking to create a skill-sharing platform!
=======
# odoo-hackathon
>>>>>>> 76b8fd70192b8ed0917281af6f66b3299b6eb6dd
