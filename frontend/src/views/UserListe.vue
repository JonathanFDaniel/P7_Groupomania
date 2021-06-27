<template>
  <div class="user">
  <NavBar />
  <div class="my-2 p-2">

      <h1>Liste des profils</h1>
      
      <ul class="list-group">
          <li class="list-group-item d-flex row" v-for="post in posts" :key="post.id"> 
              <div class="user">
                  <div class="card p-2">
                      <h3>{{ post.firstname }} {{ post.lastname }}</h3>
                      <p><strong>Id utilisateur : </strong>{{ post.id }}</p>
                      <p><strong>Adresse Email : </strong>{{ post.email }}</p>
                      <p><strong>Mot de passe : </strong>{{ post.password }}</p>
                      <p><strong>Mot de passe : </strong>{{ post.isAdmin }}</p>
                  </div>
              </div>
          </li>
      </ul>        
  </div>
</div>
    
</template>

<script>

import NavBar from '@/components/NavBar.vue'

import API from '@/axios';

export default {
  name: 'user-liste',
  components: {
  NavBar,
  },

  data() {
    return {
      posts: []
    }
  },

  methods: {

    showAllUser() {
        API.get('auth/users')
        .then(response => {
            this.posts = response.data;
        })    
        .catch(error => { console.log(error); 
        })
    },
  },
 
  mounted() {
    this.showAllUser();
  }
}
</script>