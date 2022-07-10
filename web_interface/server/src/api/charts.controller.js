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
            res.json({ "message": data });
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

            const oneYearAgo = (new Date(new Date().setFullYear(new Date().getFullYear() - 1))).toISOString().split('T')[0];
            const outputData = processData.processData(data, oneYearAgo, "Year");

            res.json({ "message": outputData });

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

            const oneMonthAgo = (new Date(new Date().setMonth(new Date().getMonth() - 1))).toISOString().split('T')[0];
            const outputData = processData.processData(data, oneMonthAgo, "Month");

            res.json({ "message": outputData });

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

            const oneWeekAgo = (new Date(new Date().setDate(new Date().getDate() - 7))).toISOString().split('T')[0];
            const outputData = processData.processData(data, oneWeekAgo, "Week");

            res.json({ "message": outputData });

        });

    });

module.exports = router;
