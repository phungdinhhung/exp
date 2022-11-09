const express = require('express');
const userController = require('../controllers/user.controller')

const router = express.Router();

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

router.get('/infor', userController.getUserInformation);
router.put('/update', userController.updateUserInformation);
router.put('/update', userController.updatePassword);
router.post('/upload/avatar', upload.single("file"),userController.updateAvatar);

router.get('/people/:id', userController.showOtherPeopleInfor);

router.post('/people/follow/:id', userController.followInnKeeper);
router.post('/people/unFollow/:id', userController.unFollowInnkeeper);

router.get('/innkeeper/all', userController.getFollowInnkeeper);
module.exports = router;