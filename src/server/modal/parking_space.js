const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParkingSpace = new Schema(
  {
    parking_space_id: {type: String},
    vehicle_transaction_id: {type: Schema.Types.String},
    parking_space_title: {type: String},
    parking_zone_id: {type: String},
    is_available: {type: Boolean},
    vehicle_no:{type: String}
  }
);

module.exports = mongoose.model("parking_space", ParkingSpace);