<template>
<div class="row admin">
        <div class="col-md-12">
            <table class="table">
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Ürün Adı</td>
                        <td>Marka</td>
                        <td>Kategori Adı</td>
                        <td>Fiyatı</td>
                        <td>Stok Adedi</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, index) in products" :key="index">
                        <td>{{product._id}}</td>
                        <td>{{product.productName}}</td>
                        <td>{{product.brandName}}</td>
                        <td>{{product.categoryName}}</td>
                        <td>{{product.unitPrice}} €</td>
                        <td>{{product.unitsInStock}}</td>
                        <td><button class="btn btn-danger" @click="deleteProduct(product._id)">Sil</button></td>
                        <td><button class="btn btn-warning" @click="updateProduct(product)">Güncelle</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
</div>
<div class="row">
    <div class="col-md-5"></div>
    <div class="col-md-2">
        <button class="btn btn-success" @click="this.$router.push('/admin/add')">Ürün ekle</button>
    </div>
    <div class="col-md-5"></div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    name:'AdminView',
    computed: mapState({
       products: state => state.products,
    }),
    methods:{
        ...mapActions({
            getProducts:'getProducts',
            deleteProduct:'deleteProduct'
        }),
        deleteProduct(id){
            const token = localStorage.getItem("token")
            fetch(`http://localhost:8000/api/products/delete/${id}`, {
                method:'DELETE',
                headers:{
                    Authorization: `Bearer ${token}`
                },
                body:JSON.stringify(id)
            })
            .then(res => res.json())
            .then(data => {
                if(data.product){
                    this.$toast.success('ürün başarıyla silindi')
                }
            })
        },
        updateProduct(product){
            this.$swal({
                title: 'Ürün Güncelle',
                html:
                    `<input id="swal-input4" class="swal2-input" placeholder="Fiyat" value=${product.unitPrice}>` +
                    `<input id="swal-input5" class="swal2-input" placeholder="Stok Adedi" value=${product.unitsInStock}>`,
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById('swal-input4').value,
                        document.getElementById('swal-input5').value
                    ]
                }
            }).then(result => {
                if (result.value) {
                    // console.log(result.value)
                    // console.log(product._id)
                    const token = localStorage.getItem("token")
                    let update = {
                        unitPrice:result.value[0],
                        unitsInStock:result.value[1]
                    }
                     fetch(`http://localhost:8000/api/products/update/${product._id}`, {
                         method:'PUT',
                         headers:{
                           Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify(update)
                    })
                   .then(res => res.json())
                   .then(data => {
                       console.log(data)
                       if(data.product){
                           this.$toast.success('ürün başarıyla güncellendi')
                       }
                    })
                }
            })
        }
    },
    mounted(){
        this.getProducts()
    }
}
</script>

<style>

</style>