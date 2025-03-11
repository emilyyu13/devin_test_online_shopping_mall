# Online Shopping Mall - Startup Instructions

## Prerequisites
- Ruby 3.2.3
- Node.js and npm
- PostgreSQL

## Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
bundle install

# Create and set up the database
rails db:create db:migrate db:seed

# Start the Rails server
rails server -p 3000
```

## Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the Nuxt development server
npm run dev
```

## Accessing the Application
After starting both servers, you can expose the ports to access them remotely:

```bash
# Expose the frontend port
expose_port 8000

# Expose the backend API port
expose_port 3000
```

The exposed URLs will be provided after running these commands.

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
