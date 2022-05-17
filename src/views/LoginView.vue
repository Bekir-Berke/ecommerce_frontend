<template>
    <FormKit type="form" @submit="handleLogin()" submit-label="Giriş Yap" form-class="registerform">
        <FormKit 
        type="email" validation="required|email" validation-visibility="dirty" :validation-messages="{required:'E-posta boş olamaz',email:'Geçerli bir e-posta giriniz'}" label="E-mail" v-model="email" 
        />
        <FormKit 
        type="password" validation="required" :validation-messages="{required:'Parola boş olamaz'}" validation-visibility="dirty" label="Parola" v-model="password"
        />
    </FormKit>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name:'LoginView',
    data(){
        return{
            email:'',
            password:'',
        }
    },
    methods:{
        ...mapActions({
            setLoggedIn:'setLoggedIn',
        }),
        handleLogin(){
            const user = {
                email:this.email,
                password:this.password
            }
            fetch('http://localhost:8000/api/auth/login', {
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify(user)
            })
            .then(res => res.json())
            .then(data => {
                if(data.message !== 'success'){
                    this.$toast.error('Kullanıcı adı veya şifre hatalı')
                }else{
                    localStorage.setItem("token", data.accessToken)
                    localStorage.setItem("userId", data.id)
                    localStorage.setItem("isAdmin", data.isAdmin)
                    localStorage.setItem("name", data.username)
                    this.$toast.success('Başarıyla giriş yapıldı. Ana sayfaya yönlendiriliyorsunuz', {
                        onDismiss: () => {
                            this.setLoggedIn(true)
                            this.$router.push('/')
                        }
                    })
                }
            })
            .catch(error => console.error(error))
        }
    }
}
</script>

<style>

</style>