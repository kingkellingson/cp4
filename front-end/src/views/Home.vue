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
    <div class="createSurveyChoice">
      <button @click="createSurvey = true" class="ui button" id="survey">Create New Survey</button>
    </div>
    <div class="createSurvey" v-if="createSurvey">
      <hr>
      <form>
        <label for="title">Survey Title:  </label>
        <input type="text" id="title" name="title" value="Practice Survey"><br><br>
        <button @click="questions.push(0)" class="ui button" id="survey">Add Question</button> <br><br>
        <div class="addQuestion" v-if="questions.length > 0">
          <div class="questions" v-for="question in questions" :key="question.id">
            <input type="text" id="qContent" name="qContent" value="What's your favorite color?"><br><br>
          </div>
        </div>
        <button @click="postSurvey(survey)" class="ui button" id="survey">Submit</button>
      </form>
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
      createSurvey: false,
      questions: [],
    }
  },
  created() {
    this.getSurveys();
  },
  computed: {
    suggestions() {
      let items = this.surveys; 
      return items.sort((a, b) => a.title > b.title);
    },
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

.survey-create {
  margin: 10px; 
  margin-top: 20px; 
  margin-bottom: 20px; 
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

hr {
  margin: 25px;   
}

br {
  padding: 50px; 
}

form {
  margin: 10px;
  padding: 10px; 
}

form label {
  margin-right: 10px; 
}
</style>