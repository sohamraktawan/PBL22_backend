const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userAuthRoutes = require('./routes/UserAuthRoutes')
const helperAuthRoutes = require('./routes/HelperAuthRoutes')
const cookieParser = require('cookie-parser')
require('dotenv').config();
const dotenv = require('dotenv');
const path = require('path')

app.use(cors());
app.use(cookieParser());
app.use(express.json());

const dbURI = process.env.db_connect

mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(res=>{
    console.log("connected to db")
})
.catch(err=>{
    console.log(err);
});

app.use("/", require("./routes/requestRoute"))
app.use(userAuthRoutes);
app.use(helperAuthRoutes);


app.listen(process.env.PORT || 3001, ()=>{
    console.log("express running is localhost 3001");
})

