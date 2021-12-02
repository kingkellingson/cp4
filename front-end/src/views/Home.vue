<template>
<div class="home">
  <div class="menu">
    <button @click="generateSurvey" class="pure-button space-right">New Survey</button>
    <br>
    <button @click="deleteAll" class="ui button" id="survey">Delete All My Surveys</button>
    <br>
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
      <form id="createSurveyFormPart2">
      </form>
      <button @click="addResult" type="button" class="ui button" id="addR">Add Result</button> <br><br>
      <button @click="postSurvey()" class="ui button" id="survey">Submit</button>
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
      resultsNum: 0,
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
    async deleteAll() {
      try {
        console.log("All Delete called");
        await axios.delete("/api/survey/delete");
        console.log("All Delete almost finished"); 
        this.getSurveys();
        console.log("All Delete successful"); 
        return true;
      } catch (error) {
        console.log("Error in all delete!"); 
        console.log(error);
      }
    },
    async deleteSurvey(item) {
      try {
        await axios.delete("/api/survey/delete/" + item._id);
        this.getSurveys();
        return true;
      } catch (error) {
        console.log("Error in delete!"); 
        console.log(error);
      }
    },
    async postSurvey() {
      console.log("In post survey"); 
      let newTitle = document.getElementById("title").value;
      let questionsContent = [];
      let answersA = [];
      let answersB = [];
      let answersC = [];
      let answersD = [];
      let results = [];
      for (let i = 1; i < this.questionsNum + 1; i++) {
        console.log("Look here: " + document.getElementById("questionContent" + i).value);
        questionsContent.push(document.getElementById("questionContent" + i).value);
        answersA.push(document.getElementById("answerA" + i).value);
        answersB.push(document.getElementById("answerB" + i).value);
        answersC.push(document.getElementById("answerC" + i).value);
        answersD.push(document.getElementById("answerD" + i).value);
      }
      for (let i = 1; i < this.resultsNum + 1; i++) {
        results.push(document.getElementById("resultContent" + i).value);
      }
      try {
        console.log("before"); 
        await axios.post('/api/survey/create', {
          title: newTitle,
          questions: questionsContent,
          answersA: answersA,
          answersB: answersB,
          answersC: answersC,
          answersD: answersD,
          results: results,
        });
        this.getSurveys();
        this.createSurvey = false;
      } catch (error) {
        console.log("postSurvey error");
        console.log(error);
      }
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
      let placeholders = ["Red", "Yellow", "Blue", "Green"];
      for (let i = 0; i < options.length; i++) {
        var answerLabel = document.createElement("label");
        answerLabel.innerText = "Answer " + options[i]; 
        var ai = document.createElement("input");
        ai.setAttribute("type", "text");
        ai.setAttribute("name", "answer" + options[i]);
        ai.setAttribute("id", "answer" + options[i] + this.questionsNum);
        ai.setAttribute("size", 50); 
        ai.setAttribute("placeholder", placeholders[i]); 
        form.appendChild(answerLabel);
        form.appendChild(ai); 
        document.getElementById("answer" + options[i] + this.questionsNum).style.marginBottom = "20px";
      }
    }, 
    addResult() {
      this.resultsNum++;
      let form = document.getElementById("createSurveyFormPart2");
      // Create an input element for Full Name
      var resultLabel = document.createElement("label");
      resultLabel.setAttribute("id", "resultLabel" + this.resultsNum);  
      resultLabel.innerText = "Result " + this.resultsNum + ": "; 
      var ri = document.createElement("input");
      ri.setAttribute("type", "text");
      ri.setAttribute("name", "resultContent");
      ri.setAttribute("id", "resultContent" + this.resultsNum);
      ri.setAttribute("size", 50);
      ri.setAttribute("placeholder", "Your spirit animal is a fox.");
      form.appendChild(resultLabel); 
      form.appendChild(ri);
      document.getElementById("resultLabel" + this.resultsNum).style.marginTop = "20px";
      document.getElementById("resultContent" + this.resultsNum).style.marginBottom = "20px";
    },
    async putSurvey() {
      console.log("In post survey"); 
      let newTitle = document.getElementById("title").value;
      let questionsContent = [];
      let answersA = [];
      let answersB = [];
      let answersC = [];
      let answersD = [];
      let results = [];
      for (let i = 1; i < this.questionsNum + 1; i++) {
        console.log("Look here: " + document.getElementById("questionContent" + i).value);
        questionsContent.push(document.getElementById("questionContent" + i).value);
        answersA.push(document.getElementById("answerA" + i).value);
        answersB.push(document.getElementById("answerB" + i).value);
        answersC.push(document.getElementById("answerC" + i).value);
        answersD.push(document.getElementById("answerD" + i).value);
      }
      for (let i = 1; i < this.resultsNum + 1; i++) {
        results.push(document.getElementById("resultContent" + i).value);
      }
      try {
        console.log("before"); 
        await axios.post('/api/survey/create', {
          title: newTitle,
          questions: questionsContent,
          answersA: answersA,
          answersB: answersB,
          answersC: answersC,
          answersD: answersD,
          results: results,
        });
        this.getSurveys();
        this.createSurvey = false;
      } catch (error) {
        console.log("postSurvey error");
        console.log(error);
      }
    },
    addQuestionToEdit(item) { 
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
      //let placeholders = ["Red", "Yellow", "Blue", "Green"];
      for (let i = 0; i < options.length; i++) {
        var answerLabel = document.createElement("label");
        answerLabel.innerText = "Answer " + options[i]; 
        var ai = document.createElement("input");
        ai.setAttribute("type", "text");
        ai.setAttribute("name", "answer" + options[i]);
        ai.setAttribute("id", "answer" + options[i] + this.questionsNum);
        ai.setAttribute("size", 50); 
        ai.setAttribute("value", item.data.questions[0].answerA); 
        form.appendChild(answerLabel);
        form.appendChild(ai); 
        document.getElementById("answer" + options[i] + this.questionsNum).style.marginBottom = "20px";
      }
    }, 
    addResultToEdit(item) {
      this.resultsNum++;
      let form = document.getElementById("createSurveyFormPart2");
      // Create an input element for Full Name
      var resultLabel = document.createElement("label");
      resultLabel.setAttribute("id", "resultLabel" + this.resultsNum);  
      resultLabel.innerText = "Result " + this.resultsNum + ": "; 
      var ri = document.createElement("input");
      ri.setAttribute("type", "text");
      ri.setAttribute("name", "resultContent");
      ri.setAttribute("id", "resultContent" + this.resultsNum);
      ri.setAttribute("size", 50);
      ri.setAttribute("value", item.data.results[0]);
      form.appendChild(resultLabel); 
      form.appendChild(ri);
      document.getElementById("resultLabel" + this.resultsNum).style.marginTop = "20px";
      document.getElementById("resultContent" + this.resultsNum).style.marginBottom = "20px";
    },
    async editSurvey(item) {
      try {
        this.createSurvey = true;
        let surveyToEdit = await axios.get("/api/survey/getSurvey/" + item._id);
        console.log (surveyToEdit)
        this.addQuestionToEdit(surveyToEdit);
        this.addResultToEdit(surveyToEdit);
        //reload surveys
        this.getSurveys();
        return true;
      } catch (error) {
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

label {
  margin-right: 10px; 
}
</style>