const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

//GET request for all posts
router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) =>
        post.get({
          plain: true,
        })
      );
      res.render("dashboard", {
        posts,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//GET request for one post (to edit)
router.get("/edit/:id", withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({
          message: "No post found with this id",
        });
        return;
      }

      const post = dbPostData.get({
        plain: true,
      });

      res.render("edit-post", {
        post,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
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
