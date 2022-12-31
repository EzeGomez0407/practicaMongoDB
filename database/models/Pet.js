const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  age: {
    type: Number,
    required: true,
  },
  temperament: {
    type: Array,
  },
  type: {
    type: String,
    required: true,
    maxlength: 30,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;
