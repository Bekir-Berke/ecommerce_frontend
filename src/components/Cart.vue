<template>
  <div class="cart">
      <ul>
          <li v-for="item in cart" :key="item">
            <p>{{item.productName}}</p>
            <h6><span class="badge bg-secondary">{{item.quantity}}</span></h6>
            <p>Fiyat {{item.totalPrice}} €</p>
            <button class="btn btn-danger" @click="this.removeItemQuantity(item)">-</button>
            <button class="btn btn-success" @click="this.addToCart(item)">+</button>
            <button class="btn btn-danger" @click="this.removeFromCart(item)">Sepetten Sil</button>
          </li>
          <p v-if="cart.length > 0">Toplam : {{totalPrice}} €</p>
      </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
    name:'Cart',
    computed:{
        ...mapState({
          cart: state => state.cart,
        }),
        ...mapGetters({
          totalPrice: 'totalPrice'
        })
    },
    methods:{
      ...mapActions({
        removeItemQuantity:'removeItemQuantity',
        removeFromCart: 'removeFromCart',
        addToCart:'addToCart'
      })
    },
}
</script>

<style scoped>
.btn-danger, .btn-success{
  margin-left: 10px;
}
</style>