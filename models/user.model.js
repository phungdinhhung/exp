const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const user = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 6,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 10,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    fullName: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg",
    },
    phoneNumber: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

user.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

module.exports = mongoose.model("User", user);
