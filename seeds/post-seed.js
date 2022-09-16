const { Post } = require("../models");

const postData = [
  {
    title: "Tech Blog is Finally Here!",
    post_content:
      "This blog is a place where you can post all kinds of cool facts and finds about technology!",
    user_id: 1,
  },
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
