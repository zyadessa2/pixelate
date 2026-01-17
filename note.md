# Task: Build a Complete Backend for Portfolio Website using Next.js + MongoDB

## Project Overview
I need to add a backend to my existing Next.js portfolio website.  The backend should allow an admin to manage projects through a dashboard and track basic analytics.

## Tech Stack
- Next.js 14+ (App Router)
- MongoDB with Mongoose
- NextAuth. js for authentication
- TypeScript

## Required Packages
```bash
npm install mongoose next-auth bcryptjs
npm install -D @types/bcryptjs
```

## Features Required

### 1. Database Models
Create these Mongoose models in `/models` folder:

**Project Model (`models/Project.ts`):**
- id: ,
    title: "International Conference",
    mainTitle: "Reportage",
    client: "Reportage",
    location: "Dubai, UAE",
    date: "April 2025",
    category: "Conferences",
    featured: true,
    overview: "Multi-lingual business conference with simultaneous translation, breakout rooms, and live streaming capabilities.",
    stats: [
      { value: "2,000", label: "Attendees" },
      { value: "12", label: "Rooms" },
      { value: "8", label: "Languages" }
    ],
    services: [
      "Conference AV",
      "Translation Systems",
      "Video Streaming",
      "Recording"
    ],
    images: [
      "/projects/1.jpg",
      "/projects/2.jpg",
      "/projects/1.jpg",
      "/projects/2.jpg"
    ],
    clientLogo: "/projects/reportage-logo.png"
- views (number, default 0)
- timestamps (createdAt, updatedAt)

**Analytics Model (`models/Analytics.ts`):**
- type (enum: 'page_view', 'project_view', 'click')
- page (string, required)
- projectId (ObjectId ref to Project, optional)
- ip (string, optional)
- userAgent (string, optional)
- referrer (string, optional)
- country (string, optional)
- createdAt timestamp
- Add indexes on createdAt and type fields

**Admin Model (`models/Admin.ts`):**
- email (string, required, unique)
- password (string, required, hashed with bcrypt)
- name (string, required)
- Add comparePassword method
- Hash password before save using pre-save hook

### 2. Database Connection
Create `/lib/mongodb.ts` with: 
- Cached connection to prevent multiple connections in development
- Use global variable to cache connection
- Read MONGODB_URI from environment variables

### 3. Authentication
Setup NextAuth.js with credentials provider: 

**Create `/lib/auth.ts`:**
- Use CredentialsProvider
- Validate against Admin model
- Use JWT strategy
- Custom sign-in page at /admin/login
- Include user id in session

**Create `/app/api/auth/[...nextauth]/route.ts`:**
- Export GET and POST handlers

### 4. API Routes

**Projects API (`/app/api/projects/`):**

`route.ts`:
- GET:  Fetch all projects (public), support query params for featured and category
- POST:  Create new project (protected, requires auth)

`[id]/route.ts`:
- GET: Fetch single project by ID (public)
- PUT: Update project (protected)
- DELETE: Delete project (protected)

**Analytics API (`/app/api/analytics/`):**

`track/route.ts`:
- POST: Track page view, capture IP, user-agent, referrer

`project-view/route.ts`:
- POST: Track project view and increment project views counter

`route.ts`:
- GET: Return analytics dashboard data (protected), including: 
  - Total page views
  - Views today
  - Views last 7 days
  - Views last 30 days
  - Total project views
  - Top 5 projects by views
  - Daily views for last 30 days (for chart)
  - Unique visitors count

### 5. Middleware
Create `/middleware.ts`:
- Protect all /admin routes except /admin/login
- Use next-auth/middleware withAuth
- Check for valid token

### 6. Admin Pages

**Layout (`/app/admin/layout.tsx`):**
- Sidebar with navigation (Dashboard, Projects, Analytics)
- Logout button
- Wrap children with session provider

**Dashboard (`/app/admin/page.tsx`):**
- Display analytics cards (total views, today, 7 days, unique visitors)
- Show top projects list
- Redirect to login if not authenticated

**Projects List (`/app/admin/projects/page. tsx`):**
- Table of all projects
- Edit and Delete buttons for each
- Add New Project button

**New Project (`/app/admin/projects/new/page.tsx`):**
- Form with all project fields
- Image upload support
- Submit to POST /api/projects

**Edit Project (`/app/admin/projects/[id]/edit/page.tsx`):**
- Pre-filled form with project data
- Submit to PUT /api/projects/[id]

**Login Page (`/app/admin/login/page. tsx`):**
- Email and password fields
- Use signIn from next-auth/react
- Redirect to /admin on success

### 7. Analytics Tracking Hook
Create `/hooks/useAnalytics.ts`:
- usePageTracking hook that tracks on pathname change
- trackProjectView function for project pages

### 8. Environment Variables
Create `.env.local` with:
```
MONGODB_URI=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
```

### 9. Create Admin Script
Create `/scripts/createAdmin.ts`:
- Connect to MongoDB
- Create admin user with hashed password
- Can be run with ts-node

## File Structure
```
app/
├── api/
│   ├── auth/[...nextauth]/route.ts
│   ├── projects/
│   │   ├── route.ts
│   │   └── [id]/route.ts
│   └── analytics/
│       ├── route.ts
│       ├── track/route.ts
│       └── project-view/route. ts
├── admin/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   ├── new/page.tsx
│   │   └── [id]/edit/page.tsx
│   └── analytics/page.tsx
lib/
├── mongodb.ts
├── auth.ts
└── utils.ts
models/
├── Project.ts
├── Analytics.ts
└── Admin.ts
hooks/
└── useAnalytics.ts
components/
└── admin/
    ├── Sidebar.tsx
    ├── ProjectForm.tsx
    └── AnalyticsCard.tsx
middleware.ts
scripts/
└── createAdmin.ts
```

## Important Notes
1. All admin routes must be protected with authentication
2. Use proper TypeScript types for all models and API responses
3. Handle errors properly in all API routes
4. Use Next.js App Router conventions
5. Make sure MongoDB connection is cached properly
6. Use "use client" directive for client components

## Please create all these files with complete, working code. 