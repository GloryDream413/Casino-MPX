const dbConfig = require('./config');
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.PlayHistory = require("./PlayHistory.model")(mongoose);
db.WeeklyResult = require("./WeeklyResult.model")(mongoose);
db.JackpotHistory = require("./JackpotHistory.model")(mongoose);

module.exports = db;
