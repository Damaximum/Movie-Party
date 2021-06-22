const User = require("./User");
const Events = require("./Events");
const userEvent = require("./userEvent");
const Friends = require("./Friends");

User.hasMany(Events, {
  foreignKey: "user_id",
});

Events.belongsTo(User, {
  foreignKey: "user_id",
});

// ---------------------- Begin userEvent Section----------------------------

User.belongsToMany(Events, {
  as: "attendee",
  through: "userEvent",
  foreignKey: "user_id",
});

Events.belongsToMany(User, {
  as: "event",
  through: "userEvent",
  foreignKey: "user_II",
});

// User.hasMany(userEvent, {
//   foreignKey: "user_id",
// });

// userEvent.belongsTo(User, {
//   foreignKey: "user_id",
// });

// Events.hasMany(userEvent, {
//   foreignKey: "event_id",
// });

// userEvent.belongsTo(Events, {
//   foreignKey: "event_id",
// });

// ---------------------End of userEvent Section-------------------------

// ---------------------- Begin Friends Section----------------------------

Friends.belongsToMany(User, {
  as: "requester",
  through: "rel",
  foreignKey: "requester_id",
});

Friends.belongsToMany(User, {
  as: "reciever",
  through: "rel",
  foreignKey: "reciever_id",
});

// ---------------------End of Friends Section-------------------------
module.exports = { User, Events, userEvent, Friends };
