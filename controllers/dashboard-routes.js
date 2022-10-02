const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

//GET request for all posts
router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: { exclude: ["updatedAt", "user_id"] },
      include: [
        { model: User, attributes: { exclude: ["updatedAt", "password"] } },
        { model: Comment },
      ],
      where: {
        user_id: req.session.userId,
      },
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("all-posts-admin", {
      layout: "dashboard",
      payload: { posts, session: req.session },
    });
  } catch (err) {
    console.log(err);
    res.redirect("login");
  }
});

//GET request for one post
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });

      res.render("edit-post", {
        layout: "dashboard",
        payload: { posts: post, session: req.session },
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.log(err);
    res.redirect("login");
  }
});

//GET request to create new post
router.get("/create", withAuth, (req, res) => {
  res.render("create", { layout: "dashboard" });
  // Post.findAll({
  //   where: {
  //     user_id: req.session.user_id,
  //   },
  //   attributes: ["id", "title", "post_content", "created_at"],
  //   include: [
  //     {
  //       model: Comment,
  //       attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
  //       include: {
  //         model: User,
  //         attributes: ["username", "github"],
  //       },
  //     },
  //     {
  //       model: User,
  //       attributes: ["username", "github"],
  //     },
  //   ],
  // })
  //   .then((dbPostData) => {
  //     const post = dbPostData.map((post) => post.get({ plain: true }));
  //     res.render("create-post", { post, loggedIn: true });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
});

module.exports = router;
