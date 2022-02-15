var express = require("express");
const { requiresAuth } = require("express-openid-connect");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  let username = "";
  if (req.oidc.isAuthenticated()) {
    username = req.oidc.user.name;
  }
  console.log(username);
  res.render("index", { title: "HackBCA 20XX " + username, style: "index" });
});

router.get("/profile", requiresAuth(), (req, res) => {
  res.send(req.oidc.user);
});

module.exports = router;
