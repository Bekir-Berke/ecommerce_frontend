<template>
<div class="row">
    <div class="col-md-8">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{{product.productName}}</h5>
                <p class="card-text">{{product.description}}</p>
                <button class="btn btn-success" @click="this.addToCart(this.product)">Sepete Ekle</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    name:'ProductDetail',
    data(){
        return{
            product:{}
        }
    },
    methods:{
        ...mapActions({
            addToCart:'addToCart'
        })
    },
    mounted() {
        fetch('http://localhost:8000/api/products/getbyid/'+ this.$route.params.id)
        .then(res => res.json())
        .then(data => this.product = data.product)
    }
}
</script>

<style>

</style>