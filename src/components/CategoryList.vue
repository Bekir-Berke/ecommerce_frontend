<template>
    <ul class="list-group">
        <li class="list-group-item" v-for="(category, index) in categories" :key="index">
            <router-link :to="{path:category}">{{category}}</router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name:'CategoryList',
    data(){
        return{
            categories:[]
        }
    },

}
</script>
