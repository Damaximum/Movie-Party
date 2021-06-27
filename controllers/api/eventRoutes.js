const router = require("express").Router();
const { Events, User, userEvent, Friends } = require("../../models");
const withAuth = require("../../utils/auth");

// CREATE Events
// user creates an event
router.post("/", withAuth, async (req, res) => {
  try {
    const newEvents = await Events.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    // const newUserEvent = await userEvent.create({
    //   user_id: req.session.user_id,
    //   isAdmin: true,
    //   event_id:
    // });

    // res.status(200).json({ newEvents, newUserEvent });
    console.log(newEvents);
    res.status(200).json(newEvents);
  } catch (err) {
    res.status(400).json(err);
  }
});

// READ Events
// look for and show events. might need to create a couple other READs. one to read ones the user is a part of, and another to find by a search parameter so that they can find events a friend made?
// How are friends able to invite other friends/users to event???
// router.get("/", async (req, res) => {
//   try {
//     const EventsData = await userEvent.findAll({
//       where: {
//         user_id: req.session.user_id,
//         },
//         include: [
//             {
//               model: User,
//               attributes: ["name", "id"],
//             },
//     });

//     res.status(200).json(EventsData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// UPDATE Events
// Update an event. either their info, participants, or title
router.put("/:id", withAuth, async (req, res) => {
  try {
    const EventsData = await Events.update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!EventsData) {
      res.status(404).json({ message: "No Events found with this id" });
      return;
    }

    res.status(200).json(EventsData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE Events
// Delete the event.
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const EventsData = await Events.destroy({
      where: {
        id: req.params.id,
      },
    });

    console.log(EventsData);

    if (!EventsData) {
      res.status(404).json({ message: "No Events found with this id!" });
      return;
    }

    res.status(200).json(EventsData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
