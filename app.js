const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const routePets = require("./routes/routeGetPets");
const routeAuth = require("./routes/routeAuth");
const routeAddPet = require("./routes/routesSecure/routeAddPet");
const verifyAuth = require("./midleware/mw-jwt");

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/", routePets);
app.use("/auth", routeAuth);
app.use("/", verifyAuth, routeAddPet);

module.exports = app;
