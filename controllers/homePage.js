const router = require("express").Router();
const { User, userEvent, Events } = require("../models");
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

router.get("/friends", withAuth, async (req, res) => {
  try {
    res.render("friendsPage");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/events", withAuth, async (req, res) => {
  try {
    res.render("eventsPage");
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

module.exports = router;
