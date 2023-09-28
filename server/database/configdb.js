const { Sequelize } = require("sequelize");

<<<<<<< HEAD
const sequelize = new Sequelize("digitalCare", "root", "firemanfireman@@", {
=======
const sequelize = new Sequelize("digitalcare", "root", "root", {
>>>>>>> b35406b0a9b7e6cb698c885e22648ebb4d6c7838
  host: "localhost",
  dialect: "mysql",
  logging: false, //! comment this if you want to see console log on server start
});

sequelize
  .query("CREATE DATABASE IF NOT EXISTS `digitalcare`;")
  .then(() => {
    console.log("db connected");
  })
  .catch((error) => {
    console.error("Unable to create the database:", error);
    sequelize.close();
  });

module.exports = sequelize;
