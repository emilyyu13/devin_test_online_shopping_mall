<template>
  <div>
    <nav class="navbar">
      <div class="navbar-container">
        <div class="navbar-logo">
          <nuxt-link to="/">Online Shopping Mall</nuxt-link>
        </div>
        <div class="navbar-links">
          <nuxt-link to="/" class="nav-link">Home</nuxt-link>
          <nuxt-link to="/products" class="nav-link">Products</nuxt-link>
          <nuxt-link to="/orders" class="nav-link">Orders</nuxt-link>
          <nuxt-link to="/cart" class="nav-link cart-link">
            Cart
            <span v-if="cartItemCount > 0" class="cart-badge">{{ cartItemCount }}</span>
          </nuxt-link>
          <nuxt-link to="/account" class="nav-link">My Account</nuxt-link>
        </div>
      </div>
    </nav>
    <div class="content">
      <div v-if="notification.show" class="notification">
        {{ notification.message }}
      </div>
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notification: {
        show: false,
        message: ''
      }
    }
  },
  computed: {
    cartItemCount() {
      return this.$store ? this.$store.getters.itemCount : 0
    }
  },
  methods: {
    showNotification(message) {
      this.notification = {
        show: true,
        message
      }
      
      setTimeout(() => {
        this.notification.show = false
      }, 3000)
    }
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.navbar {
  background-color: #333;
  color: white;
  padding: 10px 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-logo a {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}

.navbar-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
  position: relative;
}

.nav-link:hover {
  background-color: #555;
}

.cart-link {
  display: flex;
  align-items: center;
}

.cart-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #f44336;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 12px;
  margin-left: 5px;
}

.content {
  padding-top: 20px;
  position: relative;
}

.notification {
  position: fixed;
  top: 70px;
  right: 20px;
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease-out;
}
</style>
