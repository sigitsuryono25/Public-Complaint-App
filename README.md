# CivicSync - Public Complaint App 🏛️

CivicSync is a modern, transparent public complaint management system designed to bridge the gap between citizens and government agencies (SKPD). It features real-time tracking, GPS-based reporting, and a premium administrative command center.

## 🚀 Project Overview

The system is composed of three main modules:
- **Backend API**: Node.js/Express with Sequelize & PostgreSQL.
- **Admin Panel**: A high-end React.js dashboard for administrators and SKPD staff.
- **Mobile App**: Native Android (Kotlin) application for citizen reporting (In Progress).

---

## 🎨 Design Mockups

### Admin Dashboard Overview
![Admin Dashboard Mockup](./docs/admin_dashboard_mockup_1772889541184.png)

### Citizen App Submission Form
![Citizen App Mockup](./docs/citizen_app_complaint_form_mockup_1772889557150.png)

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, PostgreSQL, Sequelize ORM, JWT, Bcrypt.
- **Admin Web**: React.js, Vite, Axios, Lucide-React, Vanilla CSS (Premium Dark Mode).
- **Mobile**: Kotlin (Android Native), Google Maps SDK, Fused Location Provider.
- **Design**: Executive Glassmorphism, Dynamic Transitions, Responsive Layouts.

---

## 📂 Project Structure

```text
.
├── admin-panel/        # React + Vite Frontend
├── backend/            # Express.js API
├── mobile-android/     # Android Native (Kotlin) Mobile App
├── docs/               # Technical Documentation & Task Tracking
└── README.md           # You are here
```

---

## 🚦 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL installed and running
- Android Studio (for mobile development)

### 2. Backend Setup
1. Navigate to `/backend`.
2. Install dependencies: `npm install`.
3. Create a `.env` file based on the provided template:
   ```env
   PORT=5001
   DB_HOST=localhost
   DB_USER=your_user
   DB_PASS=your_password
   DB_NAME=public_complaint
   JWT_SECRET=your_secret_key
   ```
4. Run the data seeder to populate test data (Admin & Complaints):
   ```bash
   node seed.js
   ```
5. Start development server:
   ```bash
   npm run dev
   ```

### 3. Admin Panel Setup
1. Navigate to `/admin-panel`.
2. Install dependencies: `npm install`.
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
4. **Login Credentials** (After seeding):
   - **Email**: `admin@test.com`
   - **Password**: `admin123`

---

## 🛡️ Features Implemented

- [x] **Secure Authentication**: JWT-based login for Admins.
- [x] **Real-time Stats**: Dashboard overview with live database counts.
- [x] **SKPD Management**: Department registration and categorical mapping.
- [x] **Complaint Tracking**: Full lifecycle management with history logs.
- [x] **LBS Integration**: Coordinate capturing and verification endpoints.
- [x] **Premium UI**: Glassmorphism effect with custom-curated color palettes.

---

## 📄 Documentation

For detailed technical specs and implementation history, refer to the `/docs` folder:
- [Implementation Plan](./docs/implementation_plan.md)
- [Project Tasks](./docs/task.md)

---

Developed with ❤️ by the CivicSync Team.
