
const express = require('express');
const chartsController = require("./api/charts.controller");
const statisticsController = require("./api/statistics.controller");
const app = express();


// Register controller for statistics route.
app.use("/charts", chartsController);

app.use("/stats", statisticsController);


// Start
app.listen(5000, () => console.log("Server started on port 5000"));