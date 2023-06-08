const express = require('express');
const router = express.Router();
const JackpotHistory = require("./controller");

router.post('/create', JackpotHistory.create);
router.post("/getByLimit", JackpotHistory.getByLimit);

module.exports = router;
