import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import AccountView from '../views/AccountView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import AdminView from '../views/AdminView.vue'
import NotFound from '../views/NotFound.vue'
import ProductAdd from '../views/ProductAddView.vue'
import CategoryAdd from '../views/CategoryAddView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path:'category/:category',
        name:'category',
        component:HomeView
      }
    ],
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    beforeEnter:(to, from, next) => {
      return localStorage.getItem("token") ? next({path:'/'}) : next()
    }
  },
  {
    path:'/login',
    name:'login',
    component: LoginView,
    beforeEnter:(to, from, next) => {
      return localStorage.getItem("token") ? next({path:'/'}) : next()
    }
  },
  {
    path:'/account',
    name:'account',
    component:AccountView,
    beforeEnter:(to, from, next) => {
      const auth = localStorage.getItem("token")
      return auth ? next() : next({path:'/login'})
    }
  },
  {
    path:'/admin',
    name:'adminPanel',
    component:AdminView,
    beforeEnter:(to, from, next) => {
      const auth = localStorage.getItem("isAdmin")
      return JSON.parse(auth) === true ? next() : next({path:'/login'})
    }
  },
  {
    path:'/:pathMatch(.*)*',
    name:'not-found',
    component:NotFound
  },
  {
    path:'/products/:id',
    component:ProductDetailView
  },
  {
    path:'/admin/product/add',
    name:'add',
    component:ProductAdd,
    beforeEnter:(to, from, next) => {
      const auth = localStorage.getItem("isAdmin")
      return JSON.parse(auth) === true ? next() : next({path:'/login'})
    }
  },
  {
    path:'/admin/category/add',
    name:'addCategory',
    component:CategoryAdd,
    beforeEnter:(to, from, next) => {
      const auth = localStorage.getItem("isAdmin")
      return JSON.parse(auth) === true ? next() : next({path:'/login'})
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
