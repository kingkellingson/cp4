const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const answerSchema = new mongoose.Schema({
    answerContent: String, 
    points: Number,
  });
  
  const Answer = mongoose.model('Answer', answerSchema);