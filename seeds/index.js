const sequelize = require("../config/connection");

const seedUser = require("../seeds/user-seed");
const seedPost = require("../seeds/post-seed");
const seedComment = require("../seeds/comment-seed");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();
  await seedPost();
  await seedComment();

  process.exit(0);
};

seedAll();
