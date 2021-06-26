const sequelize = require("../config/connection");
const { User, userEvent, Events, Friends } = require("../models");

const userData = require("./userData.json");
const eventsData = require("./eventsData.json");
const friendsData = require("./friendsData.json");
const userEventData = require("./userEventData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const event of eventsData) {
    await Events.create({
      ...event,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const friend of friendsData) {
    await Friends.create({
      ...friend,
      // requester_id: users[Math.floor(Math.random() * users.length)].id,
      // reciever_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const uEvent of userEventData) {
    await userEvent.create({
      ...uEvent,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
