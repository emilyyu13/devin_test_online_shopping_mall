<template>
  <div class="container">
    <h1 class="page-title">Products</h1>
    
    <div class="filters">
      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search products..." 
          class="search-input"
        />
      </div>
      
      <div class="filter-options">
        <div class="filter-group">
          <label>Category:</label>
          <select v-model="selectedCategory" class="filter-select">
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="home">Home & Kitchen</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>Sort By:</label>
          <select v-model="sortBy" class="filter-select">
            <option value="name">Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
    
    <div class="products-grid">
      <div v-for="product in filteredProducts" :key="product.id" class="product-card">
        <div class="product-image">
          <div class="image-placeholder"></div>
        </div>
        <div class="product-details">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-description">{{ product.description }}</p>
          <p class="product-price">${{ product.price.toFixed(2) }}</p>
          <p class="product-stock" :class="{ 'low-stock': product.stock < 5 }">
            In Stock: {{ product.stock }}
          </p>
          <button 
            @click="addToCart(product)" 
            :disabled="product.stock <= 0"
            class="add-to-cart-btn"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      sortBy: 'name',
      products: [
        { 
          id: 1, 
          name: 'Product 1', 
          description: 'Description for product 1', 
          price: 19.99, 
          stock: 10,
          category: 'electronics'
        },
        { 
          id: 2, 
          name: 'Product 2', 
          description: 'Description for product 2', 
          price: 29.99, 
          stock: 5,
          category: 'clothing'
        },
        { 
          id: 3, 
          name: 'Product 3', 
          description: 'Description for product 3', 
          price: 39.99, 
          stock: 8,
          category: 'home'
        },
        { 
          id: 4, 
          name: 'Product 4', 
          description: 'Description for product 4', 
          price: 49.99, 
          stock: 3,
          category: 'electronics'
        },
        { 
          id: 5, 
          name: 'Product 5', 
          description: 'Description for product 5', 
          price: 59.99, 
          stock: 12,
          category: 'clothing'
        },
        { 
          id: 6, 
          name: 'Product 6', 
          description: 'Description for product 6', 
          price: 69.99, 
          stock: 0,
          category: 'home'
        }
      ]
    }
  },
  computed: {
    filteredProducts() {
      let result = [...this.products];
      
      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
        );
      }
      
      // Filter by category
      if (this.selectedCategory) {
        result = result.filter(product => product.category === this.selectedCategory);
      }
      
      // Sort products
      if (this.sortBy === 'name') {
        result.sort((a, b) => a.name.localeCompare(b.name));
      } else if (this.sortBy === 'price-low') {
        result.sort((a, b) => a.price - b.price);
      } else if (this.sortBy === 'price-high') {
        result.sort((a, b) => b.price - a.price);
      }
      
      return result;
    }
  },
  methods: {
    addToCart(product) {
      // Check if there's stock available
      if (product.stock > 0) {
        // Decrease stock
        const productIndex = this.products.findIndex(p => p.id === product.id);
        if (productIndex !== -1) {
          this.products[productIndex].stock--;
          // Add to cart
          this.$store.dispatch('addToCart', product);
        }
      }
    }
  },
  mounted() {
    // Initialize cart from localStorage
    this.$store.dispatch('initCart');
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

.filters {
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
}

.search-box {
  flex: 1;
  min-width: 250px;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.filter-options {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.product-image {
  height: 200px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-placeholder {
  width: 100px;
  height: 100px;
  background-color: #ddd;
  border-radius: 50%;
}

.product-details {
  padding: 20px;
}

.product-name {
  margin-top: 0;
  margin-bottom: 10px;
}

.product-description {
  color: #666;
  margin-bottom: 15px;
}

.product-price {
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.product-stock {
  margin-bottom: 15px;
}

.low-stock {
  color: #f44336;
}

.add-to-cart-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
}

.add-to-cart-btn:hover:not(:disabled) {
  background-color: #45a049;
}

.add-to-cart-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-options {
    flex-direction: column;
  }
}
</style>
</template>
