<template>
    <button class="btn btn-blue" @click="sortBy('azalan')">azalan fiyata göre sırala</button>
    <button class="btn btn-blue" @click="sortBy('artan')">artan fiyata göre sırala</button>
    <div v-for="(product, index) in products" :key="index" class="card">
            <div class="card-body">
                <router-link :to="{path:`/products/${product._id}`}">
                <h5 class="card-title">{{product.productName}}</h5>
                </router-link>
                <p>{{product.unitPrice}} €</p>
                <button class="btn btn-success" @click="this.addToCart(product)">Sepete Ekle</button>
            </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name:'ProductList',
    computed: mapState({
       products: state => state.products
    }),
    methods:{
        ...mapActions({
            getProducts:'getProducts',
            addToCart:'addToCart'
        }),
        sortBy(sort){
            switch (sort) {
                case 'azalan':
                    this.products.sort((a,b) => parseFloat(b.unitPrice) - parseFloat(a.unitPrice))
                    break
                case 'artan':
                    this.products.sort((a,b) => parseFloat(a.unitPrice) - parseFloat(b.unitPrice))
                    break
            }
        }
    },
    mounted(){
        if(this.$route.params.categoryName){
            this.getProducts(this.$route.params.categoryName)
        }else{
            this.getProducts()
        }
  }
}
</script>