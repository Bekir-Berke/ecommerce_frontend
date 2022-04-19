<template>
    <FormKit type="form" @submit="handleLogin()" submit-label="Giriş Yap" form-class="registerform">
        <FormKit 
        type="email" validation="required|email" validation-visibility="dirty" label="E-mail" v-model="email" 
        />
        <FormKit 
        type="password" validation="required" validation-visibility="dirty" label="Parola" v-model="password"
        />
    </FormKit>
</template>

<script>
export default {
    name:'LoginView',
    data(){
        return{
            email:'',
            password:'',
        }
    },
    methods:{
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
                    console.error('hata')
                }else{
                    localStorage.setItem("token", data.accessToken)
                    localStorage.setItem("userId", data.id)
                    localStorage.setItem("isAdmin", data.isAdmin)
                    this.loggedIn = true
                }
            })
            .catch(error => console.error(error))
        }
    }
}
</script>

<style>

</style>