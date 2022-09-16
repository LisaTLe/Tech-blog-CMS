const { Comment } = require("../models");

const commentData = [
  {
    user_id: 1,
    post_id: 1,
    comment_text: "Amazing technology!",
  },
  {
    user_id: 2,
    post_id: 5,
    comment_text: "Useful tool!",
  },
];

const seedComments = async () => {
  await Comment.bulkCreate(commentData);
};

module.exports = seedComments;
