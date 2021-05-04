<template>

  <div class="user">

      <h1>Mon profile</h1>
      <div class="card p-2">
        <h3>{{ posts.firstname }} {{ posts.lastname }}</h3>
        <p><strong>Id utilisateur : </strong>{{ posts.id }}</p>
        <p><strong>Adresse Email : </strong>{{ posts.email }}</p>
        <p><strong>Mot de passe : </strong>{{ posts.password }}</p>
       
        <div class='d-flex d-flex flex-wrap'>
          <button type="button" @click="goToUpdateProfile()" class="btn btn-outline-secondary btn-sm col-lg-2 col-sm-4 mx-1 mb-1">modifier mon profil</button>
          <button type="button" @click="deleteUser()" class="btn btn-outline-danger btn-sm col-lg-2 col-sm-4 mx-1 mb-1">supprimer mon profil</button>
        </div>
      </div>
    </div>
    
</template>

<script>

import API from '@/axios';

export default {
  name: 'ShowProfile',
  data() {
    return {
      posts: []
    }
  },

  methods: {

    showUser() {

      API.get('auth/profile')
        .then(response => {
            this.posts = response.data;
            console.log(response.data);
        })    
        .catch(error => { console.log(error); 
        })
    },
    
    deleteUser() { 

      API.delete('auth/profile')  
        .then(response => { 
            console.log(response);
            localStorage.removeItem('user');
            this.$router.push('/signin');
        })
        .catch(error => {
            console.log(error);
        })
    },
    goToUpdateProfile() {
				this.$emit("go-to-update-profile");
		}
  },
 
  mounted() {
    this.showUser();
  }
}
</script>