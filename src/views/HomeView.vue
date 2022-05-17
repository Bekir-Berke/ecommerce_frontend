<template>
  <div class="row home">
    <div class="col-4">
      <CategoryList></CategoryList>
    </div>
    <div class="col-4">
      <product-list></product-list>
    </div>
    <div class="col-4">
      <cart></cart>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductList from '@/components/ProductList.vue';
import CategoryList from '@/components/CategoryList.vue';
import Cart from '@/components/Cart.vue';

export default {
  name: 'HomeView',
  components: { ProductList, CategoryList, Cart },
  // mounted(){
  //   this.$toast.success("Hocam 100 verin !!!!",{
  //     position:"top",
  //     duration:10000
  //   })
  // }
}
</script>
