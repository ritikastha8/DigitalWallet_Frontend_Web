# NovaCash – Digital Wallet Backend API

NovaCash is a secure digital wallet backend system designed to support peer-to-peer financial transactions, wallet management, and administrative content control. This backend provides RESTful APIs for user authentication, wallet operations, transactions, notifications, and administrative management. It is built to support a cross-platform mobile application and follows a modular and scalable API-driven architecture.

## Tech Stack

Framework: Next.js (API Routes)

Language: JavaScript / TypeScript

Authentication: JWT-based authentication

Database: MongoDB (or equivalent NoSQL database)

File Uploads: Multipart form data (profile photos, landing page images)

Architecture: RESTful API with role-based access (Admin & User)

## Getting Started (Local Development)

### Install dependencies
```bash
npm install
```
### Run development server
```bash
npm run dev
```
The backend API will run on:
```bash
http://localhost:3000
```


## Authentication & Authorization

- JWT tokens are issued upon successful login

- Protected routes require an Authorization header:
Authorization: Bearer <JWT_TOKEN>

- Admin routes are restricted to authorized admin users

## API Routes Overview
### Admin Routes

Base Path: /api/user/admin

| Method | Endpoint             | Description                            |
| ------ | -------------------- | -------------------------------------- |
| POST   | /users               | Create a new user (with profile photo) |
| GET    | /users               | Get all users                          |
| GET    | /users/:id           | Get user by ID                         |
| PUT    | /users/:id           | Update user by ID                      |
| DELETE | /users/:id           | Delete user by ID                      |
| POST   | /landingpages        | Create landing page                    |
| PUT    | /landingpages/:id    | Update landing page                    |
| GET    | /landingpages        | Get all landing pages                  |
| GET    | /landingpages/:id    | Get landing page by ID                 |
| DELETE | /landingpages/:id    | Delete landing page                    |
| POST   | /notifications       | Create notification                    |
| GET    | /notifications       | Get all notifications                  |
| GET    | /notifications/:id   | Get notification by ID                 |
| PUT    | /notifications/:id   | Update notification                    |
| DELETE | /notifications/:id   | Delete notification                    |
| POST   | /termsconditions     | Create terms & conditions              |
| GET    | /termsconditions     | Get all terms                          |
| GET    | /termsconditions/:id | Get terms by ID                        |


### User Routes

Base Path: /api/user

| Method | Endpoint                      | Description                     |
| ------ | ----------------------------- | ------------------------------- |
| POST   | /auth/register                | Register new user               |
| POST   | /auth/login                   | Login & receive JWT             |
| GET    | /wallet/info                  | Get wallet balance & bank       |
| POST   | /wallet/load                  | Load money into wallet          |
| POST   | /wallet/topup                 | Top-up wallet                   |
| POST   | /wallet/transfer              | Transfer money                  |
| POST   | /wallet/link-bank             | Link bank account               |
| POST   | /wallet/loginbank             | Bank login via wallet           |
| GET    | /wallet/receive-qr            | Generate QR for receiving money |
| GET    | /transactions/my-transactions | User transactions               |
| POST   | /transactions/log             | Log transaction                 |
| GET    | /transactions/:id             | Transaction by ID               |
| PUT    | /transactions/:id             | Update transaction              |
| DELETE | /transactions/:id             | Delete transaction              |
| GET    | /notifications                | User notifications              |
| GET    | /notifications/:id            | Notification by ID              |
| GET    | /termsconditions              | Terms list                      |
| GET    | /landingpages                 | Landing pages                   |


### Auth Routes

Base Path: /api/user/auth

| Method | Endpoint                | Description            |
| ------ | ----------------------- | ---------------------- |
| POST   | /register               | Register new user      |
| POST   | /login                  | Login and get JWT      |
| GET    | /whoami                 | Get logged-in user     |
| PUT    | /upload-profile         | Upload profile photo   |
| POST   | /request-password-reset | Request password reset |
| POST   | /reset-password/:token  | Reset password         |


### Public Routes

Base Path: /api

| Method | Endpoint         | Description               |
| ------ | ---------------- | ------------------------- |
| GET    | /landingpages    | Public landing pages      |
| GET    | /notifications   | Public notifications      |
| GET    | /termsconditions | Public terms & conditions |


## Security Features

- JWT-based authentication

- Role-based access control (Admin/User)

- Secure password hashing

- Token-based password reset

- Protected wallet and transaction operations

## Purpose of This Backend

This backend is designed to support:

- A Flutter mobile application

- Secure wallet-based financial operations

- Admin-managed dynamic content

- Academic demonstration of backend architecture, security, and API design