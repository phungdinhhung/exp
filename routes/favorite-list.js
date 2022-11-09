const express = require("express");
const favoriteListController = require("../controllers/favorite-list.controller")
const router = express.Router();

router.get("/rooms", favoriteListController.getFavoriteList);
router.post("/room/like/:id", favoriteListController.postFavoriteList)
router.delete("/room/unlike/:id", favoriteListController.deleteFavoriteList)
module.exports = router;