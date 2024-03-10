const Question = require("../models/questionModel");
const questions = require("../models/questions.json");
const Score = require("../models/scoreModel");
const User = require("../models/userModel");
const axios = require("axios");

// console.log(questions)

exports.addQuestions = async (req, res) => {
  try {
    const insertedQuestions = await Question.insertMany(questions);

    res.status(201).json({
      success: true,
      insertedQuestions,
      message: "questions added",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();

    res.status(200).json({
      success: true,
      questions,
      message: "questions fetched",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.submitQuiz = async (req, res) => {
  try {
    const { options } = req.body;

    const data = await axios.get(
      "http://localhost:5000/api/quiz/getQuestions-backend"
    );

    const que = data.data.questions;

    let sum = 0;
    for (let i = 0; i < que.length; i++) {
      const correctLabel = que[i].options.find(
        (option) => option.isCorrect
      )?.label;

      if (correctLabel === options[i].option) {
        sum += 5;
      }
    }

    const user = await User.findOne({ email: req.email });

    user.attempted = true;

    await user.save();

    const submittedScore = await Score.create({
      userId: user._id,
      username: user.username,
      score: sum,
    });

    res.status(201).json({
      success: true,
      submittedScore,
      message: "questions fetched",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getScore = async (req,res) => {
    try{

        const user = await User.findOne({email: req.email}) ;

        const score = await Score.findOne({userId: user._id}) ;

        res.status(200).json({
            success: true,
            score,
            message: "Score fetched"
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message,
          });
    }
}

exports.getScores = async (req,res) => {
    try{

        const user = await User.findOne({email: req.email}) ;

        if(user.isAdmin){
            const scores = await Score.find() ;

            return res.status(200).json({
                success: true,
                scores,
                message: "Score fetched"
            })
        }


        res.status(200).json({
            success: false,
            message: "You are not a admin"
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message,
          });
    }
}