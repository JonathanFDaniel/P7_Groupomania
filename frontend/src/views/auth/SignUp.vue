
<template>
    <div class="container mt-3">

        <h1>Créer un compte</h1>

        <form>

            <div class="form-group mt-3">
                <label for="firstname">Prénom</label>
                <input v-model="user.firstname"  type="string" class="form-control" id="firstname" placeholder="Entrez votre Prénom" required>
            </div>

            <div class="form-group mt-3">
                <label for="lastname">Nom</label>
                <input v-model="user.lastname" type="string" class="form-control" id="lastname" placeholder="Entrez votre Nom" required>
            </div>

            <div class="form-group mt-3">
                <label for="email">Adresse Email</label>
                <input v-model="user.email" type="email" class="form-control" id="email" placeholder="Entrez votre email" required>
            </div>

            <div class="form-group mt-3">
                <label for="password">Mot de Passe</label>
                <input v-model="user.password" type="password" class="form-control" id="password" placeholder="mot de passe" required>
            </div>

            <div class="d-flex flex-wrap align-items-start mt-3">
                <button type="submit" v-on:click="createUser" class="btn btn-primary">S'inscrire</button>
                <router-link v-bind:to="'/signin'" class="p-1">Retour</router-link>
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
        user: {
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        }
    }
  },
  components: {

  },
  methods: {
    createUser() {
        axios.post(API_URL + 'signup', {
            firstname: this.user.firstname,
            lastname: this.user.lastname,
            email: this.user.email,
            password: this.user.password
        })  
        .then(response => {
        console.log(response);
        this.$router.push('/signin');
        })
        .catch(error => {
            console.log(error);
        })
    } 
  }
}
</script>