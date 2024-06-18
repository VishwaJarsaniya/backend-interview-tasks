const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 9000;

//middleware to parse json data
app.use(express.json())


app.post("/flashcard" , async(req,res) => {
    
    const {word} = req.body;
    if(!word) return res.json("error: word is required");

    try{
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = response.data;

    res.json({data})
    }
    catch(err){
    console.log("error fetching data", err);
    res.status(500).json("error while fetching data");
    }
});


app.listen(PORT,()=>console.log(`Server started on PORT: ${PORT}`))