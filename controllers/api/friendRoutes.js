const router = require("express").Router();
const { Friends } = require("../../models");
const withAuth = require("../../utils/auth");

// CREATE Friends
// create a friend request? kind of unsure how to approach this atm
router.post("/:id", async (req, res) => {
  try {
    const hasMatch = await Friends.findAll({
      where: {
        requester_id: req.session.user_id,
        reciever_id: req.params.id,
      },
    });

    if (req.session.user_id == req.params.id) {
      res.status(404).json({ error: "You can't add yourself as a friend!" });
      return;
    } else if (hasMatch.length > 1 && hasMatch) {
      console.log(hasMatch);
      res.status(404).json({ error: "This friend already exists" });
      return;
    } else {
      await Friends.create({
        requester_id: req.session.user_id,
        reciever_id: req.params.id,
      });
    }

    const hasMatch2 = await Friends.findAll({
      where: {
        reciever_id: req.session.user_id,
        requester_id: req.params.id,
      },
    });

    if (hasMatch2.length > 1 && hasMatch2) {
      res.status(404).json({ error: "This friend already exists..." });
      return;
    } else {
      await Friends.create({
        reciever_id: req.session.user_id,
        requester_id: req.params.id,
      });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// READ Friends
router.get("/", async (req, res) => {
  try {
    const FriendsData = await Friends.findAll({
      where: {
        requester_id: req.params.id,
      },
      // ...req.body,
      // reciever_id: req.session.user_id,
    });

    res.status(200).json(FriendsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// a 'findOne' version so that a user can find a friend based on the user id.
router.get("/:id", async (req, res) => {
  try {
    const FriendsData = await Friends.findOne({
      where: {
        requester_id: req.params.id,
      },
      ...req.body,
      reciever_id: req.session.user_id,
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
    const friendStatus = await Friends.update(
      { status: req.body.status },
      {
        where: {
          requester_id: req.session.user_id,
          reciever_id: req.params.id,
        },
      }
    );

    if (!friendStatus) {
      res.status(404).json({ message: "No Friends found with this id" });
      return;
    }

    const friendStatus2 = await Friends.update(
      { status: req.body.status },
      {
        where: {
          reciever_id: req.session.user_id,
          requester_id: req.params.id,
        },
      }
    );

    if (!friendStatus2) {
      res.status(404).json({ message: "No Friends found with this id" });
      return;
    }

    // console.log(friendStatus);
    // console.log(friendStatus2);

    res.status(200).json({ friendStatus, friendStatus2 });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE Friends
// This can be called if the status is set to 3/rejected (occurs when friend request is rejected, or deleted from the friends list)
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const friendsData = await Friends.destroy({
      where: {
        requester_id: req.session.user_id,
        reciever_id: req.params.id,
      },
    });

    if (!friendsData) {
      res.status(404).json({ message: "No Friends found with this id!" });
      return;
    }

    const friendsData2 = await Friends.destroy({
      where: {
        reciever_id: req.session.user_id,
        requester_id: req.params.id,
      },
    });

    if (!friendsData2) {
      res.status(404).json({ message: "No Friends found with this id!" });
      return;
    }

    res.status(200).json({ friendsData, friendsData2 });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
