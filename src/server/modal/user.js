const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
  {
    _userId: {type: Number},
    name: {type: String},
    email: {type: String},
    password: {type: String},
    type: {type: String}
  }
);

module.exports = mongoose.model("user", user, 'user');

// _userId: Schema.Types.Number,