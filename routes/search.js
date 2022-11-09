const express = require("express");

const searchController = require("../controllers/search.controller");

const router = express.Router();

/* GET home page. */
router.post("/", searchController.showResultOfSearch);

module.exports = router;