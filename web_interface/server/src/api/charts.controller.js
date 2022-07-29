// Controller exposes endpoints to the client. It serves as the interface between client and the data from the database.

const express = require("express");
const fs = require('fs');
const processData = require("../services/charts.filtering.js");
let router = express.Router();


// [GET(/charts/)] - Gets data for all time (the default for when a user is routed to /charts)
router.route("/")
    .get((req, res) => {
        fs.readFile('../data/data.csv', 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            const filter = "Weekly"; //Daily, Weekly, Monthly, Yearly
            const statistics = "Total Distance"; //Total Distance, Total Calories Burnt, Total Duration, Top Speed, Average Speed
            const outputData = processData.processData(data, "All time", filter, statistics);

            // TODO - Insert the correct data points from the parsed file FOR DEFAULT PARAMS (daily filter, total distance only) 

            // Currently, this works for categorical data.. so the format below would not work for continous data like line plot.
            // Either way, all of our stats are categorical, unless we decide to plot one stat against another like distance vs average speed.
            
            console.log({
                "name": "All Time Data",
                "data": outputData
            });
            
            res.json({
                "name": "All Time Data",
                "data": outputData
            })

        });
    });

// [GET(/charts/year)] - Gets data for workouts that took place in the last year.
router.route("/year")
    .get((req, res) => {
        fs.readFile('../data/data.csv', 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            const filter = "Weekly"; //Daily, Weekly, Monthly, Yearly
            const statistics = "Total Distance"; //Total Distance, Total Calories Burnt, Total Duration, Top Speed, Average Speed
            const outputData = processData.processData(data, "Year", filter, statistics);
            
            console.log({
                "name": "Data over Last Year",
                "data": outputData
            });
            
            res.json({
                "name": "Data over Last Year",
                "data": outputData
            })

        });
    });

// [GET(/charts/month)] - Gets data for workouts that took place in the last month.
router.route("/month")
    .get((req, res) => {
        fs.readFile('../data/data.csv', 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            const filter = "Weekly"; //Daily, Weekly, Monthly, Year
            const statistics = "Total Distance"; //Total Distance, Total Calories Burnt, Total Duration, Top Speed, Average Speed
            const outputData = processData.processData(data, "Month", filter, statistics);
            
            console.log({
                "name": "Data over Last Month",
                "data": outputData
            });
            
            res.json({
                "name": "Data over Last Month",
                "data": outputData
            })

        });
    });

// [GET(/charts/week)] - Gets data for workouts that took place in the last week.
router.route("/week")
    .get((req, res) => {
        fs.readFile('../data/data.csv', 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            const filter = "Daily"; //Daily, Weekly, Monthly, Year
            const statistics = "Total Distance"; //Total Distance, Total Calories Burnt, Total Duration, Top Speed, Average Speed
            const outputData = processData.processData(data, "Week", filter, statistics);
            
            console.log({
                "name": "Data over last Week",
                "data":outputData
            });
            
            res.json({
                "name": "Data over last Week",
                "data": outputData
            })

        });

    });

module.exports = router;
