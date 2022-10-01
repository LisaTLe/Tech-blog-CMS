const { User } = require("../models");

const userData = [
  {
    username: "test",
    email: "test@test.com",
    password: "test",
  },
  {
    username: "lisa",
    email: "lisa@test.com",
    password: "passwords2",
  },
  {
    username: "Lily",
    email: "lily@test.com",
    password: "testing123",
  },
];

const seedUser = async () => {
  await User.bulkCreate(userData);
};

module.exports = seedUser;
