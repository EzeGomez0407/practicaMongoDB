const express = require("express");
const app = express();
const cors = require("cors");
const routePets = require("./routes/routePets");
const routeAuth = require("./routes/routeAuth");
const bodyParser = require("body-parser");

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/", routePets);
app.use("/auth", routeAuth);

module.exports = app;
