const User = require("./User");
const Events = require("./Events");
const Friends = require("./Friends");
const userEvent = require("./userEvent");

// ---------------------- Begin userEvent Section----------------------------

// User.belongsToMany(Events, {
//   as: "attendee",
//   through: "userEvent",
// });

// Events.belongsToMany(User, {
//   as: "user_event",
//   through: "userEvent",
// });

Events.belongsTo(User);

User.hasMany(userEvent);

userEvent.belongsTo(User);

Events.hasMany(userEvent);

userEvent.belongsTo(Events);

// ---------------------End of userEvent Section-------------------------

// ---------------------- Begin Friends Section----------------------------

User.belongsToMany(User, { through: Friends, as: "friends" });

// ---------------------End of Friends Section-------------------------
module.exports = { User, Events, Friends, userEvent };
