const express = require("express");
// const cookieParser = require("cookie-parser");
const cors = require("cors");
const sequelize = require("./database/configdb");
const { Sequelize } = require("sequelize");
const doctorRoutes = require("./routes/medcinRoutes");
const adminRoutes = require("./routes/AdminRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true }));
// app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname + "/../client/dist"));

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, function () {
      console.log("Listening on port " + PORT);
    });
  })
  .catch((error) => console.log(error));
