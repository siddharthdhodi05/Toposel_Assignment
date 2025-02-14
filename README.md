# 🔐 User Authentication API (Toposel Assignment)

This is a **User Authentication System** built using **Node.js, Express, MongoDB, and JWT**. The API allows users to **register, login, and search for users** using their email or username.

## 🚀 Features
- ✅ User Registration
- 🔑 Secure Login with JWT Authentication
- 🔎 Search Users by Email or Username
- 🍪 Cookie-based Authentication

## 📁 Project Structure
```
📂 UserAuthApp
├── 📁 config          # Database configuration
├── 📁 controllers     # API controllers
├── 📁 middlewares     # Authentication middleware
├── 📁 models          # Mongoose schemas
├── 📁 routes          # API routes
├── 📄 .env            # Environment variables
├── 📄 index.js        # Entry point
└── 📄 README.md       # Project documentation
```

## 🛠 Installation & Setup
1. **Clone the repository**
   ```sh
   git clone https://github.com/siddharthdhodi05/Toposel_Assignment
   cd Toposel_Assignment
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Set up environment variables** in `.env` file
   ```env
   PORT=8004
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
4. **Run the server**
   ```sh
   npm run dev
   ```

## 📌 API Endpoints
### 🔹 User Registration
- **Endpoint:** `POST /api/v1/user/register`
- **Request Body:**
  ```json
  {
    "username": "johndoe",
    "email": "johndoe@example.com",
    "password": "securepassword",
    "fullName": "John Doe",
    "gender": "Male",
    "DOB": "2000-01-01",
    "country": "USA"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Account created successfully.",
    "success": true
  }
  ```

### 🔹 User Login
- **Endpoint:** `POST /api/v1/user/login`
- **Request Body:**
  ```json
  {
    "username": "johndoe",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Welcome back, John Doe!",
    "user": { ... },
    "success": true
  }
  ```

### 🔹 Search User (Authenticated)
- **Endpoint:** `POST /api/v1/user/search`
- **Headers:** `{ Cookie: token=your_jwt_token }`
- **Request Body:**
  ```json
  {
    "query": "johndoe@example.com"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "user": { ... }
  }
  ```

## 🤝 Contributing
Feel free to open issues or submit pull requests if you find any improvements!

## 📝 License
This project is licensed under the **MIT License**.

---
💡 **Developed by Siddharth Dhodi**
