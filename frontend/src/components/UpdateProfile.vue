<template>

    <div class="user">
        
        <h1>Modifier mon profile</h1>

        <div class="card p-2">
            <form name="form" @submit.prevent="updateUser($store.state.user.id)">

                <div class="form-group mt-3">
                    <label for="firstname">Prénom</label>
                    <input 
                        v-model="user.firstname" 
                        v-validate="'min:3|max:20'" 
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
                        v-validate="'min:3|max:20'"
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
                        v-validate="'email'"
                        type="email"
                        class="form-control"
                        id="email"
                        placeholder="Entrez votre email"
                        name="email">

                        <div class="alert-danger">{{errors.first('email')}}</div>
                </div>

                <div v-if="message" class="alert alert-danger mt-3" role="alert">
                    {{errorMessage}}
                </div>

                <div class="d-flex flex-wrap mt-3">
                    <button type="submit" class="btn btn-outline-secondary btn-sm col-lg-3 col-sm-4 mx-1 mb-1">Valider les modifications</button>
                    <button type="button" @click="goToShowProfile()" class="btn btn-outline-danger btn-sm col-lg-2 col-sm-4 mx-1 mb-1">Annuler</button>
                </div>

            </form>

        </div>
    </div>
</template>

<script>

import API from '@/axios';

export default {
  name: 'UpdateProfile',
  data() {
    return {
        user: {
            firstname: '',
            lastname: '',
            email: ''
        },
        errorMessage: 'E-mail address is already registered !',
        message: false
    }
  },
  methods: {
    goToShowProfile() {
		this.$emit("go-to-show-profile");
	},
    updateUser(userId) {
        this.$validator.validateAll().then(isValid => {
            if (isValid) {
                API.put('auth/profile/' + userId, {
                    firstname: this.user.firstname,
                    lastname: this.user.lastname,
                    email: this.user.email
                }) 
                .then(response => {
                    console.log('updateUser', response);
                    this.$emit("go-to-show-profile");
                })
                .catch(error => {
                    console.log(error);
                }) 
            }
        })
    } 
  }
}
</script>