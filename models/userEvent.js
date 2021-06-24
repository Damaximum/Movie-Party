const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class userEvent extends Model {}

userEvent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    event_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "event",
        key: "id",
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
    },
    rsvp: {
      type: DataTypes.BOOLEAN,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "userEvent",
  }
);

module.exports = userEvent;