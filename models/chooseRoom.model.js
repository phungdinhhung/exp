const mongoose = require("mongoose");
const chooseRoom = new mongoose.Schema(
  {
    userId: {
      type: Object,
      default: ""
    },
    roomId: {
      type: Object,
      default: ""
    },
    innkeeperId: {
      type: Object,
      default: ""
    },
    userAccept: {
      type: Boolean,
      default: false
    },
    innKeeperAccept: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("chooseRoom", chooseRoom);