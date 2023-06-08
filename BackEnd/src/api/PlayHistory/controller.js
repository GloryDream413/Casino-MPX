const md5 = require("md5");
const axios = require("axios");
const db = require("../../db");
const {
  AccountId,
  PrivateKey,
  Client,
  Hbar,
  TransferTransaction,
  ContractCallQuery,
  ContractFunctionParameters,
} = require("@hashgraph/sdk");
const { HEDERA_CONTRACT_ABI } = require("./mystery_box");
const gameABI = require("../../abis/gameabi.json");
const { WeeklyResult } = require("../../db");
const { getEventsFromMirror } = require("./query_helper");
require("dotenv").config();

const PlayHistory = db.PlayHistory;
const JackpotHistory = db.JackpotHistory;

var ObjectId = require("mongodb").ObjectID;

const accountId = AccountId.fromString(process.env.TREASURY_ID);
const privateKey = PrivateKey.fromString(process.env.TREASURY_PR_KEY);
const client = Client.forMainnet()
  .setOperator(accountId, privateKey)
  .setDefaultMaxTransactionFee(new Hbar(50));

const jackpotId = AccountId.fromString(process.env.JACKPOT_ID);
const jackpotPrKey = PrivateKey.fromString(process.env.JACKPOT_PR_KEY);
const jackpotAccount = Client.forMainnet()
  .setOperator(jackpotId, jackpotPrKey)
  .setDefaultMaxTransactionFee(new Hbar(50));

exports.writeHistory = async (req, res) => {
  try {
    console.log("writeHistory() req.body ===> ", req.body);

    var newHistory = new PlayHistory({
      ...req.body,
    });

    newHistory
      .save()
      .then((data) => {
        res.send({ code: 0, data });
      })
      .catch((error) => {
        res.send({ code: -1 });
      });
  } catch (error) {
    console.log(error.message);
  }
};

exports.readWinning = async (req, res) => {
  try {
    var account = req.body.account;
    let winOrLose = false;
    const playerId = AccountId.fromString(account);

    let latestevent = await getEventsFromMirror(
      process.env.CONTRACT_ID,
      gameABI,
      "Play"
    );
    console.log("latestevent[0]    ====> ", latestevent[0]);
    let consideringEvent;
    if (latestevent.length > 0) {
      consideringEvent = latestevent.find(
        (item) =>
          item._player.toString().toLowerCase() ===
          "0x" + playerId.toSolidityAddress()
      );
      if (consideringEvent !== null && consideringEvent !== undefined) {
        console.log(`Last event of ${account} ===> `, consideringEvent);
        if (Number(consideringEvent._earnedAmount) > 0) {
          winOrLose = true;
          console.log("Win!");
        } else console.log("Lose!");
      }
    }

    // const contractQuery = await new ContractCallQuery()
    //   .setGas(1000000)
    //   .setContractId(process.env.CONTRACT_ID)
    //   .setQueryPayment(new Hbar(2))
    // .setTransactionMemo("PMX Gaming ")
    //   .setFunction(
    //     "isWinner",
    //     new ContractFunctionParameters().addAddress(
    //       playerId.toSolidityAddress()
    //     )
    //   );

    // const getMessage = await contractQuery.execute(client);
    // winOrLose = getMessage.getBool();
    // console.log(
    //   `Crystal isWinner() log >>>>> The function result of ${account} is: ` +
    //     winOrLose
    // );

    res.send({ code: 0, data: winOrLose });
  } catch (error) {
    console.log("readWinning() error ===> ", error);
    res.send({ code: -1 });
  }
};

exports.volumns = async (req, res) => {
  try {
    //get total sum of hedera, solana
    let sums = {
      htotal: 0,
      stotal: 0,
      hweek: 0,
      sweek: 0,
    };
    await PlayHistory.aggregate([
      { $group: { _id: "$chainId", volumn: { $sum: "$depositAmount" } } },
    ])
      .then((docs) => {
        if (docs[0]?._id === "hedera") {
          sums.htotal = docs[0]?.volumn || 0;
          sums.stotal = docs[1]?.volumn || 0;
        } else {
          sums.htotal = docs[1]?.volumn || 0;
          sums.stotal = docs[0]?.volumn || 0;
        }
      })
      .catch((error) => {
        console.log("error ===> ", error);
        return res.send({ code: -1 });
      });
    //get weekly sum of hedera , solana
    await WeeklyResult.find({ chainId: "hedera" })
      .sort({ createdAt: -1 })
      .limit(1)
      .then((docs) => {
        if (docs.length > 0) {
          sums.hweek = docs[0].volumn;
        }
      })
      .catch((error) => {
        return res.send({ code: -1 });
      });
    await WeeklyResult.find({ chainId: "solana" })
      .sort({ createdAt: -1 })
      .limit(1)
      .then((docs) => {
        if (docs.length > 0) {
          sums.sweek = docs[0].volumn;
        }
      })
      .catch((error) => {
        return res.send({ code: -1 });
      });
    return res.send({ code: 0, sums });
  } catch (error) {
    console.log(error.message);
  }
};

exports.payFromJackpot = async (req, res) => {
  const baseUrl =
    process.env.NETWORK_TYPE == "mainnet"
      ? process.env.MIRROR_NODE_MAINNET_URL
      : process.env.MIRROR_NODE_TESTNET_URL;

  //read jackpot balance
  try {
    const balance = await axios(
      `${baseUrl}${process.env.GET_ACCOUNT_PREFIX}${process.env.JACKPOT_ID}`
    );
    let bal = balance.data.balance.balance / 100000000 || 0;
    if (bal > 1) {
      PlayHistory.aggregate([
        { $match: { chainId: "hedera" } },
        {
          $group: {
            _id: "$player",
            depositAmount: { $sum: "$depositAmount" },
            earning: { $sum: "$resultAmount" },
          },
        },
        {
          $sort: {
            earning: -1,
          },
        },
        {
          $limit: 1000,
        },
      ])
        .then(async (docs) => {
          let len = docs.length;
          if (len <= 0) {
            return res.send({ code: -3, data: null, message: "No player" });
          } else {
            let seleteIndex = Date.now() % len;
            console.log("docs[seleteIndex] ===> ", docs[seleteIndex]);
            let seletedWallet = docs[seleteIndex]._id;
            try {
              console.log("seletedWallet ===> ", seletedWallet);
              await new TransferTransaction()
                .addHbarTransfer(jackpotId, new Hbar(-(bal - 1)))
                .addHbarTransfer(
                  AccountId.fromString(seletedWallet),
                  new Hbar(bal - 1)
                )
                .setTransactionMemo("PMX Gaming Jackpot")
                .execute(jackpotAccount);

              new JackpotHistory({
                paidPlayer: seletedWallet,
                amount: bal - 1,
                chainId: "solana",
              })
                .save()
                .then((data) => {
                  console.log(data);
                })
                .catch((error) => {});
              return res.send({
                code: 0,
                data: docs[seleteIndex],
                message: "",
              });
            } catch (error) {
              return res.send({
                code: -1,
                data: docs[seleteIndex],
                message: "Payment tx is failed.",
              });
            }
          }
        })
        .catch((err) => {
          console.log(err);
          return res.send({
            code: -1,
            data: {},
            message: "Internal server error",
          });
        });
    } else {
      return res.send({
        code: -2,
        data: null,
        message: "Insufficient balance",
      });
    }
  } catch (error) {
    return res.send({ code: -3, data: null, message: "Internal server error" });
  }
  //send all with remaining 1 Hbar
};

exports.deleteAll = (req, res) => {
  try {
    if (req.body.password == "clean") {
      PlayHistory.deleteMany({})
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
    PlayHistory.aggregate([
      { $match: { chainId: chainId } },
      {
        $group: {
          _id: "$player",
          depositAmount: { $sum: "$depositAmount" },
          earning: { $sum: "$resultAmount" },
          track: { $sum: 1 },
        },
      },
      {
        $sort: {
          earning: -1,
        },
      },
      {
        $limit: req.body.limit,
      },
    ])
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
