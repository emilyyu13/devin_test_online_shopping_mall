<template>
  <div class="container">
    <h1 class="page-title">Shopping Cart</h1>
    
    <div v-if="!cartItems || cartItems.length === 0" class="empty-cart">
      <p>Your cart is empty.</p>
      <nuxt-link to="/" class="continue-shopping">Continue Shopping</nuxt-link>
    </div>
    
    <div v-else class="cart-content">
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="item-image">
            <div class="image-placeholder"></div>
          </div>
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p class="item-price">${{ item.price.toFixed(2) }}</p>
          </div>
          <div class="item-quantity">
            <button @click="decreaseQuantity(item)" class="quantity-btn">-</button>
            <span class="quantity">{{ item.quantity }}</span>
            <button @click="increaseQuantity(item)" class="quantity-btn">+</button>
          </div>
          <div class="item-total">
            ${{ (item.price * item.quantity).toFixed(2) }}
          </div>
          <button @click="removeItem(item.id)" class="remove-btn">Remove</button>
        </div>
      </div>
      
      <div class="cart-summary">
        <h2>Order Summary</h2>
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>${{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Shipping:</span>
          <span>${{ shipping.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Tax:</span>
          <span>${{ tax.toFixed(2) }}</span>
        </div>
        <div class="summary-row total">
          <span>Total:</span>
          <span>${{ total.toFixed(2) }}</span>
        </div>
        <button @click="checkout" class="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cartItems() {
      return this.$store.state.cart.items;
    },
    subtotal() {
      return this.$store.getters['cart/subtotal'] || 0;
    },
    shipping() {
      return this.$store.state.cart.shipping || 0;
    },
    tax() {
      return this.$store.getters['cart/tax'] || 0;
    },
    total() {
      return this.$store.getters['cart/total'] || 0;
    }
  },
  methods: {
    increaseQuantity(item) {
      this.$store.dispatch('cart/updateItemQuantity', {
        itemId: item.id,
        quantity: item.quantity + 1
      });
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        this.$store.dispatch('cart/updateItemQuantity', {
          itemId: item.id,
          quantity: item.quantity - 1
        });
      }
    },
    removeItem(itemId) {
      this.$store.dispatch('cart/removeFromCart', itemId);
    },
    async checkout() {
      try {
        // Prepare order data from cart
        const orderItems = this.cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity
        }));
        
        // Create order via API
        const orderData = {
          user_id: 1, // Using a default user ID for now
          order_items: orderItems
        };
        
        // Import API service
        const api = require('~/api').default;
        
        // Send order to backend
        const response = await api.createOrder(orderData);
        
        if (response.errors) {
          throw new Error(response.errors.join(', '));
        }
        
        // Clear cart after successful order
        this.$store.dispatch('cart/clearCart');
        
        // Show success message
        alert('Thank you for your order! Order #' + response.id + ' has been placed.');
        
        // Redirect to orders page
        this.$router.push('/orders');
      } catch (error) {
        console.error('Checkout error:', error);
        alert('There was an error processing your order: ' + error.message);
      }
    }
  },
  mounted() {
    // Initialize cart from localStorage
    this.$store.dispatch('cart/initCart');
  }
}
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  margin-bottom: 30px;
}

.empty-cart {
  text-align: center;
  padding: 50px 0;
}

.continue-shopping {
  display: inline-block;
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 20px;
}

.cart-content {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.cart-items {
  flex: 1 1 65%;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 15px;
}

.item-image {
  width: 100px;
  height: 100px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
}

.image-placeholder {
  width: 60px;
  height: 60px;
  background-color: #ddd;
  border-radius: 50%;
}

.item-details {
  flex: 1;
}

.item-price {
  color: #666;
  margin: 5px 0;
}

.item-quantity {
  display: flex;
  align-items: center;
  margin: 0 20px;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.quantity {
  margin: 0 10px;
  min-width: 20px;
  text-align: center;
}

.item-total {
  font-weight: bold;
  margin: 0 20px;
  min-width: 80px;
  text-align: right;
}

.remove-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.cart-summary {
  flex: 1 1 25%;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  align-self: flex-start;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.total {
  font-weight: bold;
  font-size: 1.2em;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
}

.checkout-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  font-size: 1.1em;
}

@media (max-width: 768px) {
  .cart-content {
    flex-direction: column;
  }
  
  .cart-item {
    flex-wrap: wrap;
  }
  
  .item-quantity, .item-total {
    margin: 10px 0;
  }
}
</style>
</template>
