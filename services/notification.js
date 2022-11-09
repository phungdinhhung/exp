const Notification = require('../models/notifications.model')
const getNumberNotification = async (userId) => {
    const notifications = await Notification.find({ownerId: userId, isRead: false});
    let number = notifications.length;
    if(number === undefined) {
        number = 0
    }
    return number;
}

module.exports = {
    getNumberNotification
}