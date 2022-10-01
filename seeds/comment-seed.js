const { Comment } = require("../models");

const commentData = [
  {
    user_id: 1,
    post_id: 1,
    comment_text: "Amazing technology!",
  },
  {
    user_id: 2,
    post_id: 2,
    comment_text: "Useful tool!",
  },
  {
    user_id: 3,
    post_id: 1,
    comment_text: "test",
  },
];

const seedComments = async () => {
  await Comment.bulkCreate(commentData);
};

module.exports = seedComments;
