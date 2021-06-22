const User = require('./User');
const Event = require('./Events');
const Group = require('./Groups');
const Friend = require('./Friends');

User.hasMany(Group, {
foreignKey: 'user_id'
});

User.hasMany(Event, {
foreignKey: 'user_id'
});

Group.hasMany(Event, {
foreignKey: 'group_id',
onDelete: 'CASCADE'
});

Group.belongsTo(User, {
foreignKey: 'user_id'
});

Event.belongsTo(User, {
foreignKey: 'user_id'
});

Event.belongsTo(Group, {
foreignKey: 'group_id'
});
// ---------------------- Begin Friend Section----------------------------

Friend.hasMany(User, {
    as: "requester_id",
    through: "rel",
    foreignKey: "requester_id"
});

Friend.hasMany(User, {
    as: "reciever_id",
    through: "rel",
    foreignKey: "reciever_id"
});

// ---------------------End of Friend Section-------------------------
module.exports = { User, Event, Group, Friend };
