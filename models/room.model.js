const mongoose = require("mongoose");
const like = new mongoose.Schema({
  userId: {
    type: Object,
    default: "",
  }
})
const image = new mongoose.Schema({
  url: {
    type: String,
    default: "",
  }
});
const room = new mongoose.Schema(
  {
    type: {
      type: String,
      default: ""
    },
    price: {
      type: String,
      default: ""
    },
    acreage: {
      type: Number,
      default: 0
    },
    city: {
      type: String,
      default: "",
    },
    district: {
      type: String,
      default: "",
      },
    ward: {
      type: String,
      default: "",
    },
    address: {
        type: String,
        default: "",
      },
    description: {
      type: String,
      default: "",
    },
    state: {
      type: Boolean,
      default: true,
    },
    username: {
      type: String,
      default: "",
    },
    userId: {
      type: Object,
      default: "",
    },
    listLike: [like],
    isAccept: {
      type: Boolean,
      default: false,
    },
    images: [image]
  },
  { timestamps: true }
);


module.exports = mongoose.model("Room", room);