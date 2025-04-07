const API_URL = 'http://localhost:3000/api/v1';

export default {
  async getProducts() {
    const response = await fetch(`${API_URL}/products`);
    return response.json();
  },
  
  async getProduct(id) {
    const response = await fetch(`${API_URL}/products/${id}`);
    return response.json();
  },
  
  async getOrders() {
    const response = await fetch(`${API_URL}/orders`);
    return response.json();
  },
  
  async getOrder(id) {
    const response = await fetch(`${API_URL}/orders/${id}`);
    return response.json();
  },
  
  async createOrder(orderData) {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });
    return response.json();
  }
};
