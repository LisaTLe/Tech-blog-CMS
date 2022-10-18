// const router = require("express").Router();
// const { User, Post } = require("../../models");

// const userRoutes = require("./user-routes");
// const postRoutes = require("./post-routes");
// const commentRoutes = require("./comment-routes");

// router.use("/user", userRoutes);

// router.get("/user", async (req, res) => {
//   const user = await User.findAll();
//   res.json(user);
// });

// router.use("/post", postRoutes);

// router.get("/post", async (req, res) => {
//   const post = await Post.findAll();
//   res.json(post);
// });

// router.use("/comment", commentRoutes);

// module.exports = router;

const router = require("express").Router();
const userRoutes = require("./user-routes.js");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-routes");
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
