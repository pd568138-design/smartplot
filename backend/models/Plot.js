const mongoose = require("mongoose");

const plotSchema = new mongoose.Schema({

  /* PLOT DETAILS */

  area: String,

  location: String,

  budget: Number,

  size: String,

  description: String,

  waterFacility: Boolean,

  drainageFacility: Boolean,

  /* SELLER DETAILS */

  sellerName: String,

  sellerPhone: String,

  sellerEmail: String,

  sellerAddress: String,

  /* BOOKING DETAILS */

  booked: {
    type: Boolean,
    default: false
  },

  customerName: {
    type: String,
    default: ""
  },

  customerPhone: {
    type: String,
    default: ""
  },

  customerEmail: {
    type: String,
    default: ""
  },

  customerAadhaar: {
    type: String,
    default: ""
  },

  bookingDate: {
    type: Date,
    default: null
  }

});

module.exports = mongoose.model(
  "Plot",
  plotSchema
);