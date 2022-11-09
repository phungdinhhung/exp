const express = require("express");
const adminController = require("../controllers/admin.controller");

const router = express.Router();

router.get("/", adminController.renderAdminPage);

// Admin manage all Users
router.get("/users", adminController.getAllUsers);
router.get("/comments", adminController.getAllComments);
router.delete("/users/:id", adminController.blockUser);

// Admin manage all Posts
router.get("/posts", adminController.getAllPosts);
router.post("/accept/:id", adminController.acceptPost);
router.post("/delete/:id", adminController.deletePost);
// Admin manage all Comments

module.exports = router;
