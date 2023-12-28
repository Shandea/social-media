const express = require("express");

const mongoose = require('mongoose')



const app = express();

const cors = require("cors");

require("dotenv")
// .config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

// Routes
const Router = require('./routes/routes')
// app.use(require());

// Get MongoDB driver connection
// const dbo = require("./db/conn");

/////  TEST AREA ///






app.listen(port, () => {
  // Perform a database connection when server starts

  mongoose.connect(`mongodb+srv://banyan:banyanlabs@cluster0.j2lsvjv.mongodb.net/groupProject`).then(() => {
    console.log("connected to Database")
  })

  console.log(`Server is running on port: ${port}`);
});


