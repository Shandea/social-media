const express = require("express");

const mongoose = require('mongoose')

const cookieParser = require('cookie-parser')

const app = express();

const cors = require("cors");

require("dotenv").config()
// .config({ path: "./config.env" });
const port = process.env.PORT || 5000;


app.use(cookieParser())
//had to do for the cors communication to fronend credentials
app.use(cors({
  origin:`http://localhost:3000`,
  optionsSuccessStatus:200,
  credentials:true
}));

app.use(express.json());

// Routes
const Router = require('./routes/routes')
// app.use(require());
Router(app)
// Get MongoDB driver connection
// const dbo = require("./db/conn");

/////  TEST AREA ///






app.listen(port, () => {
  // Perform a database connection when server starts

  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connected to Database")
  })

  console.log(`Server is running on port: ${port}`);
});


