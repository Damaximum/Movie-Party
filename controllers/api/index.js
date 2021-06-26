const router = require("express").Router();
const userRoutes = require("./userRoutes");
const friendRoutes = require("./friendRoutes");
const eventRoutes = require("./eventRoutes");

router.use("/events", eventRoutes);
router.use("/friends", friendRoutes);
router.use("/users", userRoutes);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> main
