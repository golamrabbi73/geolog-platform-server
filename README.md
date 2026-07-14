# GeoLog Platform - Backend

A production-ready REST API for managing geological wells and core samples. Built with **Node.js**, **Express.js**, **TypeScript**, and **MongoDB**, featuring JWT authentication, role-based authorization, analytics, validation, and a scalable architecture.

---

## 🚀 Live API

> Will be added after deployment.

---

## 📖 Project Overview

GeoLog Platform is a backend system designed for geological and drilling operations. It enables organizations to securely manage wells, core samples, users, and dashboard analytics through a RESTful API.

---

## 🛠 Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Zod Validation
- Cookie Parser
- dotenv

---

## ✨ Features

### 🔐 Authentication

- User Registration
- User Login
- Refresh Access Token
- Logout
- Get Current User

---

### 👥 Authorization

Role-based Access Control

- Field Engineer
- Manager
- Admin

Protected routes using JWT authentication.

---

### 👤 User Module

- Register User
- Login User
- Get Current User Profile
- Refresh Token
- Logout

---

### 🪨 Core Sample Module

- Create Core Sample
- Get My Core Samples
- Get All Core Samples
- Update Core Sample
- Delete Core Sample
- Search
- Filter
- Pagination
- Ownership Check

---

### 🛢 Well Module

- Create Well
- Get My Wells
- Get All Wells
- Update Well
- Delete Well
- Search
- Filter
- Pagination

---

### 📊 Dashboard Analytics

- Total Users
- Total Wells
- Total Core Samples
- Well Status Distribution
- Rock Type Distribution
- Recent Wells
- Recent Core Samples

---

### ✅ Validation

All request bodies are validated using **Zod** before reaching controllers.

---

### ⚠ Error Handling

Centralized error handling with consistent API responses.

---

## 📂 Project Structure

```text
src
│
├── app
│   ├── middleware
│   ├── modules
│   │   ├── analytics
│   │   ├── auth
│   │   ├── coreSample
│   │   ├── user
│   │   └── well
│   ├── errors
│   └── utils
│
├── config
├── shared
└── server.ts
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root.

```env
NODE_ENV=development

PORT=5000

CLIENT_URL=http://localhost:3000

DATABASE_URL=your_mongodb_connection_string

JWT_ACCESS_SECRET=your_jwt_access_secret

JWT_REFRESH_SECRET=your_jwt_refresh_secret
```

---

## 📦 Installation

Clone the repository

```bash
git clone <repository-url>
```

Move into the project

```bash
cd geolog-platform-server
```

Install dependencies

```bash
npm install
```

---

## ▶ Running the Project

Development

```bash
npm run dev
```

Build

```bash
npm run build
```

Production

```bash
npm start
```

---

## 🌐 API Base URL

```
/api/v1
```

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/users/register` | Register User |
| POST | `/api/v1/users/login` | Login User |
| POST | `/api/v1/users/refresh-token` | Refresh Access Token |
| POST | `/api/v1/users/logout` | Logout |
| GET | `/api/v1/users/me` | Get Current User |

---

### Core Samples

| Method | Endpoint |
|---------|----------|
| POST | `/api/v1/core-samples` |
| GET | `/api/v1/core-samples` |
| GET | `/api/v1/core-samples/my-samples` |
| PATCH | `/api/v1/core-samples/:id` |
| DELETE | `/api/v1/core-samples/:id` |

---

### Wells

| Method | Endpoint |
|---------|----------|
| POST | `/api/v1/wells` |
| GET | `/api/v1/wells` |
| GET | `/api/v1/wells/my-wells` |
| PATCH | `/api/v1/wells/:id` |
| DELETE | `/api/v1/wells/:id` |

---

### Analytics

| Method | Endpoint |
|---------|----------|
| GET | `/api/v1/analytics/dashboard` |

---

## 🧪 Testing

The backend has been regression tested for:

- Authentication
- Authorization
- User APIs
- Core Sample CRUD
- Well CRUD
- Dashboard Analytics
- Search
- Filter
- Pagination
- Ownership Check
- Validation
- Error Handling

---

## 🚀 Deployment

Backend can be deployed on:

- Render
- Railway
- VPS

Frontend can be deployed on:

- Vercel

---

## 👨‍💻 Author

**Md. Golam Rabbe**

GitHub: https://github.com/golamrabbi73

---

## 📄 License

This project is developed for educational and portfolio purposes.