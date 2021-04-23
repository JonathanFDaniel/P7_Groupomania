<template>
    <div class="home">
      <NavBar />
      <NewMessage />

    </div>
</template>

<script>
// @ is an alias to /src

import NavBar from '@/components/NavBar.vue'
import NewMessage from '@/components/NewMessage.vue'


export default {
  name: 'Home',
  components: {
    NavBar,
    NewMessage,

  }/* ,
   beforeCreate() {
    this.$router.push('/signin');
  }  */
}
</script>
