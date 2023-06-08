const md5 = require("md5");
const axios = require("axios");
const db = require("../../db");
require("dotenv").config();

const JackpotHistory = db.JackpotHistory;
var ObjectId = require("mongodb").ObjectID;

exports.create = async (req, res) => {
  try {
    console.log("JackpotHistory() req.body ==> ", req.body);

    var newHistory = new JackpotHistory({
      ...req.body,
    });

    newHistory
      .save()
      .then((data) => {
        res.send({ code: 0, data });
      })
      .catch((error) => {
        console.log("Create JackpotHistory ===> ", error);
        res.send({ code: -1 });
      });
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteAll = (req, res) => {
  try {
    if (req.body.password == "clean") {
      JackpotHistory.deleteMany({})
        .then((docs) => {
          return res.send({ code: 0, data: docs, message: "" });
        })
        .catch((err) => {
          return res.send({ code: -1, data: {}, message: "" });
        });
    } else {
      return res.send({ code: -1, data: {}, message: "Wrong passcode" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.getByLimit = (req, res) => {
  try {
    const chainId = req.body.chainId;
    JackpotHistory.find({ chainId: chainId })
      .limit(req.body.limit)
      .sort({ createdAt: -1 })
      .then((docs) => {
        return res.send({ code: 0, data: docs, message: "" });
      })
      .catch((err) => {
        console.log(err);
        return res.send({ code: -1, data: {}, message: "" });
      });
  } catch (error) {
    console.log(error.message);
  }
};
