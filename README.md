<div align="center">

# 🔐 VaultiX

### Your Passwords. Your Rules. Zero Compromise.

[![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

<br/>

**VaultiX** is a modern, full-stack password manager that combines **AES-256 encryption** with a **zero-knowledge architecture** — meaning not even the server can read your data. Built with the latest web technologies for speed, security, and a beautiful user experience.

<br/>

[**🌐 Live Demo**]()

</div>

---

## 📸 Screenshots

<div align="center">

### 🏠 Landing Page
<img src="public/screenshots/homepage.png" alt="VaultiX Landing Page" width="100%" />

<br/><br/>

### 🗄️ Vault Dashboard
<img src="public/screenshots/dashboard.png" alt="VaultiX Dashboard" width="100%" />

</div>

---

## ✨ Features at a Glance

| Feature | Description |
| :--- | :--- |
| 🔐 **Military-Grade Encryption** | AES-256 encryption with a zero-knowledge architecture — your data stays yours |
| 📱 **Cross-Platform Access** | Responsive design works seamlessly on desktop, tablet, and mobile |
| ⚡ **Lightning Fast** | Sub-200ms response times powered by Next.js 15 Turbopack |
| 🎯 **Smart Organization** | Categorize into Passwords, Passkeys, Codes, Wi-Fi, Credit Cards & more |
| 📋 **One-Click Copy** | Instantly copy credentials without revealing sensitive data |
| 🎲 **Password Generator** | Generate strong, cryptographically secure passwords on demand |
| 👁️ **Secure Visibility Toggle** | Peek at passwords with a single click, hidden by default |
| 🔄 **Real-Time Sync** | Cloud-based storage keeps your vault in sync across all devices |
| 🗑️ **Soft Delete & Recovery** | Deleted items are recoverable — never lose a password by accident |
| 🔍 **Instant Search** | Filter and find credentials in milliseconds |
| 🌙 **Dark Mode** | Beautiful dark-themed UI that's easy on the eyes |

---

## 🛠️ Tech Stack

<div align="center">

```
┌────────────────────────────────────────────────────────────────┐
│                        FRONTEND                                │
│  Next.js 15 · React 19 · TypeScript · Tailwind CSS 4           │
│  Lucide React Icons                                            │
├────────────────────────────────────────────────────────────────┤
│                      AUTHENTICATION                            │
│  Clerk                                                         │
├────────────────────────────────────────────────────────────────┤
│                        DATABASE                                │
│  MongoDB with Mongoose                                         │
├────────────────────────────────────────────────────────────────┤
│                      DEPLOYMENT                                │
│  Vercel                                                        │
└────────────────────────────────────────────────────────────────┘
```

</div>

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 15|
| **UI Library** | React 19 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4, tw-animate-css |
| **Components** | Radix UI (Dropdown Menu, Slot), Lucide React Icons |
| **Theming** | next-themes (Dark/Light mode) |
| **Auth** | Clerk (SSO, session management, middleware) |
| **Database** | MongoDB with Mongoose  |


---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **npm** / **yarn** / **pnpm** / **bun**
- **MongoDB** database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Clerk** account for authentication keys ([clerk.com](https://clerk.com/))

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/kd5778/VaultiX.git
cd VaultiX
```

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3️⃣ Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### 4️⃣ Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser — you're all set! 🎉

---

## 📁 Project Structure

```
VaultiX/
│
├── app/                        # Next.js 15 App Router
│   ├── layout.tsx              # Root layout with Clerk & theme providers
│   ├── page.tsx                # Landing page
│   ├── dashboard/              # 🗄️  Main vault dashboard
│   ├── about/                  # ℹ️  About page
│   ├── services/               # 📋 Services page
│   └── sign-in/                # 🔑 Authentication pages
│
├── components/                 # Reusable React components
│   ├── ui/                     # Primitives (Button, Dropdown, etc.)
│   ├── Navbar.tsx              # Navigation bar with theme toggle
│   └── PasswordModal.tsx       # Add/Edit password modal
│
├── lib/                        # Utility functions & DB connection
│   └── utils.ts                # Helper utilities (cn, etc.)
│
├── models/                     # Mongoose schemas
│   └── Password.ts             # Password document model
│
├── pages/api/                  # API routes (REST endpoints)
│   └── passwords/
│       ├── add.ts              # POST   — Create password
│       ├── get.ts              # GET    — Fetch all passwords
│       ├── update/[id].ts      # PUT    — Update password
│       └── delete/[id].ts      # DELETE — Remove password
│
├── public/                     # Static assets
│   └── screenshots/            # App screenshots
│
├── middleware.ts                # Clerk auth middleware
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies & scripts
```

---

## 🔧 API Reference

All endpoints require authentication via Clerk.

| Method | Endpoint | Description |
| :---: | :--- | :--- |
| `POST` | `/api/passwords/add` | Create a new password entry |
| `GET` | `/api/passwords/get` | Retrieve all passwords for the authenticated user |
| `PUT` | `/api/passwords/update/[id]` | Update an existing password by ID |
| `DELETE` | `/api/passwords/delete/[id]` | Delete a password by ID |

### Request Example — Add Password

```json
POST /api/passwords/add
{
  "title": "GitHub",
  "username": "kd5778",
  "password": "encrypted_password_string",
  "category": "Codes",
  "notes": "Main dev account"
}
```

---

## 🔒 Security Architecture

```
┌─────────────┐     HTTPS/TLS      ┌──────────────┐     Encrypted      ┌─────────────┐
│   Browser   │ ◄───────────────►  │  Next.js API │ ◄────────────────► │   MongoDB   │
│  (Client)   │                    │   (Server)   │                    │  (Storage)  │  
└─────────────┘                    └──────────────┘                    └─────────────┘
       │                                  │
       │  Clerk JWT Tokens                │  Mongoose ODM
       │  Session Management              │  Input Validation
       │  CSRF Protection                 │  XSS Sanitization
       ▼                                  ▼
┌─────────────┐                    ┌──────────────┐
│  Clerk Auth │                    │  AES-256     │
│  Provider   │                    │  Encryption  │
└─────────────┘                    └──────────────┘
```

- **AES-256 Encryption** — All sensitive data is encrypted before storage
- **Zero-Knowledge Architecture** — The server never has access to plaintext passwords
- **Clerk Authentication** — Industry-standard auth with SSO, MFA, and session management
- **Middleware Protection** — Routes are protected at the edge via `middleware.ts`
- **Input Validation** — Comprehensive server-side validation on all API endpoints
- **XSS & CSRF Protection** — Built-in Next.js security headers and Clerk token verification

---

## 🎨 Design Philosophy

VaultiX follows a **premium dark-mode-first** design language:

- **🎨 Color Palette** — Rich purple-to-pink gradients on a deep dark background
- **✨ Glassmorphism** — Frosted glass card effects with subtle backdrop blur
- **🔤 Typography** — Clean hierarchy with readable, modern font stacks
- **🎭 Micro-Animations** — Smooth hover transitions and interactive feedback
- **📐 Responsive** — Mobile-first layouts that scale beautifully to ultrawide

---



## 👨‍💻 Author

<div align="center">

**Krish Dhaked**

[![Email](https://img.shields.io/badge/Email-krishdhaked777@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:krishdhaked777@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-kd5778-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kd5778)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-krishdhaked5778-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/krishdhaked5778)

</div>

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) — The React framework for production
- [React](https://react.dev/) — A JavaScript library for building user interfaces
- [Clerk](https://clerk.com/) — Authentication and user management
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [MongoDB](https://www.mongodb.com/) — NoSQL database
- [Radix UI](https://www.radix-ui.com/) — Unstyled, accessible UI primitives
- [Lucide](https://lucide.dev/) — Beautiful & consistent icon toolkit
- [Vercel](https://vercel.com/) — Deployment and hosting platform
