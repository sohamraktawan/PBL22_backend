const express = require("express");

const router = express.Router();
const Task = require("../models/TasksModel")
const User = require("../models/UserModel");




router.route('/create').post((req,res)=>{
    console.log("in create")
    const title = req.body.title;
    const desc = req.body.desc;


    const newTask = new Task({


        title,
        desc,

        
    });
    console.log(newTask)
    newTask.save()
    .then(result=>{
        console.log("posted");
        res.end("done");
    })
    .catch(err=>{
        console.log(err);
    })
});

router.route('/tasks').get((req, res)=>{
    console.log("in tasks")
    Task.find()
    .then(foundtasks=>{
        console.log("sending")
        res.json(foundtasks)
    })
})

module.exports = router