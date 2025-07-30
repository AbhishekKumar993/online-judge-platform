# 🧠 Online Judge Platform

A full-stack Online Judge Platform where users can write, compile, and run code in real-time — built with scalability and performance in mind.

## 🚀 Quick Development Setup

### Development (Local Testing)
```bash
# 1. Setup and build everything
npm run dev:setup

# 2. Start backend with auto-reload
npm run dev

# 3. In another terminal, start frontend dev server  
npm run dev:frontend
```

### Quick Deployment to Render
```bash
# Option 1: Use the deployment script
./deploy.sh

# Option 2: Use npm script
npm run quick-deploy
```

## 📁 Project Structure
```
├── Frontend/          # React app (Vite + Tailwind)
├── Backend/           # Express.js API server  
├── deploy.sh          # Quick deployment script
└── package.json       # Root build scripts
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start backend with auto-reload |
| `npm run dev:frontend` | Start frontend dev server |
| `npm run build` | Build entire project |
| `npm start` | Start production server |
| `./deploy.sh` | Quick build + deploy |

## 🌐 URLs

- **Production**: https://online-judge-platform-kv5u.onrender.com
- **Local Backend**: http://localhost:3001  
- **Local Frontend**: http://localhost:5173 (dev server)

## ✨ Features

- 🖥️ Code Editor with syntax highlighting
- ⚙️ Real-time code compilation and execution
- 🐳 Docker-based sandbox for secure code execution
- 📦 REST API for submissions and problem management
- 🔐 JWT Authentication and role-based access
- 🧾 Problem creation, test case support
- 📊 Submission results and runtime feedback
- ☁️ Deployed on AWS EC2 for real-world testing

## 🛠️ Tech Stack

- **Frontend**: React.js, HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Containerization**: Docker
- **Deployment**: AWS EC2 (Ubuntu)
- **Authentication**: JWT, bcrypt
- **Other Tools**: Git, GitHub, Postman

## 🧪 How to Run Locally

### Prerequisites
- Node.js
- Docker
- MongoDB (local or remote)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/AbhishekKumar993/online-judge-platform.git
cd online-judge-platform
