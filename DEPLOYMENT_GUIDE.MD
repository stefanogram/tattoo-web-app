
# Tattoo Studio - Local Development (macOS) & Cloudflare Pages Deployment Guide

This document provides a comprehensive guide for setting up the Tattoo Studio web application locally on a macOS machine and deploying it to Cloudflare Pages using GitHub.

**Project Directory Path for Local Setup:**
Throughout the local setup guide, we will assume the project files are located at:
`/Applications/XAMPP/xamppfiles/htdocs/tattoo`
Please adjust commands if your actual path differs, though this guide is tailored for this specific path.

## Table of Contents
1.  [Tech Stack Overview](#1-tech-stack-overview)
2.  [Local Development Guide (macOS)](#2-local-development-guide-macos)
    *   [2.1 Prerequisites for macOS](#21-prerequisites-for-macos)
    *   [2.2 Local Setup Steps](#22-local-setup-steps)
    *   [2.3 Data Persistence (Local Development)](#23-data-persistence-local-development)
    *   [2.4 Note on XAMPP and MySQL](#24-note-on-xampp-and-mysql)
3.  [Deployment to Cloudflare Pages via GitHub](#3-deployment-to-cloudflare-pages-via-github)
    *   [3.1 Prerequisites for Deployment](#31-prerequisites-for-deployment)
    *   [3.2 Pushing Project to GitHub](#32-pushing-project-to-github)
        *   [3.2.1 Initial Push to GitHub](#321-initial-push-to-github)
        *   [3.2.2 Pushing Subsequent Changes](#322-pushing-subsequent-changes)
    *   [3.3 Setting up Cloudflare Pages](#33-setting-up-cloudflare-pages)
    *   [3.4 Configuring Environment Variables on Cloudflare](#34-configuring-environment-variables-on-cloudflare)
    *   [3.5 Setting up KV Namespace Binding on Cloudflare](#35-setting-up-kv-namespace-binding-on-cloudflare)
    *   [3.6 Build and Deploy](#36-build-and-deploy)

## 1. Tech Stack Overview

*   **Framework**: Next.js 15 (App Router)
*   **UI Library**: React 18
*   **Styling**: Tailwind CSS
*   **Components**: ShadCN UI
*   **Data Persistence (Deployed)**: Cloudflare KV
*   **Data Persistence (Local)**: In-memory (data lost on server restart)
*   **Hosting**: Cloudflare Pages (via GitHub)

## 2. Local Development Guide (macOS)

This section details setting up the project on your local macOS machine using any path
in your machine. 

### 2.1 Prerequisites for macOS

*   **Node.js**: Version 18.x or later.
    *   Install via Homebrew: `brew install node`
    *   Verify: `node -v` and `npm -v`.
*   **npm**: Included with Node.js. (If you prefer Yarn and have it installed: `brew install yarn`)
*   **Git**:
    *   Install via Homebrew: `brew install git`
    *   Verify: `git --version`.
*   **XAMPP (Optional for MySQL)**: Provides a local MySQL server if you plan to integrate a database later. The project files can reside in `htdocs` for organization.
    *   Download from [Apache Friends](https://www.apachefriends.org/index.html).

### 2.2 Local Setup Steps (Using XAMPP)

1.  **Place Project Files**:
    *   Ensure you have the project's source code files in: `/Applications/XAMPP/xamppfiles/htdocs/tattoo`.
    *   If the `tattoo` directory doesn't exist, create it and place the project files inside.

2.  **Navigate to Project Directory**:
    *   Open Terminal and run:
        ```bash
        cd /Applications/XAMPP/xamppfiles/htdocs/tattoo
        ```

3.  **Install Dependencies**:
    ```bash
    npm install
    ```
    (If you prefer Yarn and have it installed: `yarn install`)

4.  **Set Up Environment Variables**:
    *   Create a `.env.local` file in the project root (`/Applications/XAMPP/xamppfiles/htdocs/tattoo`):
        ```bash
        cp .env.example .env.local
        ```
        (If `.env.example` doesn't exist, create `.env.local` manually: `touch .env.local`)
    *   Edit `.env.local`. The current application does not require any specific local environment variables for its core functionality. If you add features requiring API keys or other secrets, you would add them here.
        ```env
        # Example: NEXT_PUBLIC_SOME_KEY="your_local_value"
        ```

5.  **Run the Development Server**:
    ```bash
    npm run dev
    ```
    *   The application will typically be available at `http://localhost:3000` (or another port if 3000 is busy). Check the terminal output.
    *   **Note**: This Next.js app is run by Node.js, not XAMPP's Apache.

### 2.3 Data Persistence (Local Development)

*   Locally, booking requests and blocked dates are stored **in-memory**.
*   This means the data is **lost** when the development server (`npm run dev`) restarts.
*   You will see warnings in the server console about KV (Key-Value store) not being available; this is expected for local setup. For deployment to an environment like Cloudflare Pages, a persistent data solution like Cloudflare KV would be configured (see Deployment section).

### 2.4 Note on XAMPP and MySQL

*   You are placing the Next.js project files within XAMPP's `htdocs` directory primarily for organizational purposes or if you intend to use XAMPP's other services (like MySQL) alongside your Node.js application.
*   The Next.js application is served by its own Node.js development server (started via `npm run dev`), **not** by XAMPP's Apache server.
*   If you later decide to use a database, XAMPP's MySQL can serve as a local database server. You would need to:
    1.  Ensure MySQL is running via XAMPP.
    2.  Install a MySQL client library in your Next.js project (e.g., `mysql2` or an ORM like Prisma).
    3.  Write code in your Next.js app (e.g., in `src/lib/actions.ts` or API routes) to connect to this database. **This database integration is not part of the current project's codebase.**

## 3. Deployment to Cloudflare Pages via GitHub

This section guides you through deploying the application to Cloudflare Pages using your GitHub repository.

### 3.1 Prerequisites for Deployment

*   All project code pushed to a GitHub repository (see next step).
*   A Cloudflare account.

### 3.2 Pushing Project to GitHub

#### 3.2.1 Initial Push to GitHub

1.  **Initialize Git & First Commit (if not done)**:
    *   In your project root (`/Applications/XAMPP/xamppfiles/htdocs/tattoo`), open Terminal.
    *   If it's not already a Git repository, initialize it:
        ```bash
        git init -b main
        ```
    *   Ensure you have a `.gitignore` file (one is provided in the project, which excludes `node_modules/`, `.env.local`, etc.).
    *   Stage and commit your files:
        ```bash
        git add .
        git commit -m "Initial commit" 
        ```
        (Or a more descriptive message if you've made changes.)

2.  **Create a GitHub Repository**:
    *   Go to [GitHub.com](https://github.com) and log in.
    *   Create a new repository (e.g., `enos-tattoo-studio`). **Do not** initialize it with a README, .gitignore, or license if you're pushing an existing local repository.

3.  **Link Local Repo to GitHub and Push**:
    *   In your Terminal (still in the project root), check if a remote named `origin` already exists:
        ```bash
        git remote -v
        ```
    *   **If `origin` already exists and points to the correct repository URL** (e.g., `https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git`), you can skip adding it again.
    *   **If `origin` exists but points to the wrong URL**, update it:
        ```bash
        git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
        ```
    *   **If `origin` does not exist**, add it (replace with your actual GitHub username and repository name):
        ```bash
        git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
        ```
    *   Push your `main` branch to GitHub:
        ```bash
        git push -u origin main
        ```
    *   **Authentication**: GitHub no longer accepts account passwords for Git operations over HTTPS. You must use a **Personal Access Token (PAT)** instead of your password.
        *   **How to Create a PAT**:
            1.  Go to your GitHub account: Settings > Developer settings > Personal access tokens > Tokens (classic).
            2.  Click "Generate new token" (or "Generate new token (classic)").
            3.  Give it a name (e.g., "tattoo-studio-cli-push").
            4.  Set an expiration.
            5.  Under "Scopes," select the `repo` scope (Full control of private repositories).
            6.  Click "Generate token."
            7.  **Copy the token immediately.** You won't see it again. Store it securely.
        *   **Using the PAT**: When your terminal prompts for a password for `https://github.com`, enter the PAT you just copied. Your username remains your GitHub username.
        *   **Alternative: SSH**: You can also use SSH for authentication, which avoids passwords/PATs in the terminal. This involves [setting up SSH keys with GitHub](https://docs.github.com/en/authentication/connecting-to-github-with-ssh).
    *   If you encounter issues with credential prompts (like `askpass.sh` errors), ensure your Git credential helper is configured correctly for your macOS environment or consider using SSH.

#### 3.2.2 Pushing Subsequent Changes

Once your project is on GitHub and you've made further local changes that you want to save:

1.  **Check Status (Optional but Recommended):**
    *   See what files have changed:
        ```bash
        git status
        ```

2.  **Stage Your Changes:**
    *   Add all modified and new files to the staging area:
        ```bash
        git add .
        ```
    *   Or, to stage specific files:
        ```bash
        git add path/to/your/file1.tsx path/to/your/file2.css
        ```

3.  **Commit Your Changes:**
    *   Save your staged changes to your local Git history with a descriptive message:
        ```bash
        git commit -m "Your concise message describing the changes"
        ```
        *(Example: `git commit -m "Updated gallery section with new images"`)*

4.  **Push Your Changes to GitHub:**
    *   Upload your committed changes from your local `main` branch to the `main` branch on GitHub (assuming your remote is named `origin`):
        ```bash
        git push origin main
        ```
    *   You may be prompted for your GitHub username and Personal Access Token (PAT) again.

### 3.3 Setting up Cloudflare Pages

1.  Log in to your Cloudflare dashboard.
2.  Go to "Workers & Pages" > "Create application" > "Pages" > "Connect to Git".
3.  Select your GitHub account and the repository you just pushed/updated.
4.  Click "Begin setup".
5.  **Build Settings**:
    *   **Project name**: Choose a name (e.g., `enos-tattoo-studio`). This will be part of your `*.pages.dev` URL.
    *   **Production branch**: `main` (or your default branch).
    *   **Framework preset**: Select "Next.js". Cloudflare usually detects this and configures most settings correctly.
    *   **Build command**: Should typically be `npm run build` or `npx @cloudflare/next-on-pages@1`.
    *   **Build output directory**: Set this to **`.next`**.
    *   **Root directory (advanced)**: Leave as is (root of your repo) unless your Next.js project is in a subdirectory within the Git repo. For this project, it's the root.

### 3.4 Configuring Environment Variables on Cloudflare

This is crucial for your deployed app to function correctly.
In your Cloudflare Pages project settings (after initial setup, go to "Settings" > "Environment variables"):

*   **Add production variables** (click "Add variable" for each):
    *   `NODE_ENV`: Set this to `production`.
    *   `NEXT_PUBLIC_...`: If you had any client-side public environment variables prefixed with `NEXT_PUBLIC_`, add them here.
    *   Note: Any environment variables previously mentioned for admin or AI features (like `ADMIN_PASSWORD` or `GOOGLE_API_KEY`) are no longer needed as these features have been removed from the application.

### 3.5 Setting up KV Namespace Binding on Cloudflare

For booking requests and blocked dates to be persistent on your deployed site, you need to link a Cloudflare KV Namespace.

1.  **Create a KV Namespace**:
    *   In the Cloudflare dashboard, go to "Workers & Pages" > "KV" (in the right sidebar).
    *   Click "Create a namespace".
    *   Enter a name (e.g., `ENOS_TATTOO_BOOKINGS`). Note this name.

2.  **Bind the KV Namespace to Your Pages Project**:
    *   Go back to your Cloudflare Pages project settings.
    *   Navigate to "Settings" > "Functions".
    *   Scroll down to "KV namespace bindings".
    *   Click "Add binding".
    *   **Variable name**: `BOOKINGS_KV` (This exact name is what the code in `src/lib/actions.ts` expects).
    *   **KV namespace**: Select the namespace you created (e.g., `ENOS_TATTOO_BOOKINGS`).
    *   Click "Save".

### 3.6 Build and Deploy

*   After configuring build settings, environment variables, and KV binding, click "Save and Deploy" in the Cloudflare Pages setup.
*   If you're modifying an existing project, a new deployment will be triggered when you push changes to your connected GitHub branch (e.g., `main`).
*   Cloudflare Pages will pull your code from GitHub, build it, and deploy it. You can monitor the build process in the Cloudflare dashboard under your Pages project.
*   Once deployed, you'll get a `*.pages.dev` URL for your live application.

The app should now be running on Cloudflare Pages, using Cloudflare KV for persistent data storage for bookings and blocked dates! Remember to test all features, especially booking submissions and date blocking.

