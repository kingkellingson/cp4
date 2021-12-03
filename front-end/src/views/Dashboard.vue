<template>
<div class="dashboard">
  <Survey></Survey>
</div>
</template>

<script>
import Survey from '@/components/SurveyLayout.vue';
export default {
  name: 'dashboard',
  components: {
    Survey,
  }
}
</script>


<style scoped>
.dashboard {
  padding-top: 10px;
}
</style>