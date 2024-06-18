const express = require("express");
const {connectMongoDb} = require("./connect");
const dictRoute = require("./routes/dict");

const app = express();
const PORT = 9001;

//middleware to parse json data
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/", dictRoute);

connectMongoDb("mongodb://127.0.0.1:27017/uc-interview-tasks");

app.listen(PORT, ()=>{console.log(`Server started on PORT: ${PORT} `)});