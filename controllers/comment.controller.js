const Room = require("../models/room.model");
const Post = require("../models/post.model");
const User = require("../models/user.model");
const Role = require("../models/role.model");
const ChooseRoom = require("../models/chooseRoom.model");
const Notification = require("../models/notifications.model");
const FavoriteRoom = require("../models/favoriteRoom.model");
const Comment = require("../models/comment.model");
const NotificationService = require('../services/notification');
const postComment = async (req, res, next) => {
    try {
        const userId = req.cookies.user.user_id;
        const roomId = req.params.id;
        const {content} = req.body;
        const userCmt = await User.findOne({_id: userId});
        const userNameCmt = userCmt.username;
        let role, showSearch = "no";
        const room = await Room.findOne({ _id: roomId });
        role = await Role.findOne({ userId: userId });
        role = role.name;
        const userInfor = await User.findOne({ _id: room.userId });
        let numberNotification = await NotificationService.getNumberNotification(userId);
        const phoneNumber = userInfor.phoneNumber;
        let cmtBody = {
            userId: userId,
            roomId: roomId,
            userName: userNameCmt,
            content: content,
        }
        const newComment = new Comment(cmtBody);
        await newComment.save();
        const user = req.cookies.user;
        const roomLike = await FavoriteRoom.findOne({userId: userId, roomId: roomId.id});
        let isLike = false;
        if(roomLike) {
            isLike = true;
        }
        const listCmt = await Comment.find({roomId: roomId});
    //     res.status(200)
    //   .render("roomDetail", {
    //     room,
    //     user,
    //     phoneNumber,
    //     userInfor,
    //     role,
    //     showSearch,
    //     isLike,
    //     numberNotification,
    //     listCmt,
    //   });
    res.redirect(`/room/${roomId}`);
    } catch (error) {
        console.log(error);
    }
}
const deleteComment = async(req, res, next) => {
    try {
        const cmtId = req.params.id;
        await Comment.deleteOne({_id: cmtId});
        const roomId = req.params.roomId;
        res.redirect(`/room/${roomId}`);
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    postComment,
    deleteComment,
}