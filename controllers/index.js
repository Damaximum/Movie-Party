const router = require("express").Router();
const apiRoutes = require("./api");
const eventPage = require("./eventPage");
const homePage = require("./homePage");
const friendPage = require("./friendPage");

router.use("/api", apiRoutes);
router.use("/events", eventPage);
router.use("/friends", friendPage);
router.use("/", homePage);

module.exports = router;
