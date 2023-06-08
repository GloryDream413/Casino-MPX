const express = require('express');
const router = express.Router();
const PlayHistory = require("./controller");

router.post('/create', PlayHistory.writeHistory);
router.post('/getBylimit', PlayHistory.getByLimit);
router.post('/askwinning', PlayHistory.readWinning);
router.post("/initialize", PlayHistory.deleteAll);
router.post("/payFromJackpot", PlayHistory.payFromJackpot);
router.get("/volumns", PlayHistory.volumns);

module.exports = router;
