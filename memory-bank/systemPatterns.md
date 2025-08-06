# System Patterns

## Frontend Architecture

The frontend is structured as a Single Page Application (SPA), built with React, featuring a sophisticated component-based architecture with advanced navigation and state management patterns.

### **Key Architectural Decisions:**

#### **Component-Based Structure**: 
The application heavily utilizes a component-based architecture, with components organized by feature or domain:
- `src/components/Auth` - Authentication components
- `src/components/careers` - Career-related functionality
- `src/components/Internships` - Internship portal components
- `src/components/landing` - Landing page sections
- `src/components/common` - Reusable UI components
- `src/components/profile` - User profile management

#### **Advanced Navigation System**:
- **Section-Based Navigation**: `src/components/common/Sidebar.js` implements sophisticated scroll detection and section-based navigation
- **Real-Time Scroll Detection**: Uses `useEffect` with scroll event listeners to detect active sections
- **Smooth Scrolling**: Implements `scrollIntoView({ behavior: "smooth" })` for seamless user experience
- **Cross-Page Navigation**: Handles navigation from any page with automatic home page routing
- **Mobile Optimization**: Responsive behavior with auto-close functionality for mobile devices
- **Active State Management**: Visual feedback system with blue highlighting and border indicators

#### **State Management Architecture**:
- **Context API for Global State**: React's Context API handles global state management:
  - `src/contexts/AuthContext.js` - Authentication state
  - `src/contexts/LoaderContext.js` - Loading states
  - `src/contexts/WorkBagContext.js` - User's work bag across the application
  - `src/contexts/SidebarContext.js` - Sidebar state management
- **Local State for UI Components**: Component-level state for UI interactions and form handling

#### **Service Layer for API Interaction**:
- **Centralized API Client**: `src/services/api.js` defines a centralized Axios instance (`apiClient`)
- **Base URL Configuration**: Handles environment-specific API endpoints
- **Request Interceptors**: Automatic auth token injection and common error handling (`handleApiError`)
- **Specialized Services**: 
  - `src/services/AuthApi.js` - Authentication-specific API calls
  - `src/services/userService.js` - User management operations
- **Admin API Integration**: `src/admin/utils/api.js` uses the centralized `apiClient` for consistency
- **Updated Endpoints**: Aligned with backend refactoring (OTP flow, consolidated `/api/admin/...` routes)

#### **Routing Architecture**:
- **Centralized Route Configuration**: `src/constants/routes.js` manages route definitions
- **Protected Routes**: Admin route guards with role-based access control
- **Dynamic Navigation**: Section-based routing for landing page with hash-based navigation support

#### **Admin Panel Separation**:
- **Dedicated Admin Architecture**: `src/admin/` directory with complete separation:
  - `src/admin/components/` - Admin-specific UI components
  - `src/admin/contexts/` - Admin state management
  - `src/admin/hooks/` - Custom hooks for admin functionality
  - `src/admin/pages/` - Admin page components
  - `src/admin/utils/` - Admin utility functions
- **Dual User Management**: Handles both admin account creation and regular user management
- **Consistent Design System**: Modern, cohesive UI across all admin interfaces

#### **Common UI Components**:
- **Reusable Component Library**: `src/components/common/` and `src/admin/components/common/`
- **Design System Integration**: Consistent styling and behavior patterns
- **Responsive Design**: Mobile-first approach with breakpoint-specific optimizations

#### **Utility and Validation Systems**:
- **Input Validation**: `src/admin/utils/validation.js` for form validation logic
- **API Utilities**: Centralized API interaction patterns
- **Error Handling**: Consistent error management across the application

#### **Styling Architecture**:
- **Structured Styling**: `src/assets/styles/` with organized CSS architecture
- **Component-Specific Styles**: Co-located CSS files for component isolation
- **Design System**: Consistent color palette, typography, and spacing patterns

### **Component Relationships (High-Level):**

#### **Application Entry Point**:
- `App.js` serves as the main entry point with routing and context providers
- Handles authentication state and admin route protection

#### **Page Composition**:
- **Landing Pages**: `src/pages/Landing.js` composes multiple landing sections
- **Admin Pages**: `src/admin/pages/` compose admin-specific functionality
- **Feature Pages**: Specialized pages for jobs, internships, profiles, etc.

#### **Navigation Flow**:
- **Sidebar Component**: Central navigation hub with section detection
- **Landing Sections**: Individual components with proper ID attribution for navigation
- **Cross-Page Integration**: Seamless navigation between different application areas

### **Critical Implementation Paths:**

#### **Authentication Flow**:
- **Components**: `AuthContext`, `AuthApi`, and `src/components/Auth` components
- **OAuth Integration**: Google authentication with popup-based flow
- **Session Management**: Token-based authentication with automatic refresh

#### **Navigation System**:
- **Scroll Detection**: Real-time section tracking with performance optimization
- **State Management**: Active section state with visual feedback
- **Mobile Responsiveness**: Touch-friendly navigation with auto-close behavior

#### **Job/Internship Application Flow**:
- **Portal Components**: `src/components/Internships`, `src/components/JobSeekers`
- **Career Integration**: `src/components/careers` for application processes
- **Work Bag System**: Shopping cart-like functionality for course/program selection
- **Enrollment Flow**: `EnrollNowModal` for user detail collection and payment processing

#### **Admin Data Management**:
- **Admin Components**: `src/admin/components` and `src/admin/hooks`
- **API Integration**: Specialized admin API endpoints
- **User Management**: Dual-mode user administration (admin and regular users)
- **Analytics Integration**: Dashboard and reporting functionality

### **Performance Patterns**:

#### **Scroll Optimization**:
- **Event Cleanup**: Proper scroll event listener cleanup to prevent memory leaks
- **Throttling**: Optimized scroll detection with appropriate offset calculations
- **Conditional Rendering**: Mobile/desktop specific rendering for performance

#### **State Management Efficiency**:
- **Context Optimization**: Minimal re-renders through strategic context separation
- **Local State Preference**: Component-level state for UI-specific interactions
- **Memoization**: Strategic use of React.memo and useMemo for expensive operations

#### **Image and Asset Optimization**:
- **Lazy Loading**: Implemented for hero images and large assets
- **Responsive Images**: Proper sizing and object positioning for different devices
- **Asset Management**: Organized asset structure with optimized delivery
