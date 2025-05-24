# Tech Context

## Technologies Used

- **Frontend Framework**: React (inferred from `package.json`, `src/App.js`, and component structure).
- **Language**: JavaScript (primarily, with potential for JSX/TSX).
- **Styling**: CSS (indicated by `.css` files in `src/assets/styles/` and component-specific CSS like `src/components/common/Navbar.css`).
- **Package Manager**: npm or Yarn (indicated by `package.json` and `package-lock.json`).
- **Routing**: Likely React Router (inferred from `src/constants/routes.js`).
- **API Communication**: Standard Fetch API or a library like Axios (inferred from `src/services/api.js`).

## Development Setup

- **Project Structure**: Standard Create React App-like structure with `public/` for static assets and `src/` for source code.
- **Environment Variables**: Uses `.env` files for environment-specific configurations (`.env.development`, `.env.production`, `.env.example`).
- **Build Process**: Standard React build process (e.g., `react-scripts build`).
- **Testing**: Jest/React Testing Library (inferred from `src/setupTests.js` and `src/App.test.js`).

## Dependencies

Dependencies are managed via `package.json` and `package-lock.json`. Key dependencies would include `react`, `react-dom`, `react-scripts`, and potentially routing and state management libraries.

## Tool Usage Patterns

- **Code Editing**: VSCode is the primary editor (indicated by `environment_details`).
- **Version Control**: Git (indicated by `.gitignore`).
- **CLI Commands**: Standard npm/yarn commands for running, building, and testing the application.
