
const express = require("express");
let router = express.Router();
const execSync = require('child_process').execSync;
const path = require('path');
const fs = require('fs');
const processData = require("../services/extra.statistics.calculator");


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
        // res.json({ "message": "All the statistics aggregator files have been run." });
        console.log("GET /stats/");

        /**
         * To do if necessary: Delete existing files ?
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


        //Lifetime Statistics
        fs.readFile('../data/workout-summaries.csv', 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            //Lifetime Statistics
            let totalDistance = processData.processData(data, "distance");
            let totalCalories = processData.processData(data, "calories");
            let totalDuration = processData.processData(data, "duration");
            let totalWorkouts = processData.processData(data, "workouts");

            //Top Performance Statistics
            var topDistance = processData.processData(data, "topDistance");
            var topCalories = processData.processData(data, "topCalories");
            var topDuration = processData.processData(data, "topDuration");
            var topSpeed = processData.processData(data, "topSpeed");
            var topAvgSpeed = processData.processData(data, "topAvgSpeed");

            res.json({
                "distance": totalDistance,
                "calories": totalCalories,
                "duration": totalDuration,
                "workouts": totalWorkouts,
                //Top Performance
                "topDistance": topDistance,
                "topCalories": topCalories,
                "topDuration": topDuration,
                "topSpeed": topSpeed,
                "topAvgSpeed": topAvgSpeed
            })
        });


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