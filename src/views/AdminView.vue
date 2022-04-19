<template>
    <div class="row">
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
                        <td>{{product.unitPrice}}</td>
                        <td>{{product.unitsInStock}}</td>
                        <td><button class="btn btn-danger" @click="deleteProduct(product._id)">Sil</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name:'AdminView',
    data(){
        return{
            products:[]
        }
    },
    methods:{
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
                    console.log('product deleted')
                }
            })
        }
    },
    mounted(){
        fetch('http://localhost:8000/api/products/getall')
        .then(res => res.json())
        .then(data => this.products = data.products)
    }
}
</script>

<style>

</style>