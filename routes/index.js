const registerRouter = require("./register");
const authRouter = require("./auth");
const homeRouter = require("./home");
const favoriteListRouter = require("./favorite-list");
const roomRouter = require("./room");
const userRouter = require("./users");
const manageRoomRouter = require("./manageRoom");
const logOutRouter = require("./logout");
const searchRouter = require("./search");
const notificationRouter = require('./notification');
const commentRouter = require('./comment');
const adminRouter = require("./admin");
function route(app) {
  app.use("/register", registerRouter);
  app.use("/login", authRouter);
  app.use("/favoriteList", favoriteListRouter);
  app.use("/room", roomRouter);
  app.use("/user", userRouter);
  app.use("/innkeeper", manageRoomRouter);
  app.use("/logout", logOutRouter);
  app.use("/search", searchRouter);
  app.use("/admin", adminRouter);
  app.use('/notification', notificationRouter);
  app.use('/comment', commentRouter);
  app.use("/", homeRouter);
}

module.exports = route;
