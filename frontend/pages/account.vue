<template>
  <div class="account-page">
    <h1>My Account</h1>
    
    <div class="account-info">
      <h2>Account Information</h2>
      <div class="info-card">
        <div class="info-row">
          <strong>Name:</strong>
          <span>John Doe</span>
        </div>
        <div class="info-row">
          <strong>Email:</strong>
          <span>john.doe@example.com</span>
        </div>
        <div class="info-row">
          <strong>Member Since:</strong>
          <span>January 1, 2025</span>
        </div>
      </div>
    </div>
    
    <div class="account-section">
      <h2>Order History</h2>
      <div class="order-list">
        <div class="order-item">
          <div class="order-header">
            <span class="order-id">Order #1001</span>
            <span class="order-date">March 15, 2025</span>
            <span class="order-status">Delivered</span>
          </div>
          <div class="order-details">
            <div class="order-product">
              <span>Product 1</span>
              <span>$19.99</span>
            </div>
            <div class="order-product">
              <span>Product 3</span>
              <span>$39.99</span>
            </div>
            <div class="order-total">
              <strong>Total:</strong>
              <strong>$59.98</strong>
            </div>
          </div>
        </div>
        
        <div class="order-item">
          <div class="order-header">
            <span class="order-id">Order #1002</span>
            <span class="order-date">April 2, 2025</span>
            <span class="order-status">Processing</span>
          </div>
          <div class="order-details">
            <div class="order-product">
              <span>Product 2</span>
              <span>$29.99</span>
            </div>
            <div class="order-total">
              <strong>Total:</strong>
              <strong>$29.99</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="account-section">
      <h2>Settings</h2>
      <div class="settings-card">
        <button class="settings-button">Edit Profile</button>
        <button class="settings-button">Change Password</button>
        <button class="settings-button">Manage Payment Methods</button>
        <button class="settings-button">Update Shipping Address</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountPage',
  head() {
    return {
      title: 'My Account'
    }
  }
}
</script>

<style scoped>
.account-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 30px;
  text-align: center;
}

h2 {
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.account-info, .account-section {
  margin-bottom: 40px;
}

.info-card, .settings-card {
  background-color: #f9f9f9;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.info-row:last-child {
  border-bottom: none;
}

.order-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.order-item {
  border: 1px solid #eee;
  border-radius: 5px;
  overflow: hidden;
}

.order-header {
  background-color: #f5f5f5;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
}

.order-status {
  font-weight: bold;
}

.order-details {
  padding: 15px;
}

.order-product {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}

.order-total {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #eee;
}

.settings-button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.settings-button:hover {
  background-color: #45a049;
}

.settings-button:last-child {
  margin-bottom: 0;
}
</style>
