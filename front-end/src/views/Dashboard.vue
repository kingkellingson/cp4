<template>
<div class="dashboard">
  <MyPhotos v-if="user" />
  <Survey v-else />
</div>
</template>

<script>
import MyPhotos from '@/components/MyPhotos.vue';
import Survey from '@/components/SurveyLayout.vue';
import axios from 'axios';
export default {
  name: 'dashboard',
  components: {
    MyPhotos,
    Survey,
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>


<style scoped>
.dashboard {
  padding-top: 10px;
}
</style>

