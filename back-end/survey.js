const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const surveySchema = new mongoose.Schema({
    question: {
      type: mongoose.Schema.ObjectId,
      ref: "Question"
    },
    result: String,
  });
  
  const Survey = mongoose.model('Survey', surveySchema);

let Survey = new Survey ({
  result: "You are a fun person to be around!!",
  question = new Question ({
    questionContent: "What is your favorite color?",
    answerA = new Answer ({
        answerContent: "Yellow"
      }),
      answerB = new Answer ({
        answerContent: "Blue"
      }),
      answerC = new Answer ({
        answerContent: "Green"
      }),
      answerD = new Answer ({
        answerContent: "Red"
      })
  })
})



// Add Surbey to Database
router.post('/newSurvey', async (req, res) => {
  console.log("Calling Post");
  const survey = this.Survey
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


