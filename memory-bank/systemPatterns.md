# System Patterns

## Frontend Architecture

The frontend is structured as a Single Page Application (SPA), likely built with React, given the file structure (e.g., `src/App.js`, `src/components/`).

**Key Architectural Decisions:**
- **Component-Based Structure**: The application heavily utilizes a component-based architecture, with components organized by feature or domain (e.g., `src/components/Auth`, `src/components/careers`, `src/components/Internships`, `src/components/profile`).
- **Context API for State Management**: The presence of `src/contexts/AuthContext.js` and `src/contexts/LoaderContext.js` suggests the use of React's Context API for global state management, handling authentication status and loading states across the application.
- **Service Layer for API Interaction**: `src/services/api.js`, `src/services/AuthApi.js`, and `src/services/userService.js` indicate a dedicated service layer for interacting with backend APIs, promoting separation of concerns.
- **Routing**: The `src/constants/routes.js` file implies a centralized routing configuration, likely using a library like React Router.
- **Admin Panel Separation**: A distinct `src/admin/` directory with its own components, contexts, hooks, and pages suggests a clear separation of the administrative interface from the public-facing application. This promotes modularity and easier management of admin-specific functionalities.
- **Common UI Components**: The `src/components/common/` and `src/admin/components/common/` directories house reusable UI components, ensuring consistency and reducing redundancy.
- **Utility Functions**: `src/admin/utils/api.js` and `src/admin/utils/validation.js` indicate the presence of utility functions for common tasks like API calls and input validation.
- **Styling**: `src/assets/styles/` suggests a structured approach to styling, potentially using global CSS, CSS modules, or a CSS-in-JS solution.

**Component Relationships (High-Level):**
- `App.js` serves as the main entry point, likely responsible for routing and context providers.
- Pages (`src/pages/`, `src/admin/pages/`) compose various components to form complete views.
- Components within `src/components/` are specialized for specific features (e.g., `LoginForm`, `JobCard`).
- Admin components (`src/admin/components/`) are tailored for administrative tasks.

**Critical Implementation Paths:**
- **Authentication Flow**: Involves `AuthContext`, `AuthApi`, and components within `src/components/Auth`.
- **Job/Internship Application Flow**: Involves components from `src/components/Internships`, `src/components/JobSeekers`, and potentially `src/components/careers`, interacting with relevant services.
- **Admin Data Management**: Involves components and hooks from `src/admin/`, interacting with admin-specific APIs.
