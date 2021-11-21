<template>
<div class="home">
   <div class="menu">
    <button @click="generateSurvey" class="pure-button space-right">New Survey</button>
    <p>Welcome!</p>
  </div>
</div>
</template>


<script>
import axios from 'axios';
import ImageGallery from '@/components/ImageGallery.vue';
export default {
  name: 'Home',
  components: {
    ImageGallery,
  },
  data() {
    return {
      photos: [],
      error: '',
    }
  },
  // async created() {
  //   this.getPhotos();
  //   try {
  //     let response = await axios.get('/api/users');
  //     this.$root.$data.user = response.data.user;
  //   } catch (error) {
  //     this.$root.$data.user = null;
  //   }
  // },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    async generateSurvey(){
        await axios.post("/api/survey/newSurvey");
      },
    // async clearPhotos(){
    //     await axios.delete("/api/photos/cp");
    //   },
    // async getPhotos() {
    //   try {
    //     let response = await axios.get("/api/photos/all");
    //     console.log ("got this response: ", response)
    //     this.photos = response.data;
    //   } catch (error) {
    //     this.error = error.response.data.message;
    //   }
    // },
    // async logout() {
    //   try {
    //     await axios.delete("/api/users");
    //     this.$root.$data.user = null;
    //   } catch (error) {
    //     this.$root.$data.user = null;
    //   }
    // },
  }
}
</script>


<style scoped>
.menu {
  display: flex;
  justify-content: space-between;
}

.menu h2 {
  font-size: 14px;
}
</style>