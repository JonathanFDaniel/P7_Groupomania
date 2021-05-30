<template>
  <div class="user">
    <NavBar />
    <div class="container py-3">
      
      <ShowProfile v-if="behavior.ShowProfile === true" @go-to-update-profile="goToUpdateProfile" />
      <UpdateProfile v-if="behavior.UpdateProfile === true" @go-to-show-profile="goToShowProfile" />
      <!-- <Footer /> -->
      
    </div>
  </div>


</template>

<script>

import NavBar from '@/components/NavBar.vue'
import ShowProfile from '@/components/ShowProfile.vue'
import UpdateProfile from '@/components/UpdateProfile.vue'
//import Footer from '@/components/Footer.vue'

export default {
  name: 'User',
  components: {
    NavBar,
    ShowProfile,
    UpdateProfile,
    //Footer,
  },
  data() {
    return {
      title: "Création d'une société",
      behavior: {
        ShowProfile: true,
        UpdateProfile: false,
      },
    };
  },
  methods: {
    goToUpdateProfile() {
      this.behavior.ShowProfile = false;
      this.behavior.UpdateProfile = true;
    },
    goToShowProfile() {
      this.behavior.ShowProfile = true;
      this.behavior.UpdateProfile = false;
    },
  },
}
</script>