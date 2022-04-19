<template>
  <div class="cart">
      <ul>
          <li v-for="item in cart" :key="item">
            <p>{{item.productName}}</p>
            <h6><span class="badge bg-secondary">{{item.quantity}}</span></h6>
            <button class="btn btn-danger" @click="this.removeItemQuantity(item)">-</button>
            <button class="btn btn-success" @click="this.addToCart(item)">+</button>
          </li>
      </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name:'Cart',
    computed: mapState({
      cart: state => state.cart
    }),
    methods:{
      ...mapActions({
        removeItemQuantity:'removeItemQuantity',
        addToCart:'addToCart'
      })
    }
}
</script>

<style scoped>
.btn-danger, .btn-success{
  margin-left: 10px;
}
</style>