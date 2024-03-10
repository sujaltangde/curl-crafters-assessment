const mongoose = require('mongoose');


const QuestionSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    question: {
        type: String,
        required: true
    },
    options: [{
        label: {
            type: String,
            required: true,
            enum: ["A","B","C","D"]
        },
        text: {
            type: String,
            required: true
        },
        isCorrect: {
            type: Boolean,
            required: true
        }
    }]
});


const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
