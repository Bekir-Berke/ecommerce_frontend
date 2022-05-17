<template>
    <FormKit type="form" @submit="handleSubmit()" submit-label="Kayıt Ol" form-class="registerform">
        <FormKit 
        type="text" validation="required" :validation-messages="{required:'İsim boş bırakılmaz'}" validation-visibility="dirty" label="ısım" v-model="name"
        />
        <FormKit 
        type="email" validation="required|email" :validation-messages="{required:'E-posta boş bırakılmaz'}" validation-visibility="dirty" label="E-posta" v-model="email"
        />
        <FormKit 
        type="password" name="password" validation="required" :validation-messages="{required:'Parola boş bırakılmaz'}" validation-visibility="dirty" label="Parola" v-model="password"
        />
        <FormKit 
        type="password" name="password_confirm" validation="required|confirm" :validation-messages="{confirm:'Parolalar uyuşmuyor', required:'Parola doğrulaması gerekli'}" validation-visibility="live" label="Tekrar Parola"
        />
        <FormKit 
        type="select" label="Satıcı olmak istiyor musunuz" validation="required" :validation-messages="{required:'Bu boş bırakılmaz'}" :options="{true:'Evet', false:'Hayır'}" v-model="seller"
        />
    </FormKit>
</template>

<script>
export default {
    name: 'RegisterView',
    data(){
        return{
            name: '',
            email: '',
            password: '',
            seller: false
        }
    },
    methods:{
        handleSubmit(){
                const user = {
                    name:this.name,
                    email:this.email,
                    password:this.password,
                    isAdmin:this.seller
                }
                fetch('http://localhost:8000/api/auth/signup', {
                    method:'POST',
                    headers:{'Content-Type': 'application/json'},
                    body:JSON.stringify(user)
                })
                .then(res => res.json())
                .then(data => {
                    if(data.message === 'success'){
                        this.$toast.success('Başarıyla kayıt olundu. Giriş sayfasına yönlendiriliyorsunuz', {
                           onDismiss:(() => this.$router.push('/login'))
                        })
                    }else{
                        this.$toast.error('hata')
                    }
                })
        }
    }
}
</script>

<style>

</style>