
const express = require('express');
const statisticsController = require("./api/statistics.controller");

const app = express();

// Register controller for statistics route.
app.use("/statistics", statisticsController);

// Start
app.listen(5000, () => console.log("Server started on port 5000"));