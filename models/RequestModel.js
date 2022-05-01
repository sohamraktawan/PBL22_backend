const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
    timeStamp: String,
    user_id: String,
    username: String,
    title: String,
    desc: String,
    helpers:[String],

},{versionKey:false})

const Request = mongoose.model("request", RequestSchema);

module.exports = Request;