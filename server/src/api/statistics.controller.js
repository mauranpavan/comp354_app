// Controller exposes endpoints to the client. It serves as the interface between client and the data from the database.

const express = require("express");
let router = express.Router();

// [GET{/statistics/}] - Gets all statistics
router.route("/")
.get((req, res) => {
    // We would usually delegate this to a method in statistics.repository, but don't worry about that for now.
    res.json({"message": "Displaying all information on workouts."})
    console.log("GET /statistics/")
})

// TODO - Figure out how to send parameters in the requests: Example - /statistics/{date} for a certain workout maximum date to filter by. 

module.exports = router;