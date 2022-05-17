<template>
    <div class="category">
        <ul class="list-group">
            <li v-for="(category, index) in categories" :key="index" class="list-group-item">
                <router-link :to="{path:`/category/${category.categoryName}`}">
                    {{category.categoryName}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    name:'CategoryList',
    computed:{
        ...mapState({
        categories: state => state.categories
        }),
    },
    methods:{
        ...mapActions({
            getCategories:'getCategories'
        }),
    },
    mounted(){
        this.getCategories();
    },
}
</script>
