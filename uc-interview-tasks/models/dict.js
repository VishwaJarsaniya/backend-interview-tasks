const mongoose = require("mongoose");

const dictSchema = new mongoose.Schema({
    word:{
        type:String,
        unique:true,
        minlen:2,
        maxlen:12,
    },
    meaning:{
        type:String,
    },
    synonym:{
        type:String,
    },
    antonym:{
        type:String,
    },
});

const Dict = new mongoose.model("Dict", dictSchema);

module.exports = Dict;
