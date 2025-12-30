const express = require("express");
const router = express.Router();
const globalSearch=require("../controllers/globalSearch.controller")


router.get("/", globalSearch.globalSearch); 

module.exports = router;