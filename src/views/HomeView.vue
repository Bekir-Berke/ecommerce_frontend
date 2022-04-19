<template>
  <div class="row home">
    <div class="col-md-4">
      <category-list></category-list>
    </div>
    <div class="col-md-4">
      <product-list></product-list>
    </div>
    <div class="col-md-4">
      <cart/>
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
  components: {ProductList, CategoryList, Cart}
}
</script>
