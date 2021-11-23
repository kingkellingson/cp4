const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const question = require("./question.js");
const Question = question.model;
const answer = require("./answer.js");
const Answer = answer.model; 

const surveySchema = new mongoose.Schema({
    title: String,
    questions : { type : Array , "default" : [] },
    results: { type : Array , "default" : [] },
  });
  
  const Survey = mongoose.model('Survey', surveySchema);



// Add Survey to Database
router.post('/newSurvey', async (req, res) => {
  console.log("Calling Post");
  const survey = new Survey ({
    title: "Survey 2",
    results: [
      "You are a fun person to be around!",
      "You hate pancakes!", 
      "You like the Avengers!",
      "You can't make a decision!",
      "You are bored of writing surveys!"
    ],
    questions: [ 
      new Question ({
        questionContent: "What is your second favorite color?",
        answerA: {
            answerContent: "Yellow",
            points: 0
        },
        answerB: {
            answerContent: "Blue",
            points: 1
        },
        answerC: {
            answerContent: "Green",
            points: 2
        },
        answerD: {
            answerContent: "Red",
            points: 3
        }
      }),
      new Question ({
        questionContent: "What is your dream pet?",
        answerA: {
            answerContent: "Golden Retriever",
            points: 0
        },
        answerB: {
            answerContent: "Dolphin",
            points: 1
        },
        answerC: {
            answerContent: "Sloth",
            points: 2
        },
        answerD: {
            answerContent: "Lion",
            points: 3
        }
      }),
      new Question ({
        questionContent: "What is your favorite fast food item?",
        answerA: {
            answerContent: "French fries",
            points: 0
        },
        answerB: {
            answerContent: "Soda",
            points: 1
        },
        answerC: {
            answerContent: "Salad",
            points: 2
        },
        answerD: {
            answerContent: "Hamburger",
            points: 3
        }
      }),
      new Question ({
        questionContent: "Which element would you want to be able to bend?",
        answerA: {
            answerContent: "Air",
            points: 0
        },
        answerB: {
            answerContent: "Water",
            points: 1
        },
        answerC: {
            answerContent: "Earth",
            points: 2
        },
        answerD: {
            answerContent: "Fire",
            points: 3
        }
      }),
      new Question ({
        questionContent: "Into which house would you hope to be sorted?",
        answerA: {
            answerContent: "Hufflepuff",
            points: 0
        },
        answerB: {
            answerContent: "Ravenclaw",
            points: 1
        },
        answerC: {
            answerContent: "Slytherin",
            points: 2
        },
        answerD: {
            answerContent: "Gryffindor",
            points: 3
        }
      }),
      new Question ({
        questionContent: "Who is your favorite Marvel superhero?",
        answerA: {
            answerContent: "Captain America",
            points: 0
        },
        answerB: {
            answerContent: "Iron Man",
            points: 1
        },
        answerC: {
            answerContent: "Loki",
            points: 2
        },
        answerD: {
            answerContent: "Thor",
            points: 3
        }
      })
    ]
  });
  console.log(survey);
  console.log(survey.questions);
  console.log(survey.questions[0].answerA); 
  try {
    await survey.save();
    res.send(survey);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get('/getSurveys', async (req, res) => {
  try {
      let surveys = await Survey.find();
      res.send(surveys); 
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

router.get('/getSurvey/:id', async (req, res) => {
  try {
      console.log("Getting answers back end"); 
      let answer = await Survey.findOne({
        _id: req.params.id
      });
      console.log("Answer is: "); 
      console.log(answer); 
      res.send(answer); 
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    await Survey.deleteOne({
      _id: req.params.id
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
  model: Survey,
};


