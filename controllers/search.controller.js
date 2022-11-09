const favoriteRoom = require('../models/favoriteRoom.model');
const Room = require('../models/room.model');
const Role = require('../models/role.model');
const NotificationService = require('../services/notification');
const showResultOfSearch = async (req, res, next) => {
    let user = '', showSearch = "yes";
    let listRoom = [];
    user = req.cookies.user;
    let userId = '';
    let role = '';
    if(user) {
        userId = req.cookies.user.user_id
        role = await Role.findOne({userId: userId});
        role = role.name;
    }
    let numberNotification = await NotificationService.getNumberNotification(userId);
    const value = req.body;
    const {text, type, price, acreage} = req.body;
    if(text.includes("0")) {
        listRoom = await Room.find({price: text});
    }
    else if(text.includes("1")) {
        listRoom = await Room.find({price: text});
    }
    else if(text.includes("2")) {
        listRoom = await Room.find({price: text});
    }
    else if(text.includes("3")) {
        listRoom = await Room.find({price: text});
    }
    else if(text.includes("4")) {
        listRoom = await Room.find({price: text});
    }
    else if(text.includes("5")) {
        listRoom = await Room.find({price: text});
    }
    else if(text.includes("6")) {
        listRoom = await Room.find({price: text});
    }
    else if(text.includes("7")) {
        listRoom = await Room.find({price: text});
    }
    else if(text.includes("8")) {
        listRoom = await Room.find({price: text});
    }
    else if(text.includes("9")) {
        listRoom = await Room.find({price: text});
    }
    else {
        listRoom = await Room.find({type: text});
    }
    if(type !== "" && (price === "" && acreage === "")) {
        listRoom = await Room.find({type: type});
    } else if(price !== "" && (type === "" && acreage === "")) {
        if(price === "1000000") {
            listRoom = await Room.find({price: { $lt: price}});
        } else if(price === "2000000") {
            listRoom = await Room.find({price: { $lt: price}});
        }else if(price === "2000000") {
            listRoom = await Room.find({price: { $lt: price}});
        }else if(price === "5000000") {
            listRoom = await Room.find({price: { $lt: price}});
        }else if(price === "8000000") {
            listRoom = await Room.find({price: { $lt: price}});
        }else if(price === "10000000") {
            listRoom = await Room.find({price: { $lt: price}});
        }else if(price === "20000000") {
            listRoom = await Room.find({price: { $lt: price}});
        }
    } else if(acreage !== "" && (type === "" && price === "")) {
        if(acreage === "30") {
            listRoom = await Room.find({acreage: { $lt: acreage}});
        } else if(acreage === "40") {
            listRoom = await Room.find({acreage: { $lt: acreage}});
        } else if(acreage === "60") {
            listRoom = await Room.find({acreage: { $lt: acreage}});
        } else if(acreage === "80") {
            listRoom = await Room.find({acreage: { $lt: acreage}});
        }
    } else if(acreage !== "" && (type !== "" && price !== "")) {
        listRoom = await Room.find({$and: [ {acreage: {$lt: acreage}}, {price: {$lt: price}}, {type: type}]});
    }
    res.status(200).render("resultSearch", {title: "Dream boarding house", listRoom, user, role, showSearch, numberNotification});
}
module.exports = {
    showResultOfSearch,
}