
const express = require('express');
const app = express();

// TODO - Need to figure out how to move endpoints to the api/controllers.
app.get("/api", (req, res) => {
    res.json({"users" : ["userOne", "userTwo"]})
});

app.listen(5000, () => console.log("Server started on port 5000"));