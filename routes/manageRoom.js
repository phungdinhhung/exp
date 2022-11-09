const express = require("express");

const manageRoomController = require("../controllers/manageRoom.controller");

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "motel",
    },
});
const upload = multer({ storage: storage });
const router = express.Router();

/* GET home page. */
router.get("/myRoom/all", manageRoomController.getMyRoom);
router.post("/myRoom/delete/:id", manageRoomController.deleteMyRoom);
router.post("/myRoom/update/:id", upload.array("files", 4), manageRoomController.updateMyRoom);

router.get("/select/yourRoom", manageRoomController.getSelectRoom);

router.post("/accept/selectRoom/:roomId", manageRoomController.successfullySelectRoomInnkeeper);
module.exports = router;