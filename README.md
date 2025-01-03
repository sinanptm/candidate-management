# 🎯 Role-Based Candidate Management System

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)

A modern, secure, and scalable system for managing candidates with role-based access control.

</div>

## 🌟 Quick Links

- 🖥️ **Frontend:** [Live Demo](https://candidate-management-psi.vercel.app)
- 🔧 **Backend:** [API Endpoint](http://api.trendsonline.online)
- 📚 **Documentation:** [GitHub Repository](https://github.com/sinanptm/candidate-management)

## ✨ Key Features

### 🔐 Authentication & Authorization
- 👑 **Admin Dashboard**
  - Complete candidate management
  - System overview and analytics
- 👤 **Candidate Portal**
  - Self-service profile management
  - Document uploads

### 📁 Secure File Management System
- 🔒 **Presigned URL Implementation**
  ```mermaid
  sequenceDiagram
    participant Client
    participant Server
    participant S3
    Client->>Server: Request upload URL
    Server->>S3: Generate presigned URL
    S3->>Server: Return presigned URL
    Server->>Client: Send presigned URL
    Client->>S3: Upload file directly
    Note over Client,S3: Secure direct upload
  ```

- 🛡️ **Security Features**
  - Temporary URL expiration
  - File type validation
  - Size restrictions

- 📤 **Upload Process**
  1. Client requests secure upload URL
  2. Server generates time-limited presigned URL
  3. Direct client-to-S3 upload
  4. Server validates and processes upload
  5. File reference stored in MongoDB

## 🛠️ Technology Stack

### Frontend Application 🎨
```json
{
  "main": [
    "⚛️ React.js",
    "📝 TypeScript",
    "🎨 Tailwind CSS",
    "🧩 Shadcn UI"
  ],
  "forms": "📋 React Hook Form"
}
```

### Backend Infrastructure 🏗️
```json
{
  "runtime": "💚 Node.js",
  "framework": "⚡ Express.js",
  "database": "🍃 MongoDB",
  "storage": "☁️ AWS S3",
  "auth": "🔑 JWT",
  "hosting": "📡 AWS EC2 && Verlcel"
}
```

## 🚀 Getting Started

### Prerequisites
- 📦 pnpm >= 9.x
- 💻 Node.js >= 20.x
- 🗄️ MongoDB
- ☁️ AWS Account

### Installation Steps

1. **Clone & Setup**
```bash
# 📥 Clone the repository
git clone https://github.com/sinanptm/candidate-management.git

# 📂 Navigate to project
cd candidate-management

# 📦 Install dependencies
pnpm install

# ▶️ Start development
pnpm dev
```

## ⚙️ Environment Configuration

### 🔒 Backend (.env)
```env
# 🌐 Server Configuration
PORT=8000
NODE_ENV=DEV
CLIENT_URL=http://localhost:3000

# 🗄️ Database
MONGO_URI=your_mongodb_uri

# 👑 Admin Access
ADMIN_USERNAME=admin@gmail.com
ADMIN_PASSWORD=your_secure_password

# 🔑 JWT Configuration
REFRESH_TOKEN_SECRET=your_refresh_secret
ACCESS_TOKEN_SECRET=your_access_secret

# ☁️ AWS Configuration
AWS_ACCESS_KEY_ID=your_aws_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_bucket_name
```

### 🎨 Frontend (.env)
```env
VITE_API_URL=your_backend_api_url
```

## 👥 Access Levels & Permissions

### 👑 Admin Capabilities
- 📊 Dashboard access
- 👥 Candidate management
- 📁 Document verification
- 🔍 Advanced search
- 📈 Analytics view

### 👤 Candidate Features
- 📝 Profile management
- 📄 Document upload
- 📊 Progress tracking
- 📅 Update history

## 🔒 Security Implementation

- 🔐 **Authentication**
  - JWT with refresh tokens
  - Role-based access control
  - Session management

- 🛡️ **Data Protection**
  - End-to-end encryption
  - Secure file handling
  - Input sanitization

- 📡 **API Security**
  - Rate limiting
  - CORS configuration
  - Request validation

## 🔌 API Endpoints

### 👑 Admin Routes
Base path: `/api/admin`

#### Authentication
- **POST** `/login`
  - Admin login endpoint
  - Requires admin credentials

- **DELETE** `/logout`
  - Admin logout endpoint
  - Invalidates current session

- **POST** `/refresh`
  - Refresh access token
  - Requires valid refresh token

#### Candidate Management
*Requires admin authentication*

- **POST** `/candidates/create`
  - Create new candidate account
  - Requires candidate details in request body

- **DELETE** `/candidates/:id`
  - Delete candidate account
  - Requires candidate ID as URL parameter

- **GET** `/candidates`
  - Retrieve all candidates
  - Optional query parameters for filtering

### 👤 User (Candidate) Routes
Base path: `/api`

#### Authentication
- **POST** `/login`
  - Candidate login endpoint
  - Requires email and password

- **DELETE** `/logout`
  - Candidate logout endpoint
  - Invalidates current session

#### Profile Management
*Requires user authentication*

- **GET** `/profile`
  - Retrieve candidate profile
  - Returns complete profile information

- **PUT** `/profile`
  - Update candidate profile
  - Requires updated profile data in request body

#### File Management
*Requires user authentication*

- **PATCH** `/create-url`
  - Generate presigned URL for file upload
  - Returns temporary S3 upload URL

- **PUT** `/update-file`
  - Update file information after upload
  - Requires file metadata in request body
---
<div align="center">
Made with ❤️ by the sinaptm
</div>
