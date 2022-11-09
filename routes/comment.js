const express = require("express");
const commentController = require("../controllers/comment.controller");
const router = express.Router();

router.post("/post/:id", commentController.postComment);
router.post("/delete/:roomId/:id", commentController.deleteComment);
module.exports = router;