const Dict = require("../models/dict");

async function handleGetDict(req,res) {
    //get all pairs
    const pairs = await Dict.find({});
    const html = 
    `<ul>
    ${pairs.map((pair)=> `<br><br><li>word: ${pair.word}<br>meaning: ${pair.meaning}<br>synonym: ${pair.synonym}<br>antonym: ${pair.antonym} </li>`).join("")}
    </ul>`

    res.status(200).send(html);
};

async function handleGetAPair(req,res){
    //get a single pair
    const word = req.params.word;
    const pair = await Dict.findOne({word:word});
    if(!pair) return res.status(404).json({error: "word not found"})

    return res.status(200).json(pair);
};

async function handleAddNewPair(req,res){
    //post request
    const body = req.body;
    const pair = await Dict.create({
        word: body.word,
        meaning: body.meaning,
        synonym: body.synonym,
        antonym: body.antonym,
    });

    console.log("new pair:", pair);
    return res.status(201).json({status: "success"});
};

async function handleUpdateAPair(req,res){
    //patch request
    const body = req.body;
    const word = req.params.word;
    const pair = await Dict.findOneAndUpdate({word:word}, {
        meaning: body.meaning,
        synonym: body.synonym,
        antonym: body.antonym,
    });

    console.log("updated pair:",pair);
    return res.status(200).json({status:"success"});
};

async function handleDeleteAPair(req,res) {
    //delete request
    const word = req.params.word;
    const pair = await Dict.findOneAndDelete({word:word});

    console.log("deleted pair:",pair);
    return res.status(200).json({msg: 'deleted successfully'});
};

async function handleSearch(req,res) {
    const query = req.params.query;

    try{
    const match = await Dict.find({word: {$regex:"^"+query, $options:"i"}});

    if(match.length === 0) return res.json({error: "No words found"});
    
    return res.json(match)
    }
    catch(error){
        return res.json({error:"Unable to find words"})
    }

};

async function handleSimilarOrOppositeWordSearch(req,res) {
    const query = req.params.query;
    try{
        const match = await Dict.find({
            $or: [
                {meaning: query},
                {synonym: query},
                {antonym: query}
            ]
        })
        if (match.length === 0) return res.json("No matches found");

        return res.json(match);
    }
    catch(error){
        return res.json({error:"Unable to fetch words"});
    }
};

module.exports = {
    handleGetDict,
    handleGetAPair,
    handleAddNewPair,
    handleUpdateAPair,
    handleDeleteAPair,
    handleSearch,
    handleSimilarOrOppositeWordSearch,
};