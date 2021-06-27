const router = require("express").Router();
const { Events, User, userEvent } = require("../models");
const withAuth = require("../utils/auth");

// READ All Events
router.get("/", withAuth, async (req, res) => {
  try {
    // const dbEvent = await userEvent.findAll({
    //   where: {
    //     user_id: req.session.user_id,
    //   },
    //   include: [
    //     {
    //       model: Events,
    //       attributes: ["title", "event_info", "date_created", "user_id"],
    //       include: [
    //         {
    //           model: User,
    //           attributes: ["name"],
    //         },
    //       ],
    //     },
    //   ],
    // });

    const dbEvent = await Event.findAll({
      where: {
        user_id: req.session.user_id,
      },
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

// READ a specific Events by ID
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

module.exports = router;
