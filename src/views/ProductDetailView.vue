<template>
<div class="row">
    <div class="col-md-8">
        <div class="card product-detail">
            <div class="card-body">
                <h5 class="card-title">{{product.productName}}</h5>
                <p class="card-text">{{product.description}}</p>
                <button class="btn btn-success" @click="cartService(this.product)">Sepete Ekle</button>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <h3>Yorumlar</h3>
        <div v-for="(item, index) in product.reviews" :key="index" class="card">
            <div class="card-body">
                <h5 class="card-title">Yazan : {{item.postedBy}}</h5>
                <p class="card-text">{{item.comment}}</p>
            </div>
        </div>
    </div>
</div>
<br/>
<div class="row">
    <div class="col-md-6">
            <div class="input-group">
                <span class="input-group-text">Yorum yazın</span>
                <textarea class="form-control" aria-label="With textarea" v-model="comment" required></textarea>
                <button class="btn btn-outline-secondary" @click="handleReview()" type="button">Gönder</button>
            </div>
    </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name:'ProductDetail',
    data(){
        return{
            product:{},
            comment:''
        }
    },
    methods:{
        ...mapActions({
            addToCart:'addToCart'
        }),
        cartService(item){
            this.addToCart(item)
            this.$toast.success('ürün sepete eklendi')
        },
        handleReview(){
            const id = this.$route.params.id
            const token = localStorage.getItem("token")
            if(this.comment.length > 0){
            fetch(`http://localhost:8000/api/products/getbyid/${id}/review`, {
                method:'POST',
                headers:{
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({comment:this.comment})
            })
            .then(res => res.json())
            .then(data => {
                if(data.message === 'Comment added successfully'){
                    this.$toast.success('Yorumunuz başarıyla eklendi')
                }
            })
            }else{
                this.$toast.error('Yorumunuz boş olamaz')
            }
        }
    },
    mounted(){
        fetch('http://localhost:8000/api/products/getbyid/'+ this.$route.params.id)
        .then(res => res.json())
        .then(data => this.product = data.product)
    }
}
</script>

<style>

</style>