export const state = () => ({
  items: [],
  shipping: 10.00,
  taxRate: 0.08
})

export const getters = {
  itemCount: state => {
    return state.items.reduce((count, item) => count + item.quantity, 0)
  },
  subtotal: state => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  },
  tax: (state, getters) => {
    return getters.subtotal * state.taxRate
  },
  total: (state, getters) => {
    return getters.subtotal + state.shipping + getters.tax
  }
}

export const mutations = {
  addItem(state, product) {
    const existingItem = state.items.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity++
    } else {
      state.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      })
    }
    
    localStorage.setItem('cart', JSON.stringify(state.items))
  },
  
  removeItem(state, itemId) {
    const index = state.items.findIndex(item => item.id === itemId)
    if (index !== -1) {
      state.items.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(state.items))
    }
  },
  
  updateQuantity(state, { itemId, quantity }) {
    const item = state.items.find(item => item.id === itemId)
    if (item) {
      item.quantity = quantity
      localStorage.setItem('cart', JSON.stringify(state.items))
    }
  },
  
  loadCart(state) {
    if (process.client) {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        state.items = JSON.parse(savedCart)
      }
    }
  },
  
  clearCart(state) {
    state.items = []
    if (process.client) {
      localStorage.removeItem('cart')
    }
  }
}

export const actions = {
  addToCart({ commit }, product) {
    commit('addItem', product)
  },
  
  removeFromCart({ commit }, itemId) {
    commit('removeItem', itemId)
  },
  
  updateItemQuantity({ commit }, payload) {
    commit('updateQuantity', payload)
  },
  
  clearCart({ commit }) {
    commit('clearCart')
  },
  
  initCart({ commit }) {
    commit('loadCart')
  }
}
