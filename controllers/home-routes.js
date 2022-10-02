const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, Comment, User } = require("../models");

//GET all posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: { exclude: ["user_id", "updatedAt"] },
      include: [
        { model: User, attributes: { exclude: ["password", "createdAt"] } },
        { model: Comment },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("all-posts", { payload: { posts, sessions: req.session } });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
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
  // res.render("create");
});

//get single post
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: {
        exclude: ["user_id", "updatedAt"],
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password", "createdAt"],
          },
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: { exclude: ["password"] },
          },
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });

      res.render("single-post", {
        payload: { posts: [post], session: req.session },
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.get("/dashboard", (req, res) => {
//   res.render("homepage");
// });

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
