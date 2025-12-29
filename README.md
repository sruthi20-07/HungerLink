# HungerLink

## Real-Time Food Surplus Coordination System

HungerLink is a full-stack web platform that connects college canteens and mess providers with nearby NGOs and volunteers to redistribute surplus food efficiently, reducing waste and improving food accessibility.

The system supports real-time updates, location-based matching, role-based access control, and secure authentication.

---

## 🧱 System Architecture

| Layer | Technology |
|------|-----------|
| Backend | Node.js, Express, TypeScript |
| Frontend | React, TypeScript |
| Database | MongoDB Atlas |
| Real-time | Socket.io |
| Authentication | JWT |
| Geo Matching | MongoDB Geospatial Indexing |

---

## 🗂️ Project Structure

```text
hungerlink/
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── utils/
│   │   ├── config/
│   │   └── types/
│   ├── tests/
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   ├── types/
│   │   └── utils/
│   ├── public/
│   └── package.json
└── shared/
    └── types/
