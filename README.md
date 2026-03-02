# NovaCash – Digital Wallet Frontend

The NovaCash frontend is a web/mobile interface for users and admins to interact with the digital wallet system. It connects with the backend APIs to provide secure wallet operations, transactions, and content management.

## Tech Stack

- Framework: Next.js 

- Framework / Library: Next.js for SSR

- Language: TypeScript

- State Management: Redux 

- Routing: Next.js Routing

- Styling: Tailwind CSS / CSS Modules / SCSS

- HTTP Requests: Axios 

- Forms & Validation: React Hook Form / Zod

- Authentication: JWT token stored in localStorage

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

- Users log in through the frontend login form.

- On successful login, a JWT token is returned from the backend.

- The frontend stores the token in localStorage or memory.

- All protected API requests include the Authorization header: `Authorization: Bearer <JWT_TOKEN>`

- Admin-specific pages or operations are restricted to users with admin privileges.


## Frontend Pages & Components

| Page / Component      | Description                                         |
| --------------------- | --------------------------------------------------- |
| **Login**             | User login form                                     |
| **Signup**            | User registration form                              |
| **Dashboard**         | User wallet overview, balance, QR code for payments |
| **Wallet Operations** | Load, Top-up, Transfer money                        |
| **Transactions**      | View, log, update, delete user transactions         |
| **Notifications**     | User notifications panel                            |
| **Landing Pages**     | Display content managed by admin                    |
| **Admin Panel**       | Create/edit users, landing pages, notifications     |
| **Profile**           | View & update user profile, upload profile photo    |


## State Management

- Protected routes redirect unauthorized users to login.

- Admin routes render components only for users with role: admin.


## Security Features

This backend is designed to support:

- JWT-based authentication

- Admin/user role-based access control

- Protected routes in React using route guards / conditional rendering

- Secure handling of tokens in frontend