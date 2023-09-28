const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("digitalCare", "root", "firemanfireman@@", {
  host: "localhost",
  dialect: "mysql",
  logging: false, //! comment this if you want to see console log on server start
});

sequelize
  .query("CREATE DATABASE IF NOT EXISTS `digitalCare`;")
  .then(() => {
    console.log("db connected");
  })
  .catch((error) => {
    console.error("Unable to create the database:", error);
    sequelize.close();
  });

module.exports = sequelize;
