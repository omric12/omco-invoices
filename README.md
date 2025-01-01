# Full Stack Invoice Management System

A modern, full-stack invoice management application built with Next.js 15, Go, and PostgreSQL. This project demonstrates full-stack development, including authentication, real-time data visualization, and RESTful API design.

## 🚀 Features

- **Authentication & Authorization**

  - Secure JWT-based authentication
  - Protected routes and API endpoints
  - User registration and login

- **Invoice Management**

  - Create, read, update, and delete invoices
  - Customer information management

- **Dashboard & Analytics**

  - Real-time data visualization using Recharts
  - Payment method distribution
  - Revenue tracking
  - Invoice statistics

- **Modern UI/UX**
  - Responsive design
  - Dark/Light mode support
  - Interactive components with shadcn/ui
  - Form validation with Zod

## 🛠️ Tech Stack

### Frontend

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn/ui
- React Hook Form
- Zod Validation
- Recharts

### Backend

- Go
- Gin Framework
- PostgreSQL
- GORM
- JWT Authentication

## 📋 Prerequisites

- Node.js 18.x or later
- Go 1.20 or later
- PostgreSQL 14.x or later

## 🚀 Getting Started

### Frontend Setup

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate to frontend directory:

```bash
cd frontend
```

3. Install dependencies:

```bash
npm install
```

4. Edit the .env.example

5. Start development server:

```bash
npm run dev
```

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Install Go dependencies:

```bash
go mod tidy
```

3. Edit the .env.example

4. Run the server

```bash
go run cmd/main.go
```

## 📡 API Endpoints

### Authentication

- POST /auth/register - Register new user
- POST /auth/login - User login

### Invoices

- GET /api/invoices - Get all invoices
- POST /api/invoices - Create new invoice
- GET /api/invoices/:id - Get invoice by ID
- PUT /api/invoices/:id - Update invoice
- DELETE /api/invoices/:id - Delete invoice

### Company

- GET /api/company - Get company information
- POST /api/company - Create company profile
- PUT /api/company/:id - Update company information

### Dashboard

- GET /api/summary - Get dashboard statistics

## 🔒 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Include the JWT token in the Authorization header for protected routes:

```
Authorization: Bearer <your_jwt_token>
```

## 📝 Project Structure

```
├── frontend/
│ ├── src/
│ │ ├── actions/
│ │ ├── app/
│ │ ├── components/
│ │ ├── lib/
│ │ └── types/
│ ├── public/
│ └── package.json
│
└── backend/
├── cmd/
├── internal/
│ ├── config/
│ ├── handlers/
│ ├── middleware/
│ └── models/
├── go.mod
└── go.sum
```

## 🚧 Roadmap

- Add and track supplier receipts - WIP
- PDF generation and export - WIP
- Payment status tracking
- login with OAuth
- Multi-tenancy
