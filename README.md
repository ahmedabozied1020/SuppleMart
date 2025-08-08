# 🛒 SuppleMart Overview

This document provides a comprehensive overview of the **SuppleMart** e-commerce application, covering its architecture, core systems, and implementation details.  
SuppleMart is a **full-stack web application** that enables users to browse and purchase products online, with administrative capabilities for product management.

For more details:  
- **Backend API endpoints & data models** → see **Backend Systems** section.  
- **Frontend component architecture & state management** → see **Frontend Application** section.  
- **Development setup & utilities** → see **Development & Utilities** section.  

---

## 🎯 System Purpose and Architecture

SuppleMart serves as a complete e-commerce platform with these key capabilities:

- **Product Catalog Management** → Browse, search, filter, and paginate through products  
- **User Authentication** → Registration, login, and role-based access control  
- **Shopping Cart** → Add/remove items, quantity management, persistent cart state  
- **Administrative Interface** → Product CRUD operations, image uploads, category management  
- **Multi-user Support** → Separate interfaces for customers and administrators  

---

## 🏗 High-Level System Architecture

The application follows a **client-server architecture** with clear separation between frontend and backend concerns.

---

## 🧩 Core System Components

### 1. Application Bootstrap & State Management
- **AppComponent** initializes core services from `localStorage` to maintain user session & cart state across browser refreshes.

**Key Sources:**
- `client/src/app/app.component.ts` (lines 22–37)  
- `client/src/app/services/observables/cart-products/cart-products.service.ts` (lines 20–22)  
- `client/src/app/services/observables/logged-in-user/logged-in-user.service.ts` (lines 17–19)  

---

### 2. Product Management System
The products system provides full **CRUD operations** with advanced features:

| Operation | Endpoint                | Controller Method   | Features |
|-----------|------------------------|---------------------|----------|
| Create    | POST `/products`       | `createProduct`     | Image upload, validation, category assignment |
| Read      | GET `/products`        | `getHomeProducts`   | Limited results for homepage |
| Read      | GET `/products/shop`   | `getPaginatedProducts` | Pagination, filtering, search |
| Update    | PATCH `/products/:id`  | `updateProduct`     | Full product modification |
| Delete    | DELETE `/products/:id` | `deleteProduct`     | Product removal |

**Key Sources:**
- `server/routes/products.routes.js` (1–65)  
- `server/controllers/products.controllers.js` (19–323)  
- `server/models/product.model.js` (1–75)  
- `server/utils/multerConfig.js` (1–18)  
- `server/utils/imageKitConfig.js` (1–30)  

---

### 3. Authentication & User Management
- **JWT-based security** with role-based access control.  
- **Roles:**
  - `user` → Standard customers with cart access  
  - `admin` → Administrative users with product management access  

**Key Sources:**
- `server/controllers/users.controllers.js` (61–90)  
- `server/middlewares/auth.js` (9–24)  
- `server/middlewares/checkRole.js` (1–5)  
- `server/models/user.model.js` (5–56)  

---

### 4. Shopping Cart Architecture
- Supports both **anonymous** and **authenticated** users.  

**Cart persistence:**
- **Anonymous** → Stored in browser `localStorage`  
- **Authenticated** → Synced between `localStorage` and MongoDB  
- **Login Merge** → Anonymous cart merged with user's cart after login  

**Key Sources:**
- `client/src/app/pages/cart/cart.component.ts` (1–92)  
- `client/src/app/services/http-requests/cart/cart.service.ts` (1–26)  
- `client/src/app/services/observables/cart-products/cart-products.service.ts` (1–73)  
- `server/controllers/cart.controllers.js` (1–172)  

---

## 🛠 Technology Stack

### Backend
- **Runtime:** Node.js + Express.js  
- **Database:** MongoDB + Mongoose  
- **Auth:** JWT + bcrypt password hashing  
- **File Upload:** Multer + ImageKit (cloud storage)  
- **Validation:** Joi  
- **Logging:** Winston logger  

### Frontend
- **Framework:** Angular + TypeScript  
- **State Management:** RxJS (BehaviorSubjects & Observables)  
- **Styling:** Tailwind CSS + DaisyUI  
- **HTTP Client:** Angular HttpClient (with interceptors)  
- **Persistence:** Browser `localStorage`  

### Development Tools
- **Config Management:** dotenv  
- **Error Handling:** Centralized custom error classes  
- **CORS:** Express CORS middleware  
- **Request Logging:** Morgan HTTP logger  

---

## 📌 Summary
SuppleMart demonstrates **modern full-stack development practices** with:
- Clear separation of concerns  
- Robust error handling  
- Scalable architecture patterns  
- Optimized user experience for both customers & admins  
