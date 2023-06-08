const express = require('express');
const router = express.Router();
const PlayHistory = require("./PlayHistory");
const JackpotHistory = require("./JackpotHistory");

router.use("/PlayHistory",  PlayHistory);
router.use("/JackpotHistory",  JackpotHistory);

module.exports = router;
