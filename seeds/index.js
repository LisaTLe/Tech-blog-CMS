const sequelize = require("../config/connection");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

const seedUser = require("../seeds/user-seed");
const seedPost = require("../seeds/post-seed");
const seedComment = require("../seeds/comment-seed");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(seedUser, { individualHooks: true });
  await Post.bulkCreate(seedPost);
  await Comment.bulkCreate(seedComment);

  process.exit(0);
};

seedAll();
