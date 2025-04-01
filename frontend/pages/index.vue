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
      ]
    }
  },
  methods: {
    addToCart(product) {
      // Check if there's stock available
      const productIndex = this.products.findIndex(p => p.id === product.id)
      if (productIndex !== -1 && this.products[productIndex].stock > 0) {
        // Decrease stock
        this.products[productIndex].stock--
        // Add to cart
        this.$store.dispatch('cart/addToCart', product)
        
        // Show notification
        this.showAddedToCartNotification(product.name)
        
        // Add animation to the button
        const button = document.activeElement
        button.classList.add('added-to-cart')
        setTimeout(() => {
          button.classList.remove('added-to-cart')
        }, 1000)
      }
    },
    
    showAddedToCartNotification(productName) {
      // Use the root layout's notification system
      if (this.$root.$children[0] && this.$root.$children[0].showNotification) {
        this.$root.$children[0].showNotification(`${productName} added to cart!`)
      }
    }
  },
  mounted() {
    // Initialize cart from localStorage
    this.$store.dispatch('cart/initCart')
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

button.added-to-cart {
  background-color: #45a049;
  animation: pulse 1s;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
