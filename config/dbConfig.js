const dbOptions = {
  HOST: process.env.DBHOST || "localhost",
  USER: process.env.DBUSER || "root",
  PASSWORD: process.env.DBPASSWORD || "",
  DB: process.env.DBNAME || "todos",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

module.exports = dbOptions
