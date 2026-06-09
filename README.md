# Where's Waldo (Photo Tagging App)

A real-time "Where's Waldo" style game. The frontend is built with React (Vite) and talks to a backend API built with Node, Express, and PostgreSQL to validate clicks and save high scores.

## What it does

- **Decoupled Setup:** The React frontend handles the UI on port 5173, while the Express API handles coordinate math and leaderboard data on port 3000.
- **Click Validation:** When a user clicks the image, the frontend sends the X/Y coordinates to the backend (`/api/validate`). The backend checks if those coordinates fall inside the character's boundary box (`x_left`, `x_right`, `y_top`, `y_bottom`) stored in PostgreSQL via Prisma.
- **Leaderboard:** Tracks player completion times (`/api/leaderboard`) and returns the top 10 fastest scores ordered by seconds.

## Tech Stack

- **Frontend:** React, Vite, React Router, Axios, CSS3
- **Backend:** Node.js, Express.js, Prisma ORM
- **Database:** PostgreSQL

## Local Setup

### 1. Backend API Setup

Navigate to the backend server directory and install dependencies:

```bash
npm install
```

Create a `.env` file in your server directory and add your database link:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/waldo_db?schema=public"
```

Push the database schema and migrations using Prisma:

```bash
npx prisma migrate dev --name init
```

Start the API server:

```bash
node index.js
```

The backend will run locally on `http://localhost:3000`.

### 2. Frontend Setup

Open a new terminal window, navigate to the `client` directory, and run the development server:

```bash
npm install
npm run dev
```

The game interface will spin up locally on `http://localhost:5173`.
