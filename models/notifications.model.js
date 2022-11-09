const mongoose = require("mongoose");
const notification = new mongoose.Schema(
  {
    userId: {
      type: Object,
      default: ""
    },
    ownerId: {
      type: Object,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("notification", notification);