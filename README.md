
Tattoo Studio - Simple web app

This project is a modern, feature-rich website for a tattoo studio, built with Next.js, React, ShadCN UI, and Tailwind CSS. It includes a public-facing site and booking functionality.

This document provides an overview of the project and guides for local development (especially on macOS) and deployment to Cloudflare Pages.

**For detailed local macOS setup instructions, please refer to `DEPLOYMENT_GUIDE.MD` (Section: "Local Development Guide (macOS)").**

## Tech Stack

*   **Framework**: Next.js 15 (App Router)
*   **UI Library**: React 18
*   **Styling**: Tailwind CSS
*   **Components**: ShadCN UI
*   **Form Management**: React Hook Form with Zod for validation
*   **Date Management**: date-fns, React Day Picker
*   **Icons**: Lucide React
*   **Typescript**: For type safety.
*   **Data Persistence (Deployed)**: Cloudflare KV (for booking requests and blocked dates)
*   **Data Persistence (Local Development)**: In-memory (data lost on server restart)

## Key Features
*   Public-facing website with sections for About, Services, Artists, Gallery, FAQ, and Contact.

## Local Development Setup (macOS Focus)

For a comprehensive step-by-step guide on setting up and running this project locally on your macOS machine, specifically using the path `/Applications/XAMPP/xamppfiles/htdocs/tattoo`, please see **`DEPLOYMENT_GUIDE.MD`**.

The general steps involve:
1.  Ensuring prerequisites are installed (Node.js v18+, npm).
2.  Placing the project source files in the specified directory (e.g., `/Applications/XAMPP/xamppfiles/htdocs/tattoo`).
3.  Navigating to the project directory in your Terminal.
4.  Installing dependencies (`npm install`).
5.  Running the Next.js development server (`npm run dev`).

### Data Persistence (Local vs. Deployed)
*   **Local Development**: Booking requests and blocked dates are stored **in-memory**. This data will be **lost** when the development server restarts. You will see warnings in the console indicating that a persistent KV store is not available. This is expected for local development.
*   **Deployed on Cloudflare Pages**: The application is designed to use Cloudflare KV for persistent storage of bookings and blocked dates when deployed. This requires proper KV namespace binding in your Cloudflare Pages project settings (see `DEPLOYMENT_GUIDE.MD`).

## Deployment

This project is intended for deployment on **Cloudflare Pages**. For detailed deployment instructions, including setting up your GitHub repository and configuring Cloudflare Pages, please refer to **`DEPLOYMENT_GUIDE.MD`**.

## Project Structure Highlights

*   `src/app/`: Main application routes (App Router).
*   `src/components/`: React components.
*   `src/lib/`: Utility functions, server actions (`actions.ts` for data handling), type definitions.
*   `public/`: Static assets.
*   `.env.example`: Example environment variables file.
*   `DEPLOYMENT_GUIDE.MD`: Comprehensive guide for local macOS setup and deployment to Cloudflare Pages.

