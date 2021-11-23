<template>
<div class="home">
  <div class="menu">
    <button @click="generateSurvey" class="pure-button space-right">New Survey</button>
    <p>Welcome! Choose a survey to edit or create a new survey.</p>
    <div class="suggestions" v-if="suggestions.length > 0">
    <div class="survey-options" v-for="survey in suggestions" :key="survey.id">
      <h2>{{survey.title}}</h2>
      <button @click="editSurvey(survey)" class="ui button" id="survey">Edit</button>
      <button @click="deleteSurvey(survey)" class="ui button" id="survey">Delete</button>
    </div>
    </div>
  </div>

</div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      surveys: [],
      chosenSurvey: null,
      error: '',
    }
  },
  created() {
    this.getSurveys();
  },
  computed: {
    suggestions() {
      let items = this.surveys; 
      return items.sort((a, b) => a.title > b.title);
    }
  },
  methods: {
    async generateSurvey(){
        await axios.post("/api/survey/newSurvey");
      },
    async getSurveys() {
      try {
        console.log("Trying to get surveys"); 
        let response = await axios.get('/api/survey/getSurveys');
        this.surveys = response.data; 
        return true; 
      } catch (error) {
        console.log(error); 
        this.error = error.response.data.message;
      }
    },
    async editSurvey(item) {
      try {
        console.log("Getting one survey");
        let response = await axios.get('/api/survey/getSurvey/' + item._id);
        this.chosenSurvey = response.data; 
        console.log(response.data); 
      } catch (error) {
        console.log(error); 
        this.error = error.response.data.message; 
      }
    },
    async deleteSurvey(item) {
      try {
        console.log("Delete called");
        await axios.delete("/api/survey/delete/" + item._id);
        console.log("Delete almost finished"); 
        this.getSurveys();
        console.log("Delete successful"); 
        return true;
      } catch (error) {
        console.log("Error in delete!"); 
        console.log(error);
      }
    },
  }
}
</script>


<style scoped>

.home {
  padding: 120px;
  /* display: flex; */
  justify-content: center;
}

.menu {
  display: flex;
  flex-wrap: wrap; 
  flex-direction: column;
  justify-content: center;
  align-items: center; 
}

.survey-options {
  display: flex;
  align-items: left; 
  justify-content: space-between; 
  padding: 15px; 
}

/* .menu {
  display: flex;
  justify-content: space-between;
} */

h2 {
  font-size: 14px;
  padding-top: 10px; 
  padding-right: 15px; 
}
</style>