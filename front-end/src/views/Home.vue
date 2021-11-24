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
      <form id="createSurveyForm">
        <label for="title">Survey Title:  </label>
        <input type="text" id="title" name="title" value="Practice Survey"><br><br>
        
      </form>
      <button @click="addQuestion" type="button" class="ui button" id="addQ">Add Question</button> <br><br>
      <button @click="postSurvey(survey)" class="ui button" id="survey">Submit</button>
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
      questionsNum: 0,
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
    async postSurvey(item) {
      console.log("In post survey"); 
      console.log(item); 
      
    },
    addQuestion() { 
      this.questionsNum++; 
      let form = document.getElementById("createSurveyForm");
      // Create an input element for Full Name
      var qiLabel = document.createElement("label");
      qiLabel.setAttribute("id", "questionLabel" + this.questionsNum);  
      qiLabel.innerText = "Question " + this.questionsNum + ": "; 
      var qi = document.createElement("input");
      qi.setAttribute("type", "text");
      qi.setAttribute("name", "questionContent");
      qi.setAttribute("id", "questionContent" + this.questionsNum);
      qi.setAttribute("size", 50);
      qi.setAttribute("placeholder", "What's your favorite color?");

      form.appendChild(qiLabel); 
      form.appendChild(qi);
      document.getElementById("questionLabel" + this.questionsNum).style.marginTop = "20px";
      document.getElementById("questionContent" + this.questionsNum).style.marginBottom = "20px";
      let options = ["A", "B", "C", "D"];
      for (let i = 0; i < options.length; i++) {
        var answerLabel = document.createElement("label");
        answerLabel.innerText = "Answer " + options[i]; 
        var ai = document.createElement("input");
        ai.setAttribute("type", "text");
        ai.setAttribute("name", "answer" + options[i]);
        ai.setAttribute("id", "answer" + options[i] + this.questionsNum);
        ai.setAttribute("size", 50); 
        ai.setAttribute("placeholder", "Red"); 
        form.appendChild(answerLabel);
        form.appendChild(ai); 
        document.getElementById("answer" + options[i] + this.questionsNum).style.marginBottom = "20px";
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

label {
  margin-right: 10px; 
}
</style>