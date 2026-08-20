# Cornalinas | Chocolate E-Commerce

A modern, multilingual e-commerce platform for Cornalinas chocolate, built with Vue 3 and FastAPI. The site features a complete shop interface, content management, and an admin panel for managing products, orders, and content.

## Features

-   **Multi-language Support**: Fully bilingual (Spanish/English) with automatic language detection.
-   **E-Commerce**: Shop with detailed product pages, shopping cart, and checkout flow.
-   **Content Management**: Dynamic blog and page management.
-   **Admin Panel**: Secure dashboard to manage products, collections, orders, blog posts, and pages.
-   **Responsive Design**: Optimized for mobile, tablet, and desktop devices.
-   **Media Management**: Integration with Cloudinary for image hosting.

## Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher)
-   [npm](https://www.npmjs.com/) (usually comes with Node.js)
-   [Python](https://www.python.org/) (v3.11 or higher)
-   [pip](https://pip.pypa.io/) (Python package installer)
-   [Docker](https://www.docker.com/get-started/) (for PostgreSQL)

## Installation

### 1. Backend Setup (FastAPI)

1.  Navigate to the backend directory:
    ```bash
    cd Backend
    ```

2.  Create a virtual environment:
    ```bash.cmd
    python -m venv venv
    venv\Scripts\activate
    ```

3.  Install Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4.  **Database Setup (PostgreSQL via Docker)**:

    Run this command to start the PostgreSQL container:

    ```bash
    docker run --name corn-postgres -e POSTGRES_USER=cornalinas_user -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=cornalinas_db -p 5432:5432 -d postgres
    ```

5.  Initialize the database and create tables:
    ```bash
    uvicorn main:app --reload --port 8000
    ```
    *(Wait for the server to start, then the tables should be created automatically by Alembic)*

    **Note**: Ensure you set the `DATABASE_URL` in `.env` (Backend/) to match your PostgreSQL setup if it differs.

### 2. Frontend Setup (Vue 3)

1.  Navigate to the frontend directory:
    ```bash
    cd Frontend
    ```

2.  Install Node.js dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.
