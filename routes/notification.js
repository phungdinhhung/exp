const express = require("express");

const notificationController = require("../controllers/notification.controller");

const router = express.Router();

/* GET home page. */
router.get("/innkeeper/all", notificationController.getInkeeperNotification);
router.post("/innkeeper/notifi/delete/:id", notificationController.deleteNotifi);
module.exports = router;