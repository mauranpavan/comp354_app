
const express = require("express");
let router = express.Router();

router.route("/")
    .get((req, res) => {
        res.json({ "message": "Displaying all stats on workouts." })
        console.log("GET /stats/")
    })


module.exports = router;