<template>
  <div class="container-fluid">
    <div class="row header">
      <Header/>
    </div>
      <router-view/>
  </div>
</template>
<script>
import Header from '@/components/Header.vue';
export default {
  components:{Header},
}
</script>
