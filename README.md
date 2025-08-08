🛒 SuppleMart
SuppleMart is a full-stack e-commerce application that allows users to browse, search, and purchase products online, while providing administrators with robust product management capabilities.

📌 Overview
This project demonstrates a modern, scalable e-commerce platform with:

Product Catalog Management – Browse, search, filter, and paginate products

User Authentication – JWT-based authentication with role-based access

Shopping Cart – Persistent cart state for both guests and logged-in users

Admin Interface – Product CRUD operations, image uploads, category management

Multi-User Support – Separate interfaces for customers and administrators

🏗 System Architecture
The application follows a client–server model with a clear separation between frontend and backend.

Frontend: Angular + TypeScript
Backend: Node.js + Express.js + MongoDB

scss
نسخ
تحرير
Frontend (Angular)  <---->  REST API (Express.js)  <---->  Database (MongoDB)
⚙️ Core Features
1. Product Management System
Operation	Endpoint	Controller Method	Features
Create	POST /products	createProduct	Image upload, validation, category assignment
Read	GET /products	getHomeProducts	Limited results for home page
Read	GET /products/shop	getPaginatedProducts	Pagination, filtering, search
Update	PATCH /products/:id	updateProduct	Full product data modification
Delete	DELETE /products/:id	deleteProduct	Product removal

2. Authentication & User Management
JWT-based authentication

Role-based access control:

user → Customers with shopping cart access

admin → Product management access

3. Shopping Cart
Anonymous users → Cart stored in localStorage

Authenticated users → Cart synced with MongoDB

Cart merge → Merges guest cart into user cart on login

🛠 Technology Stack
Backend
Node.js + Express.js

MongoDB + Mongoose

JWT Authentication

Multer & ImageKit (file uploads)

Joi (data validation)

Winston (logging)

Frontend
Angular + TypeScript

RxJS (state management)

Tailwind CSS + DaisyUI

Angular HttpClient + interceptors

LocalStorage (offline persistence)

Development Tools
dotenv (environment configuration)

Morgan (HTTP request logging)

Custom error handling middleware

📂 Project Structure (Relevant Files)
pgsql
نسخ
تحرير
SuppleMart/
│
├── server/
│   ├── index.js
│   ├── controllers/
│   │   ├── products.controllers.js
│   │   ├── users.controllers.js
│   ├── routes/
│   │   ├── products.routes.js
│   ├── models/
│   │   ├── product.model.js
│   │   ├── user.model.js
│   ├── utils/
│       ├── multerConfig.js
│       ├── imageKitConfig.js
│
└── client/
    ├── src/app/
        ├── app.component.ts
        ├── services/
        │   ├── observables/
        │   │   ├── cart-products.service.ts
        │   │   ├── logged-in-user.service.ts
