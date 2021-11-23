<template>

<div class="surveyHolder">
  <div class="survey" v-for="survey in surveys" :key="survey.id">
    <h2></h2>
    <div class="question" v-for="question in survey.questions" :key="question.id">
      <h2>{{question.questionContent}}</h2>
      <div class="answer">
        <h2>{{question.answerA.answerContent}}</h2>
        
      </div>
      <div class="answer"><h2>{{question.answerB.answerContent}}</h2></div>
      <div class="answer"><h2>{{question.answerC.answerContent}}</h2></div>
      <div class="answer"><h2>{{question.answerC.answerContent}}</h2></div>
    </div>

  </div>
  <div class="ui container" v-for="survey in surveys" :key="survey.id">
    <div class="main-container">
        <div class="left-container">
            <h2 id="show-counter"></h2>
            <p id="show-data">{{survey.questions[questionNum].questionContent}}</p>
        </div>

        <div class="right-container">
            <button class="ui button survey-button" id="answer1">{{survey.questions[questionNum].answerA.answerContent}}</button>
            <button class="ui button survey-button" id="answer2" >{{survey.questions[questionNum].answerB.answerContent}}</button>
            <button class="ui button survey-button" id="answer3">{{survey.questions[questionNum].answerC.answerContent}}</button>
            <button class="ui button survey-button" id="answer4">{{survey.questions[questionNum].answerD.answerContent}}</button>
            <!-- <button class="ui button survey-button" id="answer5">{{survey.questions[questionNum].answerA.answerContent}}</button> -->
        </div>
    </div>
    <br>
    <div class="navigation-controllers">
        <button class="ui icon button left-arrow" id="prev-data">
            <i class="ui icon arrow left"></i>
        </button>
        <button class="ui icon button right-arrow" disabled id="next-data">
            <i class="ui icon arrow right"></i>
        </button>
        <button class="ui icon button" disabled id="review-data">
            Review Data
        </button>

    </div>
</div>
</div>

</template>


<script>
import axios from 'axios';
export default {
  name: 'HomePage',
  data() {
    return {
      questionNum: 0,
      id: '',
      surveys: [],
      answer: null, 
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      usernameLogin: '',
      passwordLogin: '',
      error: '',
      errorLogin: '',
    }//test
  },
  created() {
    this.getSurveys(); 
  },
  methods: {
    incrementQuestionNum () {
      this.questionNum++;
    },
    async getSurveys() {
      try {
        console.log("Trying to get surveys"); 
        let response = await axios.get('/api/survey/getSurveys');
        this.surveys = response.data; 
        console.log(response.data[0].questions[0].answerA); 
        console.log(this.surveys); 
        return true; 
      } catch (error) {
        console.log(error); 
        this.error = error.response.data.message;
      }
    },
    async getAnswer(answerID) {
      try {
        console.log("Trying to get answers");
        let response = await axios.get("/api/survey/" + answerID);
        this.answer = response.data; 
        console.log(response.data); 
        return true;
      } catch (error) {
        console.log(error); 
        this.error = error.response.data.message;
      }
    },
    async register() {
      this.error = '';
      this.errorLogin = '';
      if (!this.firstName || !this.lastName || !this.username || !this.password)
        return;
      try {
        let response = await axios.post('/api/users', {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
    async login() {
      this.error = '';
      this.errorLogin = '';
      if (!this.usernameLogin || !this.passwordLogin)
        return;
      try {
        let response = await axios.post('/api/users/login', {
          username: this.usernameLogin,
          password: this.passwordLogin,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.errorLogin = "Error: " + error.response.data.message;
        this.$root.$data.user = null;
      }
    },

  }

}
</script>


<style scoped>
.space-above {
  margin-top: 50px;
}

h1 {
  font-size: 28px;
  font-variant: capitalize;
}

.surveyHolder {
  padding: 120px;
  /* display: flex; */
  justify-content: center;
}

.survey {
  text-align: center;
}

.hero form {
  font-size: 14px;
}

.hero form legend {
  font-size: 20px;
}

input {
  margin-right: 10px;
}

.answer {
  display: flexbox;
  justify-content: left;
  text-align: left;
}

.error {
  margin-top: 10px;
  display: inline;
  padding: 5px 20px;
  border-radius: 30px;
  font-size: 10px;
  background-color: #d9534f;
  color: #fff;
}

body {
    height: 100%;
    background-color: #201f22;
    background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23575a61' fill-opacity='0.43' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
}

.ui.container {
    display: flex !important;
    flex-direction: column;
    justify-content: center;
    height: 100%;
}

.main-container {
    padding: 30px;
    display: flex;
    flex-direction: row;
    border: none;
    border-radius: .28571429rem;
    box-shadow: 0 1px 3px 0 #D4D4D5, 0 0 0 1px #D4D4D5;
    background: white;
}

.left-container {
    width: 50%;
    padding: 10px;
}

.left-container > h2 {
    color: #2185D0;
}

.right-container {
    width: 50%;
    display: flex;
    flex-direction: column;
    padding: 10px;
}

.right-container > button {
    margin-bottom: 15px !important;
}

.navigation-controllers {
    text-align: right;
}

#review-data {
   display: none; 
}

@media screen and (min-width: 1200px) {
    .ui.container {
        width: 900px;
    }
}

</style>

