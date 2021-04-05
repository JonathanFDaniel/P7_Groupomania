<template>
    <div class="home">
      <NavBar />
      <NewMessage />

      <div class="card">
        <div class="card-body">
            <h5 class="card-title">Titre de la carte</h5>
            <p class="card-text">Contenu textuel de la carte</p>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
            <h5 class="card-title">Titre de la carte</h5>
            <p class="card-text">Contenu textuel de la carte</p>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
            <h5 class="card-title">Titre de la carte</h5>
            <p class="card-text">Contenu textuel de la carte</p>
        </div>
      </div>

      <Footer />
    </div>
</template>

<script>
// @ is an alias to /src

import NavBar from '@/components/NavBar.vue'
import NewMessage from '@/components/NewMessage.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    NavBar,
    NewMessage,
    Footer
  }
}
</script>
