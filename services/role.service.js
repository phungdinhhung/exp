const Role = require('../models/role.model');
const getRoleUser = async(req, res, next) => {
    try {
        const user = req.cookies.user;
        let userId, role;
        if(user) {
            userId = req.cookies.user.user_id
            role = await Role.findOne({userId: userId});
            role = role.name;
        }
       return role;
       return undefined;
    } catch (error) {
        console.log(error);
        return undefined
    }
}

module.exports = {
    getRoleUser 
}