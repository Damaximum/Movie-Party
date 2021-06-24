const router = require("express").Router();
const { Events, User } = require("../models");

// READ All Events
router.get("/", async (req, res) => {
  try {
    const dbEvent = await Events.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const event = dbEvent.map((event) => event.get({ plain: true }));
    console.log(req.session);
    res.render("eventsPage", { event, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// READ a specific Events by ID with Comments
router.get("/event/:id", async (req, res) => {
  try {
    const eventData = await Events.findByPk(req.params.id, {
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

    if (!eventData) {
      res.status(404).json({ message: "No Events found with this id!" });
      return;
    }
    const event = eventData.get({ plain: true });
    // console.log(Events);

    res.render("eventsSinglePage", { event, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;