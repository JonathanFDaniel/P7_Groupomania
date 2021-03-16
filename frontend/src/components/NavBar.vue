<template>

  <div class="bg-dark">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-dark">

        <h1 class="navbar-brand">
          <img src="assets/icon-left-font-monochrome-white.png" width="80" height="30" alt="Groupomania logo">
        </h1>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div id="navbarContent" class="collapse navbar-collapse justify-content-between">
          <div class="d-flex"> 
            <ul class="navbar-nav">
              <li class="nav-item active">
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
}
</script>