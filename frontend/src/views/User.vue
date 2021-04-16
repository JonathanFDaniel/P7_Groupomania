<template>
  <div class="user">
    <NavBar />

    <div class="container py-3">
      <div class="card p-2">
        <h3>{{ currentUser.firstname }} {{ currentUser.lastname }}</h3>
        <p><strong>Adresse Email : </strong>{{ currentUser.email }}</p>
        <p><strong>Mot de passe : </strong>{{ currentUser.password }}</p>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src

import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'User',
  components: {
    NavBar,
    Footer
  },
  data() {
    return {
      currentUser: {
        firstname: 'joe', 
        lastname: 'dan',
        email: 'jonathandaniel@gmail.com',
        password: 'azerty'
      },
      auth: true
    }
  },
  computed: {

  },
  mounted() {
    if (this.auth !== true) {
      this.$router.push('/');
    }
  }
}
</script>

