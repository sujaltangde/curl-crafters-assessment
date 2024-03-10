const express = require("express");
const { addQuestions, getQuestions, submitQuiz, getScore, getScores } = require("../controllers/quizControls");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.route("/addQuestions").get(isAuthenticated,addQuestions);
router.route("/getQuestions").get(isAuthenticated,getQuestions);
router.route("/getQuestions-backend").get(getQuestions);
router.route("/submit").post(isAuthenticated,submitQuiz);
router.route("/getScore").get(isAuthenticated,getScore);
router.route("/getScores").get(isAuthenticated, getScores);;

module.exports = router;
