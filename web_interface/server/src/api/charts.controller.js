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

            const allTime = (new Date("2000-01-01")).toISOString().split('T')[0];
            const outputData = processData.processData(data, allTime, "All time");

            // TODO - Insert the correct data points from the parsed file FOR DEFAULT PARAMS (daily filter, total distance only) 

            // Currently, this works for categorical data.. so the format below would not work for continous data like line plot.
            // Either way, all of our stats are categorical, unless we decide to plot one stat against another like distance vs average speed.
            res.json({
                "name": "All Time Data",
                "data": [
                    {
                        name: 'Argon', // would become a day of the week
                        y: 0.9,
                        color: '#3498db'
                    },
                    {
                        name: 'Nitrogen',
                        y: 78.1,
                        color: '#9b59b6'
                    },
                    {
                        name: 'Oxygen',
                        y: 20.9,
                        color: '#2ecc71'
                    },
                    {
                        name: 'Trace Gases',
                        y: 0.1,
                        color: '#f1c40f'
                    }
                ]
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

            const oneYearAgo = (new Date(new Date().setFullYear(new Date().getFullYear() - 1))).toISOString().split('T')[0];
            const outputData = processData.processData(data, oneYearAgo, "Yearly");

            res.json({
                "name": "Data over Last Year",
                "data": [
                    {
                        name: 'Argon',
                        y: 0.9,
                        color: '#3498db'
                    },
                    {
                        name: 'Nitrogen',
                        y: 78.1,
                        color: '#9b59b6'
                    },
                    {
                        name: 'Oxygen',
                        y: 20.9,
                        color: '#2ecc71'
                    },
                    {
                        name: 'Trace Gases',
                        y: 0.1,
                        color: '#f1c40f'
                    }
                ]
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

            const oneMonthAgo = (new Date(new Date().setMonth(new Date().getMonth() - 1))).toISOString().split('T')[0];
            const outputData = processData.processData(data, oneMonthAgo, "Monthly");

            res.json({
                "name": "Data over Last Month",
                "data": [
                    {
                        name: 'Argon',
                        y: 0.9,
                        color: '#3498db'
                    },
                    {
                        name: 'Nitrogen',
                        y: 78.1,
                        color: '#9b59b6'
                    },
                    {
                        name: 'Oxygen',
                        y: 20.9,
                        color: '#2ecc71'
                    },
                    {
                        name: 'Trace Gases',
                        y: 0.1,
                        color: '#f1c40f'
                    }
                ]
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

            const oneWeekAgo = (new Date(new Date().setDate(new Date().getDate() - 7))).toISOString().split('T')[0];
            const outputData = processData.processData(data, oneWeekAgo, "Weekly");

            res.json({
                "name": "Data over last Week",
                "data": [
                    {
                        name: 'Argon',
                        y: 0.9,
                        color: '#3498db'
                    },
                    {
                        name: 'Nitrogen',
                        y: 78.1,
                        color: '#9b59b6'
                    },
                    {
                        name: 'Oxygen',
                        y: 20.9,
                        color: '#2ecc71'
                    },
                    {
                        name: 'Trace Gases',
                        y: 0.1,
                        color: '#f1c40f'
                    }
                ]
            })

        });

    });

module.exports = router;
