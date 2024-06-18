const express = require("express");
const { handleGetDict, 
        handleGetAPair, 
        handleAddNewPair,
        handleUpdateAPair,
        handleDeleteAPair,
        handleSearch,
        handleSimilarOrOppositeWordSearch, } = require("../controllers/dict");

const router = express.Router();


//routes

router.get("/", handleGetDict);

router.get("/:word", handleGetAPair);

router.post("/", handleAddNewPair);

router.patch("/:word", handleUpdateAPair);

router.delete("/:word", handleDeleteAPair);

//search feature that displays word pairs based on the input. 
//For instance, typing 'a' will show words starting with 'a,' while typing 'an' will show words starting with 'an.'
router.get("/search/:query", handleSearch);

//to display pairs with same meaning or synonym or antonym as the input word
router.get("/similaroropposite/:query", handleSimilarOrOppositeWordSearch)

module.exports = router;
