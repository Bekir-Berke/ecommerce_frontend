<template>
    <FormKit type="form" @submit="addProduct()" submit-label="Ürün ekle" form-class="registerform">
        <FormKit 
        type="text" validation="required" label="Ürün adı" v-model="productName" 
        />
        <FormKit 
        type="text" validation="required" label="Marka" v-model="brandName" 
        />
        <FormKit 
        type="text" validation="required" label="Kategori" v-model="categoryName" 
        />
        <FormKit 
        type="text" validation="required" label="Açıklama" v-model="description" 
        />
        <FormKit 
        type="number" min="0" validation="required" label="Fiyat" v-model="unitPrice" 
        />
        <FormKit 
        type="number" min="0" validation="required" label="Stok adedi" v-model="unitsInStock" 
        />
    </FormKit>
</template>

<script>
export default {
    name:'ProductAdd',
    data(){
        return{
            productName:'',
            brandName:'',
            categoryName:'',
            description:'',
            unitPrice:'',
            unitsInStock:''
        }
    },
    methods:{
        addProduct(){
            const token = localStorage.getItem("token")
            const product = {
                productName:this.productName,
                brandName:this.brandName,
                categoryName:this.categoryName,
                description:this.description,
                unitPrice:this.unitPrice,
                unitsInStock:this.unitsInStock
            }
            fetch('http://localhost:8000/api/products/add', {
                method:'POST',
                headers:{
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(product)
            })
            .then(res => res.json())
            .then(data => {
                if(data.product){
                    this.$toast.success('ürün başarıyla eklendi',{
                        onDismiss:() => {
                            this.$router.push('/admin')
                        }
                    })
                }else{
                    this.$toast.error('ürün eklenirken bir hata oluştu')
                }
            })
        }
    }
}
</script>

<style>

</style>