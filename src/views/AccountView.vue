<template>
<div class="row user">
    <div class="col-md-2">
        <ul class="list-group">
            <router-link to="/admin">
                <li v-if="admin === true" class="list-group-item">Yönetici paneline git</li>
            </router-link>
            <!-- <li class="list-group-item">Yorumlarım</li> -->
        </ul>
    </div>
    <div class="col-md-8">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Hoşgeldiniz {{user.username}}</h5>
                <p>Email : {{user.email}}</p>
                <button class="btn btn-success" @click="updateUser()">Hesap bilgilerinizi güncelleyin</button>
            </div>
        </div>
    </div>
     <div class="col-md-2"></div>
</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name:'AccountView',
    data(){
        return{
            user:{},
            username:'',
        }
    },
    computed:{
        admin(){
            return JSON.parse(localStorage.getItem("isAdmin"))
        }
    },
    methods:{
        ...mapActions({
            setLoggedIn:'setLoggedIn',
        }),
        updateUser(){
            this.$swal(
                {
                    title: 'Hesap bilgilerinizi güncelleyin',
                    html: `<input id="swal-input1" class="swal2-input" placeholder="Ad" value=${this.user.username}>` +
                    `<input id="swal-input2" class="swal2-input" placeholder="Email" value=${this.user.email}>` ,
                    focusConfirm: false,
                    preConfirm: () => {
                        return [
                            document.getElementById('swal-input1').value,
                            document.getElementById('swal-input2').value
                        ]
                    }

                }).then((result) => {
                if (result.value) {
                    console.log(result.value)
                    let name = result.value[0]
                    let email = result.value[1]
                    let user = {
                        id: localStorage.getItem("userId"),
                        name: name,
                        email: email
                    }
                    fetch('http://localhost:8000/api/auth/user/', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                        body: JSON.stringify(user)
                    }).then(response => {
                        if (response.status === 200) {
                            this.$swal({
                                title: 'Başarılı',
                                text: 'Hesap bilgileriniz başarıyla güncellendi',
                                type: 'success',
                            })
                            .then(() => {
                                localStorage.clear()
                                this.setLoggedIn(false)
                                this.$router.push('/login')
                            })
                        } else {
                            this.$swal({
                                title: 'Hata',
                                text: 'Hesap bilgileriniz güncellenemedi',
                                type: 'error'
                            })
                        }
                    })
                }
            })
        }
    },
    mounted(){
        const token = localStorage.getItem("token")
        fetch('http://localhost:8000/api/auth/user/', {
            headers:{
                Authorization: `Bearer ${token}`
            },
        })
        .then(res => res.json())
        .then(data => {
            this.user = data
        })
    }
}
</script>

<style>

</style>