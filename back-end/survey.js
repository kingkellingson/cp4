const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const question = require("./question.js");
const Question = question.model;
const answer = require("./answer.js");
const Answer = answer.model; 

const surveySchema = new mongoose.Schema({
    questions : { type : Array , "default" : [] },
    // question: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "Question"
    // },
    result: String,
  });
  
  const Survey = mongoose.model('Survey', surveySchema);



// Add Survey to Database
router.post('/newSurvey', async (req, res) => {
  console.log("Calling Post");
  const survey = new Survey ({
    result: "You are a fun person to be around!!",
    questions: [ 
      new Question ({
        questionContent: "What is your favorite color?",
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
      }),
      new Question ({
        questionContent: "What is your dream pet?",
        answerA: new Answer ({
            answerContent: "Golden Retriever",
            points: 0
        }),
        answerB: new Answer ({
            answerContent: "Dolphin",
            points: 1
        }),
        answerC: new Answer ({
            answerContent: "Sloth",
            points: 2
        }),
        answerD: new Answer ({
            answerContent: "Lion",
            points: 3
        })
      }),
      new Question ({
        questionContent: "What is your favorite fast food item?",
        answerA: new Answer ({
            answerContent: "French fries",
            points: 0
        }),
        answerB: new Answer ({
            answerContent: "Soda",
            points: 1
        }),
        answerC: new Answer ({
            answerContent: "Salad",
            points: 2
        }),
        answerD: new Answer ({
            answerContent: "Hamburger",
            points: 3
        })
      }),
      new Question ({
        questionContent: "Which element would you want to be able to bend?",
        answerA: new Answer ({
            answerContent: "Air",
            points: 0
        }),
        answerB: new Answer ({
            answerContent: "Water",
            points: 1
        }),
        answerC: new Answer ({
            answerContent: "Earth",
            points: 2
        }),
        answerD: new Answer ({
            answerContent: "Fire",
            points: 3
        })
      }),
      new Question ({
        questionContent: "Into which house would you hope to be sorted?",
        answerA: new Answer ({
            answerContent: "Hufflepuff",
            points: 0
        }),
        answerB: new Answer ({
            answerContent: "Ravenclaw",
            points: 1
        }),
        answerC: new Answer ({
            answerContent: "Slytherin",
            points: 2
        }),
        answerD: new Answer ({
            answerContent: "Gryffindor",
            points: 3
        })
      }),
      new Question ({
        questionContent: "Who is your favorite Marvel superhero?",
        answerA: new Answer ({
            answerContent: "Captain America",
            points: 0
        }),
        answerB: new Answer ({
            answerContent: "Iron Man",
            points: 1
        }),
        answerC: new Answer ({
            answerContent: "Loki",
            points: 2
        }),
        answerD: new Answer ({
            answerContent: "Thor",
            points: 3
        })
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
      console.log("Getting surveys back end"); 
      let surveys = await Survey.find();
      res.send(surveys); 
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

module.exports = {
  routes: router,
  model: Survey,
};


