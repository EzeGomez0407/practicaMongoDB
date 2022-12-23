const express = require("express");
const app = express();
const routePets = require("./routes/routePets");

app.use("/", routePets);

module.exports = app;
