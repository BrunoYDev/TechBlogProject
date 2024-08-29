const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");
const adminAuth = require("../middlewares/admin.auth");

router.get("/admin/users", (req, res) => {
  User.findAll().then(users => {
    res.render('admin/users/index',{users: users});
  })
});

router.get("/admin/users/create", (req, res) => {
  res.render("admin/users/create");
});

router.post("/users/create", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  User.findOne({
    where: {
      email: email,
    },
  }).then((user) => {
    if (!user) {
      let salt = bcrypt.genSaltSync(10);

      let hash = bcrypt.hashSync(password, salt);

      User.create({
        email: email,
        password: hash,
      })
        .then(() => {
          res.redirect("/");
        })
        .catch((err) => {
          res.redirect("/");
        });
    } else {
      console.log("error")
      res.redirect("/admin/users/create");
    }
  });
});

router.get("/users/login", (req,res) => {
  res.render("admin/users/login");
});

router.post('/users/authenticate', (req,res) => {
  let email = req.body.email;
  let password = req.body.password;

  User.findOne({where:{email: email}}).then((user) => {
    if(user){
      let correct = bcrypt.compareSync(password, user.password);

      if(correct){
        req.session.user = {
          id: user.id,
          email: user.email
        }

        res.redirect('/admin/articles');
      }else{
        res.redirect('/users/login');
      }
    }else{
      res.redirect('/users/login');
    }
  })
});

router.get('/users/logout',(req,res) => {
  req.session.user = undefined;
  res.redirect('/');
});

module.exports = router;
