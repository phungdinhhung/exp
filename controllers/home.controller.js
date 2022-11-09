const Room = require('../models/room.model');
const Role = require('../models/role.model');
const NotificationService = require('../services/notification');
const getHomePage = async(req, res, next) => {
    try {
        const user = req.cookies.user;
        let userId="", role="";
        if(user) {
            userId = req.cookies.user.user_id;
            role = await Role.findOne({userId: userId});
            role = role.name;
        }
        const listRoom = await Room.find({
            isAccept: true,
            type: "Phòng trọ",
            state: true,
        });
        const listRoom2 = await Room.find({
            isAccept: true,
            type: "Căn hộ",
            state: true,
        });
        let today = new Date();
        const timeStamp = new Date().getTime();
        const yesterdayTimeStamp = timeStamp - 24*60*60*1000;
        const yesterdayDate = new Date(yesterdayTimeStamp);
        const listRoom3 = await Room.find({
            isAccept: true,
            state: true,
            createdAt: {
                $gte: yesterdayDate, 
                $lt: today
            }
        });
        let count = 0;
        let numberNotification = await NotificationService.getNumberNotification(userId);
        const showSearch = "yes";
        //Header must have user and role
        res.render("index", {title: "Dream Boarding House", listRoom, listRoom2, listRoom3, user, role, userId, showSearch, numberNotification});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
}

module.exports = {
    getHomePage
}