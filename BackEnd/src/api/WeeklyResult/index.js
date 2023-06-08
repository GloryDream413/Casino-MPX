const express = require('express');
const router = express.Router();
const WeeklyResult = require("./controller");

router.post('/create', WeeklyResult.create);
router.get("/getByLimit", WeeklyResult.getByLimit);

module.exports = router;
