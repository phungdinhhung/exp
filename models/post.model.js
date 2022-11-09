const mongoose = require("mongoose");
const post = new mongoose.Schema(
  {
    userId: {
      type: Object,
      default: ""
    },
    roomId: {
      type: Object,
      default: "",
      },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Post", post);