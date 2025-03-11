# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# Clear existing data
puts "Clearing existing data..."
OrderItem.destroy_all
Order.destroy_all
Product.destroy_all
User.destroy_all

# Create users
puts "Creating users..."
user1 = User.create!(
  name: "John Doe",
  email: "john.doe@example.com"
)

# Create products
puts "Creating products..."
product1 = Product.create!(
  name: "Product 1",
  description: "Description for product 1",
  price: 19.99,
  stock: 10
)

product2 = Product.create!(
  name: "Product 2",
  description: "Description for product 2",
  price: 29.99,
  stock: 5
)

product3 = Product.create!(
  name: "Product 3",
  description: "Description for product 3",
  price: 39.99,
  stock: 8
)

# Create orders
puts "Creating orders..."
order1 = Order.create!(
  user: user1,
  status: "completed",
  total: 69.97
)

order2 = Order.create!(
  user: user1,
  status: "processing",
  total: 39.99
)

# Create order items
puts "Creating order items..."
OrderItem.create!(
  order: order1,
  product: product1,
  quantity: 2,
  price: 19.99
)

OrderItem.create!(
  order: order1,
  product: product2,
  quantity: 1,
  price: 29.99
)

OrderItem.create!(
  order: order2,
  product: product3,
  quantity: 1,
  price: 39.99
)

puts "Seed data created successfully!"
