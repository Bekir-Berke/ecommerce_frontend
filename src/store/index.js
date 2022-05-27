import { createStore } from 'vuex'

export default createStore({
  state: {
    cart:[],
    products:[],
    categories:[],
    loggedIn:false
  },
  getters: {
    totalPrice(state){
      return state.cart.reduce((total, item) => total + item.totalPrice, 0)
    }
  },
  mutations: {
    addToCart(state, item){
      let product = state.cart.find(p => p.productName === item.productName)
      if(product){
        item.quantity = item.quantity + 1
        item.totalPrice = item.unitPrice * item.quantity
      }else{
        item.quantity = 1;
        item.totalPrice = item.unitPrice * item.quantity
        state.cart.push(item)
      }
    },
    removeItemQuantity(state,item){
      if(item.quantity !== undefined){
        if(item.quantity > 0){
          item.quantity = item.quantity - 1
          item.totalPrice = item.unitPrice * item.quantity
        }if(item.quantity == 0){
          let product = state.cart.find(c => c.productName === item.productName);
          state.cart.splice(state.cart.indexOf(product), 1);
        }
      }
    },
    removeFromCart(state, item){
      let product = state.cart.find(c => c.productName === item.productName);
      state.cart.splice(state.cart.indexOf(product), 1);
    },
    getProducts(state, category){
      if(category){
        fetch(`http://localhost:8000/api/products/${category}`)
        .then(res => res.json())
        .then(data => {
          data.products.map(product => {
            product.image.data.data = `data:${product.image.contentType};base64,` + product.image.data.data
            return product
          })
          state.products = data.products
        })
      }else{
        fetch('http://localhost:8000/api/products/getall')
        .then(res => res.json())
        .then(data => {
          data.products.map(product => {
            const _arrayBufferToBase64 = (buffer) => {
              let binary = '';
              let bytes = [].slice.call(new Uint8Array(buffer));
              bytes.forEach((b) => binary += String.fromCharCode(b));
              return window.btoa(binary);
            }
            product.image.data.data = 'data:image/jpeg;base64,' + _arrayBufferToBase64(product.image.data.data)
            return product
          })
          state.products = data.products
        })
      }
    },
    getCategories(state){
      fetch('http://localhost:8000/api/categories/getall')
      .then(res => res.json())
      .then(data => state.categories = data.categories)
    },
    setLoggedIn(state, item){
      state.loggedIn = item
    }
  },
  actions: {
    getProducts(context, payload){
      context.commit('getProducts', payload)
    },
    addToCart(context, payload){
      context.commit('addToCart', payload)
    },
    removeFromCart(context, payload){
      context.commit('removeFromCart', payload)
    },
    removeItemQuantity(context, payload){
      context.commit('removeItemQuantity', payload)
    },
    getCategories(context){
      context.commit('getCategories')
    },
    setLoggedIn(context, payload){
      context.commit('setLoggedIn', payload)
    }
  },
  modules: {
  }
})
