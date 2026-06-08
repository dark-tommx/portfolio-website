const mongoose = require("mongoose");

const contactInfoSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactInfo", contactInfoSchema);
