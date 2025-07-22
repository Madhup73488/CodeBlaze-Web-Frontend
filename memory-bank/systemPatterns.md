# System Patterns

## Frontend Architecture

The frontend is structured as a Single Page Application (SPA), likely built with React, given the file structure (e.g., `src/App.js`, `src/components/`).

**Key Architectural Decisions:**
- **Component-Based Structure**: The application heavily utilizes a component-based architecture, with components organized by feature or domain (e.g., `src/components/Auth`, `src/components/careers`, `src/components/Internships`, `src/components/profile`).
- **Context API for State Management**: The presence of `src/contexts/AuthContext.js`, `src/contexts/LoaderContext.js`, and `src/contexts/WorkBagContext.js` suggests the use of React's Context API for global state management, handling authentication, loading states, and the user's work bag across the application.
- **Service Layer for API Interaction**:
    - A centralized Axios instance (`apiClient`) is defined in `src/services/api.js`. This client handles base URL configuration, request interceptors (e.g., for adding auth tokens), and provides a common error handler (`handleApiError`).
    - `src/services/AuthApi.js` and `src/services/userService.js` utilize this `apiClient` for their respective API calls, ensuring consistent API interaction patterns for the main application.
    - The admin panel's API utility, `src/admin/utils/api.js`, has been refactored to also use the centralized `apiClient` from `src/services/api.js`. This standardizes API calls across the entire application (main app and admin panel).
    - API endpoints have been updated to align with backend refactoring (e.g., OTP flow for registration, `POST` for logout, consolidated `/api/admin/...` routes).
- **Routing**: The `src/constants/routes.js` file implies a centralized routing configuration, likely using a library like React Router.
- **Admin Panel Separation**: A distinct `src/admin/` directory with its own components, contexts, hooks, and pages suggests a clear separation of the administrative interface from the public-facing application.
    - The admin user management page (`src/admin/pages/users/AdminUsersPage.js`) now handles both admin account creation/management and regular application user management (via a new `RegularUsersTable.js` component).
- **Common UI Components**: The `src/components/common/` and `src/admin/components/common/` directories house reusable UI components, ensuring consistency and reducing redundancy.
- **Utility Functions**: `src/admin/utils/validation.js` indicates the presence of utility functions for common tasks like input validation. API call utilities are now centralized.
- **Styling**: `src/assets/styles/` suggests a structured approach to styling, potentially using global CSS, CSS modules, or a CSS-in-JS solution.

**Component Relationships (High-Level):**
- `App.js` serves as the main entry point, likely responsible for routing and context providers.
- Pages (`src/pages/`, `src/admin/pages/`) compose various components to form complete views.
- Components within `src/components/` are specialized for specific features (e.g., `LoginForm`, `JobCard`).
- Admin components (`src/admin/components/`) are tailored for administrative tasks.

**Critical Implementation Paths:**
- **Authentication Flow**: Involves `AuthContext`, `AuthApi`, and components within `src/components/Auth`.
- **Job/Internship Application Flow**: Involves components from `src/components/Internships`, `src/components/JobSeekers`, and potentially `src/components/careers`, interacting with relevant services. The checkout process now includes an `EnrollNowModal` to collect user details before proceeding to payment.
- **Admin Data Management**: Involves components and hooks from `src/admin/`, interacting with admin-specific APIs.
