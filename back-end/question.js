const express = require("express");
const mongoose = require('mongoose');

const router = express.Router();

const questionSchema = new mongoose.Schema({
  questionContent: String,
  answerA: {
    type: mongoose.Schema.ObjectId,
    ref: 'Answer'
  },
  answerB: {
    type: mongoose.Schema.ObjectId,
    ref: 'Answer'
  },
  answerC: {
    type: mongoose.Schema.ObjectId,
    ref: 'Answer'
  },
  answerD: {
    type: mongoose.Schema.ObjectId,
    ref: 'Answer'
  },
});

const Question = mongoose.model('Question', questionSchema);