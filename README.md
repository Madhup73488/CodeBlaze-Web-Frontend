# CodeBlaze Web Frontend

Welcome to the official frontend repository of **CodeBlaze** — your one-stop destination for cutting-edge software solutions and IT services. This repository hosts the comprehensive web frontend application designed to provide a seamless experience for job/internship seekers, career development, and administrative management.

## 🚀 About CodeBlaze

CodeBlaze is a software solutions provider offering a wide range of tech services. This platform serves as a centralized hub for career development and talent management, addressing key challenges for both aspiring professionals and organizations.

**Our Mission:** To empower individuals with the resources and opportunities needed for career growth, while providing businesses with tools for efficient talent acquisition and management.

## ✨ Key Features

- **User Authentication**: Secure registration, login, and password management.
- **Job & Internship Portal**: Browse, search, and apply for various job and internship opportunities.
- **Personalized User Profiles**: Manage education, experience, skills, and upload relevant documents (e.g., resumes).
- **Career Resources**: Access valuable content like resume writing tips, interview preparation guides, and mentorship programs.
- **Administrative Panel**: A dedicated interface for administrators to manage users, job/internship listings, applications, and view comprehensive analytics (user, job, application analytics).
- **Company & Static Pages**: Information about CodeBlaze, services, and other static content.

## 🛠️ Technologies Used

This project is built with modern web technologies to ensure a robust, scalable, and maintainable application:

- **Frontend Framework**: React.js
- **Language**: JavaScript (ES6+)
- **Styling**: HTML5, CSS3 (with structured CSS in `src/assets/styles/` and component-specific styles)
- **Package Manager**: npm
- **Routing**: React Router (inferred)
- **API Communication**: Standard Fetch API / Axios (inferred)
- **Version Control**: Git & GitHub

## 📂 Project Structure

The project follows a component-based architecture, organized for clarity and modularity:

```
.
├── public/                 # Static assets (index.html, manifest, favicons)
├── src/                    # Main application source code
│   ├── admin/              # Admin panel specific components, pages, contexts, hooks, utils
│   │   ├── components/     # Reusable UI components for admin
│   │   ├── contexts/       # Admin-specific React Contexts
│   │   ├── hooks/          # Custom React Hooks for admin
│   │   ├── pages/          # Admin dashboard pages (users, analytics, applications)
│   │   └── utils/          # Admin utility functions (API, validation)
│   ├── assets/             # Static assets like images and global styles
│   │   ├── images/
│   │   └── styles/         # Global CSS styles (animations, base, theme)
│   ├── components/         # Reusable UI components for the main application
│   │   ├── Auth/           # Authentication related components (login, register, forgot password)
│   │   ├── careers/        # Career page components (job application form, listings)
│   │   ├── common/         # General reusable components (Footer, Navbar, Loader)
│   │   ├── ForStudents/    # Components for student-focused features (internships, mentorship)
│   │   ├── Internships/    # Internship portal components (cards, filters, detail page)
│   │   ├── JobSeekers/     # Job seeker portal components (job cards, filters)
│   │   ├── landing/        # Landing page sections
│   │   ├── profile/        # User profile management components
│   │   └── Resources/      # Career resources components
│   ├── constants/          # Application-wide constants (routes, theme)
│   ├── contexts/           # Global React Contexts (AuthContext, LoaderContext)
│   ├── features/           # Feature-specific modules (e.g., company, static pages)
│   ├── pages/              # Main application pages (Landing, Careers, NotFound)
│   ├── services/           # API service integrations
│   ├── utils/              # General utility functions
│   ├── App.js              # Main application component, handles routing
│   ├── index.js            # Entry point for React application
│   └── ...                 # Other root-level source files (App.css, index.css, tests)
├── .env*                   # Environment configuration files
├── package.json            # Project metadata and dependencies
├── package-lock.json       # Exact dependency versions
├── README.md               # Project documentation
└── memory-bank/            # Internal documentation and context for Cline
```

## 💻 Getting Started

Follow these steps to get the CodeBlaze Web Frontend up and running on your local machine.

### Prerequisites

Ensure you have the following installed:

- Node.js (LTS version recommended)
- npm (Node Package Manager, usually comes with Node.js)
- Git

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Madhup73488/CodeBlaze-Web-Frontend.git
    ```
2.  **Navigate into the project directory:**
    ```bash
    cd CodeBlaze-Web-Frontend
    ```
3.  **Install all dependencies:**
    This project uses `npm` for package management. Run the following single command to install all required dependencies:
    ```bash
    npm install
    ```

### Running the Application

After installing dependencies, you can start the development server:

```bash
npm start
```

This command runs the app in development mode. Open your browser and visit [http://localhost:3000](http://localhost:3000) to see it live. The page will reload if you make edits. You will also see any lint errors in the console.

## 📦 Build

To build the app for production:

```bash
npm run build
```

This command builds the app for production to the `build/` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed!

## 🤝 Contributing

Pull requests and suggestions are welcome! For major changes, please open an issue first to discuss what you would like to change.

Feel free to fork the repo and submit your ideas.

## 📬 Contact Us

- 📧 Email: codeblazee@gmail.com
- 🌐 Website: [https://codeblaze.net](https://codeblaze.net) _(Coming Soon)_
- 💼 LinkedIn: [CodeBlaze](https://www.linkedin.com/company/codeblazee)

## 📄 License

This project is licensed under the MIT License.
