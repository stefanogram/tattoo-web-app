# **Name**: tattoo studio

## Website:
Tattoo Studio Website - Local Development Guide

This document provides a comprehensive guide to setting up and running the Enos Tattoo Studio website locally for development purposes.

## Technologies Used

The project is built using the following key technologies:

*   **Next.js:** A React framework for building server-side rendered and static websites.
*   **React:** A JavaScript library for building user interfaces.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
*   **Tailwind CSS:** A utility-first CSS framework for rapid styling.
*   **Firebase:** A platform for building web and mobile applications. This project specifically uses:
    *   **Firebase Authentication:** For user authentication (e.g., admin login).
    *   **Firestore:** A NoSQL cloud database to store data like bookings, blocked dates, etc.
    *   **Firebase Storage:** For storing images (e.g., gallery images).
*   **Genkit:** A toolkit for building AI applications. Used for the AI Tattoo Visualizer feature.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

*   **Node.js:** (v18 or higher recommended)
*   **npm** or **yarn** (npm is used in the commands below)
*   **Git:** For cloning the repository.
*   **Firebase Project:** You will need a Firebase project set up with Authentication, Firestore, and Storage enabled.
*   **Google Cloud Project:** For using Genkit and potentially other AI services.

## Local Setup

1.  **Clone the repository:**


