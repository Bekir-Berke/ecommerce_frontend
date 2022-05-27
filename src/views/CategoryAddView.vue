<template>
  <FormKit type="form" @submit="addCategory()" submit-label="Kategori Ekle" form-class="registerform">
        <FormKit 
        type="number" validation="required" label="Kategori id" v-model="categoryId" 
        />
        <FormKit 
        type="text" validation="required" label="Kategori Adı" v-model="categoryName" 
        />
  </FormKit>
</template>

<script>
export default {
    data(){
        return{
            categoryId:'',
            categoryName:'',
        }
    },
    methods:{
        addCategory(){
            const token = localStorage.getItem("token");
            fetch("http://localhost:8000/api/categories/add", {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    categoryId: this.categoryId,
                    categoryName: this.categoryName,
                })
            })
            .then(res => res.json())
            .then(data => {
               if(data.message === 'Category created successfully'){
                   this.$toast.success("Kategori başarıyla eklendi");
               }
            })
            .catch(err => {
                this.$toast.error("Kategori eklenirken bir hata oluştu");
            })
        }
    }
}
</script>

<style>

</style>