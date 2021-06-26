<<<<<<< HEAD
  
const router = require("express").Router();
const apiRoutes = require("./api");


router.use("/api", apiRoutes);


module.exports = router;
=======
const router = require("express").Router();
const apiRoutes = require("./api");
const eventPage = require("./eventPage");

router.use("/api", apiRoutes);
router.use("/events", eventPage);

module.exports = router;
>>>>>>> main
