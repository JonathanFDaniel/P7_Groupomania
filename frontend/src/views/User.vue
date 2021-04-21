<template>
  <div class="user">
    <NavBar />

    <div class="container py-3">
      <div class="card p-2">
        <h3>{{ posts.firstname }} {{ posts.lastname }}</h3>
        <p><strong>Id utilisateur : </strong>{{ posts.id }}</p>
        <p><strong>Adresse Email : </strong>{{ posts.email }}</p>
        <p><strong>Mot de passe : </strong>{{ posts.password }}</p>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src

import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

import API from '@/axios';

export default {
  name: 'User',
  components: {
    NavBar,
    Footer
  },
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
    }
  },
 
  mounted() {
    this.showUser();
  }
}
</script>

