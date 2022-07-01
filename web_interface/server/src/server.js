
const express = require('express');
const chartsController = require("./api/charts.controller");

const app = express();

// Register controller for statistics route.
app.use("/charts", chartsController);

// Start
app.listen(5000, () => console.log("Server started on port 5000"));