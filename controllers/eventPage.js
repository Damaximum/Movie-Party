const router = require("express").Router();
const { Events, User, userEvent, Friends } = require("../models");
const withAuth = require("../utils/auth");

// READ All Events
router.get("/", withAuth, async (req, res) => {
  try {
    const dbEvent = await userEvent.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: Events,
          attributes: ["title", "event_info", "date_created", "user_id"],
        },
      ],
    });

    const event = dbEvent.map((event) => event.get({ plain: true }));
    // console.log(req.session);
//     console.log(event);
    res.render("eventsPage", { event, loggedIn: req.session.loggedIn });
//     res.status(200).json(event);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// READ a specific Events by ID
router.get("/:id", async (req, res) => {
  try {
    const eventData = await Events.findByPk(req.params.id, {
      include: [{ model: User, through: userEvent, as: "user_event" }],
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
