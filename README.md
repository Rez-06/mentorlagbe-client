<div align="center">

# 🎓 MentorLagbe

### Smart Tuition & Mentorship Platform

*Find your ideal tutor or mentorship batch today.*

[![Live Site](https://img.shields.io/badge/Live%20Site-Visit-2ea44f?style=for-the-badge&logo=vercel&logoColor=white)](https://mentorlagbe-client-pi.vercel.app/)
[![API](https://img.shields.io/badge/API-Online-blue?style=for-the-badge&logo=express&logoColor=white)](https://mentorlagbe-server-iodd.vercel.app/)
[![Server Repo](https://img.shields.io/badge/Server-Repo-181717?style=for-the-badge&logo=github)](https://github.com/Rez-06/mentorlagbe-server)

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5-FF9903)
![BetterAuth](https://img.shields.io/badge/BetterAuth-JWT-6C47FF)
![Stripe](https://img.shields.io/badge/Stripe-Checkout-635BFF?logo=stripe&logoColor=white)

</div>

---

## 🔗 Quick Links

| | |
|---|---|
| 🌐 **Live Site** | https://mentorlagbe-client-pi.vercel.app/ |
| ⚙️ **Live API** | https://mentorlagbe-server-iodd.vercel.app/ |
| 💻 **Client Repo** | https://github.com/Rez-06/mentorlagbe-client |
| 🗄️ **Server Repo** | https://github.com/Rez-06/mentorlagbe-server |

---

## 📖 About the Project

Students and parents struggle to find **verified tutors** by subject, class level, mode (online/offline) and budget, while skilled tutors lack a structured place to showcase their batches and manage enrollments.

**MentorLagbe** solves both problems in one role-based ecosystem:

- 🧑‍🏫 **Tutors** post tuition batches or 1-on-1 mentorship and manage incoming applications.
- 🧑‍🎓 **Students** search, filter, bookmark and apply for approved tuitions, then track their status.
- 🛡️ **Admins** moderate listings, manage users and roles, and track Stripe revenue.
- 💎 Both tutors and students can upgrade to a **Pro Plan** through Stripe Checkout.

---

## 🔑 Demo Credentials

| Role | Email | Password |
|---|---|---|
| 🛡️ **Admin** | `admin@mentorlagbe.com` | `Admin@123` |
| 🧑‍🏫 **Tutor (Pro)** | `tutor@mentorlagbe.com` | `Tutor@123` |
| 🧑‍🏫 **Tutor (Free)** | `farhana@mentorlagbe.com` | `Tutor@123` |
| 🧑‍🎓 **Student** | `student@mentorlagbe.com` | `Student@123` |

> 💳 **Stripe test card:** `4242 4242 4242 4242` · any future expiry · any CVC · any ZIP

---

## ✨ Key Features

### 🌍 Public
- Modern landing page: hero, live **featured tuitions** (6 latest approved), how it works, pricing, popular subjects, platform stats and testimonials
- **Browse Tuitions** with **server-side** search, filters (subject, class level, mode), sorting and pagination
- **Tuition details** page with tutor profile, ratings and reviews
- Pricing page comparing **Free vs Pro** for tutors and students

### 🔐 Authentication
- Email and password sign up and sign in with **BetterAuth**, plus role selection (Student or Tutor)
- Form validation and toast notifications
- **JWT** issued from the session and sent with every protected API call
- Private routes **survive page reloads** (no redirect to login)
- Role-guarded dashboards

### 🧑‍🎓 Student Dashboard
- Stats overview (applied, accepted, pending, current plan)
- **My Applications** with status badges, and cancel while still pending
- **Saved Tuitions** (bookmarks): up to 5 on Free, unlimited on Pro
- Rate and review a tuition after your application is accepted
- Duplicate-application prevention

### 🧑‍🏫 Tutor Dashboard
- Stats overview (posted, approved, applicants, plan)
- **Post a Tuition** with direct **ImgBB image upload** (Free plan: 2 posts, Pro: unlimited)
- **My Tuitions** with full CRUD, admin approval status and Active/Closed toggle
- **Manage Applicants**: accept or reject students

### 🛡️ Admin Dashboard
- Platform stats (users, tutors, pending vs approved tuitions, total revenue)
- **User management** and role updates
- **Tuition approval flow** (approve or reject)
- **Transactions** table of all Stripe payments

### 💎 Payments
- Stripe Checkout: **Pro Tutor $15** and **Pro Student $10**
- `/payment/success` and `/payment/cancel` pages
- Plan upgraded and transaction recorded automatically

### 🎨 UI / UX
- 🌗 **Dark / Light theme** across landing pages and dashboards
- Skeleton loaders, custom **404** and **error** pages
- Collapsible, responsive dashboard sidebar
- Fully responsive (mobile, tablet, desktop)

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Styling | Tailwind CSS 4, DaisyUI 5 |
| Auth | BetterAuth client + JWT |
| UI helpers | react-icons, lucide-react, react-hot-toast |
| Hosting | Vercel |

### 📦 npm packages

`next` · `react` · `react-dom` · `better-auth` · `tailwindcss` · `@tailwindcss/turbopack` · `daisyui` · `react-hot-toast` · `react-icons` · `lucide-react` · `eslint` · `eslint-config-next`

---

## 🗺️ Main Routes

| Route | Description | Access |
|---|---|---|
| `/` | Landing page | Public |
| `/tuitions` | Browse, search and filter | Public |
| `/tuitions/[id]` | Tuition details and apply | Public (apply: student) |
| `/pricing` | Free vs Pro plans | Public |
| `/sign-up` · `/sign-in` | Authentication | Public |
| `/payment/success` · `/payment/cancel` | Stripe redirects | Logged in |
| `/dashboard/profile` | Update profile and photo | All roles |
| `/dashboard/student/**` | Overview, applications, saved | Student |
| `/dashboard/tutor/**` | Overview, post, my tuitions, applicants | Tutor |
| `/dashboard/admin/**` | Overview, users, tuitions, transactions | Admin |

---

## 🚀 Run Locally

```bash
# 1. Clone
git clone https://github.com/Rez-06/mentorlagbe-client.git
cd mentorlagbe-client

# 2. Install
npm install

# 3. Environment variables
cp .env.example .env.local
# then edit .env.local

# 4. Start
npm run dev
```

Open http://localhost:3000

### 🔐 Environment Variables (`.env.local`)

```env
NEXT_PUBLIC_API_URL=https://mentorlagbe-server-iodd.vercel.app
```

> Use `http://localhost:5000` while running the server locally. No trailing slash. This value is baked in at build time, so redeploy after changing it.

### 🏗️ Production build

```bash
npm run build
npm start
```

---

## ☁️ Deployment

1. Push the repo to GitHub and import it in **Vercel** (framework: Next.js).
2. Add `NEXT_PUBLIC_API_URL` pointing to the deployed server.
3. Deploy. Every push to `main` redeploys automatically.
4. Make sure the server's `CLIENT_URL` matches this site's URL to avoid CORS errors.

---

## 👨‍💻 Author

**Rez** · CSE Student, Islamic University of Technology (IUT)
GitHub: [@Rez-06](https://github.com/Rez-06)

<div align="center">

⭐ If you like this project, give it a star!

</div>
