1️⃣ System Overview

HungerLink is a real-time surplus food redistribution platform connecting Hostel Admins (Food Providers) with nearby NGOs.

The system uses an event-driven architecture to notify NGOs instantly when surplus food is created.

2️⃣ Architecture Design
High-Level Architecture
Frontend (React - Vercel)
        ↓
Backend API (Node.js + Express - Render)
        ↓
MongoDB Atlas (Cloud Database)
        ↓
Socket.IO (Real-time Notifications)
        ↓
Google Maps API (Geo-location Services)

3️⃣ User Roles
Hostel Admin (Food Provider)

Register/Login

Create Surplus

View Surplus List

See Nearby NGOs on Map

Track Claim Status

NGO

Register/Login

Receive Real-Time Notifications

Accept Surplus

View Claim Status

4️⃣ Surplus Flow Design
Hostel Admin creates surplus
        ↓
Data stored in database
        ↓
Socket event emitted
        ↓
All NGOs receive notification
        ↓
One NGO accepts surplus
        ↓
Status updated to "Claimed"
        ↓
Other NGOs blocked from claiming

5️⃣ Security Design

JWT-based Authentication

Role-based Access Control

CORS Protection

Helmet Security Middleware

Rate Limiting

6️⃣ Scalability Design

Cloud-native deployment (Vercel + Render)

MongoDB Atlas for scalable database

Event-driven communication using WebSockets

7️⃣ Future Improvements

AI-based NGO prioritization

Distance-based automatic matching

Food quantity prediction analytics

Admin analytics dashboard

Mobile app integration
