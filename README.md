# Blood Wave 🌊🩸

**Blood Wave** is a modern, responsive web application designed to save lives by connecting blood donors with those in need. Users can request blood, become donors, and track donations, while admins can monitor all activities with detailed statistics and analytics.  

Live Site: [Blood Wave](https://blood-wave.netlify.app)  

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Challenges](#challenges)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [License](#license)

---

## Overview
Blood Wave allows users to:
- Register and become donors
- Request blood from donors based on **location** and **blood group**
- Track the status of requests (pending, accepted, rejected, completed)

Donors can:
- Accept or reject blood requests
- Update personal information and donation status
- Track activity: pending requests, accepted, rejected, completed donations

Admins can:
- Monitor all users, donors, and requests
- View donation statistics via charts and analytics
- Track which donor gave blood to which user

**Donor Privacy:**  
If a donor sets `numberPublic: true`, users can see the **Call** and **Request** buttons; otherwise, only the request option is available.  

Once a donation is completed:
- Donor status becomes active again
- `lastDonation` date updates
- Total donation count increases

Searching for **“blood wave kushtia”** on Google brings up the live site.

---

## Features
- ✅ User Registration & Role Management (Member, Donor, Admin)  
- ✅ Blood Request System with **location** and **blood group** filters  
- ✅ Donor Dashboard: Track pending, accepted, rejected, completed requests  
- ✅ Admin Dashboard: Monitor all users and donors with overview charts  
- ✅ Donation Tracking: Updates last donation date and total donations  
- ✅ Donor Privacy Settings: Control visibility of contact number  
- ✅ Responsive Design for Mobile, Tablet, and Desktop  
- ✅ Notifications & Alerts for request status updates  
- ✅ Protected Routes & Role-Based Access Control  

---

## Challenges
- Implementing dynamic **role-based dashboards** for members, donors, and admins  
- Managing **request workflow** with multiple statuses  
- Handling donor **availability and privacy settings** dynamically  
- Updating donor statistics (`lastDonation`, donation count) accurately  
- Designing **responsive dashboards** with charts and analytics  
- Ensuring **real-time data consistency** across all user roles  

---

## Tech Stack
- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** Firebase Authentication  
- **Hosting:** Netlify (Frontend), Vercel (Backend)  
- **Notifications:** React-Toastify / SweetAlert2  

---

## Setup
1. Clone the repositories:

```bash
# Client
git clone <client-repo-url>

# Server
git clone <server-repo-url>
