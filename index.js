const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const bodyParser = require('body-parser')
const cors = require("cors")



const app = express()
dotenv.config()


app.use(express.json());
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());












//Port
const port = process.env.PORT || 5000


//database connection here
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})



app.listen(port, console.log(`App is running on port ${port}`))