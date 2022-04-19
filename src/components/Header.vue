<template>
  <div class="col-md-3 logo">
      <router-link to="/">
          <h1>Store</h1>
      </router-link>
  </div>
  <div class="col-md-6 input">
      <input type="text" placeholder="ürün adı giriniz">
  </div>
  <div class="col-md-3 links">
      <ul>
          <li>
              <router-link to="/register">Register</router-link>
          </li>
          <li>
              <router-link to="/login">Login</router-link>
          </li>
        <li>
            <div class="dropdown">
                  <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      Hesabım
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li class="dropdown-item">
                          <router-link to="/account">Detaylar</router-link>
                      </li>
                      <li class="dropdown-item">
                          <a href="/" @click="handleLogout()">Çıkış Yap</a>
                    </li>
                </ul>
            </div>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    name:'Header',
    data(){
        return{
            loggedIn: localStorage.getItem("token"),
            filter:''
        }
    },
    methods:{
        handleLogout(){
            localStorage.clear()
        },
    }
}
</script>