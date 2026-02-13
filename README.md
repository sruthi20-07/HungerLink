# 🍽️ HungerLink – Smart Food Surplus Redistribution Platform

HungerLink is a real-time food redistribution platform that connects food providers (Hostels, Restaurants, Event organizers) with nearby NGOs to reduce food waste and fight hunger.

Built as a full-stack real-time application for hackathon submission.


## 🚀 Problem Statement

Every day, large quantities of surplus food are wasted while many people go hungry.

HungerLink solves this by:
- Allowing food providers to report surplus food instantly
- Notifying nearby NGOs in real-time
- Allowing NGOs to claim food before it goes to waste

---

## 🌟 Key Features

### 🔐 Authentication System
- Register as Hostel Admin (Food Provider)
- Register as NGO
- Role-based dashboard access
- Secure login system

---

### 🏢 Food Provider (Hostel Admin) Features
- Create surplus food report
- Share live location (geolocation)
- View surplus list
- View registered NGOs
- Real-time updates when NGO claims surplus

---

### 🤝 NGO Features
- Real-time surplus notifications
- View food details (type, quantity, provider)
- Accept surplus food
- Once claimed, others cannot claim it
- See which organization posted the food

---

### 📡 Real-Time System
- Built using Socket.IO
- Live surplus updates
- Instant NGO notification
- Surplus claim broadcast system

---

### 🗺️ Location-Based Matching
- Uses browser geolocation
- Nearby NGOs fetched using geo queries
- Map view integration

---

## 🛠️ Tech Stack

### Frontend
- React (TypeScript)
- React Router
- Axios
- Socket.IO Client
- CSS (Custom styling)

### Backend
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- Socket.IO

### Tools
- Git & GitHub
- Postman
- VS Code

---

## 📂 Project Structure



HungerLink/
│
├── client/ # React Frontend
│ ├── pages/
│ ├── components/
│ ├── services/
│ └── context/
│
├── server/ # Express Backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── middleware/
│
└── shared/


---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/sruthi20-07/HungerLink.git
cd HungerLink

2️⃣ Install Dependencies

Frontend:

cd client
npm install


Backend:

cd ../server
npm install

3️⃣ Environment Variables

Create .env inside server folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4️⃣ Run the Application

Start Backend:

cd server
npm run dev


Start Frontend:

cd client
npm start


App runs on:

Frontend: http://localhost:3000
Backend: http://localhost:5000

🔄 How It Works

Hostel Admin logs in

Creates surplus food report

Server stores surplus

Socket broadcasts event

NGOs receive notification instantly

First NGO to accept claims it

System locks surplus from further claims

🔐 Security

Role-based route protection

Surplus cannot be claimed twice

Basic validation on both frontend and backend

🎯 Future Improvements

Add delivery tracking

Add rating system

SMS notifications

Admin analytics dashboard

Deployment (Render / Vercel / Railway)
