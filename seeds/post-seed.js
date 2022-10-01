const { Post } = require("../models");

const postData = [
  {
    title: "Tech Blog is Finally Here!",
    post_content:
      "This blog is a place where you can post all kinds of cool facts and finds about technology!",
    user_id: 1,
  },
  {
    title: "Tech Blog test",
    post_content: "testing tech blog post",
    user_id: 2,
  },
  {
    title: "MVC Tech Blog",
    post_content: "CMS styled tech blog is here",
    user_id: 3,
  },
];

const seedPost = async () => {
  await Post.bulkCreate(postData);
};

module.exports = seedPost;
