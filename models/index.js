const User = require("./User");
const Events = require("./Events");
const Friends = require("./Friends");
const userEvent = require("./userEvent");

// ---------------------- Begin userEvent Section----------------------------

User.belongsToMany(Events, {
  as: "attendee",
  through: "userEvent",
});

Events.belongsToMany(User, {
  as: "event",
  through: "userEvent",
});

// ---------------------End of userEvent Section-------------------------

// ---------------------- Begin Friends Section----------------------------

User.belongsToMany(User, { through: Friends, as: "friends" });

// ---------------------End of Friends Section-------------------------
module.exports = { User, Events, Friends, userEvent };