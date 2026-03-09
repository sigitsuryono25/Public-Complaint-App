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
- **Mobile**: Kotlin (Android Native), Koin DI, Retrofit, Coroutines, Google Maps SDK.
- **Design**: Executive Glassmorphism, Dynamic Transitions, Responsive Layouts.

---

## 🚦 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL installed and running
- Android Studio (for mobile development)

### 2. Backend Setup
1. Navigate to `/backend`.
2. Install dependencies: `npm install`.
3. Create a `.env` file based on the provided template.
4. Run the data seeder: `node seed.js`.
5. Start server: `npm run dev`.

### 3. Admin Panel Setup
1. Navigate to `/admin-panel`.
2. Install dependencies: `npm install`.
3. Start Vite: `npm run dev`.

### 4. Mobile App Setup
1. Open `/mobile-android` in **Android Studio**.
2. Allow Gradle sync (Uses Gradle 8.5).
3. Run the app using the `Debug` configuration.
4. **API URL**: The app is pre-configured to connect to `http://10.0.2.2:5001/api/` (Host localhost access from Android Emulator).

---

## 🛡️ Features Implemented

- [x] **Secure Authentication**: JWT-based login for Admins & Citizens.
- [x] **Mobile Interface**: Premium Android UI with Koin DI & MVVM.
- [x] **Real-time Stats**: Dashboard overview with live database counts.
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
