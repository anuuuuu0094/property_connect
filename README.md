# 🏘️ Property Connect

A **modern real estate web platform** built with **React, Vite, Tailwind CSS, Node.js, Express.js, and MongoDB**.  
Property Connect enables users to **buy, sell, and manage properties** seamlessly, featuring **secure authentication**, **role-based access control**, and a **clean, responsive interface** for all user types.

---

## 🚀 Features

- 🔐 **Secure Authentication:** User registration and login secured using **JWT** and **bcrypt** for encrypted credentials.  
- 🧩 **Role-Based Access Control (RBAC):** Supports **Admin**, **Agent**, **Seller**, and **Buyer** roles with specific permissions.  
- 🏠 **Property Management:** Full CRUD functionality for adding, editing, viewing, and deleting property listings.  
- 🌐 **RESTful API:** Built using **Node.js** and **Express**, ensuring clean, modular, and scalable backend architecture.  
- 🧮 **EMI Calculator:** Integrated financial calculator for estimating loan payments.  
- 🎨 **Responsive UI:** Built with **React Hooks**, **Vite**, and **Tailwind CSS** for fast, modern, and mobile-friendly design.  
- 💾 **Database:** **MongoDB** stores all user and property data securely.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|---------------|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ODM) |
| Authentication | JWT, bcrypt |
| API | RESTful endpoints |
| Hosting | Render / Vercel / MongoDB Atlas |

---

## 🧩 Project Overview

**Property Connect** is a full-stack real estate management system that bridges property owners, agents, and buyers.  
Key functionalities include:
- Authentication and role-based user dashboards.  
- Property CRUD operations (create, update, delete, view).  
- Real-time data updates through RESTful APIs.  
- A responsive, dynamic frontend integrated with backend services.  
- EMI calculator for loan estimation.  

---

## ⚙️ Setup Instructions

1. **Clone the Repository**
   - `git clone https://github.com/anuuuuu0094/Property-Connect.git`
   - `cd Property-Connect`

2. **Install Dependencies**
   - Frontend: `cd client && npm install`  
   - Backend: `cd server && npm install`

3. **Set Up Environment Variables**
   - Create a `.env` file in the `server` directory and add:
     - `MONGO_URI=your_mongodb_connection_string`
     - `JWT_SECRET=your_secret_key`
     - `PORT=5000`

4. **Run the Application**
   - Backend: `npm run dev` (or `nodemon server.js`)  
   - Frontend: `npm run dev`

5. **Access the App**
   - Visit: `http://localhost:5173` (Frontend)  
   - API: `http://localhost:5000/api`

---

## 🧠 Key Functionalities

### 🔒 Authentication & Authorization
- JWT-based authentication with password hashing using bcrypt.  
- Role-based access control for Admin, Agent, Seller, and Buyer.  

### 🏘️ Property CRUD
- Create, Read, Update, and Delete property listings.  
- Filter and search properties by price, location, and type.  

### 💰 EMI Calculator
- Interactive calculator for estimating property loan payments dynamically using React state management.  

---


## 🔐 Security Features

- Password hashing with **bcrypt**.  
- JWT-based secure sessions and token validation.  
- Role-based permissions to prevent unauthorized actions.  
- MongoDB validation and input sanitization for API safety.

---

## 📈 Future Enhancements

- 🗺️ Google Maps integration for property locations.  
- 💬 Real-time chat between buyers and agents.  
- 📤 File uploads for property images and documents.  
- 📊 Analytics dashboard for admins.  
- 📱 Progressive Web App (PWA) version for mobile.

---

## 🤝 Contributing

Contributions are welcome!  
1. Fork this repository.  
2. Create a new branch (`feature-xyz`).  
3. Commit and push your changes.  
4. Create a Pull Request for review.

---

## 🧑‍💻 Author

**Your Name**  
💼 [LinkedIn](https://www.linkedin.com/in/anubhavmaurya)  
💻 [GitHub](https://github.com/anuuuuu0094)  
📧 your.mauryaanubhav660@gmail.com

---

## 📝 License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute this project for learning and development.

---

⭐ **If you like this project, don’t forget to give it a star!**
