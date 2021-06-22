<template>
  <div class="bg-dark">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-dark">
        <h1 class="navbar-brand p-0 my-0">
          <img src="../assets/icon-left-font-monochrome-white.png" width="160" height="auto" alt="Groupomania logo">
        </h1>
        <div class="container-fluid">
          <p class="text-light my-2">{{ $store.state.user.email }}</p>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link class="nav-link active text-light" aria-current="page" to="/">Accueil</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link text-light" aria-current="page" to="/user">Profil</router-link>
              </li>
            </ul>
              <button class="btn btn-link" v-on:click="signOut" type="submit">Se déconnecter</button>
          </div>
        </div>
      </nav> 
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      navLargeListe: true,
      navLittleListe: true
    };
  },
  methods: {
    async signOut() {
      await localStorage.removeItem("user");
      this.$store.dispatch("user/setEmptyUser");
      this.$router.push("/signin");
    }
  }
};
</script>