<template>
    <footer class="bg-light text-center text-lg-start">
        <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
            {{ copyright }}
        </div>
    </footer> 
</template>

<script>
export default {
  name: 'Footer',
  data() {
      return{
        name: 'Groupomania'
    }
  },
  computed: {
      copyright() {
          const currenYear = new Date().getFullYear()

          return `Copyright ${this.name} ${currenYear}`
         
      }
  }
}
</script>

<style>
footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}
</style>