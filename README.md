# 🎨 Pixelate - Creative Digital Agency Platform

A modern, full-stack web application built for a creative digital agency, showcasing services, portfolio projects, team members, and client testimonials. Built with cutting-edge technologies to deliver exceptional user experience and performance.

## 🚀 Project Overview

Pixelate is a comprehensive agency management platform that combines a beautiful public-facing website with a powerful admin dashboard. It enables agencies to showcase their work, manage projects, track analytics, and maintain client relationships - all in one place.

### ✨ Key Features

#### 🌐 Public Website
- **Responsive Design**: Fully responsive layout optimized for all devices
- **Smooth Animations**: Powered by Framer Motion for engaging user interactions
- **Dynamic Sections**:
  - Hero section with compelling call-to-action
  - About Us with company story
  - Services showcase
  - Portfolio/Projects gallery with filtering
  - Team members display
  - Client testimonials
  - Process workflow
  - Contact form
- **SEO Optimized**: Built-in sitemap and metadata optimization
- **Performance**: Server-side rendering for lightning-fast page loads

#### 🔐 Admin Dashboard
- **Secure Authentication**: NextAuth.js integration with role-based access
- **Project Management**: Create, edit, and manage portfolio projects
- **Client Management**: Track and organize client information
- **Analytics Dashboard**: Real-time insights with:
  - Page view tracking
  - Project view analytics
  - User behavior metrics
  - Visual charts and statistics
- **Content Management**: Easy-to-use forms for updating content

#### 📊 Technical Highlights
- **Database**: MongoDB with Prisma ORM for type-safe database access
- **Authentication**: Secure session management with NextAuth.js
- **API Routes**: RESTful API endpoints for all CRUD operations
- **Image Optimization**: Next.js Image component for automatic optimization
- **Modern UI**: Tailwind CSS with custom design system

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.1.1 (React 19)
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Custom components with class-variance-authority

### Backend
- **Database**: MongoDB
- **ORM**: Prisma 5.22.0
- **Authentication**: NextAuth.js 4.24
- **Password Hashing**: bcryptjs

### Development Tools
- **Language**: TypeScript 5
- **Linting**: ESLint with Next.js config
- **Package Manager**: npm/yarn/pnpm

## 📂 Project Structure

```
pixelate/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (site)/              # Public website routes
│   │   │   ├── _components/     # Site components
│   │   │   └── projects/        # Projects pages
│   │   ├── admin/               # Admin dashboard
│   │   │   ├── analytics/       # Analytics page
│   │   │   ├── clients/         # Client management
│   │   │   ├── projects/        # Project management
│   │   │   └── setup/           # Initial setup
│   │   └── api/                 # API routes
│   ├── components/              # Reusable components
│   │   ├── navbar/             # Navigation component
│   │   ├── Footer/             # Footer component
│   │   └── admin/              # Admin components
│   ├── lib/                    # Utility libraries
│   └── hooks/                  # Custom React hooks
├── prisma/                     # Database schema
└── public/                     # Static assets
```

## 🚦 Getting Started

### Prerequisites
- Node.js 20+ installed
- MongoDB database (local or cloud)
- npm/yarn/pnpm package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/zyadessa2/pixelate.git
cd pixelate
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```env
DATABASE_URL="your_mongodb_connection_string"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
```

4. **Database Setup**
```bash
npx prisma generate
npx prisma db push
```

5. **Run Development Server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. **Access the Application**
- Public Site: [http://localhost:3000](http://localhost:3000)
- Admin Dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)

### First-Time Setup

1. Navigate to `/admin/setup` to create your admin account
2. Log in to the admin dashboard
3. Start adding projects, clients, and content

## 📜 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

## 🎯 Core Functionalities

### For Visitors
- Browse agency services and portfolio
- View detailed project case studies
- Meet the team
- Read client testimonials
- Contact the agency

### For Administrators
- Manage portfolio projects with images
- Track project analytics
- Manage client database
- Monitor website traffic
- Update content dynamically

## 🔒 Security Features

- Secure authentication with NextAuth.js
- Password hashing with bcryptjs
- Environment variable protection
- API route protection
- Session-based authorization

## 📈 Performance Optimizations

- Server-side rendering (SSR)
- Image optimization
- Code splitting
- Lazy loading
- Optimized fonts with next/font

## 🤝 Contributing

This is a private project. For any questions or suggestions, please contact the development team.

## 📄 License

This project is proprietary and confidential.

## 👨‍💻 Developer

Built with ❤️ using modern web technologies

---

**Note**: This project demonstrates proficiency in:
- Full-stack development with Next.js
- Database design and management
- Authentication and authorization
- Responsive web design
- State management
- API development
- Modern UI/UX practices
- Performance optimization
- TypeScript development
- Prisma ORM
- MongoDB integration
