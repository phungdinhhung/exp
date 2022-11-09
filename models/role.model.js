const mongoose = require("mongoose");
const role = new mongoose.Schema(
  {
    userId: {
      type: Object,
      default: ""
    },
    name: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("Role", role);