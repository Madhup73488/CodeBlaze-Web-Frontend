# Backend Context Summary for CodeBlaze Web App

This document provides a summary of the backend API endpoints, data structures, and key functionalities, reflecting the latest updates.

## 1. Core Models

### 1.1 User (`models/User.js`)

- **Key Fields:** `name`, `email`, `password`, `role` (enum: `["user", "admin", "superadmin"]`), `status` (enum: `["active", "inactive", "pending", "banned", "paused"]`), `isVerified` (Boolean), `loginMethod` (enum: `["email", "google", "github"]`, default: `"email"`), `verificationOTP`, `resetPasswordToken`, etc.
- **Methods:** `getSignedJwtToken()`, `matchPassword()`, `getResetPasswordToken()`, `isAdmin()`.

### 1.2 Job (`models/Job.js`)

- Represents job postings. Includes fields like `title`, `company`, `location`, `description`, `skills`, `salary`, `postedBy` (ref: User), `isActive`, `featured`.

### 1.3 Internship (`models/Internship.js`)

- Represents internship postings. Similar structure to Jobs, includes `internshipFee`, `duration`.

### 1.4 Application (`models/Application.js`)

- Represents job/internship applications. Fields: `userId`, `jobId`/`internshipId`, `applicationType`, `resume`, `coverLetter`, `status`, `answers` (Array of `{question, answer}`).

### 1.5 OfferLetter (`models/OfferLetter.js`)

- **Key Fields:** `recipientName`, `internshipRole`, `joiningDate`, `companyName`, `senderName`, `generatedBy` (ref: User).

### 1.6 Certificate (`models/Certificate.js`)

- **Key Fields:** `recipientName`, `internshipRole`, `joiningDate`, `leavingDate`, `projectWorkedOn`, `certificateId` (unique), `issuedDate`, `qrCodeValue`, `generatedBy` (ref: User).

## 2. Authentication (`/api/auth`)

- **Controller:** `controllers/authController.js`
- **Routes (`routes/api/auth.js`):**
  - `POST /register`: Creates user, sets `loginMethod: "email"`, sends OTP.
  - `POST /verify-otp`: Verifies OTP, marks user `isVerified`, returns JWT.
  - `POST /resend-otp`: Resends OTP.
  - `POST /login`: Logs in verified user, returns JWT.
  - `GET /logout`: Logs out user (clears cookie). (Protected)
  - `POST /forgot-password`: Sends password reset email.
  - `PUT /reset-password/:resettoken`: Resets password.
  - `GET /validate-token`: Validates current JWT. (Protected)

## 3. Admin Panel APIs (`/api/admin`)

- **General Middleware:** All routes under `/api/admin` are protected by `protect` (authentication), `authorize('admin', 'superadmin')` (role check), and `adminAccess` (checks `req.user.isAdmin()`).
- **Controller:** `controllers/adminController.js`

### 3.1 Dashboard

- **Endpoint:** `GET /dashboard`
- **Function:** `getDashboardStats`
- **Response:** Counts (users, admins, jobs, etc.), recent applications, applications by status, recent users. (See previous summary for full structure).

### 3.2 User Management (Platform Users)

- **Endpoint:** `GET /users` (List users with pagination/filtering)
- **Endpoint:** `PUT /users/:id` (Update user details - Superadmin only for role changes)
- **Endpoint:** `DELETE /users/:id` (Delete user - Superadmin only for admins/superadmins)

### 3.3 Admin User Management

- **Controller Functions:** `getAdminUsers`, `createAdminUser`, `updateAdminUser`, `deleteAdminUser`.
- **Routes (`routes/api/admin.js`):**
  - `GET /admin-users`:
    - Access: "admin", "superadmin".
    - Superadmins see all admins/superadmins. Admins see other admins (excluding self, superadmins).
  - `POST /admin-users`:
    - Access: "admin", "superadmin".
    - Superadmins can create 'admin' or 'superadmin'. Admins can only create 'admin'.
    - **Sends welcome email with password reset link to the new admin.** (Requires `FRONTEND_URL` env var).
  - `PUT /admin-users/:id`:
    - Access: "admin", "superadmin".
    - Superadmins can update any admin/superadmin. Admins can update other 'admin' users (cannot promote, update superadmins, or self).
  - `DELETE /admin-users/:id`:
    - Access: "admin", "superadmin".
    - Superadmins can delete any admin/superadmin. Admins can delete other 'admin' users (cannot delete superadmins or self).

### 3.4 Job & Internship Management

- Endpoints for CRUD operations on jobs and internships, activate/feature. (e.g., `GET /jobs`, `POST /jobs/create`, `PUT /jobs/:id`, `GET /internships`, etc.)

### 3.5 Application Management

- **Endpoints:** `GET /job-applications`, `GET /internship-applications`, `PUT /applications/:id/status`.

### 3.6 Analytics

- **Endpoints & Functions:**
  - `GET /analytics/users` (`getUserAnalytics`): User trends, role distribution, login methods.
  - `GET /analytics/jobs` (`getJobAnalytics`): Job status, work type, employment type distributions, popular skills.
  - `GET /analytics/applications` (`getApplicationAnalytics`): Application trends, status distribution, top jobs/internships, summary stats.
- (See previous summary for full response structures).

### 3.7 Settings

- **Endpoints:** `GET /settings`, `PUT /settings` (Currently mock data).

## 4. Document Generation & Verification APIs

- **Controller:** `controllers/documentController.js`

### 4.1 Admin Document Generation (`/api/admin/documents`)

- **Middleware:** Protected by `protect`, `authorize('admin', 'superadmin')`, `adminAccess`.
- **Routes (`routes/api/documents.js`):**
  - `POST /offer-letter/generate`:
    - Function: `generateOfferLetter`.
    - Saves offer letter data. PDF generation is a placeholder.
    - Payload: `{ recipientName, internshipRole, joiningDate, ... }`
    - Response: Saved offer letter object.
  - `POST /certificate/generate`:
    - Function: `generateCertificate`.
    - Saves certificate data, ensures `certificateId` is unique, generates `qrCodeValue`. PDF generation is a placeholder.
    - Payload: `{ recipientName, internshipRole, joiningDate, leavingDate, projectWorkedOn, certificateId, ... }`
    - Response: Saved certificate object.

### 4.2 Public Certificate Verification (`/api/public`)

- **Routes (`routes/public.js`):**
  - `GET /certificate/:certificateId`:
    - Function: `verifyCertificate`.
    - Access: Public.
    - Fetches and returns certificate details by its `certificateId`.
    - Response: Certificate object or 404 if not found.

## 5. Key Middleware

### 5.1 `middleware/auth.js`

- `protect`: Verifies JWT from header or cookie, attaches `req.user`.

### 5.2 `middleware/admin.js`

- `authorize(...roles)`: Checks if `req.user.role` is in the allowed roles.
- `adminAccess`: Checks `req.user.isAdmin()`. **Email-specific checks have been removed.**

## 6. Environment Variables

- `JWT_SECRET`, `JWT_EXPIRE`, `JWT_COOKIE_EXPIRE`
- `MONGO_URI`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `FROM_EMAIL`, `FROM_NAME` (for `mailService`)
- `FRONTEND_URL` (Used for constructing password reset links in emails, e.g., for new admin welcome email, certificate QR code).
- `PORT`

This summary provides an overview of the backend structure and API endpoints relevant for frontend integration, especially concerning admin functionalities, document generation, and analytics.
