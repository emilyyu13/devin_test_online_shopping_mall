<template>
  <div class="container">
    <div class="products">
      <div v-for="product in products" :key="product.id" class="product-card">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p class="price">${{ product.price }}</p>
        <p>In Stock: {{ product.stock }}</p>
        <button @click="addToCart(product)" :disabled="product.stock <= 0">Add to Cart</button>
      </div>
    </div>
    
    <div class="cart" v-if="cart.length > 0">
      <h2>Your Cart</h2>
      <div v-for="item in cart" :key="item.product.id" class="cart-item">
        <span>{{ item.product.name }} - ${{ item.product.price }} x {{ item.quantity }}</span>
        <button @click="removeFromCart(item.product)">Remove</button>
      </div>
      <p class="total">Total: ${{ cartTotal }}</p>
      <button @click="checkout">Checkout</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        { id: 1, name: 'Product 1', description: 'Description for product 1', price: 19.99, stock: 10 },
        { id: 2, name: 'Product 2', description: 'Description for product 2', price: 29.99, stock: 5 },
        { id: 3, name: 'Product 3', description: 'Description for product 3', price: 39.99, stock: 8 }
      ],
      cart: []
    }
  },
  computed: {
    cartTotal() {
      return this.cart.reduce((total, item) => {
        return total + (item.product.price * item.quantity)
      }, 0).toFixed(2)
    }
  },
  methods: {
    addToCart(product) {
      const existingItem = this.cart.find(item => item.product.id === product.id)
      
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.cart.push({
          product,
          quantity: 1
        })
      }
      
      // Decrease stock
      const productIndex = this.products.findIndex(p => p.id === product.id)
      if (productIndex !== -1) {
        this.products[productIndex].stock--
      }
    },
    removeFromCart(product) {
      const itemIndex = this.cart.findIndex(item => item.product.id === product.id)
      
      if (itemIndex !== -1) {
        const item = this.cart[itemIndex]
        
        // Restore stock
        const productIndex = this.products.findIndex(p => p.id === product.id)
        if (productIndex !== -1) {
          this.products[productIndex].stock += item.quantity
        }
        
        // Remove from cart
        this.cart.splice(itemIndex, 1)
      }
    },
    checkout() {
      // In a real application, this would send the order to the backend
      alert('Order placed successfully!')
      this.cart = []
    }
  }
}
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
  margin-bottom: 30px;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.product-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
}

.price {
  font-weight: bold;
  color: #e53935;
}

.cart {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 5px;
  margin-top: 30px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.total {
  font-weight: bold;
  text-align: right;
  margin: 15px 0;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #45a049;
}
</style>
