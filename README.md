# Lost & Found Item Management System

This workspace contains a full MERN stack application for a college campus lost & found system.

## Project Structure

- `backend/` - Node.js + Express API
  - `config/` - database connection
  - `controllers/` - route logic
  - `models/` - Mongoose schemas
  - `routes/` - API routes
  - `middleware/` - authentication and error handling
  - `server.js` - entrypoint
- `frontend/` - React application
  - `src/components/` - reusable UI components
  - `src/pages/` - page views
  - `src/services/` - API client
  - `src/App.js` - main app
  - `src/index.js` - React entrypoint

## Setup

### Backend

1. Open a terminal and navigate to `backend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the example:
   ```bash
   cd backend
   copy .env.example .env
   ```
4. Update `.env` with your MongoDB URI and JWT secret.

### Frontend

1. Open another terminal and navigate to `frontend/`
2. Install dependencies:
   ```bash
   npm install
   ```

## Run Locally

### Start backend server

```bash
cd backend
npm run dev
```

### Start frontend app

```bash
cd frontend
npm run dev
```

Then open the URL shown by Vite (usually `http://localhost:3000`).

## Deploy on Render

1. Push the repository to GitHub and connect it to Render.
2. Create two services in Render or use `render.yaml` at the repository root.

Backend service:
- Type: Web Service
- Environment: Node
- Build Command: `cd backend && npm install`
- Start Command: `cd backend && npm start`
- Environment Variables:
  - `MONGODB_URI`
  - `JWT_SECRET`

Frontend service:
- Type: Static Site
- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Environment Variables:
  - `VITE_API_BASE` set to your backend URL, e.g. `https://<your-backend>.onrender.com/api`

If you use Render's YAML, `render.yaml` is included at the repository root.

## Usage

- Register a new student account
- Login and receive a JWT token
- Add lost/found reports
- Search items by name
- Edit or delete items you own
- Logout securely

## Notes

- The frontend uses `localStorage` for the JWT token.
- The backend protects create/update/delete actions with JWT authentication.
