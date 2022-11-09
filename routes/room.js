const express = require('express');
const { route } = require('./register');
const roomController = require('../controllers/room.controller')

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
router.get('/post', roomController.getUploadRoom);
router.get('/rooms');
router.get('/:id', roomController.getDetailRoom);
router.post('/upload/room', upload.array("files", 4), roomController.postUploadRoom);
router.delete('/delete/room/:id');

router.get('/selectRoom/All', roomController.getSelectRoom);
router.post('/chooseRoom/:id', roomController.postSelectRoom);
router.delete('/delete/chooseRoom/:id', roomController.deleteSelectRoom);

router.post('/accept/selectRoom/:roomId', roomController.successfullySelectRoom);
module.exports = router;