const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const question = require("./question.js");
const Question = question.model;
const answer = require("./answer.js");
const Answer = answer.model; 

const surveySchema = new mongoose.Schema({
    question: {
      type: mongoose.Schema.ObjectId,
      ref: "Question"
    },
    result: String,
  });
  
  const Survey = mongoose.model('Survey', surveySchema);

let practiceSurvey = new Survey ({
  result: "You are a fun person to be around!!",
  question: new Question ({
    questionContent: "What is your favorite color?",
  }),
    answerA: new Answer ({
        answerContent: "Yellow",
        points: 0
      }),
      answerB: new Answer ({
        answerContent: "Blue",
        points: 1
      }),
      answerC: new Answer ({
        answerContent: "Green",
        points: 2
      }),
      answerD: new Answer ({
        answerContent: "Red",
        points: 3
      })
})



// Add Surbey to Database
router.post('/newSurvey', async (req, res) => {
  console.log("Calling Post");
  const survey = this.practiceSurvey
  console.log(survey);
  try {
    await survey.save();
    res.send(survey);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
  model: Survey,
};


