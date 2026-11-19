# MERN Practical Assignments

This repository contains two completely separate practical assignments:

---

## Project 1: CRUD Operations on Array of Items
A product management web application implementing full Create, Read, Update, and Delete operations on an in-memory array using Node.js, Express REST API, HTML5, CSS3, and vanilla JavaScript `fetch()`.

### Folder Structure
```text
CRUD/
├── server.js      # Express REST API backend & static file server
├── index.html     # Product form and table UI
├── style.css      # Clean styling for table and forms
├── script.js      # Frontend fetch() logic for CRUD actions
└── package.json   # Backend dependencies and run script
```

### How to Run Project 1 in VS Code
1. Open a terminal in VS Code (`Ctrl + \``).
2. Navigate to the `CRUD` folder:
   ```bash
   cd CRUD
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Open your browser and visit:
   ```text
   http://localhost:3000
   ```

---

## Project 2: Sign Up and Login Process
A user authentication web application using **React without JSX** (`React.createElement`), Express REST API, MongoDB, and password hashing with `bcryptjs`.

### Folder Structure
```text
Signup/
├── client/
│   ├── index.html      # HTML entry point with React 18 CDN
│   └── src/
│       ├── App.js      # Main component (React.createElement, NO JSX)
│       ├── Signup.js   # Registration component (NO JSX)
│       ├── Login.js    # Login component (NO JSX)
│       └── style.css   # Modern auth card styling
└── server/
    ├── server.js       # Express server and MongoDB connection
    ├── User.js         # Mongoose User schema and model
    ├── auth.js         # REST API routes (/register and /login)
    └── package.json    # Backend dependencies and run script
```

### How to Run Project 2 in VS Code

#### Step 1: Start the Backend Server
1. Open a terminal in VS Code (`Ctrl + \``).
2. Navigate to the `Signup/server` folder:
   ```bash
   cd Signup/server
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Ensure MongoDB is running on your machine (default: `mongodb://127.0.0.1:27017`).
5. Start the server:
   ```bash
   npm start
   ```
   *(Server starts at `http://localhost:5000`)*

#### Step 2: Open the Frontend Client
You have two easy options:
- **Option A (Direct via Backend):** Since Express serves the client static files, simply navigate to `http://localhost:5000` in your browser.
- **Option B (VS Code Live Server):** Right-click `Signup/client/index.html` in VS Code and select **"Open with Live Server"**.
