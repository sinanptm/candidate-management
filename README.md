# 🎯 Role-Based Candidate Management System

A comprehensive system for managing candidates with role-based access control, secure file storage, and modern web technologies.

## 🚀 Live Demo

- **Frontend Application:** [https://candidate-management-psi.vercel.app](https://candidate-management-psi.vercel.app)
- **Backend API:** [http://api.trendsonline.online](http://api.trendsonline.online)
- **Repository:** [https://github.com/sinanptm/candidate-management](https://github.com/sinanptm/candidate-management)

## ✨ Features

- **Role-Based Authentication**
  - Admin access for candidate management
  - Candidate access for profile management
  - JWT-based secure authentication

- **File Management**
  - Secure file uploads to AWS S3
  - Profile pictures and resume storage
  - Presigned URL implementation

- **User Management**
  - Admin: Create, Read, Update, Delete candidates
  - Candidates: View and update personal profiles
  - Protected routes based on user roles

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Shadcn UI Components

### Backend
- Node.js
- Express.js
- JWT Authentication

### Database & Storage
- MongoDB Atlas
- AWS S3

### Deployment
- Frontend: Vercel
- Backend: AWS EC2

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/sinanptm/candidate-management.git
cd candidate-management
```

2. **Install dependencies**
```bash
# Install root dependencies
pnpm install

# Start development servers
pnpm  dev
```

The development server will start both frontend and backend concurrently.


## 🔑 Environment Variables

### Backend
```env
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_connection_string
AWS_ACCESS_KEY=your_aws_access_key
AWS_SECRET_KEY=your_aws_secret_key
AWS_BUCKET_NAME=your_s3_bucket_name
```

### Frontend
```env
REACT_APP_API_URL=your_backend_api_url
```

## 👥 User Roles

### Admin
- Create new candidates
- View all candidate profiles
- Update candidate information
- Delete candidate profiles
- Access admin dashboard

### Candidate
- View personal profile
- Update profile information
- Upload profile picture
- Upload resume

## 🔒 Security Features

- JWT-based authentication
- Protected API routes
- Secure file uploads
- Role-based access control
- Encrypted password storage

## 📧 Contact

For questions and support, please open an issue in the GitHub repository.