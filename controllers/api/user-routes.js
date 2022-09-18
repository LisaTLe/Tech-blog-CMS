const router = require("express").Router();
const { User, Comment, Post } = require("../../models");
const withAuth = require("../../utils/auth");

//GET request for all users
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//GET request for one user
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "post_content", "created_at"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "User cannot be found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//POST request to create new user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      github: req.body.github,
    });

    req.session.save(() => {
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// .then((dbUserData) => {
//   req.session.save(() => {
//     req.session.user_id = dbUserData.id;
//     req.session.username = dbUserData.username;
//     req.session.github = dbUserData.github;
//     req.session.loggedIn = true;

//     res.json(dbUserData);
//   });
// });
// });

//POST request to login
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    if (!userData) {
      res
        .status(404)
        .json({ message: "Error, Incorrect username or password entered" });
      return;
    }
    const correctPw = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!correctPw) {
      res
        .status(404)
        .json({ message: "Error, Incorrect username or password entered" });
      return;
    }
    req.session.save(() => {
      // req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.cookie;

      res
        .status(200)
        .json({ user: userData, message: "You are now logged in" });

      // res.render("homepage");
    });
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});
//   }).then((dbUserData) => {
//     if (!dbUserData) {
//       res
//         .status(400)
//         .json({ messgae: "There is no user on file with that username" });
//     }
//     const validPassword = dbUserData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res.status(400).json({ message: "Incorrect password. Try again!" });
//       return;
//     }
//     req.session.save(() => {
//       req.session.user_id = dbUserData.id;
//       req.session.username = dbUserData.username;
//       req.session.github = dbUserData.github;
//       req.session.loggedIn = true;

//       res.json({ user: dbUserData, message: "You are now logged in" });
//     });
//   });
// });

//POST request for user logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(200).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
