<template>
    <div class="container mt-3">

        <h1>Bienvenue dans votre communauté professionnelle</h1>

        <p>Entrez votre email et votre mot de passe pour vous connecter</p>
        
        <form>  

            <div class="form-group mt-3">
                <label for="emailSignIn">Email</label>
                <input type="email" class="form-control" id="emailSignIn" placeholder="Entrez votre email">
            </div>

            <div class="form-group mt-3">
                <label for="passwordSignIn">Mot de Passe</label>
                <input type="password" class="form-control" id="passwordSignIn" placeholder="Entrez votre mot de passe">
            </div>

            <div class="d-flex justify-content-start mt-3">
                <!-- <router-link class="nav-link" to="/"> --><button v-on:click="valideUser" type="submit" class="btn btn-primary">Valider</button><!-- </router-link> -->
                <router-link class="nav-link" to="/signup"><button type="submit" class="btn btn-success">Créer un compte</button></router-link>
            </div>

        </form>

    </div>
</template>

<script>

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/'; 

export default {
  name: 'Signin',
  data() {
    return {
        email: '',
        password: ''
    }
  },
  components: {

  },
  methods: {
    valideUser() {
        axios.post(API_URL + 'signin', {
            email: this.email,
            password: this.password
        })  
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
        })  
        .catch(error => {
            console.log(error);
        })
    } 
  }
}
</script>