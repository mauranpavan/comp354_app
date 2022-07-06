// Controller exposes endpoints to the client. It serves as the interface between client and the data from the database.

const express = require("express");
const fs = require('fs');
let router = express.Router();


// [GET(/charts/)] - Gets data for all time (the default for when a user is routed to /charts)
router.route("/")
    .get((req, res) => {
        fs.readFile('../data/sample.csv', 'utf-8', (err, data) => {
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
        res.json({ "message": "Data filtered to show only last YEAR." })
    });

// [GET(/charts/month)] - Gets data for workouts that took place in the last month.
router.route("/month")
    .get((req, res) => {
        res.json({ "message": "Data filtered to show only last MONTH." })
    });

// [GET(/charts/week)] - Gets data for workouts that took place in the last week.
router.route("/week")
    .get((req, res) => {
        res.json({ "message": "Data filtered to show only last WEEK." })
    });

module.exports = router;