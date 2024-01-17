const express = require("express");
const fs = require('fs')
const fileUpload = require('express-fileupload')
const path = require('path')
const mongoose = require('mongoose')

const cookieParser = require('cookie-parser')

const app = express();

const socketServer = require("./config/socketServer")

const cors = require("cors");

require("dotenv").config()
// .config({ path: "./config.env" });
const port = process.env.PORT || 5000;


app.use(fileUpload({
    createParentPath: true
}))


app.use("/public/", express.static(process.cwd() + "/public"))

app.use(cookieParser())

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });
//had to do for the cors communication to fronend credentials
app.use(cors({
  // origin:`*`,
  methods: ['POST', 'GET', 'PUT'],
  origin:[`http://localhost:3000`],
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
app.set('json spaces', 2)


const server = socketServer.socketServer(app)



server.listen(port, () => {
// app.listen(port, () => {
  // Perform a database connection when server starts

  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connected to Database")
  })

  console.log(`Server is running on port: ${port} and socket is connected`);
});


