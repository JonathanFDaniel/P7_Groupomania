<template>
  <div class="user">
    <NavBar />
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
  }
}
</script>

