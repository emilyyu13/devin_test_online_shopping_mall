const API_URL = 'http://localhost:3000/api/v1';

export default {
  async getProducts() {
    const response = await fetch(`${API_URL}/products`, {
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },
  
  async getProduct(id) {
    const response = await fetch(`${API_URL}/products/${id}`, {
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },
  
  async getOrders() {
    const response = await fetch(`${API_URL}/orders`, {
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },
  
  async getOrder(id) {
    const response = await fetch(`${API_URL}/orders/${id}`, {
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },
  
  async createOrder(orderData) {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(orderData)
    });
    
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  }
};
