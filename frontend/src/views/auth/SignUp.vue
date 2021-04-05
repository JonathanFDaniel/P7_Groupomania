
<template>
    <div class="container mt-3">

        <h1>Créer un compte</h1>

        <form>

            <div class="form-group mt-3">
                <label for="firstname">Prénom</label>
                <input v-model="firstname" type="string" class="form-control" id="firstname" placeholder="Entrez votre Prénom">
            </div>

            <div class="form-group mt-3">
                <label for="lastname">Nom</label>
                <input v-model="lastname" type="string" class="form-control" id="lastname" placeholder="Entrez votre Nom">
            </div>

            <div class="form-group mt-3">
                <label for="email">Adresse Email</label>
                <input v-model="email" type="email" class="form-control" id="email" placeholder="Entrez votre email">
            </div>

            <div class="form-group mt-3">
                <label for="password">Mot de Passe</label>
                <input v-model="password" type="password" class="form-control" id="password" placeholder="mot de passe">
            </div>

            <div class="d-flex justify-content-start mt-3">
                <!-- <router-link class="nav-link" to="/signin"><button type="submit" class="btn btn-primary">S'inscrire</button></router-link> -->
                <button type="submit" v-on:click="createUser" class="btn btn-primary">S'inscrire</button>
            </div>

        </form>
    </div>
</template>

<script>

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/'; 

export default {
  name: 'Signup',
  data() {
    return {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    }
  },
  components: {

  },
  methods: {
    createUser() {
        axios.post(API_URL + 'signup', {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password
        })  
        .then(response => {
        console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    } 
  }
}
</script>