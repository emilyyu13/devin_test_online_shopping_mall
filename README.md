# Online Shopping Mall

An e-commerce platform with product browsing, cart functionality, and order management.

## Tech Stack

- **Frontend**: Nuxt.js
- **Backend**: Ruby on Rails API (Ruby 3.2.3)
- **Database**: PostgreSQL

## Features

- Product browsing and listing
- Shopping cart functionality
- Order creation and management
- User management

## Setup Instructions

### Prerequisites

- Ruby 3.2.3
- Node.js and npm
- PostgreSQL

### Backend Setup

```bash
cd backend
bundle install
rails db:create db:migrate db:seed
rails server -p 3000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at http://localhost:8000 and will connect to the backend at http://localhost:3000/api

## API Endpoints

### Products
- `GET /api/v1/products` - List all products
- `GET /api/v1/products/:id` - Get a specific product
- `POST /api/v1/products` - Create a new product
- `PUT /api/v1/products/:id` - Update a product
- `DELETE /api/v1/products/:id` - Delete a product

### Orders
- `GET /api/v1/orders` - List all orders
- `GET /api/v1/orders/:id` - Get a specific order
- `POST /api/v1/orders` - Create a new order
- `PUT /api/v1/orders/:id` - Update an order status

### Users
- `POST /api/v1/users` - Create a new user
- `GET /api/v1/users/:id` - Get a specific user
- `PUT /api/v1/users/:id` - Update a user
- `GET /api/v1/users/:user_id/orders` - Get orders for a specific user
