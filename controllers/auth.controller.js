const User = require("../models/user.model");
const Role = require("../models/role.model");
const Room = require("../models/room.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
  //login
  loginUser: async (req, res) => {
    
    const { email, password } = req.body;
    let role;
    try {
      const user = await User.findOne({ email: email, deleted: false });
      if(user) {
        role = await Role.findOne({
          userId: user.id
        })
        console.log('role: ', role);
      }
      if (!user) {
        // json('Sai tài khoản!');
        return res.status(404).render("../views/components/login", { user });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        // json('Sai mật khẩu!');
        console.log("login failed");
        return res.status(404).render("../views/components/login");
      }
      if (user && validPassword) {
        const accessToken = jwt.sign(
          {
            user_id: user._id,
            username: user.username,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
          process.env.JWT_ACCESS_KEY,
          { expiresIn: "1h" }
        );
        const refreshToken = jwt.sign(
          {
            user_id: user._id,
            username: user.username,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
          process.env.JWT_REFRESHTOKEN_KEY,
          { expiresIn: "2h" }
        );
        const userInClient = {
          user_id: user._id,
          username: user.username,
          userAvt: user.avatar,
        };
        res.cookie("user", userInClient, {
          httpOnly: true,
          sameSite: "strict",
        });
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          sameSite: "strict",
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        });
        if(role.name !== "admin") {
          res.redirect("/");
        } else {
          const renderUsers = await User.find({ deleted: false });
          const post = await Room.find({isAccept: true});
          const blockUser = await User.find({deleted: true});
          const numOfUser = renderUsers.length;
          const numOfPost = post.length;
          const numOfBlock = (numOfUser - blockUser.length);
          // res.status(200).render("admin.template/master", {
          //   title: "Dashboard Admin",
          //   content: "../admin.template/main_content", numOfUser, numOfPost, numOfBlock
          // });
          res.redirect("http://localhost:5000/admin");
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  logOut: (req, res) => {
    res.clearCookie("user");
    res.clearCookie("accessToken");
    res.redirect("/");
  },
};
module.exports = authController;
