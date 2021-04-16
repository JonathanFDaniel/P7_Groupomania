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
            <router-link class="nav-link" to="/">Accueil</router-link>
            <router-link class="nav-link" to="/user">Profil</router-link>
            <router-link class="nav-link" to="/signin">Se déconnecter</router-link>
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
            <router-link class="nav-link text-muted" to="/signin">Se déconnecter</router-link>
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
  }
}    

</script>