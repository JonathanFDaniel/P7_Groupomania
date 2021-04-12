<template>
    <div class="container mt-3">

        <h1>Bienvenue dans votre communauté professionnelle</h1>

        <p>Entrez votre email et votre mot de passe pour vous connecter</p>
        
        <form>  

            <div class="form-group mt-3">
                <label for="email">Email</label>
                <input v-model="user.email" type="email" class="form-control" id="email" placeholder="Entrez votre email" required>
            </div>

            <div class="form-group mt-3">
                <label for="password">Mot de Passe</label>
                <input v-model="user.password" type="password" class="form-control" id="password" placeholder="Entrez votre mot de passe" required>
            </div>

            <div class="d-flex flex-wrap align-items-start mt-3">
                <button v-on:click="valideUser" type="submit" class="btn btn-primary">Valider</button>
                <router-link v-bind:to="'/signup'" class="p-1">Créer un compte</router-link>
            </div>

        </form>

    </div>
</template>

<script>

//import AuthService from '../services/auth.service';

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/'; 

export default {
  name: 'Signin',
  data() {
    return {
        user: {
            email: '',
            password: ''
        }
    }
  },
  components: {

  },
  methods: {
    valideUser() {
        axios.post(API_URL + 'signin', {
            email: this.user.email,
            password: this.user.password
        })  
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
                this.$router.push('/');
            }
        })  
        .catch(error => {
            console.log(error);
        })
    } 
  }
}
</script>