<template>

  <div class="bg-dark">
    <div class="container">
     
      <nav class="navbar navbar-expand-lg navbar-dark">

        <h1 class="navbar-brand p-0 my-0">
          <img src="../assets/icon-left-font-monochrome-white.png" width="160" height="auto" alt="Groupomania logo">
        </h1>
        <div class="d-flex flex-column">

          <div class="d-flex justify-content-end">
            <button class="navbar-toggler" type="button" @click="navListe = !navListe" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon py-auto"></span>
            </button>
          </div>

          <div v-if="navListe" class="navbar-nav p-2 py-auto">
            <p class="text-light my-2">{{ $store.state.user.email }}</p>
            <router-link class="nav-link" to="/">Accueil</router-link>
            <router-link class="nav-link" to="/user">Profil</router-link>
            <button class="btn btn-link px-0" v-on:click="signOut">Se déconnecter</button>
          </div>
        </div>

        <div id="navbarContent" class="collapse navbar-collapse justify-content-between">
          <div class="d-flex"> 
            <ul class="navbar-nav">
              <li class="nav-item">
                  <router-link class="nav-link" to="/">Accueil</router-link>
              </li>
              <li class="nav-item">
                  <router-link class="nav-link" to="/user">Profil</router-link>
              </li>
            </ul>
            
          </div>
          <div class="d-flex">
            <p class="text-light my-2">{{ $store.state.user.email }}</p>
            <button class="btn btn-link" v-on:click="signOut">Se déconnecter</button>
          </div>
        </div>

      </nav> 
    </div>
  </div>  

</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      navListe: false
    }
  },
  methods: {
    async signOut() {
      await localStorage.removeItem('user');
      this.$store.dispatch("user/setEmptyUser");
      this.$router.push('/signin');
    }
  }
}    

</script>