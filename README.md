# LeadDesk Mini

A minimal full-stack lead capture tool: a public landing page with a lead
form, and an internal `/admin` desk to review and update lead status.

## Stack

- Frontend: React + Vite, React Router, Axios
- Backend: Express.js
- Database: MongoDB + Mongoose

## Folder structure

```
leaddesk-mini/
  backend/
    config/db.js          MongoDB connection
    models/Lead.js         Mongoose schema
    routes/leads.js        POST /GET /PATCH /api/leads
    server.js               Express app entry point
    .env.example
  frontend/
    src/
      api/api.js            Axios client
      components/            Hero, LeadForm, Footer, LeadTable
      pages/                 Landing.jsx, Admin.jsx
      App.jsx, main.jsx, index.css
    .env.example
```

## Setup

### 1. Backend

```bash
cd backend
cp .env.example .env      # set MONGO_URI to your MongoDB connection string
npm install
npm run dev                # or: npm start
```

The API runs on `http://localhost:5000` by default.

### 2. Frontend

```bash
cd frontend
cp .env.example .env      # set VITE_API_URL if your backend runs elsewhere
npm install
npm run dev
```

The app runs on `http://localhost:5173` by default.

Visit `/` for the landing page and lead form, and `/admin` for the leads
desk.

## API

| Method | Route             | Description                          |
|--------|-------------------|--------------------------------------|
| POST   | /api/leads        | Create a lead (validated)             |
| GET    | /api/leads        | List leads, optional `?search=` term  |
| PATCH  | /api/leads/:id    | Update a lead's `status`              |

### Lead shape

```js
{
  name: String,
  email: String,
  budget: "<₹10k" | "₹10k–50k" | "₹50k–1L" | "₹1L+",
  message: String,
  status: "New" | "Contacted" | "Closed",   // defaults to "New"
  createdAt: Date,
}
```

## Notes

- No authentication / JWT — the admin route is open, per the assignment scope.
- Both client and server validate lead submissions; the server is the
  source of truth.
- Environment variables (`MONGO_URI`, `VITE_API_URL`, `CLIENT_ORIGIN`) keep
  the DB connection and API base URL out of source control.
