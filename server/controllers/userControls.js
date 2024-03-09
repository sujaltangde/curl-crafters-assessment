const User = require('../models/userModel')
const bcrypt = require('bcrypt')


exports.register = async (req,res) => {
    try{

        const { username, email, password } = req.body; 

        res.status(201).json({
            success: true,
            message: "User created successfully!"
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
exports.login = async (req,res) => {
    try{

        const { email, password } = req.body; 

        res.status(201).json({
            success: true,
            message: "User logged in successfully!"
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}