const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({

    title:String,
    desc:String,




},{versionKey:false})

const Task = mongoose.model("task", TaskSchema);

module.exports = Task;