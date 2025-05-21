# Frontend Context Summary for CodeBlaze Web App

This document provides a summary of the frontend structure, key functionalities, API interactions, and data models as implemented or modified during recent development efforts.

## 1. Overall Project Structure

The project is a React application, likely bootstrapped with Create React App. Key directories include:

*   **`public/`**: Static assets and `index.html`.
*   **`src/`**: Main source code.
    *   **`assets/`**: Images, global styles (like `theme.css`).
    *   **`components/`**: Reusable UI components, categorized by feature (e.g., `landing`, `Auth`, `common`, `Internships`, `admin/components`).
    *   **`pages/`**: Top-level page components that are mapped to routes (e.g., `Landing.js`, `Careers.js`).
    *   **`features/`**: A newer directory for feature-sliced concerns, containing pages related to specific domains (e.g., `static/pages`, `company/pages`).
    *   **`admin/`**: Contains components and pages specific to the admin dashboard.
        *   `admin/components/layout` (Sidebar, Header)
        *   `admin/pages` (DashboardHome, AdminSettings, JobList, AdminUsersPage, etc.)
        *   `admin/utils/api.js` (Admin-specific API service functions)
        *   `admin/contexts/AdminContext.js`
    *   **`services/`**: API interaction logic.
        *   `api.js`: Axios client setup for general app APIs.
        *   `AuthApi.js`: Authentication related API calls.
    *   **`contexts/`**: React Context API providers (e.g., `AuthContext.js`, `LoaderContext.js`, `AdminContext.js`).
    *   **`constants/`**: Application-wide constants (e.g., `routes.js`, `theme.js`).
    *   `App.js`: Main application component, handles routing.
    *   `index.js`: Entry point of the application.

## 2. Key Features Implemented/Modified

*   **Theming:**
    *   Supports Light/Dark themes and Orange/Purple accent colors.
    *   Managed via CSS variables in `src/assets/styles/theme.css` and a `data-theme` attribute on the root app element.
    *   Dark theme primary background recently changed to `#0a0a0a` (near-black).
*   **Static Pages Refactoring:**
    *   Pages like `Support`, `PrivacyPolicy`, `TermsOfService` moved from `src/pages/` to `src/features/static/pages/`.
*   **"Who We Are" Pages Refactoring:**
    *   Components like `AboutUs`, `OurTeam`, `OurMission`, `OurValues` moved from `src/components/whoarewe/` to `src/features/company/pages/`.
*   **Layout Fixes:**
    *   Addressed `max-width` issues on several pages to ensure full-width display.
    *   Resolved theme inconsistencies (e.g., incorrect backgrounds/text colors in dark mode) for Careers page, Landing page sections (Hero, Services, FeaturedTechnology), and AuthModal.
*   **Admin Users Management (New Feature):**
    *   Added a new section in the admin dashboard to manage admin accounts.
    *   Includes functionality to create new admin users and view/manage existing ones (pause, delete).
*   **Authentication:**
    *   Fixed a "route not found" error for login by ensuring the API base URL correctly includes the `/api` prefix.
    *   Corrected theme prop propagation for the AuthModal when opened from different parts of the app.
*   **ESLint Issues:**
    *   Resolved various ESLint errors and warnings (unused variables/imports, missing `useEffect` dependencies, accessibility issues).
*   **File Cleanup:**
    *   Removed old, unused files from `src/pages/` and `src/components/whoarewe/` after refactoring.
*   **Environment-Specific Backend URLs:**
    *   Configured the app to use `http://localhost:5000` for backend API calls during local development (`npm start`) via `.env.development`.
    *   Configured the app to use `https://codeblaze-web-backend.onrender.com` for production builds via `.env.production`.
    *   Updated `src/services/api.js` to correctly construct the `API_BASE_URL` by appending `/api` to the root backend URL from the environment variable.
*   **Admin Dashboard Enhancements:**
    *   **Dashboard Home (`src/admin/pages/DashboardHome.js`):**
        *   Integrated real data from `GET /api/admin/dashboard` via `AdminContext`.
        *   Displays actual counts (users, jobs, etc.), recent applications, recent users.
        *   Application Status Doughnut chart uses live data.
        *   Removed placeholder charts for trends/categories not supplied by this endpoint.
    *   **Analytics Section (`src/admin/pages/analytics/`):**
        *   Created `UserAnalyticsPage.js`, `JobAnalyticsPage.js`, `ApplicationAnalyticsPage.js`.
        *   These pages fetch data from their respective `/api/admin/analytics/*` endpoints.
        *   Implemented chart visualizations (Line, Pie, Bar) using `react-chartjs-2`.
        *   Corrected data handling in analytics pages to properly display fetched data.
    *   **Admin Panel Loading:** Fixed an issue where the admin panel would show "Loading Admin Panel..." indefinitely by ensuring `isAdminChecking` state in `AdminContext` is correctly updated.
    *   **Sidebar Collapse:** Resolved issues with sidebar collapse on desktop, ensuring the main content area adjusts its margin correctly without page reloads.
    *   **Application Lists (`JobList.js`, `InternshipList.js`, `JobApplications.js`, `InternshipApplications.js`):**
        *   Added `TableSkeletonLoader` for better UX during initial data loading.
        *   Standardized the look and feel of `InternshipApplications.js` to match `JobApplications.js`.
    *   **Branding:** Updated admin sidebar logo text from "Job Seekers" to "CodeBlaze".
*   **Document Generators (New Feature - Admin Panel):**
    *   **Offer Letter Generator (`src/admin/pages/documents/OfferLetterGeneratorPage.js`):**
        *   UI with input fields (Recipient Name, Internship Role, Joining Date).
        *   Live HTML preview of the offer letter.
        *   Uses "CodeBlaze Technologies Pvt Ltd" and `codeblazelogoorange.png`.
        *   Placeholder for PDF generation.
    *   **Certificate Generator (`src/admin/pages/documents/CertificateGeneratorPage.js`):**
        *   UI with input fields (Recipient Name, Role, Joining/Leaving Date, Project).
        *   Auto-generates a Certificate ID.
        *   Live HTML preview of the certificate.
        *   Generates and displays a QR code for certificate verification (URL: `/internship-certificate-verification/:certificateId`).
        *   Uses "CodeBlaze Technologies Pvt Ltd" and `codeblazelogoorange.png`.
        *   Placeholder for PDF generation and backend storage of certificate data.
    *   **Routing & Sidebar:** Added routes and sidebar links for these new document generation tools under an "Documents" section.

## 3. Authentication Flow

*   **Components:** `AuthModal.js` (main modal), `AuthContent.js` (handles different auth states like login, register, OTP), `LoginForm.js`, `RegisterForm.js`, `OtpForm.js`, `ForgotPasswordForm.js`, `ResetPasswordForm.js`.
*   **Context:** `AuthContext.js` manages auth state, user data, and provides auth functions (login, register, logout, etc.).
*   **API Service:** `src/services/AuthApi.js` centralizes calls to authentication backend endpoints.
*   **Key API Endpoints (from frontend perspective, relative to `API_BASE_URL`):**
    *   `POST /auth/register`
    *   `POST /auth/verify-otp`
    *   `POST /auth/resend-otp`
    *   `POST /auth/login`
    *   `GET /auth/logout` (Note: `AuthApi.js` uses GET, but POST might be more conventional for logout if it invalidates a server-side session)
    *   `POST /auth/forgot-password`
    *   `PUT /auth/reset-password/:token`
    *   `GET /auth/validate-token` (Used to check if existing token is valid)

## 4. Admin Panel Structure & APIs

*   **Main Layout:** `src/admin/components/layout/AdminLayout.js`, `src/admin/components/layout/Sidebar.js`.
*   **Key Sections:** Dashboard, Jobs, Internships, Applications, Settings, and the newly added Users section.
*   **Admin API Utility:** `src/admin/utils/api.js` uses a generic `apiRequest` function.
    *   `API_BASE_URL` for admin APIs is `process.env.REACT_APP_BACKEND_URL`.
    *   Endpoints are then prefixed with `/api/admin/...` (e.g., `/api/admin/dashboard`).

*   **New Admin Users Management Feature:**
    *   **Page:** `src/admin/pages/users/AdminUsersPage.js`
    *   **Components:**
        *   `src/admin/components/users/CreateAdminUserForm.js`
        *   `src/admin/components/users/AdminUsersTable.js`
    *   **Assumed Backend API Endpoints for Admin Users (relative to `API_BASE_URL` from `admin/utils/api.js`):**
        *   `GET /api/admin/admin-users`: Fetch all admin accounts.
        *   `POST /api/admin/admin-users`: Create a new admin account.
            *   Expected Payload: `{ name: string, email: string, password: string, role: ('admin'|'superadmin') }`
            *   Expected Response (on success): `{ _id: string, name: string, email: string, role: string, status: string, ... }`
        *   `PUT /api/admin/admin-users/:id`: Update an admin account.
            *   Expected Payload: `{ status?: ('active'|'paused'), role?: string, name?: string, email?: string }` (password update might be separate)
        *   `DELETE /api/admin/admin-users/:id`: Delete an admin account.
    *   **Data Model for an Admin User (from frontend perspective):**
        *   `_id` or `id` (string)
        *   `name` (string)
        *   `email` (string)
        *   `role` (string, e.g., "admin", "superadmin")
        *   `status` (string, e.g., "active", "paused")

*   **Other Admin API Endpoints (from `src/admin/utils/api.js`, relative to `API_BASE_URL`):**
    *   `/api/admin/dashboard`
    *   `/api/admin/users` (for regular platform users)
    *   `/api/admin/users/:id`
    *   `/api/admin/jobs`, `/api/admin/jobs/create`, `/api/admin/jobs/:id`, `/api/admin/jobs/:id/feature`
    *   `/api/admin/internships`, `/api/admin/internships/create`, `/api/admin/internships/:id`, `/api/admin/internships/:id/feature`
    *   `/api/admin/job-applications`
    *   `/api/admin/internship-applications`
    *   `/api/admin/applications/:id/status`
    *   `/api/admin/analytics/users`, `/api/admin/analytics/jobs`, `/api/admin/analytics/applications`
    *   `/api/admin/settings`
    *   **Document Generation (Assumed Backend Needs):**
        *   `POST /api/admin/documents/offer-letter/generate` (or similar for saving/generating)
            *   Payload: `{ recipientName, internshipRole, joiningDate, ...otherDetails }`
        *   `POST /api/admin/documents/certificate/generate` (or similar for saving/generating)
            *   Payload: `{ recipientName, internshipRole, joiningDate, leavingDate, projectWorkedOn, certificateId, ...otherDetails }`
        *   `GET /api/public/certificate/:certificateId` (for public verification page)

## 5. Internship Application Flow

*   **Trigger Component:** `src/components/Internships/ApplyButton.js` (used within `InternshipDetailPage.js`).
*   **API Endpoint (from `src/services/AuthApi.js` via `ApplyButton.js`'s direct fetch, needs review for consistency):** `POST /api/applications` (Note: `ApplyButton.js` uses `fetch` directly, not `apiClient` from `src/services/api.js`. This might be an area for refactoring to use the central `apiClient`).
*   **Expected Payload (FormData):**
    *   `position_id` (string)
    *   `position_type` (string, e.g., "internship")
    *   `applicationType` (string, e.g., "job" - this seems potentially confusing if it's for an internship, might need clarification)
    *   `cover_letter` (string)
    *   `resume` (File object)
    *   `answers` (array of objects, where each object is `{ question: string, answer: string }`).
        *   Currently includes: "Full Name", "Email", "Phone Number", "Relevant Experience" (optional).

## 6. General API Client Configuration

*   **Main App API Client (`src/services/api.js`):**
    *   `API_BASE_URL`: Constructed as `(process.env.REACT_APP_BACKEND_URL || "https://codeblaze-web-backend.onrender.com") + "/api"`.
    *   Example: `https://codeblaze-web-backend.onrender.com/api`
    *   All requests through this client are prefixed with this base URL.
*   **Admin API Utility (`src/admin/utils/api.js`):**
    *   `API_BASE_URL`: Directly uses `process.env.REACT_APP_BACKEND_URL`.
    *   Endpoints are then constructed like `${API_BASE_URL}/api/admin/...`.
    *   This means if `REACT_APP_BACKEND_URL` is `https://codeblaze-web-backend.onrender.com`, admin calls go to `https://codeblaze-web-backend.onrender.com/api/admin/...`.
*   **Authorization:** Bearer token is retrieved from `localStorage` or `Cookies` and added to the `Authorization` header for requests made via `apiClient` (both general and admin, assuming admin API calls also go through a similar interceptor if `apiRequest` uses `apiClient` or a similar setup).

## 7. Styling and Theming

*   **CSS Variables:** Defined in `src/assets/styles/theme.css`.
    *   `--bg-primary`, `--bg-secondary`, `--text-primary`, `--text-secondary` for light and dark themes.
    *   `--primary-500` (orange accent), and purple accent colors are also defined.
    *   Dark theme `--bg-primary` is `#0a0a0a`.
*   **Theme Switching:** Controlled by a `data-theme` attribute (e.g., `data-theme="dark"`) on the root app element.
*   **Styling Methods:**
    *   Global CSS (`App.css`, `index.css`).
    *   Inline styles (used extensively in some components).
    *   `<style jsx>` (used in some components like `AuthModal.js`).
    *   Tailwind-like utility classes (e.g., `py-16`, `text-center`) are present in some components, suggesting Tailwind CSS might be set up or classes are manually defined to mimic it.

## 8. Key Data Structures (Frontend Perspective)

*   **Admin User (for new Admin Management feature):**
    *   `id` or `_id` (string)
    *   `name` (string)
    *   `email` (string)
    *   `role` (string: "admin" | "superadmin")
    *   `status` (string: "active" | "paused")
*   **Application (for Internship/Job):**
    *   `position_id` (string)
    *   `position_type` (string)
    *   `applicationType` (string)
    *   `cover_letter` (string)
    *   `resume` (File object)
    *   `answers`: Array of `{ question: string, answer: string }`
*   **Internship (example from `InternshipDetailPage.js`):**
    *   `id` (string)
    *   `title` (string)
    *   `company` (string)
    *   `location` (string)
    *   `workType` (string)
    *   `companyLogo` (string URL)
    *   `description` (string)
    *   `duration` (string)
    *   `applicationDeadline` (string date)
    *   `educationLevel` (string)
    *   `internshipFee`: `{ amount: number }`
    *   `responsibilities`: Array of strings
    *   `requirements`: Array of strings
    *   `benefits`: Array of strings
    *   `skills`: Array of strings
    *   `postedDate` (string date)
    *   `companyDescription` (string)
*   **Offer Letter Data (Frontend State in `OfferLetterGeneratorPage.js`):**
    *   `recipientName` (string)
    *   `internshipRole` (string)
    *   `joiningDate` (string date)
    *   `companyName` (string, default: "CodeBlaze Technologies Pvt Ltd")
    *   `companyAddressLine1`, `companyAddressLine2`, `companyContact`, `companyWebsite` (strings, placeholders)
    *   `senderName`, `senderTitle` (strings, placeholders)
*   **Certificate Data (Frontend State in `CertificateGeneratorPage.js`):**
    *   `recipientName` (string)
    *   `internshipRole` (string)
    *   `joiningDate` (string date)
    *   `leavingDate` (string date)
    *   `projectWorkedOn` (string)
    *   `certificateId` (string, auto-generated format: `CB-CERT-YYYY-#####`)
    *   `issuedDate` (string date, default: today)
    *   `verifierName`, `verifierTitle` (strings, placeholders)
    *   `qrCodeValue` (string URL for verification: `BASE_URL/internship-certificate-verification/:certificateId`)

This summary should provide a good starting point for understanding the frontend's expectations and structure for backend integration.
