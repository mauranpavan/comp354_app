// Controller exposes endpoints to the client. It serves as the interface between client and the data from the database.

const express = require("express");
const fs = require('fs');
const processData = require("../services/charts.filtering.js");
let router = express.Router();


// [GET(/charts/:range/:filter/:stat)] - Gets data with different parameters.
router.route("/:range/:filter/:stat")
    .get((req, res) => {
        const { range, filter, stat } = req.params;
        fs.readFile('../data/data.csv', 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            const outputData = processData.processData(data, range, filter, stat);
            console.log(`Request for: ${range}, ${filter}, ${stat}`);


            res.json({
                "name": `${stat}`,
                "data": outputData
            })
        });
    });

module.exports = router;
