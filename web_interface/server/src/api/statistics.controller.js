
const express = require("express");
let router = express.Router();
const execSync = require('child_process').execSync;
const path = require('path');
const fs = require('fs');


try {
    var dailyFile = path.resolve('src/services', 'statistics.daily.aggregator.js');
    var weekFile = path.resolve('src/services', 'statistics.weekly.aggregator.js');
    var monthFile = path.resolve('src/services', 'statistics.monthly.aggregator.js');
    var yearFile = path.resolve('src/services', 'statistics.yearly.aggregator.js');
} catch (error) {
    throw error

}


/**
 * Ref: https://www.geeksforgeeks.org/node-js-child-process/
 */


router.route("/")
    .get((req, res) => {
        res.json({ "message": "All the statistics aggregator files have been run." });
        console.log("GET /stats/");

        /**
         * Delete existing files
         * 
         */

        async function runDailyAggregator() {
            const dayCmd = 'node' + ' ' + dailyFile;
            execSync(dayCmd);

            return true;

        };

        async function runWeeklyAggregator() {
            var returnVal = await runDailyAggregator();

            console.log("return val: " + returnVal);
            if (returnVal) {
                const weekCmd = 'node' + ' ' + weekFile;
                execSync(weekCmd);
                return true;
            }
            else
                return false;
        }

        async function runMonthlyAggregator() {
            var returnVal = await runWeeklyAggregator();

            console.log("return val: " + returnVal);
            if (returnVal) {
                const monthCmd = 'node' + ' ' + monthFile;
                execSync(monthCmd);
                return true;
            }
            else
                return false;
        }

        async function runYearlyAggregator() {
            var returnVal = await runMonthlyAggregator();

            console.log("return val: " + returnVal);
            if (returnVal) {
                const yearCmd = 'node' + ' ' + yearFile;
                execSync(yearCmd);
                return true;
            }
            else
                return false;
        }

        runYearlyAggregator();
    });

router.route("/show/:range")
    .get((req, res) => {
        const { range } = req.params;
        fs.readFile(`../data/${range}-occurence-statistics.csv`, 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            // Process data if you want/need

            // const outputData = processData.processData(data, range, filter, stat);
            // console.log(`Request for: ${range}, ${filter}, ${stat}`);


            res.json({
                "data": data
            })
        });
    })

// extra route for show workout summaries button

module.exports = router;