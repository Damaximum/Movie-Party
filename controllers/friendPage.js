const router = require("express").Router();
const { Friends, User } = require("../models");

// READ All Friends
router.get("/", async (req, res) => {
  try {
    const dbfriend = await Friends.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const friend = dbfriend.map((friend) => friend.get({ plain: true }));
    console.log(req.session);
    res.render("friendsPage", { friend, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// READ a specific Friends by ID with Comments
router.get("/friend/:id", async (req, res) => {
  try {
    const friendData = await Friends.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        // {
        //   model: Comment,
        //   include: [User],
        // },
      ],
    });

    if (!friendData) {
      res.status(404).json({ message: "No Friends found with this id!" });
      return;
    }
    const friend = friendData.get({ plain: true });
    // console.log(Friends);

    res.render("friendsSinglePage", { friend, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
