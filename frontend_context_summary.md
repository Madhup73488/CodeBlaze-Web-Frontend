# Frontend Context Summary for CodeBlaze Web App

This document provides a summary of the frontend structure, key functionalities, API interactions, and data models as implemented or modified during recent development efforts.

## 1. Overall Project Structure

The project is a React application, likely bootstrapped with Create React App. Key directories include:

*   **`public/`**: Static assets and `index.html`.
*   **`src/`**: Main source code.
    *   **`assets/`**: Images, global styles (like `theme.css`).
    *   **`components/`**: Reusable UI components, categorized by feature (e.g., `landing`, `Auth`, `common`, `Internships`, `admin/components`).
    *   **`pages/`**: Top-level page components that are mapped to routes (e.g., `Landing.js`, `Careers.js`, `CertificateVerificationPage.js`).
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

*   **Navbar Branding Update:**
    *   The animated orange rectangle in the Navbar (`src/components/common/Navbar.js`) before the "CodeBlaze" text has been replaced with the static logo image `src/assets/images/codeblazelogoorange.png`.
*   **Hero Section Cleanup:**
    *   A previously (and mistakenly) added logo in the `src/components/landing/Hero.js` component has been removed.
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
*   **Document Generators (Admin Panel):**
    *   **Offer Letter & Certificate Generation (`src/admin/pages/documents/`):**
        *   Implemented client-side PDF generation using `jspdf` and `html2canvas`.
        *   Data is first saved to the backend via API calls (`/api/admin/documents/offer-letter/generate`, `/api/admin/documents/certificate/generate`).
        *   Uses an iframe isolation technique to render HTML content for `html2canvas`, ensuring accurate capture and mitigating issues with external styles (like `oklch()` color errors) and content being cut off.
        *   `html2canvas` options (`width`, `height`, `windowWidth`, `windowHeight`) are set to the `scrollWidth` and `scrollHeight` of the content within the iframe to capture the entire document.
        *   QR code for certificates is rendered into the iframe before capture.
    *   **Certificate ID Uniqueness:** Added a "New ID" button in the Certificate Generator and improved error handling for duplicate IDs.
    *   **Error Reporting:** Enhanced alert messages for PDF generation failures to be more informative.
*   **Certificate Verification Page:**
    *   Created a public page (`src/pages/CertificateVerificationPage.js`) accessible via `/internship-certificate-verification/:certificateId`.
    *   This page fetches certificate details from `GET /api/public/certificate/:certificateId` and displays them for verification.

## 3. Authentication Flow

*   **Components:** `AuthModal.js` (main modal), `AuthContent.js` (handles different auth states like login, register, OTP), `LoginForm.js`, `RegisterForm.js`, `OtpForm.js`, `ForgotPasswordForm.js`, `ResetPasswordForm.js`.
*   **Context:** `AuthContext.js` manages auth state, user data, and provides auth functions (login, register, logout, etc.).
*   **API Service:** `src/services/AuthApi.js` centralizes calls to authentication backend endpoints.
*   **Key API Endpoints (from frontend perspective, relative to `API_BASE_URL`):**
    *   `POST /auth/register`
    *   `POST /auth/verify-otp`
    *   `POST /auth/resend-otp`
    *   `POST /auth/login`
    *   `GET /auth/logout`
    *   `POST /auth/forgot-password`
    *   `PUT /auth/reset-password/:token`
    *   `GET /auth/validate-token`

## 4. Admin Panel Structure & APIs

*   **Main Layout:** `src/admin/components/layout/AdminLayout.js`, `src/admin/components/layout/Sidebar.js`.
*   **Key Sections:** Dashboard, Jobs, Internships, Applications, Settings, Users, Documents, Analytics.
*   **Admin API Utility (`src/admin/utils/api.js`):**
    *   `API_BASE_URL`: `process.env.REACT_APP_BACKEND_URL`.
    *   Endpoints are prefixed with `/api/admin/...`.
    *   Added `generateOfferLetter`, `generateCertificate`, and `verifyCertificatePublic` API utility functions.

*   **Admin Users Management:**
    *   Page: `src/admin/pages/users/AdminUsersPage.js`
    *   Components: `CreateAdminUserForm.js`, `AdminUsersTable.js`
    *   Backend API Endpoints: `GET /api/admin/admin-users`, `POST /api/admin/admin-users`, `PUT /api/admin/admin-users/:id`, `DELETE /api/admin/admin-users/:id`.

*   **Other Admin API Endpoints (from `src/admin/utils/api.js`, relative to `API_BASE_URL`):**
    *   `/api/admin/dashboard`
    *   `/api/admin/users`, `/api/admin/users/:id`
    *   `/api/admin/jobs`, `/api/admin/jobs/create`, `/api/admin/jobs/:id`, `/api/admin/jobs/:id/feature`
    *   `/api/admin/internships`, `/api/admin/internships/create`, `/api/admin/internships/:id`, `/api/admin/internships/:id/feature`
    *   `/api/admin/job-applications`, `/api/admin/internship-applications`
    *   `/api/admin/applications/:id/status`
    *   `/api/admin/analytics/users`, `/api/admin/analytics/jobs`, `/api/admin/analytics/applications`
    *   `/api/admin/settings`
    *   **Document Generation & Verification:**
        *   `POST /api/admin/documents/offer-letter/generate`
        *   `POST /api/admin/documents/certificate/generate`
        *   `GET /api/public/certificate/:certificateId` (Note: `verifyCertificatePublic` in `adminApi.js` uses the admin base URL; this might need adjustment if the public API has a different base or no `/api/admin` prefix).

## 5. Internship Application Flow

*   **Trigger Component:** `src/components/Internships/ApplyButton.js`.
*   **API Endpoint:** `POST /api/applications`.
*   **Payload (FormData):** `position_id`, `position_type`, `applicationType`, `cover_letter`, `resume`, `answers`.

## 6. General API Client Configuration

*   **Main App API Client (`src/services/api.js`):** `API_BASE_URL` includes `/api`.
*   **Admin API Utility (`src/admin/utils/api.js`):** `API_BASE_URL` is root, endpoints add `/api/admin/...`.
*   **Authorization:** Bearer token from `localStorage`.

## 7. Styling and Theming

*   **CSS Variables:** `src/assets/styles/theme.css`.
*   **Theme Switching:** `data-theme` attribute.
*   **Styling Methods:** Global CSS, Inline styles, `<style jsx>`, Tailwind-like utilities.
*   **Navbar Logo:** Uses `src/assets/images/codeblazelogoorange.png`.

## 8. Key Data Structures (Frontend Perspective)

*   **Admin User:** `id` or `_id`, `name`, `email`, `role`, `status`.
*   **Application:** `position_id`, `position_type`, `applicationType`, `cover_letter`, `resume`, `answers`.
*   **Internship:** `id`, `title`, `company`, `location`, `workType`, `description`, etc.
*   **Offer Letter Data (Frontend State):** `recipientName`, `internshipRole`, `joiningDate`, `companyName`, etc.
*   **Certificate Data (Frontend State):** `recipientName`, `internshipRole`, `joiningDate`, `leavingDate`, `projectWorkedOn`, `certificateId`, `issuedDate`, `qrCodeValue`.

This summary should provide a good starting point for understanding the frontend's expectations and structure for backend integration.
