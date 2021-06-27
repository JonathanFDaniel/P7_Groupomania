<template>

  <div class="user">

      <h1>Mon profil</h1>
      <div class="card p-2">
        <h3>{{ $store.state.user.firstname }} {{ $store.state.user.lastname }}</h3>
        <p><strong>Id utilisateur : </strong>{{ $store.state.user.id }}</p>
        <p><strong>Adresse Email : </strong>{{ $store.state.user.email }}</p>
       
        <div class='d-flex d-flex flex-wrap'>
          <button type="button" @click="goToUpdateProfile()" class="btn btn-outline-secondary btn-sm col-lg-2 col-sm-4 mx-1 mb-1">modifier mon profil</button>
          <button type="button" @click="deleteUser($store.state.user.id)" class="btn btn-outline-danger btn-sm col-lg-2 col-sm-4 mx-1 mb-1">supprimer mon profil</button>
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
    
    deleteUser(userId) { 

      API.delete('auth/profile/' + userId)  
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
}
</script>