const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
dotenv.config({path:"./config/config.env"})



app.use(express.json());
app.use(cors({
	origin: "*",
	credentials: true
}))




// Routes Import
const user = require("./routes/userRoutes.js")
// const results = require("./routes/resultsRoutes.js")



app.use("/api/", user);



app.get("/api/test",(req,res)=>{
	res.json(
		"Everything Fine"
	)
})



module.exports = app;