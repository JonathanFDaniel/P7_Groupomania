
<template>
    <div class="container mt-3">

        <h1>Créer un compte</h1>

        <form name="form" @submit.prevent="createUser">

            <div class="form-group mt-3">
                <label for="firstname">Prénom</label>
                <input 
                    v-model="user.firstname" 
                    v-validate="'required|min:3|max:20'" 
                    type="string" 
                    class="form-control" 
                    id="firstname" 
                    placeholder="Entrez votre Prénom" 
                    name="firstname">

                    <div class="alert-danger">{{errors.first('firstname')}}</div>
            </div>

            <div class="form-group mt-3">
                <label for="lastname">Nom</label>
                <input
                    v-model="user.lastname"
                    v-validate="'required|min:3|max:20'"
                    type="string"
                    class="form-control"
                    id="lastname"
                    placeholder="Entrez votre Nom"
                    name="lastname">

                    <div class="alert-danger">{{errors.first('lastname')}}</div>
            </div>

            <div class="form-group mt-3">
                <label for="email">Adresse Email</label>
                <input
                    v-model="user.email"
                    v-validate="'required|email'"
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
                    v-model="user.password"
                    v-validate="'required|min:6|max:40'"
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="mot de passe"
                    name="password">

                    <div class="alert-danger">{{errors.first('password')}}</div>
            </div>

            <div v-if="message" class="alert alert-danger mt-3" role="alert">
                {{errorMessage}}
            </div>

            <div class="d-flex flex-wrap align-items-start mt-3">
                <button type="submit" class="btn btn-primary">S'inscrire</button>
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
        },
        errorMessage: 'E-mail address is already registered !',
        message: false
    }
  },
  methods: {
    createUser() {
        this.$validator.validateAll().then(isValid => {
            if (isValid) {
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
                    this.message = true
                }) 
            }
        })
    } 
  }
}
</script>