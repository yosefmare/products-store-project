# Full Stack E-commerce

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" height="50"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" height="50"/>
  <img src="https://img.shields.io/badge/Redux%20Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Toolkit" height="50"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" height="50"/>
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" height="50"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" height="50"/>
</p>

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Introduction
Full Stack E-commerce is a comprehensive e-commerce platform designed to provide a seamless shopping experience. The project includes a robust frontend built with React and TypeScript, state management handled by Redux, and a backend powered by Node.js with TypeScript, Express, and MongoDB. The application uses Axios for API calls and JWT for authentication.

## Features
- User Authentication and Authorization
- Product Listing and Filtering
- Shopping Cart
- Order Management
- User Profile Management
- Admin Dashboard for managing products and orders

## Technologies
- **Frontend:** React, TypeScript, Redux
- **Backend:** Node.js, TypeScript, Express
- **Database:** MongoDB
- **API Calls:** Axios
- **Authentication:** JWT

## Installation

### Prerequisites
- Node.js
- MongoDB

### Backend Setup
1. Clone the repository
    ```bash
    git clone https://github.com/yosefmare/products-store-project.git
    ```
2. Navigate to the backend directory
    ```bash
    cd Produts\ Store/backend/
    ```
3. Install dependencies
    ```bash
    npm install
    ```
4. Create a `.env` file in the backend directory and add the following environment variables:
    ```
    PORT=8000
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```
5. Start the backend server
    ```bash
    npm start
    ```

### Frontend Setup
1. Navigate to the frontend directory
    ```bash
    cd Produts\ Store/frontend/produts-stroe/
    ```
2. Install dependencies
    ```bash
    npm install
    ```
3. Start the frontend development server
    ```bash
    npm start
    ```

## Usage
 the frontend are running, you can access the application at `http://localhost:3000/login`.

# api-endpoints
### Authentication
- **POST** `/auth/register` - Register a new user
- **POST** `/auth/login` - Authenticate a user and return a token

### Products
- **GET** `/products/getAllProducts` - Get all products
- **GET** `/products/getProduct/:id` - Get a specific product by ID
- **POST** `/products/addProduct` - Create a new product (requires admin authentication)
- **PATCH** `/products/editProduct/:id` - Update a product (requires admin authentication)
- **DELETE** `/products/deleteProduct/:id` - Delete a product (requires admin authentication)

### Customers
- **GET** `customers/getAllCustomers` - Get all customers (requires admin authentication)
- **GET** `customers/getCustomer/:id` - Get a specific customer by ID
(requires admin authentication)
- **POST** `customers/addCustomer` - Create a new customer 
- **PATCH** `customers/updateCustomer/:id` - Update a customer (requires admin authentication)
- **DELETE** `customers/deleteCustomer/:id` - Delete a customer (requires admin authentication)

### Purchases
- **POST** `/purchases/addPurchases` - Create a new purchase 
- **GET** `/purchases/getAllPurchases` - Get all purchases (requires admin authentication)
- **GET** `/purchases/getPurchase/:id` - Get a specific purchase by ID (requires authentication)
- **PATCH** `/purchases/editPurchases/:id` - Update a purchase 
- **DELETE** `/purchases/deletePurchases/:id` - Delete a purchase

## Contributing
Guidelines for contributing to the project:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

