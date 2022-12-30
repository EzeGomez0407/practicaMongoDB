const mongoose = require("mongoose");

const schemaUser = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    minlength: 12,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  date: {
    type: Date,
    dafault: Date.now,
  },
});

module.exports = mongoose.model("User", schemaUser);
