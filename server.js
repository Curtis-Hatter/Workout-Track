const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

// const db = require("./app/models");
// const { Workout } = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("app/public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// db.Workout.create({ name: "Workout" })
//   .then(WorkoutDb => {
//     console.log(WorkoutDb);
//   })
//   .catch(({message}) => {
//     console.log(message);
// });

require('./app/routes/html-routes.js')(app);
// couldn't get req.params.id to work for some reason
require('./app/routes/api-routes.js')(app);
// app.use(require('./app/routes/api-routes.js'));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});