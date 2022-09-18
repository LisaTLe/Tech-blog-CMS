const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, Comment, User } = require("../models");

//GET request for homepage
router.get("/", (req, res) => {
  // Post.findAll({
  //   attributes: ["id", "title", "post_content", "created_at"],
  //   include: [User],
  // })
  //   .then((dbPostData) => {
  //     const post = dbPostData.map((post) => post.get({ plain: true }));
  //     res.render("homepage", {
  //       post,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
  res.render("login");
});

router.get("/profile", (req, res) => {
  res.render("homepage");
});

router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const userData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const users = userData.map((user) => user.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("login", {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET request for login
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

//GET request for signup
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

module.exports = router;
