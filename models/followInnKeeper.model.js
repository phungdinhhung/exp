const mongoose = require("mongoose");
const followInnkeeper = new mongoose.Schema(
  {
    userId: {
      type: Object,
      default: ""
    },
    innKeeperId: {
      type: Object,
      default: ""
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("followInnKeeper", followInnkeeper);