const mongoose = require("mongoose");
const comment = new mongoose.Schema(
  {
    userId: {
      type: Object,
      default: ""
    },
    roomId: {
        type: Object,
        default: ""
      },
    userName: {
    type: String,
    default: ""
    },
    content: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("Comment", comment);