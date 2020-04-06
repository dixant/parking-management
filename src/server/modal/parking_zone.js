const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParkingZone = new Schema(
  {
    parking_zone_id: {type: String},
    parking_zone_title: {type: String}
  },
  { timestamps: true }
);

module.exports = mongoose.model("parking_zone", ParkingZone);