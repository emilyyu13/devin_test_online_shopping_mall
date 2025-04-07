const API_URL = 'http://localhost:3000/api/v1';

export default {
  async getProducts() {
    try {
      console.log('Fetching products from API...');
      const response = await fetch(`${API_URL}/products`, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Products fetched successfully:', data);
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },
  
  async getProduct(id) {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      return null;
    }
  },
  
  async getOrders() {
    try {
      const response = await fetch(`${API_URL}/orders`, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  },
  
  async getOrder(id) {
    try {
      const response = await fetch(`${API_URL}/orders/${id}`, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching order ${id}:`, error);
      return null;
    }
  },
  
  async createOrder(orderData) {
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const text = await response.text();
      return text ? JSON.parse(text) : {};
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }
};
