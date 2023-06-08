const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();

const db = require("./db");
const api = require("./api");

db.mongoose.set('strictQuery', true);

db.mongoose
.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to the database!");
})
.catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(express.static('public/uploads'));
app.use(cors());
app.use(express.json());

app.use("/api", api);
module.exports = app;
