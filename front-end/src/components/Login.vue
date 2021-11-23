<template>

<div class="surveyHolder">
  <div class="survey" v-for="survey in surveys" :key="survey.id">
    <div class="question" v-for="question in survey.questions" :key="question.id">
      <h2>{{question.questionContent}}</h2>
      <h2>{{question.answerA}}</h2>
      <h2>{{question}}</h2>
      <h2>{{getAnswer(question.answerA)}}</h2>
      <h2>{{answer}}</h2>
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
  display: flex;
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

.error {
  margin-top: 10px;
  display: inline;
  padding: 5px 20px;
  border-radius: 30px;
  font-size: 10px;
  background-color: #d9534f;
  color: #fff;
}
</style>

