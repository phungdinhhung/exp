const Room = require("../models/room.model");
const Post = require("../models/post.model");
const User = require("../models/user.model");
const Role = require("../models/role.model");
const ChooseRoom = require("../models/chooseRoom.model");
const Notification = require("../models/notifications.model");
const FavoriteRoom = require("../models/favoriteRoom.model");
const Comment = require("../models/comment.model");
const RoleService = require("../services/role.service");
const NotificationService = require('../services/notification');
const Pusher = require('pusher');
const getDetailRoom = async (req, res, next) => {
  try {
    const user = req.cookies.user;
    const userName = req.cookies.user.username;
    const roomId = req.params;
    const room = await Room.findOne({ _id: roomId.id });
    const userInfor = await User.findOne({ _id: room.userId });
    const listCmt = await Comment.find({roomId: roomId.id});
    const phoneNumber = userInfor.phoneNumber;
    let userId;
    if (user) {
      userId = req.cookies.user.user_id;
      role = await Role.findOne({ userId: userId });
      role = role.name;
    }
    let showSearch = "no";
    let numberNotification = await NotificationService.getNumberNotification(userId);
    const roomLike = await FavoriteRoom.findOne({userId: userId, roomId: roomId.id});
    let isLike = false;
    if(roomLike) {
        isLike = true;
    }
    const isSelectRoom = await ChooseRoom.findOne({userId: userId, roomId: roomId.id});
    let isChoose = false;
    if(isSelectRoom) {
      isChoose = true;
    }
      res.status(200)
      .render("roomDetail", {
        room,
        user,
        phoneNumber,
        userInfor,
        role,
        showSearch,
        isLike,
        numberNotification,
        listCmt,
        isChoose,
        userName,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};
const getUploadRoom = async (req, res, next) => {
  try {
    const user = req.cookies.user;
    let userId = "",
      role = "";
    if (user) {
      userId = req.cookies.user.user_id;
      role = await Role.findOne({ userId: userId });
      role = role.name;
    }
    let count = 0;
    const showSearch = "no";
    let numberNotification = await NotificationService.getNumberNotification(userId);
    res.render("upload", { user, role, userId, showSearch, numberNotification });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const postUploadRoom = async (req, res, next) => {
  try {
    id = req.cookies.user.username;
    const room = req.body;
    const address =
      req.body.address +
      ", " +
      req.body.ward +
      ", " +
      req.body.district +
      ", " +
      req.body.city;
    room.address = address;
    room.username = id;
    room.userId = req.cookies.user.user_id;
    let files = req.files;
    let images = [];
    for (let i = 0; i < files.length; i++) {
      images.push({ url: files[i].path });
    }
    room.images = images;
    const newRoom = new Room(room);
    await newRoom.save();
    const user = req.cookies.user;
        let userId, role, showSearch = "no";
        if(user) {
            userId = req.cookies.user.user_id
            role = await Role.findOne({userId: userId});
            role = role.name;
        }
        let numberNotification = await NotificationService.getNumberNotification(userId);
        let perPage = 4; 
        let page = req.params.page || 1;
    await Room.find({userId: userId}).skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, listRoom) => {
            Room.countDocuments((err, count) => {
                if(err) return next(err);
                // res.status(200).render("manageRoom", {title: "Dream Boarding House", listRoom, current: page, pages: Math.ceil(count / perPage), user, role, listRoom, showSearch, numberNotification})
            })
        });
        res.redirect("/innkeeper/myRoom/all");
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};
const postSelectRoom = async (req, res, next) => {
  try {
    const userId = req.cookies.user.user_id;
    const userInfor = await User.findOne({ _id: userId });
    const roomId = req.params.id;
    const room = await Room.findOne({ _id: roomId });
    const pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.PUSHER_APP_KEY,
      secret: process.env.PUSHER_APP_SECRET,
      cluster: process.env.PUSHER_APP_CLUSTER
  });
    let myRoom = {
      userId: userId,
      roomId: roomId,
      innkeeperId: room.userId,
    };
    const newRoom = ChooseRoom(myRoom);
    await newRoom.save().then((err, data) => {
      if(!err) console.log('new room: ', data);
    });
    let bodyNotifi;
    bodyNotifi = {
      ownerId: room.userId,
      userId: userId,
      content:
        "Tôi quan tâm tới phòng trọ này, hãy liên hệ với tôi qua số điện thoại " +
        userInfor.phoneNumber,
    };
    // const innkeeperInfor = await User.findOne({_id: room.userId});
    pusher.trigger(`${room.userId}`, "my-event", {
      message: `Người dùng ${userInfor.username} quan tâm tới phòng trọ của bạn`,
    })

    const newNotifi = Notification(bodyNotifi);
    await newNotifi.save();
    res.status(200).json({
      code: 1,
      msg: "Chúng tôi đã gửi thông báo tới chủ trọ. Hãy liên hệ với họ hoặc vui lòng đợi phản hồi."
    });
  } catch (error) {
    console.log(error);
  }
};
const getSelectRoom = async (req, res, next) => {
  try {
    const user = req.cookies.user;
    const userId = req.cookies.user.user_id;
    let role;
    if (user) {
      role = await Role.findOne({ userId: userId });
      role = role.name;
    }
    const listRoomId = await ChooseRoom.find({ userId: userId });
    const listRoom = [];
    console.log(listRoomId);
    if (listRoomId.length > 0) {
      for (let i = 0; i < listRoomId.length; i++) {
        const id = listRoomId[i].roomId;
        const room = await Room.findOne({ _id: id });
        if (room) {
          listRoom.push(room);
        }
      }
    }
    let numberNotification = await NotificationService.getNumberNotification(userId);
    let showSearch = "no";
    res
      .status(200)
      .render("chooseRoom", {
        title: "Dream boarding house",
        listRoom,
        user,
        role,
        showSearch,
        numberNotification
      });
  } catch (error) {
    console.log(error);
  }
};
const deleteSelectRoom = async (req, res, next) => {
  try {
    const roomId = req.params.id;
    await ChooseRoom.deleteOne({ roomId: roomId });
    const user = req.cookies.user;
    const userId = req.cookies.user.user_id;
    let role;
    if (user) {
      role = await Role.findOne({ userId: userId });
      role = role.name;
    }
    const listRoomId = await ChooseRoom.find({ userId: userId });
    const listRoom = [];
    console.log(listRoomId);
    if (listRoomId.length > 0) {
      for (let i = 0; i < listRoomId.length; i++) {
        const id = listRoomId[i].roomId;
        const room = await Room.findOne({ _id: id });
        if (room) {
          listRoom.push(room);
        }
      }
    }
    let numberNotification = await NotificationService.getNumberNotification(userId);
    let showSearch = "no";
    // res
    //   .status(200)
    //   .render("chooseRoom", {
    //     title: "Dream boarding house",
    //     listRoom,
    //     user,
    //     role,
    //     showSearch,
    //     numberNotification
    //   })
    res.redirect("/room/selectRoom/All");
  } catch (error) {
    console.log(error);
  }
};
const successfullySelectRoom = async (req, res, next) => {
  try {
    const userId = req.cookies.user.user_id;
    const roomId = req.params.roomId;
    await ChooseRoom.where({userId: userId, roomId: roomId}).update({userAccept: true});
    res.status(200).json({
      code: 1,
      msg: "successfully"
    })
  } catch(error) {
    console.log(error);
  }
}
module.exports = {
  getUploadRoom,
  postUploadRoom,
  getDetailRoom,
  postSelectRoom,
  getSelectRoom,
  deleteSelectRoom,
  successfullySelectRoom,
};
