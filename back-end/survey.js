const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const surveySchema = new mongoose.Schema({
    questions: Array,
    result: String,
  });
  
  const Survey = mongoose.model('Survey', surveySchema);