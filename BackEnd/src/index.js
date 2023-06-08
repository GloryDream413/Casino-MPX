const app = require("./app");
const https = require("https");
const fs = require("fs");
var ObjectId = require('mongodb').ObjectID;
const db = require("./db");
const PlayHistory = db.PlayHistory;
const WeeklyResult = db.WeeklyResult;
const { setIntervalAsync } = require('set-interval-async/dynamic');
var isEndOfWeekTime = false;
var weeklyFinishDate = new Date();

const httpsPort = 443;
const privateKey = fs.readFileSync("src/cert/private.key");
const certificate = fs.readFileSync("src/cert/certificate.crt");
const credentials = {
    key: privateKey,
    cert: certificate,
}

var server = https.createServer(credentials, app)
.listen(httpsPort, () => {
    console.log(`[pmxgaming.link] servier is running at port ${httpsPort} as https.`);
});

// var server = require('http').createServer(app);
// const port = process.env.PORT || 5010;
// server.listen(port, () => console.log(`Listening on port ${port}..`));
	
const MakeWeeklyGameResult = () => {
	setIntervalAsync(
		async () => {
			let currentTime = new Date();
			if (currentTime.getDay() === 0) {
				var diff = currentTime.getDate() - currentTime.getDay() + (currentTime.getDay() === 0 ? -6 : 1);
				var startOfWeek = new Date(new Date(currentTime.setDate(diff)).setHours(0, 0, 0, 0));
				console.log("startOfWeek", startOfWeek.toDateString());
				var lastday = currentTime.getDate() - (currentTime.getDay() - 1) + 6;
				var endOfWeek = new Date(currentTime.setDate(lastday));
				endOfWeek.setHours(23, 50, 59, 999);
				let delta = endOfWeek.getTime() - currentTime.getTime();
				console.log("weekly delta : ", delta);
				if ((delta < 150000 && delta >= 0) && isEndOfWeekTime === false) {
					isEndOfWeekTime = true;
					setTimeout(() => { isEndOfWeekTime = false }, 1200000);
					weeklyFinishDate = new Date(startOfWeek.setHours(00, 00, 00));
					try {
						PlayHistory.aggregate([
							{
								$match: {
									"createdAt": {
										$gte: startOfWeek,
									}
								}
							},
							{ $group: { _id: "$chainId", volumn: { $sum: "$depositAmount" } } }
						])
                        .then(async (docs) => {
                            // console.log("MakeWeeklyGameResult () docs = ", docs);
							for(let idx = 0; idx < docs.length; idx++)
							{
								var newWeekResult = new WeeklyResult({
									chainId: docs[idx]._id,
									volumn: docs[idx].volumn
								})
								newWeekResult.save().then((result) => {
									// console.log("weekly result ===> ", result);
								}).catch(error => {});		
							}
                        })
                        .catch((err) => {
                            console.log("MakeWeeklyGameResult() exception 1 : ", err);
                            return;
                        });
					} catch (error) {
						console.log("MakeWeeklyGameResult() exception 2: " + error.message)
					}
				}
			}
		},
		50000
	)
}

MakeWeeklyGameResult();

