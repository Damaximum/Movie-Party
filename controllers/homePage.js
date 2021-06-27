const router = require("express").Router();
const { User, userEvent, Events, Friends } = require("../models");
const withAuth = require("../utils/auth");

// READ All Events
router.get("/", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const dbEvent = await userEvent.findAll({
        where: {
          user_id: req.session.user_id,
        },
        include: [
          {
            model: Events,
            attributes: ["title", "event_info", "date_created", "user_id"],
            include: [
              {
                model: User,
                attributes: ["name"],
              },
            ],
          },
        ],
      });

      const events = dbEvent.map((event) => event.get({ plain: true }));
      // console.log(req.session);
      // console.log(events);
      res.render("homePage", { events, loggedIn: req.session.loggedIn });
      // res.status(200).json(events);
    } else {
      res.render("homePage");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/event/:id", async (req, res) => {
  try {
    // const eventData = await Events.findByPk(req.params.id, {
    //   include: [],
    // });
    const eventData = await userEvent.findByPk(req.params.id, {
      include: [
        {
          model: Events,
          attributes: ["title", "event_info", "date_created", "user_id"],
          include: [
            {
              model: User,
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    if (!eventData) {
      res.status(404).json({ message: "No Events found with this id!" });
      return;
    }
    const event = eventData.get({ plain: true });
    // console.log(event);
    // res.status(200).json(event);
    res.render("eventsSinglePage", { event, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/friends", withAuth, async (req, res) => {
  try {
    const dbfriend = await User.findAll({
      where: {
        id: req.session.user_id,
      },
      include: [
        {
          model: User,
          through: Friends,
          as: "friends",
          // where: {
          //   reciever_id: req.session.id,
          // },
        },
      ],
    });
    const friend = dbfriend.map((friend) => friend.get({ plain: true }));
    // console.log(friend);
    // res.status(200).json(friend);
    res.render("friendsPage", { friend, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/events", withAuth, async (req, res) => {
  try {
    const dbEvent = await Events.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const events = dbEvent.map((event) => event.get({ plain: true }));
    // console.log(req.session);
    // console.log(events);
    res.render("eventsPage", { events, loggedIn: req.session.loggedIn });
    // res.status(200).json(events);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    } else {
      res.render("login");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/signup", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.redirect("/");
    } else {
      res.render("signup");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/profile", async (req, res) => {
  try {
    const userProfile = await User.findOne({
      where: { id: req.session.user_id },
      attribute: ["name", "id"],
    });

    const profile = userProfile.get({ plain: true });

    // console.log(userProfile);
    // res.status(200).json(userProfile);

    res.render("userProfile", { profile });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
