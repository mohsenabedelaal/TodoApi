const dbOptions = require("../config/dbConfig");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  dbOptions.DB,
  dbOptions.USER,
  dbOptions.PASSWORD,
  {
    host: dbOptions.HOST,
    dialect: dbOptions.dialect,
    operatorsAliases: false,
    pool: dbOptions.pool,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Tables
db.todos = require("./todoModel")(sequelize, DataTypes);
db.users = require("./userModel")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("re-sync done");
});

module.exports = db;
