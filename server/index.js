const express = require("express");
// const cookieParser = require("cookie-parser");
const cors = require("cors");
const sequelize = require("./database/configdb");
const { Sequelize } = require("sequelize");
const doctorRoutes = require("./routes/medcinRoutes");
const adminRoutes = require("./routes/AdminRoutes");
const patientRoute = require("./routes/patientRoutes")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: true }));
// app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname + "/../client/dist"));

app.use("/patient" , patientRoute)
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('Models are synchronized with the database.');
    app.listen(PORT, function () {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
