<template>

    <div class="container mt-3">

        <h1>Bienvenue dans votre communauté professionnelle</h1>

        <p>Entrez votre email et votre mot de passe pour vous connecter</p>
        
        <form name="form" @submit.prevent="postLogin">  

            <div class="form-group mt-3">
                <label for="email">Email</label>
                <input
                    v-model="email"
                    v-validate="'required'"
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="Entrez votre email"
                    name="email">

                    <div class="alert-danger">{{errors.first('email')}}</div>
            </div>

            <div class="form-group mt-3">
                <label for="password">Mot de Passe</label>
                <input
                    v-model="password"
                    v-validate="'required'"
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="Entrez votre mot de passe"
                    name="password">

                    <div class="alert-danger">{{errors.first('password')}}</div>
            </div>

            <div v-if="noUserMessage" class="alert alert-danger mt-3" role="alert">
                {{errorMessage}}
            </div>
    
            <div class="d-flex flex-wrap align-items-start mt-3">
                <button type="submit" class="btn btn-primary">Valider</button>
                <router-link v-bind:to="'/signup'" class="p-1">Créer un compte</router-link>
            </div>

        </form>

    </div>
</template>

<script>

import API from '@/axios';




export default {
  name: 'Signin',
  data() {
    return {      
        email: '',
        password: '',
        errorMessage: 'User not found !',
        noUserMessage: false,
    }
  },
  methods: {
      postLogin() {
        this.$validator.validateAll().then(isValid => {
            if (isValid) {
                API.post('auth/signin', {
                    email: this.email,
                    password: this.password
                })  
                .then(response => {
                    if (response.data.token) {
                        console.log(response.data);
                        localStorage.setItem('user', JSON.stringify(response.data));
                        this.$store.dispatch("user/setUser", { payload: response.data.user });
            
                        this.$router.push('/');
                    } else {
                        //redirection
                          this.$router.push('/login');
                    }
                })  
                .catch(error => {
                    console.log(error);
                    this.message = true
                })
            }
        })        
    } 
  }
}
</script>