<template>
  <div class="container">
    <h1 class="title">Your Orders</h1>
    
    <div v-if="loading" class="loading">Loading orders...</div>
    
    <div v-else-if="error" class="no-orders">{{ error }}</div>
    
    <div v-else-if="orders.length === 0" class="no-orders">
      You don't have any orders yet.
    </div>
    
    <div v-else class="orders">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-header">
          <h3>Order #{{ order.id }}</h3>
          <span class="order-status" :class="order.status">{{ order.status }}</span>
        </div>
        
        <div class="order-date">
          Placed on: {{ formatDate(order.created_at) }}
        </div>
        
        <div class="order-items">
          <div v-for="item in order.order_items" :key="item.id" class="order-item">
            <span>{{ item.product.name }} x {{ item.quantity }}</span>
            <span>${{ item.price }}</span>
          </div>
        </div>
        
        <div class="order-total">
          Total: ${{ order.total }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
      loading: true,
      error: null
    }
  },
  async fetch() {
    try {
      // Fetch orders from the mock server
      const response = await fetch('http://localhost:3001/api-v1-orders.json')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      this.orders = await response.json()
      this.loading = false
    } catch (error) {
      console.error('Error fetching orders:', error)
      this.error = 'Error loading orders. Please try again later.'
      this.loading = false
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
  margin-bottom: 30px;
}

.loading {
  text-align: center;
  padding: 40px;
}

.no-orders {
  text-align: center;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.orders {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-card {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 5px;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.order-status {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  text-transform: uppercase;
}

.order-status.pending {
  background-color: #ffeb3b;
  color: #333;
}

.order-status.processing {
  background-color: #2196f3;
  color: white;
}

.order-status.completed {
  background-color: #4caf50;
  color: white;
}

.order-status.cancelled {
  background-color: #f44336;
  color: white;
}

.order-date {
  color: #666;
  margin-bottom: 15px;
}

.order-items {
  margin-bottom: 15px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.order-total {
  text-align: right;
  font-weight: bold;
  font-size: 1.1rem;
  margin-top: 10px;
}
</style>
