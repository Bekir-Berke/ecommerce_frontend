import { createStore } from 'vuex'

export default createStore({
  state: {
    cart:[],
    products:[]
  },
  getters: {
  },
  mutations: {
    addToCart(state, item){
      let product = state.cart.find(p => p.productName === item.productName)
      if(product){
        item.quantity = item.quantity + 1
      }else{
        item.quantity = 1;
        state.cart.push(item)
      }
    },
    removeItemQuantity(state,item){
      if(item.quantity !== undefined){
        if(item.quantity > 0){
          item.quantity = item.quantity - 1
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
        .then(data => state.products= data.products)
      }else{
        fetch('http://localhost:8000/api/products/getall')
        .then(res => res.json())
        .then(data => state.products = data.products)
      }
    },
  },
  actions: {
    getProducts(context, category){
      context.commit('getProducts', category)
    },
    addToCart(context, item){
      context.commit('addToCart', item)
    },
    removeFromCart(context, item){
      context.commit('removeFromCart', item)
    },
    removeItemQuantity(context, item){
      context.commit('removeItemQuantity', item)
    }
  },
  modules: {
  }
})
