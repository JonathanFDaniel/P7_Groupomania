<template>
    <div class="home">
      <NavBar />
      <NewMessage />

    </div>
</template>

<script>

import NavBar from '@/components/NavBar.vue'
import NewMessage from '@/components/NewMessage.vue'


export default {
  name: 'Home',
  components: {
    NavBar,
    NewMessage,
  }
}
</script>
