# MentorLagbe: Smart Tuition & Mentorship Platform (Client)

MentorLagbe connects students with verified tutors for online and home tuition. Tutors post tuition batches, admins moderate them, students search, apply, bookmark and review, and both tutors and students can upgrade to a Pro plan with Stripe.

**Live site:** https://YOUR-CLIENT.vercel.app
**Server repo:** https://github.com/YOURNAME/mentorlagbe-server
**API:** https://YOUR-SERVER.vercel.app

## Demo credentials
| Role | Email | Password |
|---|---|---|
| Admin | admin@mentorlagbe.com | Admin@123 |
| Tutor (Pro) | tutor@mentorlagbe.com | Tutor@123 |
| Tutor (Free) | farhana@mentorlagbe.com | Tutor@123 |
| Student | student@mentorlagbe.com | Student@123 |

Stripe test card: `4242 4242 4242 4242`, any future date, any CVC.

## Key features
- Role-based platform (Student, Tutor, Admin) with BetterAuth and JWT-protected API
- Home page: hero, live featured tuitions, how it works, pricing, subjects, stats, testimonials
- Browse Tuitions with **server-side** search, filters, sorting and pagination
- Tuition details with tutor profile, ratings and a role-restricted apply form (no duplicate applications)
- Tutor dashboard: post tuitions (ImgBB upload), full CRUD, active/closed toggle, manage applicants, Free plan limit of 2 posts
- Student dashboard: stats, My Applications (cancel while pending), Saved Tuitions, reviews after acceptance
- Admin dashboard: platform stats, user role management, tuition approval flow, Stripe transactions
- Stripe Checkout for Pro plans (Tutor $15, Student $10) with webhook and verification fallback
- Profile update with ImgBB image upload
- Dark / light theme, skeleton loaders, custom 404 and error pages, toast notifications
- Fully responsive, with private routes that survive page reloads

## Tech stack and npm packages
`next`, `react`, `react-dom`, `tailwindcss`, `daisyui`, `better-auth`, `react-icons`, `react-hot-toast`, `lucide-react`

## Run locally
1. `npm install`
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_API_URL` (your server URL)
3. `npm run dev` and open http://localhost:3000