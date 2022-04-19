<template>
    <FormKit type="form" @submit="handleSubmit()" submit-label="Kayıt Ol" form-class="registerform">
        <FormKit 
        type="text" validation="required" validation-visibility="dirty" label="Name" v-model="name"
        />
        <FormKit 
        type="email" validation="required|email" validation-visibility="dirty" label="Email" v-model="email"
        />
        <FormKit 
        type="password" validation="required" validation-visibility="dirty" label="Password" v-model="password"
        />
        <FormKit 
        type="password" validation="required|confirm" :validation-messages="{confirm:'Parolalar uyuşmuyor'}" validation-visibility="live" label="Confirm Password" v-model="authPassword"
        />
        <FormKit 
        type="select" label="Satıcı olmak istiyor musunuz" :options="{true:'Evet', false:'Hayır'}" v-model="seller"
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
            authPassword :'',
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
                .then(data => console.log(data))
        }
    }
}
</script>

<style>

</style>