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
          <nuxt-link to="/categories" class="nav-link">Categories</nuxt-link>
          <nuxt-link to="/orders" class="nav-link">Orders</nuxt-link>
          <nuxt-link to="/account" class="nav-link">My Account</nuxt-link>
        </div>
      </div>
    </nav>
    <div class="content">
      <nuxt />
    </div>
  </div>
</template>

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
}

.nav-link:hover {
  background-color: #555;
}

.content {
  padding-top: 20px;
}
</style>
