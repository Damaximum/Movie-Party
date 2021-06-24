const router = require("express").Router();
const { Friends } = require("../../models");
const withAuth = require("../../utils/auth");

// CREATE Friends
// create a friend request? kind of unsure how to approach this atm
router.post("/", withAuth, async (req, res) => {
  try {
    const newFriends = await Friends.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newFriends);
  } catch (err) {
    res.status(400).json(err);
  }
});

// READ Friends
// Need to make a 'findOne' version so that a user can find a friend based on the user id.
router.post("/", async (req, res) => {
  try {
    const FriendsData = await Friends.findAll({
      where: {
        id: req.params.id,
      },
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(FriendsData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE Friends
// Update status of friend between the ENUM states
router.put("/:id", withAuth, async (req, res) => {
  try {
    const FriendsData = await Friends.update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!FriendsData) {
      res.status(404).json({ message: "No Friends found with this id" });
      return;
    }

    res.status(200).json(FriendsData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE Friends
// This can be called if the status is set to 3/rejected (occurs when friend request is rejected, or deleted from the friends list)
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const FriendsData = await Friends.destroy({
      where: {
        id: req.params.id,
      },
    });

    console.log(FriendsData);

    if (!FriendsData) {
      res.status(404).json({ message: "No Friends found with this id!" });
      return;
    }

    res.status(200).json(FriendsData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
