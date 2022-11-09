const bcrypt = require("bcrypt");

const UserModel = require("../models/user.model");
const Role = require("../models/role.model");
let errs = [];

function renderRegisterPage(req, res, next) {
  res.render("../views/components/register", { title: "Register page", errs: errs });
}

async function renderUserRegister(req, res, next) {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(req.body.password, salt);
  let username = req.body.username;
  let email = req.body.email;
  let phoneNumber = req.body.phoneNumber;
  let role = req.body.role;
  if(role === " " || role === undefined) {
    role = "Người thuê trọ";
  }
  let password = hashed;
  errs = [];

  // console.log(req.body);
  UserModel.findOne({
    username: username,
  }).then((data) => {
    if (data) {
      errs.push("Username already exist!");
    }
  });

  UserModel.findOne({
    email: email,
  }).then((data) => {
    if (data) {
      errs.push("Email already exist!");
    }
  });

  if (errs.length > 0) {
    res.render("component/register", {
      title: "Register page",
      errs: errs,
    });
  }

  if (errs.length === 0) {
    UserModel.create({
      username: username,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
    })
      .then((data) => {
        //redirect login form
        const roleBody = {
          userId: data._id.valueOf(),
          name: role,
        };
        const newRole = Role(roleBody);
        newRole.save();
        let msg = "Register successfull";
        res.redirect("/login");
      })
      .catch((error) => {
        console.log(error);
        console.log("Register failed!");
        // res.json('Tạo tài khoản thất bại');
        res.render("../views/components/register", {
          title: "Register page",
          errs: errs,
        });
      });
  }
}

module.exports = { renderRegisterPage, renderUserRegister };