const mongoose = require("mongoose");
const favoriteRoom = new mongoose.Schema(
  {
    userId: {
      type: Object,
      default: ""
    },
    roomId: {
      type: Object,
      default: ""
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("favoriteRoom", favoriteRoom);