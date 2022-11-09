const Room = require('../models/room.model');
const Role = require('../models/role.model');
const Notification = require('../models/notifications.model');
const NotificationService = require('../services/notification');
const getInkeeperNotification = async(req, res, next) => {
    try {
        const user = req.cookies.user;
        let userId="", role="";
        if(user) {
            userId = req.cookies.user.user_id;
            role = await Role.findOne({userId: userId});
            role = role.name;
        }
        let count = 0;
        const listNotifi = await Notification.find({ownerId: userId});
        let numberNotification = await NotificationService.getNumberNotification(userId);
        const showSearch = "no";
        //Header must have user and role
        res.render("innKeeperNotification", {title: "Dream Boarding House", user, role, userId, showSearch, numberNotification, listNotifi});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
}

const deleteNotifi = async (req, res, next) => {
    const notifiId = req.params.id;
    console.log("notifiId: ", notifiId);
    const user = req.cookies.user;
        let userId="", role="";
        if(user) {
            userId = req.cookies.user.user_id;
            role = await Role.findOne({userId: userId});
            role = role.name;
        }
    await Notification.deleteOne({ownerId: userId, id: notifiId});
    const listNotifi = await Notification.find({ownerId: userId});
    let numberNotification = await NotificationService.getNumberNotification(userId);
    const showSearch = "no";
    // res.render("innKeeperNotification", {title: "Dream Boarding House", user, role, userId, showSearch, numberNotification, listNotifi});
    res.redirect("/notification/innkeeper/all");
}
module.exports = {
    getInkeeperNotification,
    deleteNotifi,
}