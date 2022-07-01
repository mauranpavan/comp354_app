// Controller exposes endpoints to the client. It serves as the interface between client and the data from the database.

const express = require("express");
let router = express.Router();

// [GET{/charts/}] - Gets all charts
router.route("/")
    .get((req, res) => {
        // We would usually delegate this to a method in charts.repository, but don't worry about that for now.
        res.json({ "message": "Displaying all charts on workouts." })
        console.log("GET /charts/")
    })

// TODO - Figure out how to send parameters in the requests: Example - /charts/{date} for a certain workout maximum date to filter by. 

module.exports = router;