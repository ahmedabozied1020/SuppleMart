🛒 SuppleMart : 
A Full-Stack E-Commerce Platform built with Angular, Node.js, and MongoDB
Browse, search, and purchase products with admin-powered management features.

📖 Overview
SuppleMart is a modern full-stack e-commerce application designed for both customers and administrators.

Main Capabilities:

Product Catalog – Browse, search, filter, and paginate products

Authentication – Secure JWT-based login & registration with role-based access

Shopping Cart – Persistent cart state for guests & logged-in users

Admin Dashboard – Product CRUD, category management, and image uploads

Multi-Role Support – Separate experiences for customers & admins

🏗 Architecture
SuppleMart follows a client–server architecture with a clear separation of concerns:

Frontend (Angular + TypeScript) ⇆ REST API (Express.js) ⇆ Database (MongoDB)

Frontend: Angular, TailwindCSS, DaisyUI, RxJS
Backend: Node.js, Express.js, MongoDB, JWT
Cloud Storage: ImageKit for product images

🚀 Features
🔹 Product Management
Create: Add products with image uploads and category assignment

Read: Paginated and filtered product listings, optimized for the homepage

Update: Edit complete product details

Delete: Remove products from the store

🔹 Authentication & User Roles
JWT authentication

Roles:

User → Shop & manage cart

Admin → Full product management

🔹 Shopping Cart
Guests → Saved in browser localStorage

Logged-in users → Synced with MongoDB

Cart merge on login

🛠 Tech Stack
Frontend

Angular + TypeScript

RxJS for state management

TailwindCSS + DaisyUI for styling

Angular HttpClient for API calls

Backend

Node.js + Express.js

MongoDB + Mongoose

JWT Authentication

Multer + ImageKit for image management

Joi for validation

Winston for logging

Development

dotenv for configuration

Morgan for HTTP request logging

Custom error handling

📂 Project Structure
server/ – Backend API (controllers, models, routes, utilities)

client/ – Frontend app (components, pages, services)

🖥 Installation & Setup
Clone the repository

Install backend dependencies (cd server && npm install)

Install frontend dependencies (cd client && npm install)

Add environment variables in server/.env:

PORT

MONGO_URI

JWT_SECRET

IMAGEKIT keys & endpoint

Start backend (npm start in server folder)

Start frontend (ng serve in client folder)
