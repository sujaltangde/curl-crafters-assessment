const mongoose = require('mongoose')


const ScoreSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    score:{
        type: Number,
        required: true,
    },
    maximumScore:{
        type: Number,
        required: false,
        default: 50
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Score = mongoose.model('Score', ScoreSchema)
module.exports = Score